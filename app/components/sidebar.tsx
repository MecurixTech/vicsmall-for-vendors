"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import sidebarLinks from "../data/sidebarLinks"
import { LogoutOutlined } from "@mui/icons-material"

const Sidebar = () => {
  const currentPath = usePathname()

  const isProductsPage = currentPath.startsWith("/products")
  
  const isCreateProductPage = currentPath === "/products/create-product"

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
      window.location.reload()
    }
  }

  return (
    <aside className="hidden flex-[1] rounded-xl bg-white p-7 text-sm shadow-sm md:block">
      <div className="flex flex-col gap-2">
        {sidebarLinks.map((link) => {
          
          const isActive =
            link.href === currentPath || (link.href === "/products" && isProductsPage && !isCreateProductPage)

          return (
            <div key={link.id} className="flex flex-col">
              <Link
                href={link.href}
                className={`${
                  isActive
                    ? "border border-[rgba(0,0,0,0.09)] bg-white text-[#FF8C48]"
                    : "border border-[rgba(0,0,0,0.09)] bg-white text-[#555555]"
                } mb-2 flex items-center gap-2 rounded-xl p-3`}
              >
                <link.icon fontSize="inherit" className={isActive ? "text-[#FF8C48]" : ""} />
                <span className="font-medium">{link.label}</span>
              </Link>

              {link.href === "/products" && isProductsPage && (
                <div className="ml-6 mb-5">
                  <Link
                    href="/products/create-product"
                    className={`${
                      isCreateProductPage
                        ? "border border-[rgba(0,0,0,0.09)] bg-white text-[#FF8C48]"
                        : "border border-[rgba(0,0,0,0.09)] bg-white text-[#67676D]"
                    } flex items-center gap-2 rounded-xl p-3 pl-8 w-[189px]`}
                  >
                    {/* <AddOutlined fontSize="inherit" className={isCreateProductPage ? "text-[#FF8C48]" : ""} /> */}
                    <span className="font-medium">Create Product</span>
                  </Link>
                </div>
              )}
            </div>
          )
        })}
        <button
          onClick={handleLogout}
          className="mb-2 flex items-center gap-2 rounded-xl border border-[rgba(0,0,0,0.09)] p-3 text-[#555555]"
        >
          <LogoutOutlined fontSize="inherit" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar

