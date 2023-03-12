import { StatusBar } from "expo-status-bar";
import React, { FC } from "react";
// @ts-ignore
import styled from "styled-components/native";
import CreateLink from "./CreateLink";

const Container = styled.View`
  flex: 1;
  background-color: transparent;
  background-color: ${(props: any) => props.theme.background};
`;

interface Props {
  children: React.ReactNode;
}

const ScreenLayout: FC<Props> = ({ children }) => {
  return (
    <Container>
      <StatusBar style="auto" />
      {children}
      <CreateLink />
    </Container>
  );
};

export default ScreenLayout;
