const ProfileIcon = ({ size = 32, color = "currentColor" }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="5.33333"
        cy="5.33333"
        r="5.33333"
        transform="matrix(-1 0 0 1 21.333 4)"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M6.66602 22.5792C6.66602 21.4321 7.38716 20.4088 8.46747 20.023V20.023C13.3381 18.2835 18.6606 18.2835 23.5312 20.023V20.023C24.6115 20.4088 25.3327 21.4321 25.3327 22.5792V24.3332C25.3327 25.9165 23.9304 27.1327 22.3631 26.9088L21.0905 26.727C17.7135 26.2446 14.2851 26.2446 10.9082 26.727L9.63563 26.9088C8.06829 27.1327 6.66602 25.9165 6.66602 24.3332V22.5792Z"
        stroke={color}
        strokeWidth="2"
      />
    </svg>
  );
};

export default ProfileIcon;
