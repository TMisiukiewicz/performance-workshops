import React, {useState, useMemo} from 'react';
import {View, Text, FlatList, TextInput, StyleSheet} from 'react-native';
import {useAppSelector} from '../hooks';
import {selectBooks, selectAuthors} from '../store';
import BookListItem from '../components/BookListItem';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const books = useAppSelector(selectBooks);
  const authors = useAppSelector(selectAuthors);

  const favoriteBookIds = useAppSelector(
    state => state.favorites.favoriteBookIds,
  );

  const favoritesProcessingData = useMemo(() => {
    const favoriteBooks = favoriteBookIds
      .map(id => books.find(book => book.id === id))
      .filter(Boolean);

    const favoriteAuthors = favoriteBooks.map(book => {
      const author = authors.find(a => a.id === book?.authorId);
      return author?.name
        .toLowerCase()
        .split('')
        .reverse()
        .join('')
        .toUpperCase();
    });

    const favoriteStats = {
      count: favoriteBookIds.length,
      authorsSet: new Set(favoriteBooks.map(b => b?.authorId)),
      processedAt: Date.now(),
    };

    return {favoriteBooks, favoriteAuthors, favoriteStats};
  }, [favoriteBookIds, books, authors]);

  const filteredBookIds = useMemo(() => {
    if (!search.trim()) {
      return books.map(book => book.id);
    }
    const lower = search.toLowerCase();
    return books
      .filter(book => {
        const author = authors.find(a => a.id === book.authorId);
        return (
          book.title.toLowerCase().includes(lower) ||
          (author && author.name.toLowerCase().includes(lower))
        );
      })
      .map(book => book.id);
  }, [search, books, authors]);

  const bookStats = useMemo(() => {
    const stats = {
      total: books.length,
      filtered: filteredBookIds.length,
      searchActive: !!search.trim(),
      favorites: favoritesProcessingData.favoriteStats.count,
    };
    return stats;
  }, [books, filteredBookIds, search, favoritesProcessingData]);

  return (
    <View style={styles.flex1}>
      <TextInput
        value={search}
        onChangeText={text => {
          setSearch(text);
        }}
        placeholder="Search by book or author"
        style={styles.input}
      />
      <Text style={styles.centered}>
        Showing {bookStats.filtered} of {bookStats.total} books | ❤️{' '}
        {bookStats.favorites} favorites
      </Text>
      <FlatList
        data={filteredBookIds}
        renderItem={({item}) => <BookListItem id={item} />}
        keyExtractor={item => item}
        contentContainerStyle={{paddingVertical: 8}}
        initialNumToRender={500}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex1: {flex: 1},
  input: {
    borderWidth: 1,
    borderColor: '#b0b4c1',
    margin: 12,
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#fff',
    fontSize: 17,
    color: '#222',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    backgroundColor: '#222',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 4},
    elevation: 8,
    zIndex: 100,
  },
  fabIcon: {
    fontSize: 28,
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'flex-end',
  },
  devPanel: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: 24,
    minHeight: 180,
    elevation: 12,
    position: 'relative',
  },
  devPanelTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  devPanelClose: {
    position: 'absolute',
    right: 18,
    top: 18,
    padding: 8,
    zIndex: 10,
  },
  devPanelAction: {
    paddingVertical: 12,
  },

  centered: {textAlign: 'center', margin: 8},
});
