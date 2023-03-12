import React, { FC } from "react";
import { BlurView } from "expo-blur";
import TagFilter from "../ui/TagFilter";
import { useGetWebsiteGroup } from "../../data/useDatabase";
import { useThemeContext } from "../../theme/themContext";
// @ts-ignore
import styled from "styled-components/native";
import { TextInput } from "../ui";
import { spacing } from "../../constants/dimensions";

const InputContainer = styled.View`
  border-radius: 0px;
  width: 100%;
  padding: ${spacing.md}px;
  padding-bottom: 0px;
  background-color: transparent;
`;

interface Props {
  onSearch: (text: string) => void;
  isLoading?: boolean;
}

const ListTop: FC<Props> = ({ onSearch, isLoading }) => {
  const { data: websiteGroup } = useGetWebsiteGroup();
  const { theme } = useThemeContext();
  return (
    <BlurView
      intensity={100}
      tint={theme}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
      }}
    >
      <InputContainer>
        <TextInput
          icon="search"
          onChangeText={onSearch}
          placeholder="Search for links"
          isLoading={isLoading}
        />
      </InputContainer>
      <TagFilter tags={websiteGroup || []} />
    </BlurView>
  );
};

export default ListTop;
