import Link from "next/link";

import { SectionProps } from "@/interfaces/general";

const SectionCard = ({ icon, title, url }: SectionProps) => {
  return (
    <Link
      className="max-w-44 w-full rounded-md shadow-lg bg-white p-4 flex flex-col items-center justify-center gap-4"
      href={url}
      aria-label={`link to ${title}`}
    >
      {icon}
      <h3 className="h3 font-semibold">{title}</h3>
    </Link>
  );
};

export default SectionCard;
