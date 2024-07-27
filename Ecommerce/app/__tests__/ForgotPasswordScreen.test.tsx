import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TEXT } from '../../constants/Text';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';


describe('ForgotPasswordScreen', () => {
  it('check all Text renders correctly and navigates on button press', () => {
    const navigateMock = jest.fn();
    const { getByText, getByPlaceholderText } = render(<ForgotPasswordScreen navigation={{ navigate: navigateMock }} />);
    
   
    expect(getByText(TEXT.FORGOT_PASSWORD)).toBeTruthy();
    

    const inputField = getByPlaceholderText(TEXT.ENTER_EMAIL);
    expect(inputField).toBeTruthy();
    

    const button = getByText(TEXT.CONTINUE);
    expect(button).toBeTruthy();
    
    fireEvent.press(button);
    expect(navigateMock).toHaveBeenCalledWith("EmailForResetPasswordScreen");
  });
});
