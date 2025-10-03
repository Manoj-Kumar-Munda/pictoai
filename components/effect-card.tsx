import Image, { StaticImageData } from "next/image";

interface AIEffectCardProps {
  name: string;
  demo: StaticImageData;
}

const AIEffectCard = ({ name, demo }: AIEffectCardProps) => {
  return (
    <div key={name} className="bg-neutral-200 rounded-lg p-1">
      <Image
        src={demo}
        alt={name}
        className="w-24 h-24 object-cover object-top rounded-md"
      />
      <p className="text-sm font-bold text-center text-neutral-800">
        {name}
      </p>
    </div>
  );
};

export default AIEffectCard;