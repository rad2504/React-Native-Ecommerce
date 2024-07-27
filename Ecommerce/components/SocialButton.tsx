// components/SocialButton.tsx
import { Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors'

interface SocialButtonProps {
  onPress: () => void;
  imageSource: any;
  title: string;
}

export const SocialButton: React.FC<SocialButtonProps> = ({ onPress, imageSource, title }) => {
  return (
    <TouchableOpacity style={styles.socialButton} onPress={onPress}>
      <Image source={imageSource} style={styles.socialIcon} />
      <Text style={styles.socialButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  socialButton: {
    width: '100%',
    borderColor: Colors.BORDER,
    backgroundColor: Colors.INPUT_BACKGROUND,
    borderRadius: 25,
    marginBottom: 10,
    paddingVertical: 15,
    flexDirection: 'row',
  },
  socialIcon: {
    width: 22,
    height: 22,
    marginHorizontal: 10,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SocialButton;
