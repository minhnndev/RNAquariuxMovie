import {Platform} from 'react-native';

const fonts = {
  spaceGrotesk: {
    light: 'SpaceGrotesk-Light',
    normal: 'SpaceGrotesk-Regular',
    medium: 'SpaceGrotesk-Medium',
    semiBold: 'SpaceGrotesk-SemiBold',
    bold: 'SpaceGrotesk-Bold',
  },
  helveticaNeue: {
    thin: 'HelveticaNeue-Thin',
    light: 'HelveticaNeue-Light',
    normal: 'HelveticaNeue-Regular',
    medium: 'HelveticaNeue-Medium',
  },
  courier: {
    normal: 'Courier',
  },
  sansSerif: {
    thin: 'sans-serif-thin',
    light: 'sans-serif-light',
    normal: 'sans-serif',
    medium: 'sans-serif-medium',
  },
  monospace: {
    normal: 'monospace',
  },
};

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.spaceGrotesk,
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: Platform.select({
    ios: fonts.helveticaNeue,
    android: fonts.sansSerif,
  }),
  /**
   * Lets get fancy with a monospace font!
   */
  code: Platform.select({ios: fonts.courier, android: fonts.monospace}),
};
