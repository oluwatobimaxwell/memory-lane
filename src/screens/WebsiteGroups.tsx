import React from "react";
// @ts-ignore
import styled from "styled-components/native";
import WebsitesGridComponent from "../components/WebsiteGroups";
import { useGetWebsiteGroup } from "../data/useDatabase";

const Container = styled.View`
  flex: 1;
  background-color: ${(props: any) => props.theme.background};
`;

const WebsiteGroups = () => {
  const { data } = useGetWebsiteGroup();

  return (
    <Container>
      <WebsitesGridComponent websites={(data || []) as any} />
    </Container>
  );
};

export default WebsiteGroups;
