import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors'

export const NewTextInput: React.FC<TextInputProps> = (props) => {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor={Colors.TEXT_PRIMARY}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    borderColor: Colors.BORDER,
    borderRadius: 5,
    marginBottom: 20,
    padding: 10,
    fontSize: 16,
    backgroundColor: Colors.BACKGROUND_LIGHT2,
  },
});

export default NewTextInput;
