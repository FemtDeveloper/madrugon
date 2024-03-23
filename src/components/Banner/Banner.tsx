import Image from "next/image";
import { CustomLink } from "../Ui";

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
    <section className="w-full max-w-wrapper flex items-center justify-center relative lg:h-[333px] h-80 lg:rounded-3xl p-6 lg:p-10">
      <Image
        src={img}
        alt="title"
        width={1220}
        height={312}
        className="h-full w-full lg:rounded-3xl absolute object-cover"
      />
      <div className="h-full w-full flex  lg:flex-row flex-col-reverse justify-between  bg-blur gap-2 lg:gap-10 z-10">
        <div className="leftContent flex flex-col justify-center items-center gap-5 lg:gap-10">
          <div className="subtitle flex flex-col justify-center items-center gap-2 text-white lg:max-w-[420px] rounded-3xl max-h-56 lg:p-4">
            <h5 className="lg:d3 text-[28px] text-center">{subtitle}</h5>
            <h6 className="hidden lg:block text-center max-w-80">
              {subtitleDescription}
            </h6>
          </div>
          <CustomLink btnTitle={btnTitle} path={path} variant="large" />
        </div>
        <div className="rightContent flex flex-col justify-end items-center gap-2 lg:gap-10">
          <div className="subtitle flex flex-col justify-center gap-1 text-white rounded-3xl max-h-52 p-4">
            <h5 className="lg:d1 text-[52px] leading-none text-center">
              {title}
            </h5>
            <h6 className="text-center">{titleDescription}</h6>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerComponent;
