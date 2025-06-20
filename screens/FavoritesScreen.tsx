import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useAppSelector} from '../hooks';
import BookListItem from '../components/BookListItem';

const FavoritesScreen = () => {
  const favoriteBookIds = useAppSelector(
    state => state.favorites.favoriteBookIds,
  );

  if (favoriteBookIds.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>💔</Text>
        <Text style={styles.emptyTitle}>No favorites yet</Text>
        <Text style={styles.emptySubtitle}>
          Tap the heart icon on any book to add it to your favorites
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Your Favorites ({favoriteBookIds.length})
      </Text>
      <FlatList
        data={favoriteBookIds}
        renderItem={({item}) => <BookListItem id={item} />}
        keyExtractor={item => item}
        contentContainerStyle={{paddingVertical: 8}}
      />
    </View>
  );
};

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

export default FavoritesScreen;
