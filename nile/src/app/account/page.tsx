// app/account/page.tsx
import AccountSection from "@/components/AccountSection";
import Header from "@/components/Header";

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-blue-100">
      <Header />
      <div className="max-w-screen-lg mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Your Account</h1>
        <AccountSection />
      </div>
    </div>
  );
}
