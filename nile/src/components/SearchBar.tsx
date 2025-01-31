// components/SearchBar.tsx
const SearchBar = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search"
        className="w-96 p-2 rounded-md border-2 border-gray-300"
      />
      <span className="absolute left-2 top-2 text-gray-500">&#128269;</span>
    </div>
  );
};

export default SearchBar;
