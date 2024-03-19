import Image from "next/image";
import { CustomLink } from "../Ui";

interface Props {
  content: Hero;
}

const HeroSlide = ({ content }: Props) => {
  const { img, path, btnTitle, title, subtitle } = content;
  return (
    <div className="heroSlide flex flex-col relative justify-center items-center h-full gap-8">
      <Image
        src={img}
        width={2000}
        height={2000}
        alt="Hero image"
        className="absolute object-cover object-top -z-10 h-full"
      />
      <div className="titleContainer flex flex-col gap-3">
        <h2 className="d1 text-white text-center font-bold">{title}</h2>
        {subtitle && (
          <h5 className="b3 lg:b1 text-white text-center">{subtitle}</h5>
        )}
      </div>
      <CustomLink path={path} btnTitle={btnTitle} />
    </div>
  );
};

export default HeroSlide;
