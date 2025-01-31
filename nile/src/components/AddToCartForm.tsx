"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AddToCartFormProps {
  productId: number;
  price: number;
}

const AddToCartForm: React.FC<AddToCartFormProps> = ({ productId, price }) => {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  const handleAddToCart = () => {
    router.push(`/cart?productId=${productId}&price=${price}&quantity=${quantity}`);
  };

  return (
    <div className="bg-blue-200 p-4 rounded-lg flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <label htmlFor="quantity" className="font-semibold">
          Quantity:
        </label>
        <select
          id="quantity"
          value={quantity}
          onChange={handleQuantityChange}
          className="p-2 border rounded-md"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
      <button
        className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
      <button className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
        Buy Now
      </button>
    </div>
  );
};

export default AddToCartForm;
