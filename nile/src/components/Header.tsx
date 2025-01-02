// components/Header.tsx
"use client"
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Header = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  // Fetch the user name from the database based on user_id from cookies
  useEffect(() => {
    const fetchUserName = async () => {
      const userId = Cookies.get("userId");
      if (userId) {
        try {
          const response = await fetch(`/api/users/username?userId=${userId}`);
          const data = await response.json();
          if (response.ok) {
            setUserName(data.user_name);
          }
        } catch (error) {
          console.error("Failed to fetch user name:", error);
        }
      }
    };

    fetchUserName();
  }, []);

  const handleSignInClick = () => {
    router.push("/login");
  };

  const handleUserIconClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    Cookies.remove("userId");
    Cookies.remove("token");
    setUserName(null);
    setIsDropdownOpen(false);
    router.push("/");
  };

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
      <div className="relative flex items-center gap-4">
        {/* Show "Sign In" or "Hi, User Name" based on login state */}
        {userName ? (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleUserIconClick}
          >
            <span className="text-lg font-bold">Hi, {userName}</span>
            <img
              src="/icons/user_icon.png" // Public folder path
              alt="User Icon"
              className="w-8 h-8 rounded-full"
            />
          </div>
        ) : (
          <button
            className="text-lg font-bold text-blue-700"
            onClick={handleSignInClick}
          >
            Sign In
          </button>
        )}
        {/* Dropdown for User Options */}
        {isDropdownOpen && userName && (
          <div className="absolute right-0 mt-10 bg-white border rounded shadow-lg">
            <ul>
              <li
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
        {/* Cart Icon */}
        <button className="text-2xl">&#128722;</button>
      </div>
    </header>
  );
};

export default Header;
