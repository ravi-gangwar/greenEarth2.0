"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { trpc } from "@/app/_trpc/client";
import { ITree } from "@/types/Ttree";
import { RootState } from "@/store/store";
import { ruppee } from "../constant/constant";
import { TextShortner } from "@/utils";
import { QuantityControl } from "@/components/ui/QuantityControl";
import {
  addToCart,
  updateQuantity,
  removeFromCart,
} from "@/store/features/cartReducer";
import PlantDetailsModal from "../_components/PlantDetailsModal";
import RenderSkeletonCards from "../_components/Skeletons";

const PlantCard = ({
  plant,
  cartItem,
  onAddToCart,
  onIncrease,
  onDecrease,
  onSelect,
}: {
  plant: ITree;
  cartItem?: RootState["cart"]["items"][0];
  onAddToCart: (plant: ITree) => void;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onSelect: (plant: ITree) => void;
}) => {
  return (
    <motion.div
      className="flex flex-col bg-gradient-to-r from-[rgba(224,205,39,0.2)] to-[rgba(231,228,22,0.73)] shadow-lg rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-4"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div onClick={() => onSelect(plant)} className="w-full cursor-pointer">
        <div className="relative w-full h-40 mb-4">
          {plant.imageUrl ? (
            <Image
              src={plant.imageUrl}
              alt={plant.name}
              fill
              className="rounded-lg object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-300 rounded-lg flex items-center justify-center">
              <span>No Image</span>
            </div>
          )}
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {plant.name}
          </h2>
          <p className="text-sm text-gray-600 mb-2">
            Category: {plant.category || "Uncategorized"}
          </p>
          <p className="text-lg font-bold text-gray-700 mb-2">
            Price: {ruppee + plant.price}
          </p>
          <p className="text-sm text-gray-500">
            {TextShortner(plant.description ?? "", 100)}
          </p>
        </div>
      </div>

      <div className="mt-4 w-full">
        {cartItem ? (
          <div className="flex flex-col items-center gap-2">
            <QuantityControl
              quantity={cartItem.quantity}
              onIncrease={() => onIncrease(plant.id)}
              onDecrease={() => onDecrease(plant.id)}
            />
            <span className="text-sm text-gray-600">
              Total: {ruppee + cartItem.price * cartItem.quantity}
            </span>
          </div>
        ) : (
          <button
            className="w-full py-2 px-4 bg-yellow-400 text-gray-700 rounded-md hover:bg-yellow-500 transition-colors duration-300 font-semibold"
            onClick={() => onAddToCart(plant)}
          >
            Add to cart
          </button>
        )}
      </div>
    </motion.div>
  );
};

const Plants = () => {
  const [selectedPlant, setSelectedPlant] = useState<ITree | null>(null);
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const {
    data: plants,
    isLoading,
    isError,
  } = trpc.treeRoutes.getAllTrees.useQuery();

  const handleAddToCart = useCallback(
    (plant: ITree) => {
      dispatch(addToCart(plant));
      toast.success("Added to cart!");
    },
    [dispatch]
  );

  const handleIncreaseQuantity = useCallback(
    (id: number) => {
      const item = cart.items.find((item) => item.id === id);
      if (item) {
        dispatch(updateQuantity({ id, quantity: item.quantity + 1 }));
      }
    },
    [cart.items, dispatch]
  );

  const handleDecreaseQuantity = useCallback(
    (id: number) => {
      const item = cart.items.find((item) => item.id === id);
      if (item && item.quantity > 1) {
        dispatch(updateQuantity({ id, quantity: item.quantity - 1 }));
      } else {
        // remove item from cart
        if (item) {
          dispatch(removeFromCart(item.id));
        }
      }
    },
    [cart.items, dispatch]
  );

  const handleSelectPlant = useCallback((plant: ITree) => {
    setSelectedPlant(plant);
  }, []);

  if (isLoading)
    return (
      <div className="w-full p-4 bg-gradient-to-r from-[rgba(224,205,39,0.2)] to-[rgba(231,228,22,0.73)]">
        <h1 className="text-center text-4xl font-bold text-gray-800 mb-10">
          Plants List
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {<RenderSkeletonCards />}
        </div>
      </div>
    );

  if (isError || !plants)
    return (
      <div className="text-center py-10 text-red-600">
        Failed to load plants
      </div>
    );

  return (
    <div className="w-full p-4 bg-gradient-to-r from-[rgba(224,205,39,0.2)] to-[rgba(231,228,22,0.73)]">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-10">
        Plants List
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {plants.map((plant) => (
          <PlantCard
            key={plant.id}
            plant={plant}
            cartItem={cart.items.find((item) => item.id === plant.id)}
            onAddToCart={handleAddToCart}
            onIncrease={handleIncreaseQuantity}
            onDecrease={handleDecreaseQuantity}
            onSelect={handleSelectPlant}
          />
        ))}
      </div>
      {selectedPlant && (
        <PlantDetailsModal
          plant={selectedPlant}
          onClose={() => setSelectedPlant(null)}
        />
      )}
    </div>
  );
};

export default Plants;
