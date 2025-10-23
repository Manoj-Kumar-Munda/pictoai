"use client";
import { cn } from "@/lib/utils";
import useEditingStore from "@/store/editing-store";
import { DefaultChatTransport } from "ai";
import { useChat } from "@ai-sdk/react";
import Image from "next/image";
import { useEffect } from "react";
import { EffectProps } from "@/types";

const AIEffectCard = (props: EffectProps) => {
  const { id, name, demo, prompt } = props;
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
    <div
      key={name}
      className={cn(
        "bg-neutral-200 border p-0.5 cursor-pointer",
        isApplied && "active-effect"
      )}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <Image
        src={demo}
        alt={name}
        className="w-20 h-20 object-cover object-top"
      />
      <p className="text-[10px] text-center font-medium text-neutral-800">
        {name}
      </p>
    </div>
  );
};

export default AIEffectCard;
