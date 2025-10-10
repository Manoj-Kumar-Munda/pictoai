import { StaticImageData } from "next/image";

export interface IEffect {
  id: string;
  name: string;
  demo: StaticImageData;
  prompt: string;
}
