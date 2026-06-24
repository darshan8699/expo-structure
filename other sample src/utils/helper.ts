// import notifee from '@notifee/react-native';
import Toast from 'react-native-root-toast';
import {Routes} from '../routes/types';
import {setIsAuthenticated} from './GlobalState';
import {Keys, removeString} from './Storage';
import {colors} from '../theme/colors';

export function showErrorMessage(message: string) {
  try {
    let toast = Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      textColor: colors.white,
      backgroundColor: colors.red,
      opacity: 1,
    });
    setTimeout(function () {
      Toast.hide(toast);
    }, 3000);
  } catch (e) {
    console.log(e);
  }
}

export function showSuccessMessage(message: string) {
  try {
    let toast = Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      textColor: colors.white,
      backgroundColor: colors.green,
      opacity: 1,
    });
    setTimeout(function () {
      Toast.hide(toast);
    }, 3000);
  } catch (e) {
    console.log(e);
  }
}

export function capitalizeFirstLetter(string: string) {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } else {
    return '';
  }
}

export const callLogoutRedirectToLogin = async (navigation: any) => {
  await removeString(Keys.TOKEN);
  await removeString(Keys.DEVICE_TOKEN);
  navigation.reset({
    index: 0,
    routes: [{name: Routes.Login}],
  });
  await setIsAuthenticated(false, true);
  //  notifee.setBadgeCount(0);
};
