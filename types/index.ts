import { StaticImageData } from "next/image";

export interface EffectProps {
  id: string;
  name: string;
  demo: StaticImageData;
  prompt: string;
}
