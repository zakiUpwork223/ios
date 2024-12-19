// src/screens/components/ToastCustom.js
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { colors, fontSizes } from '../../style';

const ToastCustom = ({ visible, message, type, duration = 3000 }) => { // Añadir default value para duration
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Desvanecer el toast después de la duración especificada
        setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }, duration); // Usar la duración proporcionada
      });
    }
  }, [visible, opacity, duration]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.toastContainer, { opacity, borderLeftColor: type === 'error' ? 'red' : 'green' }]}>
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 50,
    left: '10%',
    right: '10%',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 5,
    backgroundColor: colors.theriary,
    borderWidth: 0.5
  },
  toastText: {
    color: colors.primary,
    fontSize: fontSizes.small,
    fontWeight: '700',
  },
});

export default ToastCustom;
