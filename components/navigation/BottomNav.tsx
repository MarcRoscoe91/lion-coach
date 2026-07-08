"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/",
      icon: "🏠",
      label: "Home",
    },
    {
      href: "/nutrition",
      icon: "🍽️",
      label: "Food",
    },
    {
      href: "/training",
      icon: "🏋️",
      label: "Train",
    },
    {
      href: "/progress",
      icon: "📈",
      label: "Progress",
    },
    {
      href: "/profile",
      icon: "👤",
      label: "Profile",
    },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 rounded-3xl border border-zinc-800 bg-zinc-950/95 p-3 shadow-2xl backdrop-blur">
      <div className="grid grid-cols-5 gap-2">
        {navItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-2xl py-2 text-center transition ${
                active
                  ? "bg-yellow-400 text-black"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              <div className="text-2xl">{item.icon}</div>

              <div className="mt-1 text-[11px] font-semibold">
                {item.label}
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}