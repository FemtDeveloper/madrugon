import Image from "next/image";

interface Props {
  content: Banner;
}

const BannerComponent = ({ content }: Props) => {
  const {
    btnTitle,
    subtitleDescription,
    titleDescription,
    img,
    path,
    title,
    subtitle,
  } = content;
  return (
    <div className="w-full relative h-[333px] lg:h-44">
      <Image src={img} alt="title" width={1220} height={312} />
      <div className="absolute h-full w-full"></div>
    </div>
  );
};

export default BannerComponent;
