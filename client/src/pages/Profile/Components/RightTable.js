import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import {
  fetch_user_orders,
  cancel_order,
  return_replace_order,
} from "../../../redux/actions/orderActions";
import ViewOrderModal from "./ViewOrderModal";
import { CustomTableCell, TablePageWrapper } from "../styles/RightTableStyle";
import { AssignmentReturn, Cancel, FindReplace } from "@mui/icons-material";
import Swal from "sweetalert2";

export default function RightTable() {
  const login = useSelector((state) => state.login);
  const cancelOrder = useSelector((state) => state.cancelOrder);
  const userOrders = useSelector((state) => state.userOrders);
  const returnReplace = useSelector((state) => state.returnReplace);
  const userId = login.isLogined ? login.userId : null;

  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);

  const handleCancelOrder = (id) => {
    if (id && id !== " ") {
      Swal.fire({
        title: "Do you want to cancel this order?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(cancel_order({ orderId: id, action: "cancel" }));
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
  };

  const handleReturnReplace = (id, action) => {
    if (id && id !== " " && action && action !== "") {
      Swal.fire({
        title: `Do you want to ${action} this order?`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
        customClass: {
          actions: "my-actions",
          cancelButton: "order-1 right-gap",
          confirmButton: "order-2",
          denyButton: "order-3",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(return_replace_order({ orderId: id, action: action }));
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
  };

  useEffect(() => {
    if (userId && userId !== " ") {
      dispatch(fetch_user_orders({ userId: userId, action: "fetch" }));
    }
  }, []);

  useEffect(() => {
    if (userOrders.status === "success") setOrders(userOrders.data);
  }, [userOrders]);

  useEffect(() => {
    if (cancelOrder.status === "success") {
      Swal.fire({
        title: "Order Cancelled Sucessfully",
        text: `${cancelOrder.message}`,
        icon: "success",
        confirmButtonText: "Ok",
      });
      dispatch(fetch_user_orders({ userId: userId, action: "fetch" }));
    } else if (cancelOrder.status === "failed") {
      Swal.fire({
        title: "Error!",
        text: `${cancelOrder.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    if (cancelOrder.status !== null) {
      dispatch(
        cancel_order({
          orderId: "",
          action: "clean",
        })
      );
    }
  }, [cancelOrder]);

  useEffect(() => {
    if (returnReplace.status === "success") {
      Swal.fire({
        title: "Success!",
        text: `${returnReplace.message}`,
        icon: "success",
        confirmButtonText: "Ok",
      });
      dispatch(fetch_user_orders({ userId: userId, action: "fetch" }));
    } else if (returnReplace.status === "failed") {
      Swal.fire({
        title: "Error!",
        text: `${returnReplace.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    if (returnReplace.status !== null) {
      dispatch(
        return_replace_order({
          orderId: "",
          action: "clean",
        })
      );
    }
  }, [returnReplace]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow allign="right">
            <TableCell sx={{ border: "none" }}>Recent Orders</TableCell>
          </TableRow>
          <TableRow sx={{ background: "#fafafa" }}>
            <CustomTableCell>Order #</CustomTableCell>
            <CustomTableCell>Placed On</CustomTableCell>
            <CustomTableCell colSpan={4}>Actions</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.length !== 0 ? (
            orders.map((order) => {
              return (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.placedOn}</TableCell>
                  <TableCell>
                    <ViewOrderModal order={order} />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleCancelOrder(order.id)}
                    >
                      <Cancel sx={{ paddingRight: "0.5rem" }} />
                      Cancel
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleReturnReplace(order.id, "return")}
                    >
                      <AssignmentReturn sx={{ paddingRight: "0.5rem" }} />
                      Retrn
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleReturnReplace(order.id, "replace")}
                    >
                      <FindReplace sx={{ paddingRight: "0.5rem" }} />
                      Replace
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell>Not Any Orders Available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePageWrapper>This Section is for Pagination</TablePageWrapper>
    </TableContainer>
  );
}
