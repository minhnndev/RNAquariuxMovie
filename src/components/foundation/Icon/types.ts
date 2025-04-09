import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {
  IconButtonProps,
  IconProps as VectorIconProps,
} from 'react-native-vector-icons/Icon';

export type IconType =
  | 'Zocial'
  | 'Octicons'
  | 'Material'
  | 'MaterialCommunityIcons'
  | 'Ionicons'
  | 'Foundation'
  | 'EvilIcons'
  | 'Entypo'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'SimpleLineIcons'
  | 'Feather'
  | 'AntDesign'
  | 'Fontisto'
  | string;

export interface IconObject {
  /** Name of icon. */
  name?: string;

  /** Color of icon. */
  color?: string;

  /** Size of icon. */
  size?: number;

  /** Type of icon */
  type?: IconType;

  /** Apply style to the icon using iconStyle. */
  iconStyle?: StyleProp<TextStyle>;
}

export interface IconProps extends IconButtonProps {
  /** Type of icon set. [Supported sets here](#available-icon-sets). */
  type?: IconType;

  /** Update React Native Component.
   *  @default `Press handlers present then Pressable else View`
   */

  Component?: React.ComponentType<any>;

  /** Adds box shadow to button. */
  shadow?: boolean;

  /** Add styling to container holding icon. */
  containerStyle?: StyleProp<ViewStyle>;

  /** Provide all props from react-native Icon component. */
  iconProps?: VectorIconProps;

  /** Disables onPress events. Only works when `onPress` has a handler. */
  disabled?: boolean;

  /** Style for the button when disabled. Only works when `onPress` has a handler. */
  disabledStyle?: StyleProp<ViewStyle>;

  /** Uses the solid font. */
  solid?: boolean;

  /** Uses the brands font (FontAwesome5 only). */
  brand?: boolean;

  /** Theme for the icon. */
  theme?: any;
}

export type IconNode = boolean | React.ReactElement<{}> | Partial<IconProps>;
