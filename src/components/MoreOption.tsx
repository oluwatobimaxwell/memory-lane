import React, { FC, useRef } from "react";
import { Alert } from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { CustomModal, ModalRef } from "./CustomModal";
import { spacing } from "../constants/dimensions";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const ButtonContainer = styled.Pressable`
  height: 35px;
  width: 35px;
  border-radius: 35px;
  background-color: ${(props: any) =>
    props.theme.theme === "dark"
      ? "rgba(0, 0, 0, 0.3)"
      : "rgba(255, 255, 255, 0.3)"};
  justify-content: center;
  align-items: center;
  position: absolute;
  right: ${spacing.sm}px;
  top: ${spacing.sm}px;
  z-index: 100;
`;

const ModalOptionContainer = styled.View<{
  hasBorder: boolean;
}>`
  background-color: ${(props: any) =>
    props.theme.theme === "dark"
      ? `rgba(255, 255, 255, 0.05)`
      : `rgba(0, 0, 0, 0.15)`};
  padding-horizontal: ${spacing.md}px;
  padding-vertical: ${spacing.sm}px;
  border-bottom-width: ${(props: any) => (props.hasBorder ? 1 : 0)}px;
  border-bottom-color: ${(props: any) =>
    props.theme.theme === "dark"
      ? `rgba(255, 255, 255, 0.025)`
      : `rgba(0, 0, 0, 0.05)`};
`;

const ModalOptionWrapper = styled.View`
  background-color: ${(props: any) =>
    props.theme.theme === "dark"
      ? `rgba(255, 255, 255, 0.05)`
      : `rgba(0, 0, 0, 0.05)`};
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: ${spacing.md}px;
`;

const ModalOption = styled.Text`
  color: ${(props: any) => props.theme.text};
  margin-vertical: 12px;
`;

const OptionIcon = styled(Icon)`
  font-size: 16px;
  color: ${(props: any) =>
    props.theme.theme === "dark"
      ? `rgba(255, 255, 255, 0.8)`
      : `rgba(0, 0, 0, 0.8)`};
`;

const ButtonIcon = styled(Icon)`
  font-size: 16px;
  color: ${(props: any) =>
    props.theme.theme === "dark"
      ? `rgba(255, 255, 255, 0.8)`
      : `rgba(0, 0, 0, 0.8)`};
  margin-right: ${spacing.sm}px;
`;

const TouchableOpacity = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

type PressItem = {
  label: string;
  onPress: () => void;
  icon?: string;
};

interface Props {
  options: PressItem[];
  onDelete: () => void;
}

interface OptionProps {
  label: string;
  onPress: () => void;
  icon?: string;
  hasBorder?: boolean;
  labelStyle?: any;
  iconStyle?: any;
}

const ItemButton: FC<OptionProps> = ({ label, onPress, icon, hasBorder, labelStyle, iconStyle }) => {
  return (
    <ModalOptionContainer hasBorder={hasBorder}>
      <TouchableOpacity onPress={onPress}>
        {icon && <ButtonIcon name={icon} style={iconStyle} />}
        <ModalOption style={labelStyle}>{label}</ModalOption>
      </TouchableOpacity>
    </ModalOptionContainer>
  );
};

export const MoreOptionsButton: FC<Props> = ({ options = [], onDelete }) => {
  const modal = useRef<ModalRef>(null);

  const toggleModal = () => {
    modal.current?.toggleModal();
  };

  const handleOptionPress = (option: PressItem) => {
    option.onPress();
    toggleModal();
  };

  const onHandleDelete = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this link?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            toggleModal();
            onDelete();
          }
        }
      ]
    );
  };

  return (
    <>
      <ButtonContainer onPress={toggleModal}>
        <OptionIcon name="ellipsis-v" />
      </ButtonContainer>
      <CustomModal ref={modal}>
        <ModalOptionWrapper>
          {options.map((option, i) => (
            <ItemButton
              key={`${option.label}-${i}`}
              label={option.label}
              onPress={() => handleOptionPress(option)}
              hasBorder={i !== options.length - 1}
              icon={option.icon}
            />
          ))}
        </ModalOptionWrapper>
        <ModalOptionWrapper>
          <ItemButton
            label="Remove link"
            onPress={onHandleDelete}
            hasBorder={false}
            icon="trash"
            labelStyle={{ color: "red" }}
            iconStyle={{ color: "red" }}
          />
        </ModalOptionWrapper>
      </CustomModal>
    </>
  );
};

const App = () => {
  return <Container></Container>;
};

export default App;
