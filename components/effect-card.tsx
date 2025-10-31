"use client";
import useEditingStore from "@/store/editing-store";
import { EffectProps } from "@/types";
import Thumbnail from "./thumbnail";
import useSendChat from "@/hooks/useSendChat";

const AIEffectCard = (props: EffectProps) => {
  const { id, name, picture, prompt } = props;
  const { appliedEffect, setAppliedEffect } =
    useEditingStore();

  const { handleSendMessage, status } = useSendChat();

  const handleClick = () => {
    setAppliedEffect(props);
    handleSendMessage(prompt);
  };

  const isApplied = appliedEffect?.id === id;

  return (
    <Thumbnail
      name={name}
      picture={picture}
      isApplied={isApplied}
      onClick={handleClick}
    />
  );
};

export default AIEffectCard;
