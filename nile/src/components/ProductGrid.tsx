// components/ProductGrid.tsx
import { products } from "@/utils/productsData";

const ProductGrid = () => {
  return (
    <div className="p-4 bg-blue-100 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">
        Recommendations of products
      </h2>
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
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
