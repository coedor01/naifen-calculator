import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <div className="fixed top-0 w-full h-full bg-red-50 flex items-center justify-center">
          {children}
        </div>
      </body>
    </html>
  );
}
