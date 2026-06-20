import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const scale = (size: any) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: any) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: any, factor = 1) =>
  size + (scale(size) - size) * factor;

// Platform
export const PLATFORM = {
  IOS: Platform.OS === 'ios',
  ANDROID: Platform.OS === 'android',
};
export const TABLET = Dimensions.get('window').width >= 768;

// Mode
export const LANDSCAPE = 'landscape';
export const PORTRAIT = 'portrait';
export const ORIENTATION = () => {
  return width > height ? LANDSCAPE : PORTRAIT;
};

export {scale, verticalScale, moderateScale, width, height};
