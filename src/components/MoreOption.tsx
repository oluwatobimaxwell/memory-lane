import React, { FC, useRef } from "react";
// @ts-ignore
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { CustomModal, ModalRef } from "./CustomModal";

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
  right: 10px;
  top: 10px;
`;

const ModalOptionContainer = styled.View<{
  hasBorder: boolean;
}>`
  background-color: ${(props: any) =>
    props.theme.theme === "dark"
      ? `rgba(255, 255, 255, 0.05)`
      : `rgba(0, 0, 0, 0.15)`};
  padding-horizontal: 16px;
  padding-vertical: 8px;
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
  margin-bottom: 10px;
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
  margin-right: 10px;
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
}

const ItemButton: FC<OptionProps> = ({ label, onPress, icon, hasBorder }) => {
  return (
    <ModalOptionContainer hasBorder={hasBorder}>
      <TouchableOpacity onPress={onPress}>
        {icon && <ButtonIcon name={icon} />}
        <ModalOption>{label}</ModalOption>
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
            onPress={onDelete}
            hasBorder={false}
            icon="trash"
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
