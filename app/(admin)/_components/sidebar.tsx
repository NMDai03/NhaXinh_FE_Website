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

const menuItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Orders", href: "/orders", icon: ShoppingCart, badge: 6 },
  { name: "Products", href: "/products", icon: Package },
  { name: "Users", href: "/users", icon: Users },
  { name: "Categories", href: "/categories", icon: ChartColumnStacked },
  { name: "Sub Categories", href: "/sub_categories", icon: ChartColumnStacked },
  { name: "Materials", href: "/materials", icon: BrickWall },
  { name: "Collections", href: "/collections", icon: Boxes },
  { name: "Messages", href: "/messages", icon: MessageCircleMore },
  { name: "Notifications", href: "/notifications", icon: BellRing },
];

export default function SidebarMenu() {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại

  return (
    <nav>
      {menuItems.map(({ name, href, icon: Icon, badge }) => (
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
          {badge && (
            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              {badge}
            </Badge>
          )}
        </Link>
      ))}
    </nav>
  );
}
