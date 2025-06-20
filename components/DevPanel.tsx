import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  Animated,
  Switch,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {startProfiling, stopProfiling} from 'react-native-release-profiler';

interface DevPanelProps {
  visible: boolean;
  onClose: () => void;
}

export default function DevPanel({visible, onClose}: DevPanelProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isProfiling, setIsProfiling] = useState(false);

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, fadeAnim]);

  const toggleProfiling = async () => {
    if (isProfiling) {
      // Stop profiling
      try {
        const profilePath = await stopProfiling(true);
        setIsProfiling(false);
        // Extract directory path without filename
        const dirPath = profilePath.substring(0, profilePath.lastIndexOf('/'));
        Clipboard.setString(dirPath);
        console.log(
          'Profiling stopped. Directory path copied to clipboard:',
          dirPath,
        );
      } catch (error) {
        console.error('Failed to stop profiling:', error);
      }
    } else {
      // Start profiling
      try {
        startProfiling();
        setIsProfiling(true);
        console.log('Profiling started');
      } catch (error) {
        console.error('Failed to start profiling:', error);
      }
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <Animated.View style={[styles.modalWrapper, {opacity: fadeAnim}]}>
      <Modal
        visible={visible}
        animationType="slide"
        transparent
        onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.devPanel}>
            <Text style={styles.devPanelTitle}>Dev Panel</Text>
            <Pressable style={styles.devPanelClose} onPress={onClose}>
              <Text style={{fontSize: 18}}>✕</Text>
            </Pressable>

            <View style={styles.profilingSection}>
              <Text style={styles.sectionTitle}>Performance Profiling</Text>

              <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>
                  {isProfiling ? '🔴 Recording' : '⚪ Stopped'}
                </Text>
                <Switch
                  value={isProfiling}
                  onValueChange={toggleProfiling}
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={isProfiling ? '#007AFF' : '#f4f3f4'}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  modalWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 1000,
  },
  modalOverlay: {
    flex: 1,
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
  profilingSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  switchLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});
