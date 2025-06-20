import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StartScreen from './screens/StartScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {useAppSelector, useAppDispatch} from './hooks';
import {
  store,
  selectFabEnabled,
  setFabEnabled,
  setFavoriteBookIds,
} from './store';
import DevPanel from './components/DevPanel';
import HeaderMenu from './components/HeaderMenu';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

function AppContent() {
  const [devPanelVisible, setDevPanelVisible] = useState(false);
  const fabEnabled = useAppSelector(selectFabEnabled);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadSettings = async () => {
      try {
        // Load FAB setting
        const savedFabSetting = await AsyncStorage.getItem('fabEnabled');
        if (savedFabSetting !== null) {
          dispatch(setFabEnabled(JSON.parse(savedFabSetting)));
        }

        // Load favorite books
        const savedFavorites = await AsyncStorage.getItem('favoriteBookIds');
        if (savedFavorites !== null) {
          dispatch(setFavoriteBookIds(JSON.parse(savedFavorites)));
        }
      } catch (error) {
        console.log('Error loading settings:', error);
      }
    };
    loadSettings();
  }, [dispatch]);

  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen
            name="Start"
            component={StartScreen}
            options={{
              title: 'Performance Workshop',
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Books',
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      {/* Floating Debug Button - only show if enabled */}
      {fabEnabled && (
        <TouchableOpacity
          style={appStyles.fab}
          onPress={() => setDevPanelVisible(true)}
          activeOpacity={0.7}>
          <Text style={appStyles.fabIcon}>🐞</Text>
        </TouchableOpacity>
      )}
      {/* Dev Panel */}
      <DevPanel
        visible={devPanelVisible}
        onClose={() => setDevPanelVisible(false)}
      />
    </View>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
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
