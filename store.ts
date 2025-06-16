import {Book, Author, Comment} from './types';
const books: Book[] = require('./mocks/books.json');
const authors: Author[] = require('./mocks/authors.json');
const comments: Comment[] = require('./mocks/comments.json');

import {configureStore, createSlice} from '@reduxjs/toolkit';

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

const bigData = Array.from({length: 1000}, (_, i) => ({
  id: i.toString(),
  title: `Item ${i}`,
  image: 'https://picsum.photos/600/400?random=' + i,
}));

const bigDataSlice = createSlice({
  name: 'bigData',
  initialState: {items: bigData, count: 0},
  reducers: {
    increment: state => {
      state.count += 1;
    },
  },
});

export const {increment} = bigDataSlice.actions;

export const store = configureStore({
  reducer: {
    books: booksSlice.reducer,
    authors: authorsSlice.reducer,
    comments: commentsSlice.reducer,
    bigData: bigDataSlice.reducer,
  },
});

/** Books selectors */
export const selectBooks = (state: RootState): Book[] => state.books;

export const selectBookById = (
  state: RootState,
  id: string,
): Book | undefined => state.books.find(book => book.id === id);

export const selectAuthors = (state: RootState): Author[] => state.authors;
export const selectComments = (state: RootState): Comment[] => state.comments;
export const selectCount = (state: RootState): number => state.bigData.count;
export const selectItemByIdSlow = (state: RootState, id: string) => {
  let result = state.bigData.items.filter(
    (item: {id: string}) => item.id === id,
  );
  for (let i = 0; i < 1000000; i++) {
    result = result;
  }
  return result[0];
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
