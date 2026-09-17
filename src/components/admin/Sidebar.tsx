"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export default function Sidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: "HomeIcon" },
    { name: "Tenants", href: "/admin/tenants", icon: "UsersIcon" },
    { name: "Produk & Layanan", href: "/admin/items", icon: "ArchiveBoxIcon" },
  ];

  const isActive = (path: string) => {
    if (path === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(path);
  };

  return (
    <div className="flex h-full w-64 flex-col bg-gray-900 text-white">
      <div className="flex h-16 items-center px-6 font-bold text-xl tracking-wider border-b border-gray-800">
        Tenant<span className="text-blue-500">Katalog</span>
      </div>
      <div className="flex-1 flex flex-col justify-between p-4">
        <nav className="space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.href)
                  ? "bg-blue-600 text-white font-medium shadow-sm"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="border-t border-gray-800 pt-4">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-500/10 hover:text-red-500 transition-colors"
          >
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
