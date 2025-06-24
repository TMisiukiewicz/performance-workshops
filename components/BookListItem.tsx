import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useAppDispatch} from '../hooks';
import {toggleFavorite, NormalizedBook} from '../store';
import {formatDate} from '../utils';

interface BookListItemProps {
  book: NormalizedBook | undefined;
  isFavorite: boolean;
}

const BookListItem = ({book, isFavorite}: BookListItemProps) => {
  const dispatch = useAppDispatch();

  const handleToggleFavorite = () => {
    if (book) {
      dispatch(toggleFavorite(book.id));
    }
  };

  if (!book) {
    return null;
  }

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.authorName}</Text>
        <Text style={styles.date}>
          Published:{' '}
          {book.publishedDate ? formatDate(book.publishedDate) : 'Unknown'}
        </Text>
        <Text style={styles.lastRead}>
          Last read: {book.lastRead ? formatDate(book.lastRead) : 'Never'}
        </Text>
        <Text style={styles.comment}>
          {book.lastComment?.author}: {book.lastComment?.content?.slice(0, 30)}
          {(book.lastComment?.content?.length || 0) > 30 ? '…' : ''}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={handleToggleFavorite}>
        <Text style={styles.favoriteIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
    alignItems: 'center',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  author: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  lastRead: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  comment: {
    fontSize: 13,
    color: '#444',
    fontStyle: 'italic',
    backgroundColor: '#f6f6f6',
    padding: 6,
    borderRadius: 6,
  },
  favoriteButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteIcon: {
    fontSize: 20,
  },
});

export default React.memo(BookListItem);
