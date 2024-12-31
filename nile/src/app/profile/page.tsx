"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import axios from 'axios';
import Cookies from 'js-cookie';

import Header from '../../components/Header';

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

const ProfilePage = () => {
  const router = useRouter();
  const [address, setAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching the userId from cookies or localStorage
    // const userId = localStorage.getItem('userId'); // Replace with actual auth logic
    const userId = Cookies.get('userId'); // Get userId cookie

    // const userId = 1
    console.log("userId from cookie: ", userId); // Debugging line

    if (!userId) {
      router.push('/login'); // Redirect to login if not authenticated
      return;
    }

    // Fetch the address for the user
    const fetchAddress = async () => {
      try {
        const response = await axios.get(`/api/users/address?userId=${userId}`);
        setAddress(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch address.');
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, [router]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: '20px', backgroundColor: '#E0F7FA' }}>
        <Header />
      <h1>Your Profile</h1>
      <h2>Your Address</h2>
      {address ? (
        <div>
          <p>Street: {address.street}</p>
          <p>City: {address.city}</p>
          <p>State: {address.state}</p>
          <p>ZIP: {address.zip}</p>
        </div>
      ) : (
        <p>No address found.</p>
      )}
    </div>
  );
};

export default ProfilePage;