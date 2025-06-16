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
import {useAppSelector, useAppDispatch} from '../hooks';
import {selectCount, increment, selectBookById} from '../store';

const booksIDsToDisplay = Array.from({length: 3500}, (_, i) =>
  i.toString(),
).sort(() => Math.random() - 0.5);

const ListItem = ({id}: {id: string}) => {
  const book = useAppSelector(state => selectBookById(state, id));
  return (
    <View style={styles.row}>
      <Text>{book?.title}</Text>
    </View>
  );
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.flex1}>
      <Text style={styles.title}>Home Screen</Text>
      <TextInput
        value={search}
        onChangeText={text => {
          setSearch(text);
          dispatch(increment());
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
        renderItem={({item}) => <ListItem id={item} />}
        // No keyExtractor, no getItemLayout, no memoization, inline renderItem
      />
      <Text style={styles.centered}>Count: {count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  flex1: {flex: 1},
  title: {fontSize: 24, textAlign: 'center', margin: 8},
  input: {borderWidth: 1, margin: 8, padding: 8},
  row: {flexDirection: 'row', alignItems: 'center', margin: 8},
  image: {width: 120, height: 80, marginRight: 12},
  centered: {textAlign: 'center', margin: 8},
});
