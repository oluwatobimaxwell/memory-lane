import React, { useLayoutEffect } from "react";
import { ScrollViewProps } from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import Post from "./Post";
import { useSavedLinks } from "../../data/useDatabase";
import EmptyList from "./EmptyList";
import ScreenLayout from "../ScreenLayout";
import { useNavigation, useParams } from "../../navigation/useNavigatioin";
import ListTop from "./ListTop";
import { spacing } from "../../constants/dimensions";

const ScrollView = styled.ScrollView<ScrollViewProps>`
  padding-bottom: ${spacing.md}px;
  padding-horizontal: ${spacing.md}px;
  padding-top: ${spacing.md + 125}px;
`;

const EndOfScrollComponent = styled.View`
  height: ${(spacing.md * 1.25) + 200}px;
`;

const PostFeeds = () => {
  const perPage = 100;
  const [limit, setLimit] = React.useState(perPage);
  const [offset, setOffset] = React.useState(0);
  const filter = useParams();
  const [query, setQuery] = React.useState("");
  const { data, isLoading } = useSavedLinks({ limit, offset, filter, query });

  const { bottomNavigation } = useNavigation();

  useLayoutEffect(() => {
    bottomNavigation.setOptions({ title: filter?.title });
  }, [bottomNavigation, filter]);

  return (
    <ScreenLayout>
      <ListTop
        onSearch={(text) => {
          setQuery(text);
          setOffset(0);
        }}
        isLoading={isLoading}
      />
      {data?.length === 0 ? (
        <EmptyList
          text={`No links saved yet. You can add items by clicking the + button.`}
        />
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            {(data || []).map((post) => (
              <Post key={post.id} item={post} />
            ))}
            <EndOfScrollComponent />
          </ScrollView>
        </>
      )}
    </ScreenLayout>
  );
};

export default PostFeeds;
