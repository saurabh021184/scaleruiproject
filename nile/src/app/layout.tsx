// app/layout.tsx
import "../styles/globals.css";

export const metadata = {
  title: "Next.js UI Demo",
  description: "Transforming UI Design to Next.js Code",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">{children}</body>
    </html>
  );
}
