import React from "react";
// @ts-ignore
import styled from "styled-components/native";
import hexToRgba from "hex-to-rgba";

const Header = styled.View`
  align-items: center;
  flex-direction: row;
  padding-top: 10px;
  width: 100%;
`;

const AppIcon = styled.View`
  border-radius: 5px;
  height: 20px;
  margin-right: 7.5px;
  width: 20px;
  background-color: ${(props: any) => hexToRgba(props.theme.text, 0.3)};
`;

const UserWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  overflow: hidden;
  margin-right: 10px;
`;

const AppName = styled.View`
  font-weight: 500;
    height: 20px;
    width: 100px;
    background: ${(props: any) => hexToRgba(props.theme.text, 0.3)};
    border-radius: 3px;
`;

const Image = styled.View`
  height: 200px;
  width: 100%;
    background: ${(props: any) => hexToRgba(props.theme.text, 0.3)};
`;

const Caption = styled.View`
  background: ${(props: any) => hexToRgba(props.theme.text, 0.3)};
  font-size: 16px;
  font-weight: bold;
  height: 40px;
  border-radius: 5px;
`;

const PriorityLabel = styled.View`
  background: ${(props: any) => hexToRgba(props.theme.text, 0.3)};
  border-radius: 5px;
  width: 60px;
  height: 20px;
`;

const DateSaved = styled.View`
  height: 15px;
  width: 100px;
  background: ${(props: any) => hexToRgba(props.theme.text, 0.3)};
  border-radius: 5px;
  margin-top: 5px;
`;

const Container = styled.Pressable`
  background-color: rgba(
    0,
    0,
    0,
    ${(props: any) => (props.theme.theme === "dark" ? `0.6` : `0.2`)}
  );
  border-radius: 15px;
  margin-bottom: 10px;
  overflow: hidden;
`;

const Body = styled.View`
  padding: 10px;
`;

interface PostProps {
  appName: string;
  appIcon: string;
  imageUrl: string;
  caption: string;
  likes: number;
  priority: "high" | "low" | "medium";
  dateSaved: string;
  numOpens: number;
}

const PostSkeleton = () => {
  return (
    <Container>
      <Image />
      <Body>
        <Caption numberOfLines={3}/>
        <DateSaved/>
        <Header>
          <UserWrapper>
            <AppIcon />
            <AppName numberOfLines={1}/>
          </UserWrapper>
          <PriorityLabel/>
        </Header>
      </Body>
    </Container>
  );
};

export default PostSkeleton;
