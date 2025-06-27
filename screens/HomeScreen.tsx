import React, {useState, useMemo, useCallback, useEffect} from 'react';
import {View, Text, FlatList, TextInput, StyleSheet} from 'react-native';
import {useAppSelector} from '../hooks';
import {selectNormalizedBooks, selectAllBookIds} from '../store';
import BookListItem from '../components/BookListItem';
import performanceUtils from '../performance-utils';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const normalizedBooks = useAppSelector(selectNormalizedBooks);
  const allBookIds = useAppSelector(selectAllBookIds);

  const favoriteBookIds = useAppSelector(
    state => state.favorites.favoriteBookIds,
  );

  useEffect(() => {
    performanceUtils.stop('app-login');
  }, []);

  const renderItem = useCallback(
    ({item}: {item: string}) => {
      const book = normalizedBooks[item];

      return <BookListItem book={book} />;
    },
    [normalizedBooks],
  );

  const filteredBookIds = useMemo(() => {
    performanceUtils.start('search-filter');

    if (!search.trim()) {
      return allBookIds;
    }

    const lower = search.toLowerCase();
    const filteredBooks = allBookIds.filter(bookId => {
      const book = normalizedBooks[bookId];
      const isMatchingBook =
        book.title.toLowerCase().includes(lower) ||
        book.authorName.toLowerCase().includes(lower);

      return isMatchingBook;
    });
    performanceUtils.stop('search-filter');
    return filteredBooks;
  }, [search, allBookIds, normalizedBooks]);

  const bookStats = useMemo(() => {
    const stats = {
      total: allBookIds.length,
      filtered: filteredBookIds.length,
      searchActive: !!search.trim(),
      favorites: favoriteBookIds.length,
    };
    return stats;
  }, [allBookIds, filteredBookIds, search, favoriteBookIds]);

  return (
    <View style={styles.flex1}>
      <TextInput
        value={search}
        onChangeText={text => {
          setSearch(text);
        }}
        placeholder="Search by book or author"
        style={styles.input}
        testID="search-input"
      />
      <Text style={styles.centered}>
        Showing {bookStats.filtered} of {bookStats.total} books | ❤️{' '}
        {bookStats.favorites} favorites
      </Text>
      <FlatList
        data={filteredBookIds}
        renderItem={renderItem}
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
