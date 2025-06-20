import React, {useMemo, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import TabView, {SceneMap} from 'react-native-bottom-tabs';
import {useAppSelector} from '../hooks';
import {selectBooks, selectAuthors} from '../store';
import BookListItem from '../components/BookListItem';

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
  const authors = useAppSelector(selectAuthors);

  // Get all authors with their favorite books, sorted by favorite count
  const authorsWithBooks = useMemo(() => {
    return authors
      .map(author => {
        const authorBooks = books.filter(
          book =>
            book.authorId === author.id && favoriteBookIds.includes(book.id),
        );
        const totalBooks = books.filter(book => book.authorId === author.id);

        return {
          authorId: author.id,
          authorName: author.name,
          books: authorBooks,
          totalBooksCount: totalBooks.length,
        };
      })
      .filter(author => author.totalBooksCount > 0) // Filter out authors with 0 books
      .sort((a, b) => b.books.length - a.books.length); // Sort by favorite count descending
  }, [favoriteBookIds, books, authors]);

  if (authorsWithBooks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>👨‍💼</Text>
        <Text style={styles.emptyTitle}>No authors found</Text>
        <Text style={styles.emptySubtitle}>
          Something went wrong loading the authors
        </Text>
      </View>
    );
  }

  const renderAuthorWithBooks = ({
    item,
  }: {
    item: (typeof authorsWithBooks)[0];
  }) => (
    <View>
      <View style={styles.authorCard}>
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{item.authorName}</Text>
          <View style={styles.countsContainer}>
            <Text style={styles.bookCount}>{item.books.length}</Text>
            <Text style={styles.totalCount}>/ {item.totalBooksCount}</Text>
          </View>
        </View>
      </View>
      <View style={styles.booksList}>
        {item.books.map(book => (
          <BookListItem key={book.id} id={book.id} />
        ))}
      </View>
    </View>
  );

  return (
    <FlatList
      data={authorsWithBooks}
      renderItem={renderAuthorWithBooks}
      keyExtractor={item => item.authorId}
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
  authorInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  countsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    backgroundColor: '#e8f4fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 32,
    textAlign: 'center',
  },
  totalCount: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  booksList: {
    gap: 4,
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
