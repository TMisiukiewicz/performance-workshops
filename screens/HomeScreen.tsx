import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TextInput,
  StyleSheet,
} from 'react-native';
import {useAppSelector} from '../hooks';
import {
  selectBookById,
  selectAuthorById,
  selectCommentsByBookId,
} from '../store';

const booksIDsToDisplay = Array.from({length: 3500}, (_, i) =>
  i.toString(),
).sort(() => Math.random() - 0.5);

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
        <Text style={styles.comment}>
          {lastComment?.author}: {lastComment?.content?.slice(0, 30)}
          {lastComment?.content?.length > 30 ? '…' : ''}
        </Text>
      </View>
    </View>
  );
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  return (
    <View style={styles.flex1}>
      <Text style={styles.title}>Home Screen</Text>
      <TextInput
        value={search}
        onChangeText={text => {
          setSearch(text);
        }}
        placeholder="Search (does nothing, but triggers re-render)"
        style={styles.input}
      />
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
      />
      <FlatList
        data={booksIDsToDisplay}
        renderItem={({item}) => <BookListItem id={item} />}
        keyExtractor={item => item}
        contentContainerStyle={{paddingVertical: 8}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex1: {flex: 1},
  input: {borderWidth: 1, margin: 8, padding: 8},
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
