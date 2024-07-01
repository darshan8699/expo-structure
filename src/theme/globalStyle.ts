import {Platform, StyleSheet} from 'react-native';
import {moderateScale} from '../utils/metrics';
import { colors } from '../theme/colors';

export const GlobalStyles = StyleSheet.create({
  textShadow: {
    fontSize: moderateScale(20),
    textShadowColor: colors.shadowColor,
    textShadowOffset: {width: 0.5, height: 3.5},
    textShadowRadius: Platform.OS === 'ios' ? 3 : 5,
    color: colors.white,
  },
});
