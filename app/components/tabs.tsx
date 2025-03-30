"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import sidebarLinks from "../data/sidebarLinks";

const Tabs = () => {
  const currentPath = usePathname();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth");
      window.location.reload();
    }
  };

  return (
    <nav className="scrollbar-hide flex w-full items-center gap-4 overflow-x-scroll md:hidden">
      {sidebarLinks.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          className={`${link.href === currentPath && "border-b-2 border-accent-900 font-medium text-accent-900"} ${link.href === "/account/logout" && "font-medium text-red-600"} min-w-[fit-content] pb-1`}
        >
          {link.label}
        </Link>
      ))}

      <button
        className="rounded-xl bg-red-100 px-3 py-1 font-medium text-red-500"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
};

export default Tabs;
