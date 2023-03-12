import hexToRgba from "hex-to-rgba";
import React, { useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import { spacing } from "../../constants/dimensions";

const Container = styled(View)`
  position: relative;
  width: 100%;
  margin-bottom: ${spacing.md}px;
`;

const SelectButton = styled(TouchableOpacity)`
  padding: 12px;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${({ theme }: any) => hexToRgba(theme.background, 0.85)};
  background-color: ${({ theme }: any) => hexToRgba(theme.background, 0.85)};
  height: 45px;
  justify-content: center;
`;

const SelectText = styled(Text)`
  font-size: 16px;
  color: ${({ theme }: any) => hexToRgba(theme.text, 0.85)};
`;

const DropdownContainer = styled(View)`
  z-index: 999;
  border-radius: 4px;
  background-color: ${({ theme }: any) => hexToRgba(theme.background, 0.35)};
`;

const DropdownItem = styled(TouchableOpacity)`
  padding: 8px;
  border-bottom-width: ${({ borderWidth }: any) => borderWidth || 0}px};
  border-bottom-color: ${({ theme }: any) => hexToRgba(theme.text, 0.05)};
`;

const DropdownItemText = styled(Text)`
  font-size: 14px;
  color: ${({ theme }: any) => hexToRgba(theme.text, 0.85)};
  padding: 7px;
`;
type Option = {
  label: string;
  value: string;
};

type DropdownSelectProps = {
  options: Option[];
  onSelect: (value: string) => void;
  placeholder?: string;
  value?: string;
};

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  options,
  onSelect,
  placeholder,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onSelect(value);
    setIsOpen(false);
  };

  const selectedLabel =
    options.find((option) => option.value === selectedValue)?.label ||
    selectedValue;

  return (
    <Container>
      <SelectButton onPress={() => setIsOpen(!isOpen)}>
        <SelectText>
          {selectedLabel || placeholder || "Select an option"}
        </SelectText>
      </SelectButton>
      {isOpen && (
        <DropdownContainer>
          {options.map((option, i) => (
            <DropdownItem
              key={option.value}
              onPress={() => handleSelect(option.value)}
              borderWidth={i === options.length - 1 ? 0 : 1}
            >
              <DropdownItemText>{option.label}</DropdownItemText>
            </DropdownItem>
          ))}
        </DropdownContainer>
      )}
    </Container>
  );
};

export default DropdownSelect;
