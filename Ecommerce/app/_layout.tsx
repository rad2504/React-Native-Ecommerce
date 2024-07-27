import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useColorScheme } from '@/hooks/useColorScheme';
import CreateAccountScreen from './screens/CreateAccountScreen';
import EmailForResetPasswordScreen from './screens/EmailForResetPasswordScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import PasswordSignInScreen from './screens/PasswordSignInScreen';
import SignInScreen from './screens/SignInScreen';
import SurveyScreen from './screens/SurveyScreen';
import AllProductsScreen from './screens/AllProductsScreen';
import { Product } from './models/Product';
import FavoritesScreen from './screens/FavoritesScreen';
import ShopScreen from './screens/ShopScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from './screens/ProfileScreen';
import NotificationScreen from './screens/NotificationsScreen';

// Define stack parameter list
export type RootStackParamList = {
  SignInScreen: undefined;
  PasswordSignInScreen: undefined;
  CreateAccountScreen: undefined;
  ForgotPasswordScreen: undefined;
  EmailForResetPasswordScreen: undefined;
  SurveyScreen: undefined;
  ShopScreen: undefined;
  AllProductsScreen: { products: Product[] }; 
  FavoritesScreen: undefined
  NotificationsScreen: undefined
  ProfileScreen: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={ShopScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" color={color} size={size} />
          ),
        }} 
      />

       <Tab.Screen 
        name="Notifications" 
        component={NotificationScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" color={color} size={size} />
          ),
        }} 
      />
       <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }} 
      />
    </Tab.Navigator>
    
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="SignInScreen">
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="PasswordSignInScreen" component={PasswordSignInScreen} />
          <Stack.Screen name="CreateAccountScreen" component={CreateAccountScreen} />
          <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
          <Stack.Screen name="EmailForResetPasswordScreen" component={EmailForResetPasswordScreen} />
          <Stack.Screen name="SurveyScreen" component={SurveyScreen} />
          <Stack.Screen name="ShopScreen" component={TabNavigator} />
          <Stack.Screen name="AllProductsScreen" component={AllProductsScreen} />
          <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
