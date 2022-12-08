import React, { useEffect, useState } from "react";

import { DashboardWrapper, DashboardContainer } from "../styles/dashboardStyle";
import Card from "./cards/Card";
import { useSelector, useDispatch } from "react-redux";
import { axios_instance } from "../../../api/config/config";
import useTest from "./TestFile";
import {
  CardTravel,
  Group,
  PersonSharp,
  ProductionQuantityLimits,
  ShoppingCart,
  ShoppingCartCheckoutOutlined,
  Store,
} from "@mui/icons-material";
import { order, cart, user, product } from "../../../api/config/api-endpoints";

export default function Dashboard() {
  const allOrder = useSelector((state) => state.allOrder);
  const [datas, setDatas] = useState([]);
  const { data, error, loading } = useTest();

  console.log(datas);
  console.log("Rendering");
  // setDatas([data]);
  // axios_instance({
  //   endpoints: order.all,
  // })
  //   .then((response) => {
  //     setDatas((datas) => [
  //       ...datas,
  //       {
  //         id: 1,
  //         count: response.data.length,
  //         title: "Total Orders",
  //         desc: "placed today",
  //         bgColor: "#28a745",
  //         icon: <ShoppingCartCheckoutOutlined />,
  //       },
  //     ]);
  //   })
  //   .catch((err) => {});
  // console.log(datas);
  // axios_instance({
  //   endpoints: product.all,
  // })
  //   .then((response) => {
  //     setDatas((datas) => [
  //       ...datas,
  //       {
  //         id: 2,
  //         count: response.data.length,
  //         title: "Total Products",
  //         desc: "added today",
  //         bgColor: "#3CA2B9",
  //         icon: <Store />,
  //       },
  //     ]);
  //   })
  //   .catch((err) => {});
  // console.log(datas);

  // axios_instance({
  //   endpoints: user.all,
  // })
  //   .then((response) => {
  //     setDatas((datas) => [
  //       ...datas,
  //       {
  //         id: 2,
  //         count: response.data.length,
  //         title: "Total Users",
  //         desc: "Registered today",
  //         bgColor: "#278CFC",
  //         icon: <Group />,
  //       },
  //     ]);
  //   })
  //   .catch((err) => {});
  // axios_instance({
  //   endpoints: cart.all,
  // })
  //   .then((response) => {
  //     setDatas((datas) => [
  //       ...datas,
  //       {
  //         id: 2,
  //         count: response.data.length,
  //         title: "Total Carts",
  //         desc: "Created today",
  //         bgColor: "#D3D6DF",
  //         icon: <ShoppingCart />,
  //       },
  //     ]);
  //   })
  //   .catch((err) => {});

  return (
    <DashboardWrapper>
      <DashboardContainer>
        {data.length !== 0
          ? data.map((d) => {
              return <Card key={d.id} data={d} />;
            })
          : ""}
      </DashboardContainer>
    </DashboardWrapper>
  );
}
