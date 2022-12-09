import React from "react";
import {
  Group,
  ShoppingCart,
  ShoppingCartCheckoutOutlined,
  Store,
} from "@mui/icons-material";

import { order, cart, user, product } from "../api/config";
import { random_color } from "../utils";

export const dashboardCard = [
  {
    endpoints: user.all,
    title: "Total User",
    desc: "All registered users",
    bgColor: "#3CA2B9",
    icon: <Group />,
  },
  {
    endpoints: order.all,
    title: "Total Orders",
    desc: "Total order placed till now",
    bgColor: "#28a745",
    icon: <ShoppingCartCheckoutOutlined />,
  },
  {
    endpoints: product.all,
    title: "Total Products",
    desc: "Total product entered till now",
    bgColor: "#278CFC",
    icon: <Store />,
  },
  {
    endpoints: cart.all,
    title: "Total Carts",
    desc: "Totaal carts (active/deactive) till now",
    bgColor: "#D3D6DF",
    icon: <ShoppingCart />,
  },
];
