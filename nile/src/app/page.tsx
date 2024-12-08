import Carousel from "@/components/Carousel";
import ProductGrid from "@/components/ProductGrid";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 flex-1 items-center sm:items-start">
        <Header />
        <div className="p-4 w-full">
          <Carousel />
        </div>
        <div className="p-4 w-full">
          <ProductGrid />
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row w-full"></div>
      </main>
      <footer className="flex gap-6 flex-wrap items-center justify-center p-4">
        TODO
      </footer>
    </div>
  );
}
