"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AvatarField } from "./avatar-field";
import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/spinner";
import { Profile } from "@/entities/user/profile";
import { UserId } from "@/entities/user/_domain/types";
import { useUpdateProfile } from "../_vm/use-update-profile";

const profileFormSchema = z.object({
  name: z
    .string()
    .max(30, {
      message: "Длина имени пользователя не должна превышать 30 символов",
    })
    .transform((name) => name.trim())
    .optional(),
  email: z.string().email().optional(),
  image: z.string().optional(),
});
type ProfileFormValues = z.infer<typeof profileFormSchema>;

const getDefaultFormValue = (profile: Profile) => ({
  email: profile.email,
  name: profile.name ?? "",
  image: profile.image ?? undefined,
});

export function ProfileForm({
  profile,
  userId,
  onSuccess,
  submitText = "Сохранить",
}: {
  profile: Profile;
  userId: UserId;
  onSuccess?: () => void;
  submitText?: string;
}) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: getDefaultFormValue(profile),
  });

  const updateProfile = useUpdateProfile();

  const handleSubmit = form.handleSubmit(async (data) => {
    const updateResult = await updateProfile.update({
      userId,
      data,
    });
    form.reset(getDefaultFormValue(updateResult.profile));
    onSuccess?.();
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          disabled
          render={({ field }) => (
            <FormItem>
              <FormLabel>EMail</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя пользователя</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Аватарка</FormLabel>
              <FormControl>
                <AvatarField value={field.value} onChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">
          {updateProfile.isPending && (
            <Spinner className="mr-2 w-4 h-4" aria-label="Обновление профиля" />
          )}
          {submitText}
        </Button>
      </form>
    </Form>
  );
}
