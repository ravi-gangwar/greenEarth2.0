"use client";
import React, { useState } from "react";
import Image from "next/image";
import { trpc } from "../_trpc/client";
import { TextShortner } from "@/utils";
import { ruppee } from "../constant/constant";
import * as Dialog from "@radix-ui/react-dialog";
import { ITree } from "@/types/Ttree";


function Plants() {
  const [selectedPlant, setSelectedPlant] = useState<ITree | null>(null);

  // Fetch data using tRPC
  const { data, isLoading, isError } = trpc.treeRoutes.getAllTrees.useQuery();
  console.log(data);

  // Handling loading and error states
  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  if (isError)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
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
            onClick={() => setSelectedPlant(plant)} // Set selected plant on click
          >
            <div className="relative w-full h-40">
              <Image
                src={plant.imageUrl}
                alt={plant.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                priority={index < 3} // Prioritize loading for the first few images
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
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-100 rounded-lg shadow-lg p-6 w-11/12 max-w-lg">
            {selectedPlant && (
              <div>
                <div className="relative w-full h-80 mb-4">
                  <Image
                    src={selectedPlant.imageUrl}
                    alt={selectedPlant.name}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                  />
                </div>
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
            )}
            <div className="flex justify-center mt-6 gap-5">
              <button className="hover:cursor-pointer mt-4 px-4 py-2 bg-yellow-400 text-gray-700 rounded-md hover:bg-yellow-500 transition-colors duration-300">
                Add to cart
              </button>
              <Dialog.Close asChild>
                <button className="hover:cursor-pointer mt-4 px-4 py-2 bg-yellow-400 text-gray-700 rounded-md hover:bg-yellow-500 transition-colors duration-300">
                  close
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