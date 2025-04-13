"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ShoppingCart,
  Package,
  Users,
  ChartColumnStacked,
  BrickWall,
  Boxes,
  MessageCircleMore,
  BellRing,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/util/context/AuthContext";
import { useEffect, useState } from "react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
    role: ["admin", "employee"],
  },
  {
    name: "Orders",
    href: "/orders",
    icon: ShoppingCart,
    role: ["admin", "employee"],
  },
  {
    name: "Products",
    href: "/products",
    icon: Package,
    role: ["admin", "employee"],
  },
  { name: "Users", href: "/users", icon: Users, role: ["admin"] },
  {
    name: "Categories",
    href: "/categories",
    icon: ChartColumnStacked,
    role: ["admin"],
  },
  {
    name: "Sub Categories",
    href: "/sub_categories",
    icon: ChartColumnStacked,
    role: ["admin"],
  },
  {
    name: "Materials",
    href: "/materials",
    icon: BrickWall,
    role: ["admin"],
  },
  {
    name: "Collections",
    href: "/collections",
    icon: Boxes,
    role: ["admin"],
  },
  {
    name: "Messages",
    href: "/messages",
    icon: MessageCircleMore,
    role: ["admin", "employee"],
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: BellRing,
    role: ["admin", "employee"],
  },
];

export default function SidebarMenu() {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại
  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(currentUser); // Đảm bảo có user sau khi render
  }, [currentUser]);

  if (!user) return null; // Ẩn sidebar nếu user chưa load

  return (
    <nav>
      {menuItems
        .filter((item) => item.role.includes(currentUser?.role))
        .map(({ name, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              pathname === href
                ? "bg-muted text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <Icon className="h-4 w-4" />
            {name}
          </Link>
        ))}
    </nav>
  );
}
