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

export function ProfileForm({
  onSuccess,
  submitText = "Сохранить",
}: {
  onSuccess?: () => void;
  submitText?: string;
}) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(console.log)} className="space-y-8">
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
          disabled
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
          {false && (
            <Spinner className="mr-2 w-4 h-4" aria-label="Обновление профиля" />
          )}
          {submitText}
        </Button>
      </form>
    </Form>
  );
}
