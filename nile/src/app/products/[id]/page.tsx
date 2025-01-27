"use client";

import AddToCartForm from "@/components/AddToCartForm";
import Header from "@/components/Header";
import ProductDetails from "@/components/ProductDetails";
import ProductImage from "@/components/ProductImage";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Head from "next/head";
import Cookies from "js-cookie"; // Import the js-cookie library

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
};

export default function ProductPage() {
  const pathname = usePathname();
  const id = pathname?.split("/").pop();
  const productId = id && !isNaN(Number(id)) ? id : null;

  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) {
      setError("Invalid product ID in the URL.");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      const userId = Cookies.get("userId"); // Retrieve userId from cookies
      const headers: HeadersInit = { "Content-Type": "application/json" };

      if (userId) {
        headers["x-user-id"] = userId;
        // Include userId if found
      }

      try {
        const response = await fetch(`/api/products/${productId}`, {
          method: "GET",
          headers, // Dynamically set headers
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.status}`);
        }

        const data: Product = await response.json();
        setProduct(data);
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
          setError(err.message);
        } else {
          console.error("An unexpected error occurred", err);
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <p className="text-center mt-6">Loading product details...</p>;
  }

  if (error) {
    return (
      <div className="text-center mt-6 text-red-600">
        <p>Error: {error}</p>
        <p>Unable to load product details.</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-6 text-gray-600">
        <p>No product found.</p>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>{product.name} - ₹{product.price}</title>
        <meta name="description" content={`Buy ${product.name} for ₹${product.price}.`} />
      </Head>
      <Header />
      <div className="max-w-screen-lg mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {product.name} - ₹{product.price}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            {/* <ProductImage imageUrl={product.imageUrl} /> */}
            <ProductImage />
          </div>
          <div className="md:col-span-2 flex flex-col gap-4">
          <ProductDetails />
          <AddToCartForm productId={product.id} price={product.price} />
          </div>
        </div>
      </div>
    </div>
  );
}
