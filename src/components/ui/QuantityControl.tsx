import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  className?: string;
}

export function QuantityControl({
  quantity,
  onIncrease,
  onDecrease,
  className = "",
}: QuantityControlProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={onDecrease}
        disabled={quantity < 1}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-400 text-gray-700 hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        aria-label="Decrease quantity"
      >
        <FaMinus className="w-3 h-3" />
      </button>
      <span className="w-8 text-center font-semibold text-gray-700">
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-400 text-gray-700 hover:bg-yellow-500 transition-colors duration-200"
        aria-label="Increase quantity"
      >
        <FaPlus className="w-3 h-3" />
      </button>
    </div>
  );
}
