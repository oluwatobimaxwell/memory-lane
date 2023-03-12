import hexToRgba from "hex-to-rgba";
import React from "react";
import { FlatList, ListRenderItem } from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import { WebsiteGroup } from "../data/Database";
import { useNavigation } from "../navigation/useNavigatioin";
import EmptyList from "./PostFeeds/EmptyList";
import ScreenLayout from "./ScreenLayout";
import { Container } from "./ui";
import { spacing } from "../constants/dimensions";

const WebsiteContainer = styled(Container)`
  flex: 1;
  align-items: left;
  justify-content: center;
  padding: 16px;
  border-radius: 8px;
  ${({ isLast, isLeft }: any) =>
    !isLast &&
    `
    margin-right: ${isLeft ? spacing.sm : 0}px;
    margin-left: ${isLeft ? 0 : spacing.sm}px;
  `};
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

const EmptyListWrapper = styled.View`
  flex: 1;
`;

interface WebsiteProps extends WebsiteGroup {
  index: number;
  isLast: boolean;
}

const Website: React.FC<WebsiteProps> = ({
  title,
  favicon,
  count,
  index,
  isLast,
}) => {
  const { bottomNavigation } = useNavigation();
  return (
    <WebsiteContainer
      isLeft={index % 2 === 0}
      isLast={isLast}
      onPress={() => bottomNavigation.navigate("Links", { title })}
    >
      <IconWrapper>
        <WebsiteImage source={{ uri: favicon }} />
      </IconWrapper>
      <WebsiteTitle numberOfLines={1}>{title}</WebsiteTitle>
      <WebsiteNumLinks>{`${count} links saved`}</WebsiteNumLinks>
    </WebsiteContainer>
  );
};

interface Props {
  websites: WebsiteProps[];
}

const WebsitesGridComponent: React.FC<Props> = ({ websites }) => {
  const renderWebsiteTile: ListRenderItem<WebsiteProps> = ({ item, index }) => {
    return (
      <Website
        title={item.title}
        favicon={item.favicon}
        count={item.count}
        index={index}
        isLast={index === websites.length - 1 && websites.length % 2 === 1}
      />
    );
  };

  return (
    <ScreenLayout>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={websites}
        renderItem={renderWebsiteTile}
        numColumns={2}
        style={{
          padding: spacing.md,
        }}
        contentContainerStyle={{
          flex: 1,
        }}
        ListEmptyComponent={() => (
          <EmptyListWrapper>
            <EmptyList
              text={`No links saved yet. You can add items by clicking the + button.`}
            />
          </EmptyListWrapper>
        )}
      />
    </ScreenLayout>
  );
};

export default WebsitesGridComponent;
