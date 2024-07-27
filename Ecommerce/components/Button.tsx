// components/Button.tsx
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors'


interface ButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ onPress, title, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled ? styles.buttonDisabled : null]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: Colors.BUTTON,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: Colors.BUTTON_DISABLED,
  },
});

export default Button;
