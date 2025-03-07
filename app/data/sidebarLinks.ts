import {
  DashboardOutlined,
  Inventory2Outlined,
  LogoutOutlined,
  PersonOutlined,
  RateReviewOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";

export const sidebarLinks = [
  {
    id: 0,
    label: "Dashboard",
    href: "/",
    icon: DashboardOutlined,
  },
  {
    id: 1,
    label: "Products",
    href: "/products",
    icon: Inventory2Outlined,
  },
  {
    id: 2,
    label: "Orders",
    href: "/orders",
    icon: ShoppingBagOutlined,
  },
  {
    id: 3,
    label: "Reviews",
    href: "/reviews",
    icon: RateReviewOutlined,
  },
  {
    id: 4,
    label: "Profile",
    href: "/profile",
    icon: PersonOutlined,
  },
  {
    id: 5,
    label: "Logout",
    href: "/Sign-in",
    icon: LogoutOutlined,
  },
];

export default sidebarLinks;
