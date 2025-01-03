"use client"

import { useEffect, useState } from "react";
import { products as defaultProducts } from "@/utils/productsData";
import Cookies from "js-cookie";

const ProductGrid = () => {
  const [recommendedProducts, setRecommendedProducts] = useState(defaultProducts.slice(0, 4));

  console.log('entering use Effect')

  useEffect(() => {
    const fetchRecommendations = async () => {
      const token = Cookies.get("token");
      const userId = Cookies.get("userId");

      console.log(`token ${token}, userID ${userId}`)

      // if (token && userId) {
      try {
        const response = await fetch("/api/users/recommendations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        if (response.ok) {
          const data = await response.json();
          setRecommendedProducts(data);
        } else {
          console.error("Failed to fetch user-specific recommendations");
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
      // }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="p-4 bg-blue-100 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">
        Recommendations of products
      </h2>
      <div className="grid grid-cols-4 gap-4">
        {recommendedProducts.map((product) => (
          <div
            key={product.id}
            className="w-20 h-20 bg-white rounded-lg shadow-md flex items-center justify-center"
          >
            {product.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
