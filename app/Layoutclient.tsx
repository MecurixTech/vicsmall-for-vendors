"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./components/sidebar";
import Tabs from "./components/tabs";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuthPage = pathname === "/Sign-in" || pathname === "/Sign-Up";

  return (
    <>
      {!isAuthPage && <Navbar />}
      <div className="px-4">
        <div className={`flex flex-col items-start gap-6 md:flex-row ${isAuthPage ? "justify-center" : ""}`}>
          {!isAuthPage && <Sidebar />}
          {!isAuthPage && <Tabs />}
          <div className="w-full flex-[11]">{children}</div>
        </div>
      </div>
      {!isAuthPage && <Footer />}
    </>
  );
}
