import hexToRgba from 'hex-to-rgba';
import React, { useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';

const Container = styled(View)`
  position: relative;
  width: 100%;
  margin-bottom: 10px;
`;

const SelectButton = styled(TouchableOpacity)`
  padding: 12px;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${({ theme }: any) => hexToRgba(theme.text, 0.25)};
  height: 50px;
  justify-content: center;
`;

const SelectText = styled(Text)`
  font-size: 16px;
  color: ${({ theme }: any) => hexToRgba(theme.text, 0.85)};
`;

const DropdownContainer = styled(View)`
  z-index: 999;
  border-radius: 4px;
  border: 1px solid ${({ theme }: any) => hexToRgba(theme.text, 0.25)};
  padding: 8px;
`;

const DropdownItem = styled(TouchableOpacity)`
  padding: 8px;
`;

const DropdownItemText = styled(Text)`
  font-size: 16px;
  color: #333;
`;

type Option = {
  label: string;
  value: string;
};

type DropdownSelectProps = {
  options: Option[];
  onSelect: (value: string) => void;
  placeholder?: string;
};

const DropdownSelect: React.FC<DropdownSelectProps> = ({ options, onSelect, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onSelect(value);
    setIsOpen(false);
  };

  const selectedLabel = options.find((option) => option.value === selectedValue)?.label || selectedValue;

  return (
    <Container>
      <SelectButton onPress={() => setIsOpen(!isOpen)}>
        <SelectText>{selectedLabel || placeholder || 'Select an option'}</SelectText>
      </SelectButton>
      {isOpen && (
        <DropdownContainer>
          {options.map((option) => (
            <DropdownItem key={option.value} onPress={() => handleSelect(option.value)}>
              <DropdownItemText>{option.label}</DropdownItemText>
            </DropdownItem>
          ))}
        </DropdownContainer>
      )}
    </Container>
  );
};

export default DropdownSelect;
