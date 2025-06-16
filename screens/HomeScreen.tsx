import React, {useState} from 'react';
import {View, Text, Button, FlatList, Image, TextInput} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const bigData = Array.from({length: 1000}, (_, i) => ({
  id: i.toString(),
  title: `Item ${i}`,
  image: 'https://picsum.photos/600/400?random=' + i,
}));

export default function HomeScreen({navigation}: Props) {
  const [search, setSearch] = useState('');
  const [count, setCount] = useState(0);

  // Heavy computation in render
  let sum = 0;
  for (let i = 0; i < 10000000; i++) {
    sum += i;
  }

  return (
    <View style={{flex: 1}}>
      <Text style={{fontSize: 24, textAlign: 'center', margin: 8}}>
        Home Screen
      </Text>
      <TextInput
        value={search}
        onChangeText={text => {
          setSearch(text);
          setCount(count + 1); // Unnecessary state update
        }}
        placeholder="Search (does nothing, but triggers re-render)"
        style={{borderWidth: 1, margin: 8, padding: 8}}
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
        data={bigData}
        renderItem={({item}) => (
          <View style={{flexDirection: 'row', alignItems: 'center', margin: 8}}>
            <Image
              source={{uri: item.image}}
              style={{width: 120, height: 80, marginRight: 12}}
            />
            <Text>{item.title}</Text>
            <Button title="Inc" onPress={() => setCount(count + 1)} />
          </View>
        )}
        // No keyExtractor, no getItemLayout, no memoization, inline renderItem
      />
      <Text style={{textAlign: 'center', margin: 8}}>Sum: {sum}</Text>
      <Text style={{textAlign: 'center', margin: 8}}>Count: {count}</Text>
    </View>
  );
}
