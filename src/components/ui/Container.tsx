
// @ts-ignore
import styled from "styled-components/native";

export const Container = styled.Pressable`
  background-color: ${(props: any) =>
    props.theme.theme === "dark"
      ? `rgba(255, 255, 255, 0.1)`
      : `rgba(0, 0, 0, 0.1)`};
  border-radius: 15px;
  margin-bottom: 15px;
  overflow: hidden;
`;