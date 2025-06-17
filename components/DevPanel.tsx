import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';

interface DevPanelProps {
  visible: boolean;
  onClose: () => void;
}

export default function DevPanel({visible, onClose}: DevPanelProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

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
            {/* Placeholder actions */}
            <TouchableOpacity style={styles.devPanelAction}>
              <Text>Placeholder Action 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.devPanelAction}>
              <Text>Placeholder Action 2</Text>
            </TouchableOpacity>
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
  devPanelAction: {
    paddingVertical: 12,
  },
});
