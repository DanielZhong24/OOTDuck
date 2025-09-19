import React from 'react';

interface ImageSkeletonProps {
  className?: string;
}

const ImageSkeleton: React.FC<ImageSkeletonProps> = ({ className }) => {
  return (
    <div className={`animate-pulse rounded bg-gray-200 ${className}`}></div>
  );
};

export default ImageSkeleton;