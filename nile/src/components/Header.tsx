// components/Header.tsx
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-blue-200">
      <div className="flex items-center gap-4">
        {/* Clickable Logo on the far left */}
        <Link href="/" passHref>
          <div className="cursor-pointer flex items-center justify-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="font-bold text-gray-700">Logo</span>
            </div>
          </div>
        </Link>

        {/* Sidebar Button and "All" aligned together */}
        <button className="text-xl">&#9776;</button>
        <span className="text-lg font-bold">All</span>
      </div>
      <SearchBar />
      <button className="text-2xl">&#128722;</button>
    </header>
  );
};

export default Header;
