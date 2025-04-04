"use client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const RenderSkeletonCards = () => {
  return Array.from({ length: 20 }).map((_, index) => (
    <div
      key={index}
      className="flex w-full flex-col items-center p-6 bg-yellow-100 shadow-lg rounded-lg"
    >
      <div className="w-full h-40 mb-4">
        <Skeleton height={160} width="100%" borderRadius={10} />
      </div>
      <Skeleton width="60%" height={20} className="mb-2" />
      <Skeleton width="50%" height={15} className="mb-2" />
      <Skeleton width="70%" height={20} className="mb-2" />
      <Skeleton width="90%" height={40} borderRadius={8} />
    </div>
  ));
};

export default RenderSkeletonCards;
