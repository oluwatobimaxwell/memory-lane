import React from "react";
// @ts-ignore
import styled from "styled-components/native";
import WebsitesGridComponent from "../components/WebsiteGroups";
import { useGetWebsiteGroup } from "../data/useDatabase";

const Container = styled.View`
  flex: 1;
  background-color: ${(props: any) => props.theme.background};
`;

const ScrollView = styled.ScrollView`
  padding: 10px;
`;

const PaddingView = styled.View`
  height: 90px;
`;

const WebsiteGroups = () => {
  const { data } = useGetWebsiteGroup();

  return (
    <Container>
      <WebsitesGridComponent websites={data || []} />
    </Container>
  );
};

export default WebsiteGroups;
