// app/login/page.tsx
import LoginForm from "@/components/LoginForm";
import Logo from "@/components/Logo";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <Logo />
        <h1 className="text-2xl font-bold mb-6 text-center">
          Login To Your Account
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
