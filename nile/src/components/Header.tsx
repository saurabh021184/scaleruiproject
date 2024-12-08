// components/Header.tsx
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-blue-200">
      <div className="flex items-center gap-4">
        <button className="text-xl">&#9776;</button>
        {/* <Image src="/logo.png" alt="Logo" width={50} height={50} /> */}
        <span className="text-lg font-bold">All</span>
      </div>
      <SearchBar />
      <button className="text-2xl">&#128722;</button>
    </header>
  );
};

export default Header;
