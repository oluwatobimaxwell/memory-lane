import hexToRgba from 'hex-to-rgba';
import React from 'react';
import { TouchableOpacity } from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';
import { spacing } from '../constants/dimensions';

interface FloatingButtonProps {
  onPress: () => void;
  children: React.ReactNode;
}

const FloatingButtonContainer = styled.View`
  position: absolute;
  bottom: ${spacing.md + 80}px;
  right: ${spacing.md}px;
  background-color: ${(props: any) => props.theme.text};
  width: 45px;
  height: 45px;
  border-radius: 30px;
  overflow: hidden;
`;

const FloatingButton = styled(TouchableOpacity)`
  background-color: ${(props: any) => hexToRgba(props.theme.background, 0.8)};
  justify-content: center;
  align-items: center;
  width: 45px;
    height: 45px;
`;

const FloatingButtonText = styled.Text`
  color: white;
  font-size: 24px;
`;

const FloatingButtonComponent: React.FC<FloatingButtonProps> = ({ onPress, children }) => {
  return (
    <FloatingButtonContainer>
      <FloatingButton onPress={onPress}>
        <FloatingButtonText>{children}</FloatingButtonText>
      </FloatingButton>
    </FloatingButtonContainer>
  );
};

export default FloatingButtonComponent;
