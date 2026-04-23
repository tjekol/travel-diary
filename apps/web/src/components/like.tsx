import { Heart } from '@gravity-ui/icons';
import { HeartFill } from '@gravity-ui/icons';
import { ToggleButton } from '@heroui/react';

export default function Like({ isFilled: isFilled }: { isFilled: boolean }) {
  return (
    <ToggleButton isIconOnly aria-label='Like' size='md'>
      {isFilled ? <HeartFill /> : <Heart />}
    </ToggleButton>
  );
}
