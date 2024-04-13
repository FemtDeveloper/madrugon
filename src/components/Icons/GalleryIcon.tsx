const GalleryIcon = ({ size = 20, color = "currentColor" }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 36 36"
    >
      <path
        fill={color}
        d="M30.14 3a1 1 0 0 0-1-1h-22a1 1 0 0 0-1 1v1h24Z"
        className="clr-i-solid clr-i-solid-path-1"
      ></path>
      <path
        fill={color}
        d="M32.12 7a1 1 0 0 0-1-1h-26a1 1 0 0 0-1 1v1h28Z"
        className="clr-i-solid clr-i-solid-path-2"
      ></path>
      <path
        fill={color}
        d="M32.12 10H3.88A1.88 1.88 0 0 0 2 11.88v18.24A1.88 1.88 0 0 0 3.88 32h28.24A1.88 1.88 0 0 0 34 30.12V11.88A1.88 1.88 0 0 0 32.12 10M8.56 13.45a3 3 0 1 1-3 3a3 3 0 0 1 3-3M30 28H6l7.46-7.47a.71.71 0 0 1 1 0l3.68 3.68L23.21 19a.71.71 0 0 1 1 0L30 24.79Z"
        className="clr-i-solid clr-i-solid-path-3"
      ></path>
      <path fill="none" d="M0 0h36v36H0z"></path>
    </svg>
  );
};

export default GalleryIcon;
