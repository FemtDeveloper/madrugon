import Link from "next/link";
import { ProfileIcon } from "../Icons";

const Profile = () => {
  return (
    <Link aria-label="botón de perfil" href="/auth/login">
      <ProfileIcon />
    </Link>
  );
};

export default Profile;
