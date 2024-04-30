"use client";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";

import { uploadImage } from "@/app/actions";
import { EditImageIcon } from "@/components/Icons";
import { useUserStore } from "@/stores";

const Avatar = () => {
  const user = useUserStore((state) => state.user);
  const inputRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState(
    user?.avatar ?? "/images/isoicon.png"
  );

  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && user) {
      const url = await uploadImage(e.target.files[0], user?.id);

      setAvatarUrl(url);
    }
  };
  const { mutate } = useMutation({
    mutationKey: ["avatarUpdate"],
    mutationFn: handleAvatarChange,
  });

  useEffect(() => {
    if (user && user.avatar) setAvatarUrl(user.avatar);
    return () => {};
  }, [user]);

  return (
    <div className="flex items-center justify-center w-full">
      <figure className="relative">
        <Image
          src={avatarUrl}
          className="rounded-full w-40 md:w-80 h-40 md:h-80 object-cover border border-black "
          alt="avatar"
          width={240}
          height={240}
        />
        <button
          className="absolute bottom-0 right-0"
          onClick={() => inputRef.current?.click()}
        >
          <EditImageIcon size={28} />
        </button>
      </figure>
      <input
        type="file"
        accept="image/png, image/gif, image/jpeg"
        className="hidden"
        ref={inputRef}
        onChange={mutate}
      />
    </div>
  );
};

export default Avatar;
