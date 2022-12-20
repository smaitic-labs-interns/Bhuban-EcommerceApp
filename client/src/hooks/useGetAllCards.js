import React from "react";
import { useState, useMemo } from "react";
import { axios_instance } from "Api/config";

import {
  Group,
  ShoppingCart,
  ShoppingCartCheckoutOutlined,
  Store,
} from "@mui/icons-material";

import { order, cart, user, product } from "../api/config";
import { random_color } from "../utils";

const datas = [
  {
    endpoints: user.all,
    title: "Total User",
    desc: "All registered users",
    bgColor: random_color(),
    icon: <Group />,
  },
  {
    endpoints: order.all,
    title: "Total Orders",
    desc: "Total order placed till now",
    bgColor: random_color(),
    icon: <ShoppingCartCheckoutOutlined />,
  },
  {
    endpoints: product.all,
    title: "Total Products",
    desc: "Total product entered till now",
    bgColor: random_color(),
    icon: <Store />,
  },
  {
    endpoints: cart.all,
    title: "Total Carts",
    desc: "Totaal carts (active/deactive) till now",
    bgColor: random_color(),
    icon: <ShoppingCart />,
  },
];

const useGetAllCards = () => {
  const [result, setResult] = useState({
    data: [],
    error: null,
    loading: false,
  });

  // admin site is also rendering too much fix it

  useMemo(() => {
    datas.map((data, index) => {
      axios_instance({
        endpoints: data.endpoints,
      })
        .then((response) => {
          setResult((pre) => ({
            ...pre,
            data: [
              ...pre.data,
              {
                id: index,
                count: response.data.length,
                title: data.title,
                desc: data.desc,
                bgColor: data.bgColor,
                icon: data.icon,
              },
            ],
            loading: true,
          }));
        })
        .catch((err) => {
          setResult((pre) => ({
            ...pre,
            error: err,
            loading: true,
          }));
        });
    });
  }, []);
  return result;
};

export default useGetAllCards;
