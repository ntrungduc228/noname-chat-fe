import { HTMLAttributes, forwardRef, useMemo } from 'react';
import { Shape, Size } from '@/types/style';

import Image from 'next/image';
import { cn } from '@/utils';
import { generateInitials } from '@/utils/generate-initials';

type AvatarSize = Size | 'xLarge';

const sizes: Record<AvatarSize, string> = {
  small: 'w-8 h-8',
  medium: 'w-12 h-12',
  large: 'w-16 h-16',
  xLarge: 'w-24 h-24',
};

const sizeNumbers: Record<AvatarSize, number> = {
  small: 32,
  medium: 48,
  large: 64,
  xLarge: 96,
};

const sizeAlphabet: Record<AvatarSize, string> = {
  small: 'text-xs',
  medium: 'text-sm',
  large: 'text-md',
  xLarge: 'text-2xl',
};

const shapes: Record<Shape, string> = {
  circle: 'rounded-full',
  square: 'rounded-lg',
};

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  shape?: Shape;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt = 'Avatar', shape = 'circle', size = 'medium', className, ...props }, ref) => {
    const DisplayContent = useMemo(() => {
      if (!src) {
        return (
          <div className="flex h-full w-full items-center justify-center">
            <span className={cn('font-bold', sizeAlphabet[size])}>{generateInitials(alt)}</span>
          </div>
        );
      }
      return (
        <Image
          priority={false}
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={`${sizeNumbers[size] * 2}px`}
        />
      );
    }, [src, alt, size]);

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-block shrink-0 overflow-hidden bg-gray-200',
          shapes[shape],
          sizes[size],
          className,
        )}
        {...props}
      >
        {DisplayContent}
      </div>
    );
  },
);

Avatar.displayName = 'Avatar';
