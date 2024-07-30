import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TEXT } from '@/constants/Text';
import PasswordSignInScreen from '../screens/PasswordSignInScreen';
import '@testing-library/jest-native/extend-expect';

describe('PasswordSignInScreen', () => {
  const mockNavigate = jest.fn();

  const setup = (routeParams = {}) => {
    return render(
      <PasswordSignInScreen
        navigation={{ navigate: mockNavigate }}
        route={{ params: routeParams }} 
      />
    );
  };

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('Check all Text renders correctly', () => {
    const { getByPlaceholderText, getByText } = setup();

    expect(getByText(TEXT.SIGN_IN)).toBeTruthy();
    expect(getByPlaceholderText(TEXT.PASSWORD)).toBeTruthy();
    expect(getByText(TEXT.CONTINUE)).toBeTruthy();
    expect(getByText(TEXT.RESET)).toBeTruthy();
  });

  it('enables the Continue button when the password is not empty', () => {
    const { getByPlaceholderText, getByText } = setup();
    const passwordInput = getByPlaceholderText(TEXT.PASSWORD);
    const continueButton = getByText(TEXT.CONTINUE);

    fireEvent.changeText(passwordInput, 'password123');
    expect(continueButton).not.toBeDisabled();
  });

  it('navigates to ForgotPasswordScreen when Reset link is pressed', () => {
    const { getByText } = setup();
    const resetLink = getByText(TEXT.RESET);

    fireEvent.press(resetLink);
    expect(mockNavigate).toHaveBeenCalledWith('ForgotPasswordScreen');
  });
});
