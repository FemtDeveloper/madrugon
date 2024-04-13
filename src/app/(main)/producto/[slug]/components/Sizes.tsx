interface Props {
  sizes: string[];
}
const Sizes = ({ sizes }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-bold tracking-wider">Tallas disponibles:</h2>
      <div className="flex gap-2">
        {sizes?.map((s, i) => (
          <span
            className="py-1 px-2 border rounded-lg font-medium w-9 flex justify-center"
            key={i}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Sizes;
