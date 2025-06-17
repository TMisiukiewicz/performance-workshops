import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import {useAppSelector, useAppDispatch} from '../hooks';
import {selectFabEnabled, toggleFab} from '../store';

const SettingsScreen = () => {
  const dispatch = useAppDispatch();
  const fabEnabled = useAppSelector(selectFabEnabled);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.setting}>
        <Text style={styles.settingLabel}>Show Debug FAB</Text>
        <Switch
          value={fabEnabled}
          onValueChange={_value => {
            dispatch(toggleFab());
          }}
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={fabEnabled ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
});

export default SettingsScreen;
