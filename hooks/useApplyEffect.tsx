"use client";
import useEditingStore from "@/store/editing-store";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect } from "react";

const useApplyEffect = () => {
  const { image, setImage } = useEditingStore();
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/edit",
    }),
  });

  const handleSendMessage = (prompt: string) => {
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

  useEffect(() => {
    if (messages.length > 0) {
      const result = messages.at(-1)?.parts?.at(-1);
      if (result?.type === "file") {
        setImage(result.url, image.width, image.height);
      }
    }
  }, [messages?.length]);

  return { status, handleSendMessage };
};

export default useApplyEffect;
