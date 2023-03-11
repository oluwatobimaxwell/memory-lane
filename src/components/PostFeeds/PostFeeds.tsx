import React from "react";
// @ts-ignore
import styled from "styled-components/native";
import Post from "./Post";
import { useSavedLinks } from "../../data/useDatabase";
import EmptyList from "./EmptyList";
import CreateLink from "../CreateLink";

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

const PostFeeds = () => {
  const [limit, setLimit] = React.useState(10);
  const [offset, setOffset] = React.useState(0);
  const { data } = useSavedLinks({ limit, offset });


  return (
    <Container>
      {data?.length === 0 ? (
        <EmptyList />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {(data || []).map((post) => (
            <Post key={post.id} item={post} />
          ))}
          <PaddingView />
        </ScrollView>
      )}
      <CreateLink />
    </Container>
  );
};

export default PostFeeds;
