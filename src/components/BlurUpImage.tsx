import React, { useState, useRef, useEffect } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface BlurUpImageProps extends Omit<HTMLMotionProps<'img'>, 'src' | 'alt'> {
  src: string;
  alt: string;
  srcSet?: string;
  className?: string;
  containerClassName?: string;
  blurRatio?: number;
  duration?: number;
}

export function BlurUpImage({
  src,
  alt,
  srcSet,
  className = '',
  containerClassName = '',
  blurRatio = 16,
  duration = 0.6,
  style,
  onLoad,
  ...rest
}: BlurUpImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }
  }, [src]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad(e);
    }
  };

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Background Pulse Skeleton while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-stone-800/40 animate-pulse z-0 pointer-events-none" />
      )}

      <motion.img
        ref={imgRef}
        src={src}
        srcSet={srcSet}
        alt={alt}
        onLoad={handleImageLoad}
        referrerPolicy="no-referrer"
        initial={{
          filter: `blur(${blurRatio}px)`,
          opacity: 0.2,
          scale: 1.05,
        }}
        animate={{
          filter: isLoaded ? 'blur(0px)' : `blur(${blurRatio}px)`,
          opacity: isLoaded ? 1 : 0.2,
          scale: isLoaded ? 1 : 1.05,
        }}
        transition={{
          duration,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={className}
        style={style}
        {...rest}
      />
    </div>
  );
}
