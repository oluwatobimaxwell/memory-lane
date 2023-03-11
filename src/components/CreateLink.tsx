import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { CustomModal, ModalRef } from "./CustomModal";
import FloatingButtonComponent from "./FloatingButton";
import { KeyboardAvoidingView, Platform } from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import hexToRgba from "hex-to-rgba";
import DropdownSelect from "./SelectInput";

const TextInput = styled.TextInput`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid ${({ theme }: any) => hexToRgba(theme.text, 0.25)};
  height: 50px;
  color: ${({ theme }: any) => hexToRgba(theme.text, 0.85)};
`;

const Button = styled.Button`
  width: 100%;
  margin-top: 10px;
`;

const Description = styled.Text`
    font-size: 12px;
    margin-bottom: 10px;
    color: ${({ theme }: any) => hexToRgba(theme.text, 0.5)};
`;

const CreateLink = () => {
  const modal = useRef<ModalRef>(null);

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const toggleModal = () => {
    modal.current?.toggleModal();
  };
  return (
    <>
      <FloatingButtonComponent onPress={toggleModal}>+</FloatingButtonComponent>
      <CustomModal ref={modal}>
      
        <Description>
            Enter a link to save to your link collection and share with your friends.
             You also set a priority level for the link. 
        </Description>
        <TextInput
          placeholder="Past link here"
          onChangeText={(text: string) => {
            register("link", { required: true });
          }}
        />
        <DropdownSelect
            placeholder="Select priority"
            onSelect={(value: string) => console.log(value)}
            options={[
                { label: 'Low', value: 'low' },
                { label: 'Medium', value: 'medium' },
                { label: 'High', value: 'high' },
            ]}
        />
        <Button
          disabled={!isValid}
          title="Add Link"
          onPress={handleSubmit(onSubmit)}
        />
      </CustomModal>
    </>
  );
};

export default CreateLink;
