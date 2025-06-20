import React, {useState, useMemo} from 'react';
import {View, Text, FlatList, TextInput, StyleSheet} from 'react-native';
import {useAppSelector} from '../hooks';
import {
  selectBooks,
  selectAuthors,
  selectBookById,
  selectAuthorById,
  selectCommentsByBookId,
} from '../store';
import {formatDate} from '../utils';

const BookListItem = ({id}: {id: string}) => {
  const book = useAppSelector(state => selectBookById(state, id));
  const authorName = useAppSelector(
    state => selectAuthorById(state, book?.authorId ?? '')?.name,
  );
  const comments = useAppSelector(state => selectCommentsByBookId(state, id));
  const lastComment = comments[comments.length - 1];

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.title}>{book?.title}</Text>
        <Text style={styles.author}>{authorName}</Text>
        <Text style={styles.date}>
          Published:{' '}
          {book?.publishedDate ? formatDate(book.publishedDate) : 'Unknown'}
        </Text>
        <Text style={styles.lastRead}>
          Last read: {book?.lastRead ? formatDate(book.lastRead) : 'Never'}
        </Text>
        <Text style={styles.comment}>
          {lastComment?.author}: {lastComment?.content?.slice(0, 30)}
          {lastComment?.content?.length > 30 ? '…' : ''}
        </Text>
      </View>
    </View>
  );
};

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const books = useAppSelector(selectBooks);
  const authors = useAppSelector(selectAuthors);

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
      <FlatList
        data={filteredBookIds}
        renderItem={({item}) => <BookListItem id={item} />}
        keyExtractor={item => item}
        contentContainerStyle={{paddingVertical: 8}}
        initialNumToRender={1000}
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
    elevation: 3, // Android shadow
    alignItems: 'center',
  },
  cover: {
    width: 64,
    height: 96,
    borderRadius: 8,
    marginRight: 16,
    backgroundColor: '#eee',
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
  centered: {textAlign: 'center', margin: 8},
});
