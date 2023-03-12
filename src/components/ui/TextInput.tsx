import hexToRgba from "hex-to-rgba";
import React, { FC } from "react";
import { TextInputProps, ActivityIndicator } from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useThemeContext } from "../../theme/themContext";
import { spacing } from "../../constants/dimensions";

const Input = styled.TextInput`
  width: 100%;
  padding: ${spacing.sm}px;
  color: ${({ theme }: any) => hexToRgba(theme.text, 0.85)};
  flex: 1;
`;

const Controls = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 ${spacing.sm}px;
`;

const View = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  border: 1px solid ${({ theme }: any) => hexToRgba(theme.background, 0.85)};
  background-color: ${({ theme }: any) => hexToRgba(theme.background, 0.85)};
  height: 45px;
  margin-bottom: ${spacing.sm}px;
`;

const InputIcon = styled(Icon)`
  position: absolute;
  left: ${spacing.md * 0.75}px;
`;

const CancelPressable = styled.Pressable`
  padding: 7.5px;
`;

interface InputProps extends TextInputProps {
  isLoading?: boolean;
  icon?: string;
}

const TextInput: FC<InputProps> = (props) => {
  const [value, setValue] = React.useState<string>(props.value || "");
  const handleTextChange = (text: string) => {
    props.onChangeText && props.onChangeText(text);
    setValue(text);
  };

  const theme = useThemeContext();

  return (
    <View>
      {props?.icon && (
        <InputIcon name={props.icon} size={15} color={hexToRgba(theme.text, 0.5)} />
      )}
      <Input
        {...props}
        onChangeText={handleTextChange}
        value={value}
        style={props?.icon ? { paddingLeft: spacing.xxl } : {}}
      />
      <Controls>
        {value && (
          <CancelPressable onPress={() => handleTextChange("")}>
            <Icon name="close" size={15} color={hexToRgba(theme.text, 0.5)} />
          </CancelPressable>
        )}

        {props?.isLoading && <ActivityIndicator size="small" />}
      </Controls>
    </View>
  );
};

export default TextInput;
