"use client";
import useEditingStore from "@/store/editing-store";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect } from "react";

const useSendChat = () => {
  const { image, setImage, setProcessing } = useEditingStore();
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/edit",
    }),
    onFinish: () => {
      setProcessing(false);
    },
    onError: () => {
      setProcessing(false);
    },
  });

  const handleSendMessage = (prompt: string) => {
    if (!image.url) return;
    setProcessing(true);
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
      const last = messages.at(-1);
      const result = last?.parts?.at(-1);
      if (result?.type === "file") {
        setImage(result.url, image.width, image.height);
        setProcessing(false);
      }
    }
  }, [messages, setImage, image.width, image.height, setProcessing]);

  return { status, handleSendMessage };
};

export default useSendChat;
