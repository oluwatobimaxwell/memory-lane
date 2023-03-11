import React from "react";
import { DateTime } from "luxon";
// @ts-ignore
import styled from "styled-components/native";
import { useLinkData } from "./useLinkData";
import { Linking } from "react-native";
import PostSkeleton from "./PostSkeleton";
import { SavedLink } from "../../data/Database";
import { MoreOptionsButton } from "../MoreOption";
import { useDeleteLink } from "../../data/useDatabase";
import * as Sharing from 'expo-sharing';

const Header = styled.View`
  align-items: center;
  flex-direction: row;
  padding-top: 5px;
  margin-top: 10px;
  border-top-style: dashed;
  border-top-width: 0.5px;
  border-top-color: ${(props: any) => (props.theme.theme === "dark" ? `rgba(255, 255, 255, 0.05)` : `rgba(0, 0, 0, 0.05)`)};
`;

const AppIcon = styled.Image`
  border-radius: 5px;
  height: 20px;
  margin-right: 7.5px;
  width: 20px;
`;

const UserWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  overflow: hidden;
  margin-right: 10px;
`;

const AppName = styled.Text`
  font-weight: 500;
  color: #cacaca;
  font-size: 12px;
`;

const Image = styled.Image`
  height: 160px;
  width: 100%;
`;

const Caption = styled.Text<{
  isDark: boolean;
}>`
  color: ${(props: any) => props.theme.text};
  font-weight: 600;
`;

const PriorityLabel = styled.Text<{
  priority: "high" | "low" | "medium";
}>`
  background-color: ${(props: any) => {
    switch (props.priority) {
      case "high":
        return "#ff5733";
      case "low":
        return "#0fb12a";
      case "medium":
        return "#ff9c33";
    }
  }};
  border-radius: 20px;
  color: white;
  font-size: 10px;
  font-weight: bold;
  margin-right: 5px;
  padding: 5px 10px;
  border-radius: 5px;
  overflow: hidden;
  text-transform: uppercase;
  position: absolute;
  top: 10px;
  left: 10px;
`;

const DateSaved = styled.Text`
  font-size: 12px;
  color: ${(props: any) => props.theme.text};
  font-weight: 500;
`;

const Container = styled.Pressable`
  background-color: ${(props: any) => (props.theme.theme === "dark" ? `rgba(255, 255, 255, 0.1)` : `rgba(0, 0, 0, 0.1)`)};
  border-radius: 15px;
  margin-bottom: 10px;
  overflow: hidden;
`;

const Body = styled.View`
  padding: 10px;
`;

const Post = ({ item }: {
    item: SavedLink;
}) => {
  const { favicon, title, description, image, isLoading } = useLinkData(
    item.link
  );

  const deleteLink = useDeleteLink();

  const handleDelete = () => {
    deleteLink.mutate(item.id as number);
  };

  const handleShare = async () => {
    try {
      await Sharing.shareAsync(item.link);
    } catch (error) {
      console.error('Error sharing link:', error);
      console.log(item.link)
    }
  };


  const moreOptions = [
    {
      label: 'Set Reminder',
      onPress: () => console.log('Copy Link'),
      icon: 'bell',
    },
    {
        label: 'Share',
        onPress: handleShare,
        icon: 'share',
    },
    {
        label: 'Copy Link',
        onPress: () => console.log('Copy Link'),
        icon: 'copy',
    },
]

  if (isLoading) {
    return <PostSkeleton />;
  }

  return (
    <Container onPress={() => openLink(item.link)}>
      {image && <Image source={{ uri: image }} />}
      <PriorityLabel priority={item.priority}>
        {item.priority}
      </PriorityLabel>
      <MoreOptionsButton 
        options={moreOptions} 
        onDelete={handleDelete}
      />
      <Body>
        {description && <Caption numberOfLines={3}>{description}</Caption>}
        <Header>
          <UserWrapper>
            <AppIcon source={{ uri: favicon }} />
            <AppName numberOfLines={1}>{title}</AppName>
          </UserWrapper>
        <DateSaved>
          {DateTime.fromISO(item.dateSaved).toFormat("dd LLL yyyy, hh:mma")}
        </DateSaved>
        </Header>
      </Body>
    </Container>
  );
};

export default Post;

function openLink(url: string): void {
  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Cannot open URL: ${url}`);
      }
    })
    .catch((error) => {
      console.error(`An error occurred: ${error}`);
    });
}
