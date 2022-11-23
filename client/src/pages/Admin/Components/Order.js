import React, { useState, useEffect } from "react";
import { Formik, useFormik } from "formik";

import { TextField, Box, Button, TextareaAutosize } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { OrderWrapper, OrderContainer } from "../styles/orderStyle";
import { fetch_all_order } from "../../../redux/actions/orderActions";
import OrderTable from "./OrderTable";

export default function Order() {
  const allOrder = useSelector((state) => state.allOrder);
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch_all_order());
  }, []);

  useEffect(() => {
    if (allOrder.status === "success") {
      setOrders(allOrder.data);
    }
  }, [allOrder]);

  return (
    <OrderWrapper>
      <OrderContainer>
        {orders.length !== 0 ? <OrderTable orders={orders} /> : ""}
      </OrderContainer>
    </OrderWrapper>
  );
}
