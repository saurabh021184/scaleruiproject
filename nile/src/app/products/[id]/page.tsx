"use client";
// app/product/page.tsx
import AddToCartForm from "@/components/AddToCartForm";
import ProductDetails from "@/components/ProductDetails";
import ProductImage from "@/components/ProductImage";
import { usePathname } from "next/navigation";

export default function ProductPage() {
  const pathname = usePathname();
  // const searchParams = useSearchParams(); // TODO: use search params to get the product ID
  const id = pathname.split("/").pop();

  return (
    <div className="max-w-screen-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Product Page - ID: {id}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <ProductImage />
        </div>
        <div className="md:col-span-2 flex flex-col gap-4">
          <ProductDetails />
          <AddToCartForm />
        </div>
      </div>
    </div>
  );
}

