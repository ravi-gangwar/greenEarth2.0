import React from "react";
import NewArriavlsTreeCard from "./ui/NewArriavlsTreeCard";
import { Ultra as UltraFont } from "next/font/google";
import { trpc } from "@/app/_trpc/client";
import { Button } from "./ui/button";
import Link from "next/link";

const ultra = UltraFont({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

function PopularCollections() {
  const { data: trendingPlants, isPending } =
    trpc.homeRoutes.getRecentTrendingPlants.useQuery();

  if (!trendingPlants) {
    return null;
  }
  return (
    <div className="flex flex-col justify-start bg-[#F3F4F5] pt-5">
      <div className="flex justify-between items-center">
        <h1
          className={`${ultra.className} text-blue text-lg md:text-3xl font-bold mt-5 mb-5 px-2 underline decoration-wavy`}
        >
          Recent Trending Plants :
        </h1>
        <Link href="/plants">
          <Button className="bg-blue text-white hover:bg-blue/90 font-bold mr-5">
            View All
          </Button>
        </Link>
      </div>
      <div className="flex flex-nowrap overflow-x-auto md:flex-wrap gap-5 px-2 justify-evenly overflow-y-hidden">
        {isPending ? (
          <>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white/50 backdrop-blur-sm rounded-xl p-6 animate-pulse w-[250px]"
              >
                <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </>
        ) : (
          trendingPlants?.recentPlants.map((tree, index) => (
            <NewArriavlsTreeCard
              name={tree.name}
              price={tree.price}
              pop={false}
              left={index % 2 === 0}
              key={tree._id}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default PopularCollections;
