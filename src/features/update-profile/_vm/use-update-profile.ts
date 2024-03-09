import { useAppSession } from "@/entities/user/session";
import { updateProfileAction } from "../_actions/update-profile";
import { useMutation } from "@tanstack/react-query";
import { useInvalidateProfile } from "@/entities/user/profile";

export const useUpdateProfile = () => {
  const { update: updateSession } = useAppSession();
  const invalidateProfile = useInvalidateProfile();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateProfileAction,
    async onSuccess({ profile }, { userId }) {
      await invalidateProfile(userId);
      await updateSession({ user: profile });
    },
  });
  return { update: mutateAsync, isPending };
};
