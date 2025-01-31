// components/ProductDetails.tsx
const ProductDetails = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-blue-200 p-4 rounded-lg">
        <h2 className="font-semibold text-lg">Product Description</h2>
      </div>
      <div className="bg-blue-200 p-4 rounded-lg">
        <h2 className="font-semibold text-lg">Discount and Cost</h2>
      </div>
      <div className="bg-blue-200 p-4 rounded-lg">
        <h2 className="font-semibold text-lg">Offers on Product</h2>
      </div>
      <div className="bg-blue-200 p-4 rounded-lg">
        <h2 className="font-semibold text-lg">Additional Product Details</h2>
      </div>
    </div>
  );
};

export default ProductDetails;
