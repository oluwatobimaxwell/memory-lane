import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { CustomModal, ModalRef } from "./CustomModal";
import FloatingButtonComponent from "./FloatingButton";
import { KeyboardAvoidingView, Platform } from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import hexToRgba from "hex-to-rgba";
import DropdownSelect from "./SelectInput";
import { SavedLink } from "../data/Database";
import { useGetLinkByLink, useSaveLink } from "../data/useDatabase";
import { useQueryClient } from "@tanstack/react-query";
import { useLinkData } from "../api/hooks/useLinkData";
import Post from "./PostFeeds/Post";

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
  font-size: 12px;
`;

const Description = styled.Text`
  font-size: 12px;
  margin-bottom: 10px;
  color: ${({ theme }: any) => hexToRgba(theme.text, 0.5)};
`;

const CreateLink = () => {
  const modal = useRef<ModalRef>(null);

  const {
    control,
    handleSubmit,
    formState: { isValid },
    getValues,
    reset,
  } = useForm<SavedLink>({
    mode: "onChange",
    defaultValues: {
      link: "",
      priority: "low",
    },
  });

  const queryClient = useQueryClient();
  const saveLink = useSaveLink();
  const link = getValues("link");
  const { isLoading, ...linkData } = useLinkData(link);

  const { data: alreadySavedLink, remove } = useGetLinkByLink(link, {
    enabled: !!link,
  });

  const onSubmit = (data: SavedLink) => {
    const link = {
      ...data,
      ...linkData,
      dateSaved: new Date().toISOString(),
    } as SavedLink;
    saveLink.mutate(link, {
      onSuccess: () => {
        reset();
        queryClient.invalidateQueries(["saved-links"]);
        modal.current?.toggleModal();
      },
    });
  };

  const toggleModal = () => {
    modal.current?.toggleModal();
  };

  const closeAndDone = () => {
    reset();
    remove();
  };

  return (
    <>
      <FloatingButtonComponent onPress={toggleModal}>+</FloatingButtonComponent>
      <CustomModal ref={modal}>
        {alreadySavedLink ? (
          <>
            <Description>
              You have already saved this link. You can view it in your link
              collection.
            </Description>
            <Post item={alreadySavedLink} />
            <Button title="Add Another Link" onPress={closeAndDone} />
          </>
        ) : (
          <>
            <Description>
              Enter a link to save to your link collection and share with your
              friends. You also set a priority level for the link.
            </Description>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Paste link here"
                />
              )}
              name="link"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <DropdownSelect
                  placeholder="Select priority"
                  onSelect={onChange}
                  options={[
                    { label: "Low", value: "low" },
                    { label: "Medium", value: "medium" },
                    { label: "High", value: "high" },
                  ]}
                />
              )}
              name="priority"
            />
            <Button
              disabled={!isValid}
              title="Add Link"
              onPress={handleSubmit(onSubmit)}
            />
          </>
        )}
      </CustomModal>
    </>
  );
};

export default CreateLink;
