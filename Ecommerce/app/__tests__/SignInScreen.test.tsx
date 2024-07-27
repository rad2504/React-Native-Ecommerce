import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { TEXT } from '../../constants/Text'
import SignInScreen from '../screens/SignInScreen';

const mockNavigate = jest.fn();

describe('SignInScreen', () => {
  const setup = () => {
    return render(<SignInScreen navigation={{ navigate: mockNavigate }} />);


  };

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('check all Text renders correctly', () => {
    const { getByText, getByPlaceholderText } = setup();

    expect(getByText(TEXT.SIGN_IN)).toBeTruthy();
    expect(getByPlaceholderText(TEXT.EMAIL_PLACEHOLDER)).toBeTruthy();
    expect(getByText(TEXT.CONTINUE)).toBeTruthy();
    expect(getByText(TEXT.CREATE_ONE)).toBeTruthy();
    expect(getByText(TEXT.CONTINUE_WITH_APPLE)).toBeTruthy();
    expect(getByText(TEXT.CONTINUE_WITH_GOOGLE)).toBeTruthy();
    expect(getByText(TEXT.CONTINUE_WITH_FACEBOOK)).toBeTruthy();
  });

  it('shows error message for invalid email', () => {
    const { getByPlaceholderText, getByText } = setup();
    
    const emailInput = getByPlaceholderText(TEXT.EMAIL_PLACEHOLDER);
    fireEvent.changeText(emailInput, 'invalid-email');
    
    expect(getByText(TEXT.ERROR_INVALID_EMAIL)).toBeTruthy();
  });

   it('shows error message when email is empty on Continue button press', () => {
    const { getByPlaceholderText, getByText } = setup();
    
    const emailInput = getByPlaceholderText(TEXT.EMAIL_PLACEHOLDER);
    fireEvent.changeText(emailInput, 'valid.email@example.com');
    
    const continueButton = getByText(TEXT.CONTINUE);
    fireEvent.press(continueButton);

    // Expect navigation to the PasswordSignInScreen with the email parameter
    expect(mockNavigate).toHaveBeenCalledWith('PasswordSignInScreen', { email: 'valid.email@example.com' });
  });

  it('navigates to CreateAccountScreen when Create Account link is pressed', () => {
    const { getByText } = setup();

    const createAccountLink = getByText(TEXT.CREATE_ONE);
    fireEvent.press(createAccountLink);
    expect(mockNavigate).toHaveBeenCalledWith('CreateAccountScreen');
  });

  it('handles social button presses', () => {
    const { getByText } = setup();

    const appleButton = getByText(TEXT.CONTINUE_WITH_APPLE);
    const googleButton = getByText(TEXT.CONTINUE_WITH_GOOGLE);
    const facebookButton = getByText(TEXT.CONTINUE_WITH_FACEBOOK);

    fireEvent.press(appleButton);
    fireEvent.press(googleButton);
    fireEvent.press(facebookButton);
  });
});
