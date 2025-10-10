import { cn } from "@/lib/utils";
import useEditingStore from "@/store/editing-store";
import { DefaultChatTransport } from "ai";
import { useChat } from "@ai-sdk/react";
import Image, { StaticImageData } from "next/image";
import { useEffect } from "react";

interface AIEffectCardProps {
  id: string;
  name: string;
  demo: StaticImageData;
  prompt: string;
}

const AIEffectCard = ({ id, name, demo, prompt }: AIEffectCardProps) => {
  const { appliedEffects, setAppliedEffects, image, setImage } =
    useEditingStore();

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/edit",
    }),
  });

  const handleClick = () => {
    setAppliedEffects([...appliedEffects, { id, prompt }]);
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

  const isApplied = appliedEffects.some((effect) => effect.id === id);

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
        "bg-neutral-200 rounded-lg p-1 cursor-pointer",
        isApplied && "active-effect"
      )}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <Image
        src={demo}
        alt={name}
        className="w-24 h-24 object-cover object-top rounded-md"
      />
      <p className="text-sm font-bold text-center text-neutral-800">{name}</p>
    </div>
  );
};

export default AIEffectCard;
