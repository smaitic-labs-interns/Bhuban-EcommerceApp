import React, { useState, useEffect } from "react";
import { Formik, useFormik } from "formik";

import { Select, Box, Button, Typography, MenuItem } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  OrderWrapper,
  OrderContainer,
  DisplayOrderWrapper,
} from "../styles/orderStyle";
import {
  fetch_all_order,
  fetch_limited_order,
} from "../../../redux/actions/orderActions";
import OrderTable from "./OrderTable";
import { isEmpty } from "../../../utils/isEmpty";

export default function Order() {
  const limitedOrder = useSelector((state) => state.limitedOrder);
  const dispatch = useDispatch();

  const [order, setOrder] = useState({
    all: [],
    next: {},
    previous: {},
  });

  let currentPage =
    !isEmpty(order.next) && !isEmpty(order.previous)
      ? order.next.page - 1
      : !isEmpty(order.next)
      ? order.next.page - 1
      : !isEmpty(order.previous)
      ? order.previous.page + 1
      : 1;

  useEffect(() => {
    dispatch(
      fetch_limited_order({ page: 1, limit: noOfOrder, action: "fetch" })
    );
  }, []);

  const [noOfOrder, setNoOforder] = useState(5);

  const handlePage = (page) => {
    dispatch(
      fetch_limited_order({ page: page, limit: noOfOrder, action: "fetch" })
    );
  };

  useEffect(() => {
    setOrder((order) => ({
      ...order,
      all: limitedOrder.all,
      next: limitedOrder.next,
      previous: limitedOrder.previous,
    }));
  }, [limitedOrder]);

  useEffect(() => {
    dispatch(
      fetch_limited_order({
        page: currentPage,
        limit: noOfOrder,
        action: "fetch",
      })
    );
  }, [noOfOrder]);

  return (
    <OrderWrapper>
      <OrderContainer>
        <DisplayOrderWrapper>
          Display
          <Select
            sx={{ height: "1.5rem", margin: "0.5rem" }}
            id="noOfOrder"
            name="noOfOrder"
            value={noOfOrder}
            onChange={(e) => {
              setNoOforder(e.target.value);
            }}
          >
            <MenuItem value={5}>{5}</MenuItem>
            <MenuItem value={10}>{10}</MenuItem>
            <MenuItem value={20}>{20}</MenuItem>
            <MenuItem value={50}>{50}</MenuItem>
            <MenuItem value={100}>{100}</MenuItem>
          </Select>
          Orders per page
        </DisplayOrderWrapper>
        {order.all.length !== 0 ? (
          <>
            <OrderTable orders={order.all} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                border: "solid green 2px",
                margin: "2rem",
                justifyContent: "space-between",
                padding: "1rem",
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                disabled={isEmpty(order.previous)}
                onClick={() => handlePage(order.previous.page)}
              >
                Previous
              </Button>
              <Box>
                <Typography>{`Page: ${currentPage}`}</Typography>
              </Box>
              <Button
                variant="outlined"
                color="success"
                disabled={isEmpty(order.next)}
                onClick={() => handlePage(order.next.page)}
              >
                Next
              </Button>
            </Box>
          </>
        ) : (
          <Box>
            <Typography>{"No order Found"}</Typography>
          </Box>
        )}
      </OrderContainer>
    </OrderWrapper>
  );
}
