import { useSidebarStore } from "@/stores";
import { ProfileIcon } from "../Icons";
import { useShallow } from "zustand/react/shallow";

const Profile = () => {
  const { setIsSidebarOpen, setSidebarType } = useSidebarStore(
    useShallow((state) => ({
      setIsSidebarOpen: state.setIsSidebarOpen,
      setSidebarType: state.setSidebarType,
    }))
  );

  const handleOpenSidebar = () => {
    setSidebarType("auth");
    setIsSidebarOpen();
  };

  return (
    <button name="botón de perfil" onClick={handleOpenSidebar}>
      <ProfileIcon />
    </button>
  );
};

export default Profile;
