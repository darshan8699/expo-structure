import {StyleSheet} from 'react-native';

const font = StyleSheet.create({
  banner1: {
    fontFamily: 'Medium',
    fontSize: 64,
    letterSpacing: -0.32, //convert em to px
    lineHeight: 64,
  },
  banner2: {
    fontFamily: 'Medium',
    fontSize: 56,
    letterSpacing: -0.32,
    lineHeight: 56,
  },
  h1: {
    fontFamily: 'Medium',
    fontSize: 48,
    letterSpacing: -0.32,
    lineHeight: 48,
  },
  h2: {
    fontFamily: 'Medium',
    fontSize: 32,
    letterSpacing: -0.32,
    lineHeight: 32,
  },
  h3: {
    fontFamily: 'Medium',
    fontSize: 24,
    letterSpacing: -0.32,
    lineHeight: 29,
  },
  h4: {
    fontFamily: 'Medium',
    fontSize: 18,
    letterSpacing: -0.32,
    lineHeight: 21,
  },
  bodyBold: {
    fontFamily: 'Medium',
    fontSize: 16,
    lineHeight: 21,
  },
  body: {
    fontFamily: 'Normal',
    fontSize: 16,
    lineHeight: 21,
  },
  smallBody: {
    fontFamily: 'Normal',
    fontSize: 14,
    lineHeight: 18,
  },
  microcopyBold: {
    fontFamily: 'Medium',
    fontSize: 13,
    lineHeight: 16,
  },
  microcopy: {
    fontFamily: 'Normal',
    fontSize: 13,
    lineHeight: 16,
  },
  bodyCopy: {
    fontFamily: 'Medium',
    fontSize: 11,
    lineHeight: 13.2,
  },
});

export default font;
