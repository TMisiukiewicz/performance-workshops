import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const StartScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.centered}>
      <Text style={styles.emoji}>🚀</Text>
      <Text style={styles.title}>Performance Workshop</Text>
      <Text style={styles.subtitle}>Welcome! Ready to break React Native?</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
  },
  emoji: {fontSize: 64, marginBottom: 16},
  title: {fontSize: 28, fontWeight: 'bold', color: '#222', marginBottom: 8},
  subtitle: {fontSize: 16, color: '#666', marginBottom: 32},
  button: {
    backgroundColor: '#222',
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 32,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  buttonText: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
});

export default StartScreen;
