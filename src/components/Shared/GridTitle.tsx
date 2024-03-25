import { StarIcon } from "../Icons";

interface Props {
  title: string;
  subtitle: string;
}

const GridTitle = ({ title, subtitle }: Props) => {
  return (
    <div className="titleContainer flex flex-col gap-1">
      <p className="l1 lg:b2 text-p-1 text-center uppercase">{subtitle}</p>
      <div className="flex gap-2 items-center">
        <StarIcon />
        <h2 className="h3 text-title  lg:text-4xl text-center">{title}</h2>
        <StarIcon />
      </div>
    </div>
  );
};

export default GridTitle;
