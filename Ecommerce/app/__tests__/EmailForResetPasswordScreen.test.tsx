import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TEXT } from '../../constants/Text';
import EmailForResetPasswordScreen from '../screens/EmailForResetPasswordScreen';

const mockNavigate = jest.fn();

describe('EmailForResetPasswordScreen', () => {
  it('check all Text renders correctly and navigates on button press', () => {
    const { getByText } = render(
      <EmailForResetPasswordScreen navigation={{ navigate: mockNavigate }} />
    );

    expect(getByText(TEXT.SENT_EMAIL)).toBeTruthy();

    const button = getByText(TEXT.RETURN_LOGIN);
    expect(button).toBeTruthy();

    fireEvent.press(button);
    expect(mockNavigate).toHaveBeenCalledWith("SignInScreen");
  });
});
