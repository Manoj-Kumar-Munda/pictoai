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

export interface ImageProps {
  url: string;
  width: number;
  height: number;
}

export interface UploadError {
  message: string;
}
