import React, { FC } from "react";
import { DateTime } from "luxon";
import Toast from 'react-native-toast-message';
// @ts-ignore
import styled from "styled-components/native";
import { Linking } from "react-native";
import { SavedLink } from "../../data/Database";
import { MoreOptionsButton } from "../MoreOption";
import { useDeleteLink } from "../../data/useDatabase";
import * as Sharing from "expo-sharing";
import { Container } from "../ui";
import hexToRgba from "hex-to-rgba";

const Header = styled.View`
  align-items: center;
  flex-direction: row;
  padding-top: 5px;
  margin-top: 10px;
  border-top-style: dashed;
  border-top-width: 0.5px;
  border-top-color: ${(props: any) =>
    props.theme.theme === "dark"
      ? `rgba(255, 255, 255, 0.05)`
      : `rgba(0, 0, 0, 0.05)`};
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
  color:${(props: any) => hexToRgba(props.theme.text, 0.75)};
  font-size: 12px;
  text-transform: capitalize;
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

const PriorityLabelWrapper = styled.View<{
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
  margin-right: 5px;
  padding: 5px 10px;
  border-radius: 5px;
  overflow: hidden;
  position: absolute;
  top: 10px;
  left: 10px;
`;

const PriorityLabel = styled.Text`
  color: white;
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
`;

const DateSaved = styled.Text`
  font-size: 12px;
  color: ${(props: any) => props.theme.text};
  font-weight: 500;
`;

const Body = styled.View`
  padding: 10px;
`;

const Post: FC<{
  item: SavedLink;
}> = ({ item }) => {
  const { favicon, title, description, image, id } = item || {};

  const deleteLink = useDeleteLink();

  const handleDelete = () => {
    deleteLink.mutate(item.id as number, {
      onSuccess: () => {
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Link Deleted",
          text2: "Link has been deleted successfully",
          visibilityTime: 3000,
        });
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error Deleting Link",
          text2: "An error occurred while deleting link",
          visibilityTime: 3000,
        });
      }
    });
  };

  const handleShare = async () => {
    try {
      await Sharing.shareAsync(item.link);
    } catch (error) {
      console.error("Error sharing link:", error);
      console.log(item.link);
    }
  };

  const moreOptions = [
    {
      label: "Set Reminder",
      onPress: () => console.log("Copy Link"),
      icon: "bell",
    },
    {
      label: "Share",
      onPress: handleShare,
      icon: "share",
    },
    {
      label: "Copy Link",
      onPress: () => console.log("Copy Link"),
      icon: "copy",
    },
  ];

  return (
    <Container onPress={() => openLink(item.link)}>
      {image && <Image source={{ uri: image }} />}
      <PriorityLabelWrapper priority={item.priority}>
        <PriorityLabel>{item.priority}</PriorityLabel>
      </PriorityLabelWrapper>
      {id && <MoreOptionsButton options={moreOptions} onDelete={handleDelete} />}
      <Body>
        {description && <Caption numberOfLines={3}>{description}</Caption>}
        <Header>
          <UserWrapper>
            <AppIcon source={{ uri: favicon }} />
            <AppName numberOfLines={1}>{title}</AppName>
          </UserWrapper>
          {item.dateSaved && (
            <DateSaved>
              {DateTime.fromISO(item.dateSaved).toFormat("dd LLL yyyy, hh:mma")}
            </DateSaved>
          )}
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
