"use client";
import React, { useState } from "react";
import Image from "next/image";
import { trpc } from "../_trpc/client";
import { TextShortner } from "@/utils";
import { ruppee } from "../constant/constant";
import * as Dialog from "@radix-ui/react-dialog";
import { ITree } from "@/types/Ttree";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Plants() {
  const [selectedPlant, setSelectedPlant] = useState<ITree | null>(null);

  // Fetch data using tRPC
  const { data, isLoading, isError } = trpc.treeRoutes.getAllTrees.useQuery();

  // Skeleton placeholder structure
  const RenderSkeletonCards = () => {
    const skeletonCount = 10; // Number of skeleton cards to show
    return Array.from({ length: skeletonCount }, (_, index) => (
      <div
        key={index}
        className="flex flex-col items-center p-6 bg-yellow-100 shadow-lg rounded-lg"
      >
        <div className="relative w-full h-40 mb-4">
          <Skeleton
            highlightColor="#EFE856"
            baseColor="#F7F0B6"
            height={160}
            width="100%"
            borderRadius={10}
          />
        </div>
        <Skeleton width="60%" height={20} className="mb-2" />
        <Skeleton width="50%" height={15} className="mb-2" />
        <Skeleton width="70%" height={20} className="mb-2" />
        <Skeleton width="90%" height={40} borderRadius={8} />
      </div>
    ));
  };

  // Handling loading and error states
  if (isLoading)
    return (
      <div className="max-w-full mx-auto p-4 bg-gradient-to-r from-[rgba(224,205,39,0.2)] to-[rgba(231,228,22,0.73)]">
        <h1 className="text-center text-4xl font-bold text-gray-800 mb-10">
          Plants List
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {<RenderSkeletonCards />}
        </div>
      </div>
    );
  

  if (isError)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600 bg-yellow-100">
        Error loading data
      </div>
    );

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[rgba(224,205,39,0.2)] to-[rgba(231,228,22,0.73)] p-4">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-10">
        Plants List
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-full mx-auto">
        {data?.map((plant: ITree, index: number) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 bg-yellow-100 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
            onClick={() => setSelectedPlant(plant)}
          >
            <div className="relative w-full h-40">
              <Image
                src={plant.imageUrl}
                alt={plant.name}
                fill
                className="rounded-lg"
                priority={index < 3}
              />
            </div>
            <div className="mt-4 text-center">
              <h2 className="text-xl font-semibold text-gray-800">{plant.name}</h2>
              <p className="text-sm text-gray-600">
                Category: {plant.category || "Uncategorized"}
              </p>
              <p className="text-lg font-bold text-gray-700 mt-1">
                Price: {ruppee + plant.price}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {TextShortner(plant.description ?? "", 100)}
              </p>
            </div>
            <button className="hover:cursor-pointer mt-4 px-4 py-2 bg-yellow-400 text-gray-700 rounded-md hover:bg-yellow-500 transition-colors duration-300">
              Add to cart
            </button>
          </div>
        ))}
      </div>

      {/* Dialog for Plant Details */}
      <Dialog.Root open={!!selectedPlant} onOpenChange={() => setSelectedPlant(null)}>
        <Dialog.Portal>
          {/* Overlay */}
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />

          {/* Dialog Content */}
          <Dialog.Content
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                bg-yellow-100 rounded-lg shadow-lg p-6 w-11/12 max-w-lg max-h-[90vh] 
                overflow-y-auto flex flex-col"
          >
            <Dialog.DialogTitle>{selectedPlant?.name}</Dialog.DialogTitle>
            {selectedPlant && (
              <div>
                {/* Image Section */}
                <div className="relative w-full h-64 mb-4 flex items-center justify-center">
                  <Image
                    src={selectedPlant.imageUrl}
                    alt={selectedPlant.name}
                    fill
                    className="rounded-lg max-h-[250px] max-w-full"
                  />
                </div>

                {/* Plant Details */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {selectedPlant.name}
                  </h2>
                  <p className="text-lg text-gray-600 mb-2">
                    Category: {selectedPlant.category || "Uncategorized"}
                  </p>
                  <p className="text-lg font-semibold text-gray-700 mb-2">
                    Price: {ruppee + selectedPlant.price}
                  </p>
                  <p className="text-md text-gray-500 mb-4">
                    {selectedPlant.description}
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center mt-6 gap-4">
              <button
                className="px-4 py-2 bg-yellow-400 text-gray-700 rounded-md 
                    hover:bg-yellow-500 transition-colors duration-300"
              >
                Add to cart
              </button>
              <Dialog.Close asChild>
                <button
                  className="px-4 py-2 bg-yellow-400 text-gray-700 rounded-md 
                      hover:bg-yellow-500 transition-colors duration-300"
                >
                  Close
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

    </div>
  );
}

export default Plants;