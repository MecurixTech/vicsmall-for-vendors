"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import sidebarLinks from "../data/sidebarLinks";
import { LogoutOutlined } from "@mui/icons-material";

const Sidebar = () => {
  const currentPath = usePathname();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      window.location.reload();
    }
  };

  return (
    <aside className="hidden flex-[1] rounded-xl bg-white p-4 text-sm shadow-sm md:block">
      {sidebarLinks.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          className={`${link.href === currentPath && "bg-accent-100 text-accent-900"} mb-2 flex items-center gap-2 rounded-xl p-3`}
        >
          <link.icon fontSize="inherit" />
          <span>{link.label}</span>
        </Link>
      ))}
      <button
        onClick={handleLogout}
        className="mb-2 flex items-center gap-2 rounded-xl p-3"
      >
        <LogoutOutlined fontSize="inherit" />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
