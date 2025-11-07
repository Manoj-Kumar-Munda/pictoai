"use client";
import useEditingStore from "@/store/editing-store";
import { EffectProps } from "@/types";
import Thumbnail from "./thumbnail";
import useSendChat from "@/hooks/useSendChat";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const AIEffectCard = (props: EffectProps) => {
  const { id, name, picture, prompt } = props;
  const { appliedEffect, setAppliedEffect, image } = useEditingStore();

  const { handleSendMessage } = useSendChat();

  const isDisabled = !image?.url;

  const handleClick = () => {
    if (isDisabled) return;
    setAppliedEffect(props);
    handleSendMessage(prompt);
  };

  const isApplied = appliedEffect?.id === id;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div>
          <Thumbnail
            name={name}
            picture={picture}
            isApplied={isApplied}
            onClick={handleClick}
            disabled={isDisabled}
          />
        </div>
      </TooltipTrigger>
      {isDisabled && (
        <TooltipContent sideOffset={6}>
          Upload an image to enable effects
        </TooltipContent>
      )}
    </Tooltip>
  );
};

export default AIEffectCard;
