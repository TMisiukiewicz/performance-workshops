import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './store';
import DevPanel from './components/DevPanel';

const Stack = createNativeStackNavigator();

export default function App() {
  const [devPanelVisible, setDevPanelVisible] = useState(false);

  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Start">
            <Stack.Screen name="Start" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        {/* Floating Debug Button */}
        <TouchableOpacity
          style={appStyles.fab}
          onPress={() => setDevPanelVisible(true)}
          activeOpacity={0.7}>
          <Text style={appStyles.fabIcon}>🐞</Text>
        </TouchableOpacity>
        {/* Dev Panel */}
        <DevPanel
          visible={devPanelVisible}
          onClose={() => setDevPanelVisible(false)}
        />
      </View>
    </Provider>
  );
}

const appStyles = StyleSheet.create({
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
});
