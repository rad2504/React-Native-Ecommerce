import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import { TEXT } from '@/constants/Text';
import SurveyScreen from '../screens/SurveyScreen';

describe('SurveyScreen', () => {
  const mockNavigate = jest.fn();

  const setup = (routeParams = {}) => {
    return render(
      <SurveyScreen
        navigation={{ navigate: mockNavigate }}
        route={{ params: routeParams }}
      />
    );
  };

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('check all Text renders correctly', () => {
    const { getByText } = setup();

    expect(getByText(TEXT.ABOUT_YOURSELF)).toBeTruthy();
    expect(getByText(TEXT.SHOP_FOR)).toBeTruthy();
    expect(getByText(TEXT.OLD)).toBeTruthy();
    expect(getByText(TEXT.FINISH)).toBeTruthy();
  });

  it('navigates to ShopScreen when Finish button is pressed with gender selected', () => {
    const { getByText } = setup();
    const menButton = getByText(TEXT.MEN);
    const finishButton = getByText(TEXT.FINISH);

    fireEvent.press(menButton);
    fireEvent.press(finishButton);
    expect(mockNavigate).toHaveBeenCalledWith('ShopScreen', { selectedGender: 'Men' });
  });

  it('does not navigate when Finish button is pressed without gender selected', () => {
    const { getByText } = setup();
    const finishButton = getByText(TEXT.FINISH);

    fireEvent.press(finishButton);
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
