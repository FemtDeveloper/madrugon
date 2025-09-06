"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";

import { EditImageIcon } from "@/components/Icons";
import { uploadImageToFirebase } from "@/services/uploads";
import { updateUserClient } from "@/services/user";
import { useUserStore } from "@/stores";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";

const Avatar = () => {
  const user = useUserStore((state) => state.user);
  const inputRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState(
    user?.profile_image_url ?? "/assets/images/isoicon.png"
  );

  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;
    const url = await uploadImageToFirebase(
      file,
      { kind: "profile", userId: user.id },
      { width: 400, quality: 80, format: "webp" }
    );
    setAvatarUrl(url);
    await updateUserClient({ profile_image_url: url } as any, user.id);
  };
  const { mutate } = useMutation({
    mutationKey: ["avatarUpdate"],
    mutationFn: handleAvatarChange,
  });

  useEffect(() => {
    if (user && user.profile_image_url) setAvatarUrl(user.profile_image_url);
    return () => {};
  }, [user]);

  return (
    <div className="flex items-start justify-center w-full">
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
        accept="image/*"
        className="hidden"
        ref={inputRef}
        onChange={mutate}
      />
    </div>
  );
};

export default Avatar;
