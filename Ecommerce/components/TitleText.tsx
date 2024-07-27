// components/TitleText.tsx
import { Text, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors'

interface TitleTextProps {
  children: React.ReactNode;
  style?: object;
}

export const TitleText: React.FC<TitleTextProps> = ({ children, style }) => {
  return <Text style={[styles.title, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.BLACK100,
  },
});

export default TitleText;