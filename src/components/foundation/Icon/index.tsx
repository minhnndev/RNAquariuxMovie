import React from 'react';
import {Platform, View, StyleSheet, Pressable} from 'react-native';
import {IconProps} from './types';
import getIconType from './utils/getIconType';
import getIconStyle from './utils/getIconStyle';

export const Icon: React.FC<IconProps> = ({
  type = 'Ionicons',
  name,
  size = 24,
  color,
  iconStyle,
  iconProps,
  shadow = false,
  containerStyle,
  disabled = false,
  disabledStyle,
  onPress,
  onLongPress,
  Component = onPress || onLongPress ? Pressable : View,
  solid = false,
  brand = false,
  ...rest
}) => {
  const IconComponent = getIconType(type);
  const iconSpecificStyle = getIconStyle(type, {solid, brand});

  const buttonStyles = React.useMemo(
    () => ({
      borderRadius: size + 4,
      height: size * 2 + 4,
      width: size * 2 + 4,
    }),
    [size],
  );

  return (
    <View
      style={StyleSheet.flatten([
        !shadow && styles.container,
        shadow && styles.button,
        shadow && buttonStyles,
        shadow && styles.shadow,
        iconStyle && iconStyle.borderRadius
          ? {
              borderRadius: iconStyle.borderRadius,
            }
          : {},
        containerStyle && containerStyle,
      ])}>
      <Component
        {...{
          onPress,
          onLongPress,
          disabled,
          accessibilityRole: 'button',
          ...rest,
        }}>
        <View
          style={StyleSheet.flatten([
            shadow && buttonStyles,
            {
              backgroundColor: 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
            },
            disabled && styles.disabled,
            disabled && disabledStyle,
          ])}>
          <IconComponent
            style={StyleSheet.flatten([
              {backgroundColor: 'transparent'},
              iconStyle && iconStyle,
            ])}
            size={size}
            name={name}
            color={color}
            {...iconSpecificStyle}
            {...iconProps}
          />
        </View>
      </Component>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  button: {
    margin: 6,
  },
  shadow: {
    ...Platform.select({
      android: {
        elevation: 2,
      },
      default: {
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: {height: 1, width: 1},
        shadowOpacity: 1,
        shadowRadius: 1,
      },
    }),
  },
  disabled: {
    backgroundColor: '#D1D5D8',
  },
});
