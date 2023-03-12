
// @ts-ignore
import styled from "styled-components/native";
import { spacing } from "../../constants/dimensions";

export const Container = styled.Pressable`
  background-color: ${(props: any) =>
    props.theme.theme === "dark"
      ? `rgba(255, 255, 255, 0.1)`
      : `rgba(0, 0, 0, 0.1)`};
  border-radius: 15px;
  margin-bottom: ${spacing.md}px;
  overflow: hidden;
`;