// components/LoginForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // To handle page redirection

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState<string | null>(null); // To handle errors
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ username, password, rememberMe });
    setError(null); // Reset previous errors
    try {
      // Send login request to the API
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        // If login is successful, redirect to profile page
        router.push("/profile");
      } else {
        // If login fails, show error message
        const data = await response.json();
        setError(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("An unexpected error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && <div className="text-red-500 text-center">{error}</div>}
      <div>
        <label htmlFor="username" className="block text-gray-700 mb-1">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-gray-700 mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="mr-2"
          />
          Remember me
        </label>
        <button
          type="button"
          onClick={() => router.push("/forgot-password")}
          className="text-blue-500 hover:underline"
        >
          Forgot Password?
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
      >
        Login
      </button>

      <p className="text-center text-gray-600 mt-4">
        New Member?{" "}
        <a href="#" className="text-blue-500 hover:underline">
          Register
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
