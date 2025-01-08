"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import sidebarLinks from "../data/sidebarLinks";

const Sidebar = () => {
  const currentPath = usePathname();

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
    </aside>
  );
};

export default Sidebar;
