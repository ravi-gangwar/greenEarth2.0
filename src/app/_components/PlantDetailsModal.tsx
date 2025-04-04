"use client";

import React from "react";
import Image from "next/image";
import { ITree } from "@/types/Ttree";
import { ruppee } from "@/app/constant/constant";
import { motion } from "framer-motion";

interface PlantDetailsModalProps {
  plant: ITree;
  onClose: () => void;
}

const PlantDetailsModal: React.FC<PlantDetailsModalProps> = ({
  plant,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-lg font-bold"
        >
          ×
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative w-full md:w-1/2 h-64">
            <Image
              src={plant.imageUrl}
              alt={plant.name}
              fill
              className="rounded-lg object-cover"
            />
          </div>

          <div className="flex flex-col gap-2 md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-800">{plant.name}</h2>
            <p className="text-gray-600">
              <strong>Category:</strong> {plant.category || "Uncategorized"}
            </p>
            <p className="text-gray-700 font-semibold text-lg">
              <strong>Price:</strong> {ruppee + plant.price}
            </p>
            <p className="text-gray-500 mt-2">{plant.description}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PlantDetailsModal;
