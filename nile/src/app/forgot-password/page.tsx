"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // New state for password
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const response = await fetch("/api/users/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }), // Send both username and password
      });

      if (response.ok) {
        setMessage("Password reset successful. Redirecting to login...");
        setTimeout(() => router.push("/login"), 3000);
      } else {
        const data = await response.json();
        setError(data.message || "Failed to reset password");
      }
    } catch (error) {
      console.error("Reset password failed:", error);
      setError("An unexpected error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
  {message && <div className="text-green-500 text-center">{message}</div>}
  {error && <div className="text-red-500 text-center">{error}</div>}

  <div className="max-w-md mx-auto">
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

  <div className="max-w-md mx-auto">
    <label htmlFor="password" className="block text-gray-700 mb-1">
      New Password
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

  <button
    type="submit"
    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
  >
    Reset Password
  </button>
</form>
  );
};

export default ForgotPassword;
