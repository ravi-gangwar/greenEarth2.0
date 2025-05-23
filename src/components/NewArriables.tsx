import React from "react";
import NewArriavlsTreeCard from "./ui/NewArriavlsTreeCard";
import { Ultra as UltraFont } from "next/font/google";
import { trpc } from "@/app/_trpc/client";
// Import Google Font
const ultra = UltraFont({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

function NewArriables() {
  const { data: trendingPlants, isPending } =
    trpc.homeRoutes.getTrendingPlants.useQuery();
  if (!trendingPlants && !isPending) {
    return null;
  }
  return (
    <div className="flex flex-col justify-center bg-[#F3F4F5]">
      <h1
        className={`${ultra.className} text-blue text-lg md:text-3xl font-bold mt-5 mb-5 px-2 underline decoration-wavy`}
      >
        New Arrivals:
      </h1>

      {/* Desktop view with flex-wrap for multiple cards */}
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
          trendingPlants?.tree.map((tree) => (
            <NewArriavlsTreeCard
              pop={false}
              left={true}
              key={tree._id}
              name={tree.name}
              price={tree.price}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default NewArriables;
