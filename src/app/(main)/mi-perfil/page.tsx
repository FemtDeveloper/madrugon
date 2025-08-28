"use client";

import { Loader } from "@/components/Ui";
import { getMyProfile } from "@/utils/getMyProfile";
import { useEffect } from "react";
import Avatar from "./components/Avatar";
import { UserInfo } from "./components/UserInfo";

const ProfilePage = () => {
  useEffect(() => {
    getMyProfile();
  }, []);
  return (
    <>
      <Loader />
      <section className="flex flex-col w-full p-6 md:px-0 gap-8 max-w-wrapper">
        <h1 className="h2_bold">Mi perfil</h1>
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
