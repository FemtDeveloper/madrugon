import HeroCarousel from "./HeroCarousel";

interface Props {
  content: Hero[];
}

// Server component: the carousel (client island) is server-rendered so the
// first hero image is in the initial HTML (better LCP and SEO).
export const Hero = ({ content }: Props) => {
  return (
    <div className="w-full flex flex-col">
      <section className="w-full h-[544px] lg:h-[620px] max-w-(--breakpoint-2xl) mx-auto relative">
        <HeroCarousel content={content} />
      </section>
    </div>
  );
};

export default Hero;
