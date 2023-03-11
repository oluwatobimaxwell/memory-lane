import React, { forwardRef, useImperativeHandle, useState } from "react";
// @ts-ignore
import styled from "styled-components/native";
import { KeyboardAvoidingView, Modal, Platform } from "react-native";
import { useThemeContext } from "../theme/themContext";
import hexToRgba from "hex-to-rgba";

const ModalContainer = styled.Pressable`
  flex: 1;
  justify-content: flex-end;
  background-color: ${(props: any) => hexToRgba(props.theme.text, 0.35)};
`;

const ModalContainerInner = styled.Pressable`
  flex: 1;
  justify-content: flex-end;
  background-color: ${(props: any) => hexToRgba(props.theme.background, 0.65)};
`;

const ModalContent = styled.Pressable`
  background-color: ${(props: any) => props.theme.background};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const ModalContentInner = styled.View`
  padding-horizontal: 15px;
  padding-top: 15px;
  padding-bottom: 30px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${(props: any) =>
    props.theme.theme === "dark"
      ? `rgba(255, 255, 255, 0.05)`
      : `rgba(0, 0, 0, 0.05)`};
`;

const ModalPin = styled.View`
  background-color: ${(props: any) =>
    props.theme.theme === "dark"
      ? `rgba(255, 255, 255, 0.15)`
      : `rgba(0, 0, 0, 0.15)`};
  width: 80px;
  height: 5px;
  border-radius: 5px;
  margin: auto;
  margin-bottom: 10px;
`;

interface Props {
  children: React.ReactNode;
}

export interface ModalRef {
  toggleModal: () => void;
}

export const CustomModal = forwardRef<ModalRef, Props>(({ children }, ref) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  useImperativeHandle(ref, () => ({
    toggleModal: () => toggleModal(),
  }));

  const contextTheme = useThemeContext();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={toggleModal}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ModalContainer>
          <ModalContainerInner onPress={toggleModal}>
            <ModalContent onPress={() => undefined}>
              <ModalContentInner>
                <ModalPin />
                {children}
              </ModalContentInner>
            </ModalContent>
          </ModalContainerInner>
        </ModalContainer>
      </KeyboardAvoidingView>
    </Modal>
  );
});
