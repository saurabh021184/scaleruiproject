// components/Header.tsx
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-blue-200">
      <div className="flex items-center gap-4">
        {/* <Image src="/logo.png" alt="Logo" width={50} height={50} /> */}
        <button className="text-xl">&#9776;</button>

        <header className="bg-blue-200 p-4 flex items-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
            <span className="font-bold text-gray-700">Logo</span>
          </div>
        </header>
        <span className="text-lg font-bold">All</span>
      </div>
      <SearchBar />
      <button className="text-2xl">&#128722;</button>
    </header>
  );
};

export default Header;
