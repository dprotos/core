"use client";
import { Spinner } from "@/shared/ui/spinner";
import { useQuery } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { ProfileForm } from "./_ui/profile-form";

export function UpdateProfileForm({
  userId,
  callbackUrl,
}: {
  userId: string;
  callbackUrl?: string;
}) {
  const router = useRouter();
  //const { data, isPending } = useQuery({...getProfileQuery(userId),});

  const handleSuccess = () => {
    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  if (false) {
    return <Spinner aria-label="Загрузка профиля" />;
  }

  if (false) {
    return <div>Не удалось загрузить профиль.</div>;
  }

  return <ProfileForm submitText={callbackUrl ? "Продолжить" : "Сохранить"} />;
}
