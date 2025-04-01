import {
  DashboardOutlined,
  Inventory2Outlined,
  PersonOutlined,
  RateReviewOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import BagIcon from "public/bag-2.svg";

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
];

export default sidebarLinks;
