import React from "react";
// @ts-ignore
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/FontAwesome";
import hexToRgba from "hex-to-rgba";
import { spacing } from "../../constants/dimensions";


const EmptyListContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const EmptyListText = styled.Text`
  color: ${({ theme }: any) => hexToRgba(theme.text, 0.75)};
  font-size: 16px;
  margin-top: ${spacing.md}px;
  text-align: center;
  width: 80%;
`;

const EmptyListIcon = styled.Image`
  width: 150px;
  height: 150px;
  opacity: 0.4;
`;

interface EmptyListProps {
  text?: string;
}

const EmptyList: React.FC<EmptyListProps> = ({ text }) => {
  const image = require("../../assets/empty-list.png");
  return (
    <EmptyListContainer>
      <EmptyListIcon
        source={image}
      />
      <EmptyListText>{text || "No items to show."}</EmptyListText>
    </EmptyListContainer>
  );
};

export default EmptyList;
