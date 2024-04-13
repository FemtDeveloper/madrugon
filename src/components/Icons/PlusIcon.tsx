const PlusIcon = ({ size = 20, color = "currentColor" }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 48 48"
    >
      <circle cx="24" cy="24" r="21" fill={color} />
      <g fill="#000">
        <path d="M21 14h6v20h-6z" />
        <path d="M14 21h20v6H14z" />
      </g>
    </svg>
  );
};

export default PlusIcon;
