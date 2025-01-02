import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";

import "./globals.css";
import Sidebar from "./components/sidebar";
import Tabs from "./components/tabs";
import Navbar from "./components/navbar";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

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
    <html lang="en">
      <body className={ubuntu.className}>
        <Navbar />
        <div className="px-8">
          <div className="flex flex-col items-start gap-6 md:flex-row">
            <Sidebar />
            <Tabs />
            <div className="w-full flex-[9]">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
