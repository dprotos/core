import { ProfileAvatar } from "@/entities/user/profile";
import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/spinner";

export function AvatarField({
  value,
  onChange,
}: {
  value?: string;
  onChange: (value: string) => void;
}) {
  return (
    <Button
      variant="ghost"
      className="w-[84px] h-[84px] p-0.5 rounded-full relative block"
      type="button"
    >
      {false && (
        <div className="inset-0 absolute flex items-center justify-center z-10">
          <Spinner className="w-10 h-10" aria-label="Загрузка новой аватарки" />
        </div>
      )}
      <ProfileAvatar
        className="w-full h-full"
        profile={{ email: "test@test.ru", image: value }}
      />
    </Button>
  );
}
