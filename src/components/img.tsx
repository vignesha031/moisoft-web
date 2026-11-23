import type { ImgHTMLAttributes } from 'react';

type ImgProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> & {
  src: string;
  alt: string;
  /** Stretch to fill the positioned parent (same as next/image `fill`). */
  fill?: boolean;
  /** Eager-load above-the-fold images. */
  priority?: boolean;
};

/** Plain <img> wrapper replacing next/image. Paths such as "/images/..." are served from /public. */
export function Img({ fill, priority, style, loading, decoding, ...props }: ImgProps) {
  const fillStyle = fill ? { position: 'absolute' as const, inset: 0, width: '100%', height: '100%' } : undefined;
  return (
    <img
      {...props}
      loading={loading ?? (priority ? 'eager' : 'lazy')}
      decoding={decoding ?? 'async'}
      fetchPriority={priority ? 'high' : undefined}
      style={{ ...fillStyle, ...style }}
    />
  );
}
