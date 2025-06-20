import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../screens/types';

type HeaderMenuNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HeaderMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation<HeaderMenuNavigationProp>();

  return (
    <View>
      <TouchableOpacity
        style={styles.headerButton}
        onPress={() => setMenuVisible(true)}
        activeOpacity={0.7}>
        <Text style={styles.headerButtonText}>⋯</Text>
      </TouchableOpacity>
      {menuVisible && (
        <Modal
          transparent
          visible={menuVisible}
          onRequestClose={() => setMenuVisible(false)}>
          <Pressable
            style={styles.menuOverlay}
            onPress={() => setMenuVisible(false)}>
            <View style={styles.menuContainer}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setMenuVisible(false);
                  navigation.navigate('Settings');
                }}>
                <Text style={styles.menuItemText}>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setMenuVisible(false);
                  navigation.navigate('Profile');
                }}>
                <Text style={styles.menuItemText}>Favorites</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerButton: {
    padding: 8,
    marginRight: 4,
  },
  headerButtonText: {
    fontSize: 24,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 100,
    paddingRight: 16,
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    minWidth: 120,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
    elevation: 8,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemText: {
    fontSize: 16,
    color: '#222',
  },
});

export default HeaderMenu;
