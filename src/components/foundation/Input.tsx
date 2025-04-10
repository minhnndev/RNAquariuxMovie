import {
  StyleSheet,
  TextInput,
  View,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React from 'react';
import {useAppTheme} from '@/utils/useAppTheme';
import type {ThemedStyle} from '../../theme';
import {spacing} from '@/theme/spacing';

interface InputProps extends TextInputProps {}

export const Input = ({
  placeholder,
  value,
  onChangeText,
  ...props
}: InputProps) => {
  const {themed} = useAppTheme();

  return (
    <View style={[styles.container, themed($inputContainer)]}>
      <TextInput
        style={[themed($input)]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
    </View>
  );
};

const $input: ThemedStyle<TextStyle> = ({colors}) => ({
  color: colors.text,
  borderColor: colors.border,
});

const $inputContainer: ThemedStyle<ViewStyle> = ({colors}) => ({
  borderColor: colors.border,
});

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
});
