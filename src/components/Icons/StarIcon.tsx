const StarIcon = ({ size = 20, color = "currentCOlor" }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_513_374)">
        <path
          d="M10.4998 14.892L15.6498 18.0003L14.2832 12.142L18.8332 8.20033L12.8415 7.69199L10.4998 2.16699L8.15817 7.69199L2.1665 8.20033L6.7165 12.142L5.34984 18.0003L10.4998 14.892Z"
          fill="#EEAB28"
        />
      </g>
      <defs>
        <clipPath id="clip0_513_374">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(0.5 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default StarIcon;
