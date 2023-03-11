import hexToRgba from "hex-to-rgba";
import React from "react";
import { FlatList, Image, ListRenderItem, Text, View } from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import { WebsiteGroup } from "../data/Database";
import { extractWebsiteName } from "../utils/extractWebsiteName";
import { Container } from "./ui";

  

const WebsiteContainer = styled(Container)`
  flex: 1;
  align-items: left;
  justify-content: center;
  padding: 16px;
  border-radius: 8px;
  margin: 8px;
`;

const WebsiteImage = styled.Image`
  width: 20px;
  height: 20px;
`;

const IconWrapper = styled.View`
    width: 45px;
    height: 45px;
    border-radius: 10px;
    background-color: ${({ theme }: any) => hexToRgba(theme.background, 0.35)};
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
`;

const WebsiteTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
  color: ${({ theme }: any) => theme.text};
  text-transform: capitalize;
`;

const WebsiteNumLinks = styled.Text`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }: any) => hexToRgba(theme.text, 0.5)};
`;

const WebsitesGrid = styled.FlatList``;

const Website: React.FC<WebsiteGroup> = ({ title, favicon, count }) => {
  return (
    <WebsiteContainer>
        <IconWrapper>
            <WebsiteImage source={{ uri: favicon }} />
        </IconWrapper>
      <WebsiteTitle numberOfLines={1}>{title}</WebsiteTitle>
      <WebsiteNumLinks>{`${count} links saved`}</WebsiteNumLinks>
    </WebsiteContainer>
  );
};

interface Props {
  websites: WebsiteGroup[];
}

const WebsitesGridComponent: React.FC<Props> = ({ websites }) => {

  const renderWebsiteTile: ListRenderItem<WebsiteGroup> = ({ item }) => {
    return (
      <Website title={extractWebsiteName(item.title)} favicon={item.favicon} count={item.count} />
    );
  };

  return (
    <FlatList
      data={websites}
      renderItem={renderWebsiteTile}
      numColumns={2}
      contentContainerStyle={{
        justifyContent: "space-between",
        padding: 8,
      }}
    />
  );
};

export default WebsitesGridComponent;
