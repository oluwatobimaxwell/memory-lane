import React from "react";
// @ts-ignore
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/FontAwesome";

const EmptyListContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const EmptyListText = styled.Text`
  color: #ccc;
`;

const EmptyListIcon = styled(Icon)`
  font-size: 75px;
  color: ${(props: any) => props.theme.background};
`;

interface EmptyListProps {
  text?: string;
}

const EmptyList: React.FC<EmptyListProps> = ({ text }) => {
  return (
    <EmptyListContainer>
      <EmptyListIcon name="list-alt" />
      <EmptyListText>{text || "No items to show."}</EmptyListText>
    </EmptyListContainer>
  );
};

export default EmptyList;
