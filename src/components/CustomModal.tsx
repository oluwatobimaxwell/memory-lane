import React, { forwardRef, useImperativeHandle, useState } from "react";
// @ts-ignore
import styled from "styled-components/native";
import { KeyboardAvoidingView, Modal, Platform } from "react-native";
import { useThemeContext } from "../theme/themContext";
import { BlurView } from "expo-blur";
import { spacing } from "../constants/dimensions";

const ModalContainer = styled.Pressable`
  flex: 1;
  justify-content: flex-end;
`;

const ModalContainerInner = styled.Pressable`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, ${(props: any) => props.theme.theme === "dark" ? 0.85 : 0.25});
`;

const ModalContent = styled.Pressable`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow: hidden;
`;

const ModalContentInner = styled.View`
  padding-horizontal: ${spacing.md}px;
  padding-top: ${spacing.md}px;
  padding-bottom: 30px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  `;

const ModalPin = styled.View`
  background-color: ${(props: any) =>
    props.theme.theme === "dark"
      ? `rgba(255, 255, 255, 0.25)`
      : `rgba(0, 0, 0, 0.25)`};
  width: 80px;
  height: 5px;
  border-radius: 5px;
  margin: auto;
  margin-bottom: ${spacing.md}px;
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
            <BlurView
              intensity={100}
              tint={contextTheme.theme}
            >
                <ModalContentInner>
                  <ModalPin />
                  {children}
                </ModalContentInner>
            </BlurView>
              </ModalContent>
          </ModalContainerInner>
        </ModalContainer>
      </KeyboardAvoidingView>
    </Modal>
  );
});
