"use client";

import { CustomLink, Loader } from "@/components/Ui";

import Avatar from "./components/Avatar";
import { UserInfo } from "./components/UserInfo";
import { useRole } from "@/hooks";

const ProfilePage = () => {
  const { isAdmin } = useRole();

  return (
    <>
      <Loader />
      <section className="flex flex-col w-full p-6 md:px-0 gap-8 max-w-wrapper">
        <div className="flex items-center justify-between">
          <h1 className="h2_bold">Mi perfil</h1>
          {isAdmin && (
            <CustomLink btnTitle="Ir al Admin" path="/admin" size="medium" />
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row gap-9">
          <div className="w-full md:w-1/3 flex justify-center">
            <Avatar />
          </div>
          <div className="w-full md:w-2/3">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 border border-gray-100">
              <UserInfo />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
