import hexToRgba from "hex-to-rgba";
import React, { useEffect, useRef } from "react";
import { ScrollView } from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import { spacing } from "../../constants/dimensions";
import { WebsiteGroup } from "../../data/Database";
import { useNavigation, useParams } from "../../navigation/useNavigatioin";
import { Container as PressableContainer } from "../ui";

interface TagFilterProps {
  tags: WebsiteGroup[];
  onFilter?: (tag: WebsiteGroup | null) => void;
}

const WebsiteImage = styled.Image`
  width: 20px;
  height: 20px;
  margin-right: ${spacing.sm}px;
  border-radius: 5px;
`;

const Container = styled.ScrollView`
  margin-bottom: ${spacing.md}px;
  height: 40px;
  max-height: 40px;
  min-height: 40px;
  background-color: transparent;
  padding-horizontal: ${spacing.sm}px;
`;

interface TagProps {
  active: boolean;
}

const Tag = styled(PressableContainer)<TagProps>`
  ${({ active, theme }: any) => {
    if (active) {
      return `
      background-color: ${
        theme.theme === "dark"
          ? "rgba(255, 255, 255, 0.5)"
          : "rgba(0, 0, 0, 0.5)"
      }`;
    }
  }}
  border-style: solid;
  border-radius: 7.5px;
  padding: 5px 10px;
  margin-left: ${spacing.sm}px;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TagText = styled.Text`
  color: ${({ theme, active }: any) =>
    hexToRgba(active ? theme.background : theme.text, 0.75)};
  text-transform: capitalize;
  font-weight: ${(props: any) => (props.active ? "bold" : "normal")};
`;

interface WebsiteGroupExtended extends WebsiteGroup {
  viewAll?: boolean;
}

const TagFilter: React.FC<TagFilterProps> = ({ tags, onFilter }) => {
  const params = useParams();

  const scrollViewRef = useRef<ScrollView>(null);

  const { bottomNavigation } = useNavigation();

  const scrollToView = (index: number) => {
    if (scrollViewRef.current) {
      const scrollViewWidth =
        scrollViewRef.current?.getScrollableNode().clientWidth;
      const viewWidth = scrollViewRef.current?.getScrollableNode().offsetWidth;
      scrollViewRef.current.scrollTo({
        x: index * 130,
        y: 0,
        animated: true,
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (params?.title) {
        const index = tags.findIndex((tag) => tag.title === params.title);
        scrollToView(index);
      }
    }, 100);
  }, [params]);

  const allTag = {
    title: "All Links",
    favicon: "",
    count: tags.reduce((acc, tag) => acc + tag.count, 0),
    viewAll: true,
  } as WebsiteGroupExtended;

  return (
    <Container
      ref={scrollViewRef}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      {([allTag, ...tags] as WebsiteGroupExtended[]).map((tag, index) => {
        const isActive =
          params?.title === tag.title ||
          (params?.title === undefined && tag.viewAll);
        return (
          <Tag
            key={index}
            active={isActive}
            onPress={() => {
              onFilter?.(tag.viewAll ? null : tag);
              scrollToView(index);
              bottomNavigation.navigate("Links", {
                title: tag?.viewAll ? undefined : tag.title,
              });
            }}
          >
            {tag.favicon && <WebsiteImage source={{ uri: tag.favicon }} />}
            <TagText active={isActive} numberOfLines={1}>
              {tag.title} ({tag.count})
            </TagText>
          </Tag>
        );
      })}
    </Container>
  );
};

export default TagFilter;
