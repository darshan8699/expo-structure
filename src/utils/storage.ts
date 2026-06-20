import AsyncStorage from '@react-native-async-storage/async-storage';

export const Keys = {
  IS_AUTHENTICATED: 'isAuthenticated',
  IS_ONBOARDING: 'isOnboarding',
  JWT_TOKEN: 'jwtToken',
  DEVICE_TOKEN: 'deviceToken',
  ENVIRONMENT: 'environment',
  LOGIN_ATTEMPT: 'loginAttempt',
};

export async function storeString(key: string, value: string) {
  await AsyncStorage.setItem(key, value);
}

export async function readString(key: string) {
  const token = await AsyncStorage.getItem(key);
  if (token) {
    return token;
  }
  return null;
}

export async function removeString(key: string) {
  return AsyncStorage.removeItem(key);
}
