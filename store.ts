import {Book, Author, Comment} from './types';
const books: Book[] = require('./mocks/books.json');
const authors: Author[] = require('./mocks/authors.json');
const comments: Comment[] = require('./mocks/comments.json');

import {configureStore, createSlice, createSelector} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const booksSlice = createSlice({
  name: 'books',
  initialState: books,
  reducers: {},
});

const authorsSlice = createSlice({
  name: 'authors',
  initialState: authors,
  reducers: {},
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState: comments,
  reducers: {},
});

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    devPanelEnabled: false,
    fabEnabled: false,
  },
  reducers: {
    toggleDevPanel: state => {
      state.devPanelEnabled = !state.devPanelEnabled;
    },
    toggleFab: state => {
      state.fabEnabled = !state.fabEnabled;
      AsyncStorage.setItem('fabEnabled', JSON.stringify(state.fabEnabled));
    },
    setFabEnabled: (state, action) => {
      state.fabEnabled = action.payload;
    },
  },
});

export const {toggleDevPanel, toggleFab, setFabEnabled} = settingsSlice.actions;

export const store = configureStore({
  reducer: {
    books: booksSlice.reducer,
    authors: authorsSlice.reducer,
    comments: commentsSlice.reducer,
    settings: settingsSlice.reducer,
  },
});

/** Books selectors */
export const selectBooks = (state: RootState): Book[] => state.books;
export const selectBookById = (
  state: RootState,
  id: string,
): Book | undefined => state.books.find(book => book.id === id);

/** Authors selectors */
export const selectAuthors = (state: RootState): Author[] => state.authors;
export const selectAuthorById = (
  state: RootState,
  id: string,
): Author | undefined => state.authors.find(author => author.id === id);

/** Comments selectors */
export const selectComments = (state: RootState) => state.comments;
export const selectCommentsByBookId = createSelector(
  [selectComments, (state, bookId) => bookId],
  (allComments, bookId) =>
    Object.values(allComments).filter(comment => comment.bookId === bookId),
);

/** Settings selectors */
export const selectDevPanelEnabled = (state: RootState): boolean =>
  state.settings.devPanelEnabled;

export const selectFabEnabled = (state: RootState): boolean =>
  state.settings.fabEnabled;
