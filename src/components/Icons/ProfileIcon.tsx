const ProfileIcon = ({ size = 32, color = "currentCOlor" }: IconProps) => {
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
        transform="matrix(-1 0 0 1 21.3335 4)"
        stroke={color}
        stroke-width="2"
      />
      <path
        d="M6.6665 22.5792C6.6665 21.4321 7.38764 20.4088 8.46796 20.023V20.023C13.3386 18.2835 18.6611 18.2835 23.5317 20.023V20.023C24.612 20.4088 25.3332 21.4321 25.3332 22.5792V24.3332C25.3332 25.9165 23.9309 27.1327 22.3636 26.9088L21.091 26.727C17.714 26.2446 14.2856 26.2446 10.9087 26.727L9.63612 26.9088C8.06878 27.1327 6.6665 25.9165 6.6665 24.3332V22.5792Z"
        stroke={color}
        stroke-width="2"
      />
    </svg>
  );
};

export default ProfileIcon;
