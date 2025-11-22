import React from "react";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";
import { Image } from "@imagekit/next";

export function DraggableEffectsCard() {
  const items = [
    {
      title: "Restyle",
      image: "/PictoAI/homepage/img-5.png",
      className: "absolute top-10 left-[20%] rotate-[-5deg]",
    },
    {
      title: "Golden hour",
      image: "/PictoAI/homepage/img-1.png",
      className: "absolute top-40 left-[25%] rotate-[-7deg]",
    },
    {
      title: "Purple Spotlight",
      image: "/PictoAI/homepage/img-2.png",
      className: "absolute top-5 left-[40%] rotate-[8deg]",
    },
    {
      title: "Neon Noir",
      image: "/PictoAI/homepage/img-3.png",
      className: "absolute top-32 left-[55%] rotate-[10deg]",
    },
    {
      title: "Low key",
      image: "/PictoAI/homepage/img-4.png",
      className: "absolute top-20 right-[35%] rotate-[2deg]",
    },
    {
      title: "Original",
      image: "/PictoAI/homepage/model.jpg",
      className: "absolute top-24 left-[45%] rotate-[-7deg]",
    },
  ];
  return (
    <DraggableCardContainer className="relative flex h-[600px] top-10 w-full  items-center justify-center overflow-clip">
      {items.map((item) => (
        <DraggableCardBody key={item.title} className={item.className}>
          <Image
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL!}
            src={item.image}
            alt={item.title}
            width={320}
            height={320}
            className="pointer-events-none relative z-10 h-80 w-80 object-cover"
          />
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
}
