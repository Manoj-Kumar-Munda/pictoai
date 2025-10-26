"use client";
import useEditingStore from "@/store/editing-store";
import { DefaultChatTransport } from "ai";
import { useChat } from "@ai-sdk/react";
import { useEffect } from "react";
import { EffectProps } from "@/types";
import Thumbnail from "./thumbnail";

const AIEffectCard = (props: EffectProps) => {
  const { id, name, picture, prompt } = props;
  const { appliedEffect, setAppliedEffect, image, setImage } =
    useEditingStore();

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/edit",
    }),
  });

  const handleClick = () => {
    setAppliedEffect(props);
    sendMessage({
      text: prompt,
      files: [
        {
          url: image.url,
          type: "file",
          mediaType: "image/png",
        },
      ],
    });
  };

  const isApplied = appliedEffect?.id === id;

  useEffect(() => {
    if (messages.length > 0) {
      const result = messages.at(-1)?.parts?.at(-1);
      if (result?.type === "file") {
        setImage(result.url, image.width, image.height);
      }
    }
  }, [messages?.length]);

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
