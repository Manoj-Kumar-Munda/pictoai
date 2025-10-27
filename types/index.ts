import { StaticImageData } from "next/image";
import React from "react";

type ToolTypes =
  | "eraser"
  | "background_removal"
  | "color_adjustment"
  | "object_addition";

export interface EffectProps {
  id: string;
  name: string;
  picture?: string;
  prompt: string;
}

export interface ToolProps extends Omit<EffectProps, "picture"> {
  tool_id: ToolTypes;
  icon?: React.ElementType<{ className?: string }>;
  description: string;
}
