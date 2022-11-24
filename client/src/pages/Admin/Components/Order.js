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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch_all_order());
  }, []);

  return (
    <OrderWrapper>
      <OrderContainer>
        {allOrder.status === "success" ? (
          <OrderTable orders={allOrder.data} />
        ) : (
          ""
        )}
      </OrderContainer>
    </OrderWrapper>
  );
}
