import Image from 'next/image';

import { cn } from '../lib/utils';

interface ImageContainerProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function ImageContainer({
  src,
  alt,
  width = 600,
  height = 400,
  className,
}: ImageContainerProps) {
  return (
    <div className={cn('my-5 flex justify-center', className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="max-w-full rounded-lg shadow-md"
        unoptimized={src.startsWith('http')}
      />
    </div>
  );
}
