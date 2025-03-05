"use client";

import { NotificationsOutlined, SearchOutlined } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [fullName, setfullName] = useState<string | null>(null);
 
    useEffect(() => {
      const storedfullName = localStorage.getItem("fullName");
      if (storedfullName) {
        setfullName(storedfullName);
      }

   
    }, []);

  return (
    <nav className="mb-8 flex items-center justify-between bg-white px-8 py-2">
      <Image
        src="/vicsmall-logo.svg"
        alt="Vicsmall logo"
        height={48}
        width={48}
      />

      <div className="mx-4 hidden w-full sm:max-w-sm md:block lg:max-w-2xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg border py-2 pl-10 pr-4 focus:border-black focus:outline-none focus:ring"
          />
          <SearchOutlined className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <Link
            href="/search"
            title="Search"
            aria-label="Search"
            className="grid h-10 w-10 place-content-center rounded-full hover:bg-gray-100 md:hidden"
          >
            <SearchOutlined />
          </Link>

          <Link
            href="/notifications"
            title="Notifications"
            aria-label="Notifications"
            className="grid h-10 w-10 place-content-center rounded-full hover:bg-gray-100"
          >
            <NotificationsOutlined />
          </Link>
        </div>

        <Link
          href="profile"
          className="flex items-center gap-2 rounded-full border border-accent-900 bg-accent-100 p-1 text-gray-800 sm:pr-4"
        >
          <Image
            src="https://utfs.io/f/wLDjZbdcJHpRMWIl9NP3i48NTabVkLgSlduGEY15BDA9eZjR"
            alt="Profile Picture"
            height={32}
            width={32}
            className="h-8 w-8 rounded-full"
          />
          <span className="hidden text-xs sm:block">
            {fullName || "Guest"}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
