import { CustomLink } from "../Ui";
import Image from "next/image";

interface Props {
  content: Hero;
  shouldLoad?: boolean;
  isFirstSlide?: boolean;
}

const HeroSlide = ({ content, isFirstSlide = false }: Props) => {
  const { img, path, btnTitle, title, subtitle } = content;

  return (
    <div className="heroSlide flex flex-col relative justify-center items-center h-full gap-8">
      <Image
        src={img}
        fill
        alt={`Hero image for ${title}`}
        className="object-cover object-top -z-10"
        priority={isFirstSlide}
        sizes="(min-width: 1536px) 1536px, (min-width: 1280px) 1280px, (min-width: 1024px) 1024px, 100vw"
        quality={70}
        loading={isFirstSlide ? "eager" : "lazy"}
      />

      <h2 className="d1 text-white text-center font-bold">{title}</h2>
      {subtitle && (
        <h3 className="b3 lg:b1 text-white text-center">{subtitle}</h3>
      )}
      <CustomLink path={path} btnTitle={btnTitle} />
    </div>
  );
};

export default HeroSlide;
