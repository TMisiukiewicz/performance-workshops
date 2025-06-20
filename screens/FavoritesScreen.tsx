import React, {useMemo, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import TabView, {SceneMap} from 'react-native-bottom-tabs';
import {useAppSelector} from '../hooks';
import {selectBooks, selectAuthors} from '../store';
import BookListItem from '../components/BookListItem';

const AuthorListItem = ({authorId}: {authorId: string}) => {
  const books = useAppSelector(selectBooks);
  const author = useAppSelector(state =>
    selectAuthors(state).find(a => a.id === authorId),
  );
  const favoriteBookIds = useAppSelector(
    state => state.favorites.favoriteBookIds,
  );

  const authorBooks = useMemo(() => {
    return books.filter(
      book => book.authorId === authorId && favoriteBookIds.includes(book.id),
    );
  }, [books, authorId, favoriteBookIds]);

  return (
    <View style={styles.authorCard}>
      <Text style={styles.authorName}>{author?.name}</Text>
      <Text style={styles.authorStats}>
        {authorBooks.length} favorite book{authorBooks.length !== 1 ? 's' : ''}
      </Text>
      <Text style={styles.bookTitles}>
        {authorBooks.map(book => book.title).join(', ')}
      </Text>
    </View>
  );
};

const BooksRoute = () => {
  const favoriteBookIds = useAppSelector(
    state => state.favorites.favoriteBookIds,
  );

  if (favoriteBookIds.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>📚</Text>
        <Text style={styles.emptyTitle}>No favorite books yet</Text>
        <Text style={styles.emptySubtitle}>
          Tap the heart icon on any book to add it to your favorites
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favoriteBookIds}
      renderItem={({item}) => <BookListItem id={item} />}
      keyExtractor={item => item}
      contentContainerStyle={{paddingVertical: 8}}
    />
  );
};

const AuthorsRoute = () => {
  const favoriteBookIds = useAppSelector(
    state => state.favorites.favoriteBookIds,
  );
  const books = useAppSelector(selectBooks);

  // Get unique author IDs from favorite books
  const favoriteAuthorIds = useMemo(() => {
    const authorIds = favoriteBookIds
      .map(bookId => {
        const book = books.find(b => b.id === bookId);
        return book?.authorId;
      })
      .filter((id): id is string => Boolean(id));
    return [...new Set(authorIds)];
  }, [favoriteBookIds, books]);

  if (favoriteAuthorIds.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>👨‍💼</Text>
        <Text style={styles.emptyTitle}>No favorite authors yet</Text>
        <Text style={styles.emptySubtitle}>
          Add some books to your favorites to see their authors here
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favoriteAuthorIds}
      renderItem={({item}) => <AuthorListItem authorId={item} />}
      keyExtractor={item => item}
      contentContainerStyle={{paddingVertical: 8}}
    />
  );
};

const renderScene = SceneMap({
  books: BooksRoute,
  authors: AuthorsRoute,
});

const FavoritesScreen = () => {
  const favoriteBookIds = useAppSelector(
    state => state.favorites.favoriteBookIds,
  );
  const books = useAppSelector(selectBooks);

  const favoriteAuthorIds = useMemo(() => {
    const authorIds = favoriteBookIds
      .map(bookId => {
        const book = books.find(b => b.id === bookId);
        return book?.authorId;
      })
      .filter((id): id is string => Boolean(id));
    return [...new Set(authorIds)];
  }, [favoriteBookIds, books]);

  const [index, setIndex] = useState(0);

  // Update route titles when counts change
  const updatedRoutes = useMemo(
    () => [
      {key: 'books', title: `Books (${favoriteBookIds.length})`},
      {key: 'authors', title: `Authors (${favoriteAuthorIds.length})`},
    ],
    [favoriteBookIds.length, favoriteAuthorIds.length],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Your Favorites ({favoriteBookIds.length})
      </Text>

      <TabView
        navigationState={{index, routes: updatedRoutes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        labeled={true}
        tabBarActiveTintColor="#007AFF"
        tabBarInactiveTintColor="#666"
        getIcon={({route, focused}) => {
          if (route.key === 'books') {
            return {
              sfSymbol: focused ? 'book.fill' : 'book',
            };
          } else if (route.key === 'authors') {
            return {
              sfSymbol: focused ? 'person.fill' : 'person',
            };
          }
          return undefined;
        }}
      />
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginVertical: 16,
  },
  authorCard: {
    backgroundColor: '#f8f9fa',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  authorName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  authorStats: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  bookTitles: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
});
