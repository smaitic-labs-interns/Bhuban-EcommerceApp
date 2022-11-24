import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Modal,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Edit, Update, Cancel } from "@mui/icons-material";
import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";
import {
  updatet_order_payment,
  fetch_all_order,
} from "../../../../redux/actions/orderActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UpdatePayment({ payment, orderId }) {
  const updateOrderPayment = useSelector((state) => state.updateOrderPayment);
  //   const login = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const [open, setOpen3] = useState(false);
  const handleOpen = () => setOpen3(true);
  const [updPmt, setUpdPmt] = useState({ type: "", status: "" });

  const handleUpdatePayment = () => {
    if (updPmt && updPmt.type !== "" && updPmt.status !== "") {
      dispatch(
        updatet_order_payment({
          orderId: orderId,
          paymentType: updPmt.type,
          paymentStatus: updPmt.status,
          action: "update",
        })
      );
    } else {
      setOpen3(false); //close module
      Swal.fire({
        title: "Error!",
        text: "Please select payment Type as well Payment Status",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  useEffect(() => {
    setOpen3(false);
    if (updateOrderPayment.status === "success") {
      Swal.fire({
        title: "Success!",
        text: `${updateOrderPayment.message}`,
        icon: "success",
        confirmButtonText: "Ok",
      });
      dispatch(fetch_all_order());
    } else if (updateOrderPayment.status === "failed") {
      Swal.fire({
        title: "Error!",
        text: `${updateOrderPayment.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }

    if (updateOrderPayment.status !== null) {
      dispatch(
        updatet_order_payment({
          orderId: "",
          paymentType: "",
          paymentStatus: "",
          action: "clean",
        })
      );
    }
  }, [updateOrderPayment]);

  const PAYMENT_TYPES = ["E-sewa", "Khalti", "CONNECT-IPS", "CASH"];

  return (
    <>
      <Button variant="outlined" color="info" onClick={handleOpen}>
        <Edit />
        Edit
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box component={"form"}>
            <Box>
              <InputLabel id="payment-type-label">
                Select Payment Method
              </InputLabel>
              <Select
                fullWidth
                labelId="payment-type-label"
                id="paymentType"
                name="paymentType"
                label="Payment Method"
                onChange={(e) => {
                  setUpdPmt((updPmt) => ({
                    ...updPmt,
                    type: e.target.value,
                  }));
                }}
              >
                {PAYMENT_TYPES.length !== 0 ? (
                  PAYMENT_TYPES.map((pmnt) => {
                    return (
                      <MenuItem key={pmnt} value={pmnt}>
                        {pmnt}
                      </MenuItem>
                    );
                  })
                ) : (
                  <MenuItem value={"Not Available"}>{"Not Available"}</MenuItem>
                )}
              </Select>
            </Box>
            <Box>
              <InputLabel id="payment-status-label">
                Select Payment Status
              </InputLabel>
              <Select
                fullWidth
                labelId="payment-status-label"
                id="paymentStatus"
                name="paymentStatus"
                label="Payment Method"
                onChange={(e) => {
                  setUpdPmt((updPmt) => ({
                    ...updPmt,
                    status: e.target.value,
                  }));
                }}
              >
                <MenuItem value={"paid"}>{"Paid"}</MenuItem>
                <MenuItem value={"unPaid"}>{"Un-paid"}</MenuItem>
              </Select>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              margin: "2rem 0",
              padding: "0 1rem",
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpen3(false)}
            >
              <Cancel />
              {" Cancel"}
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdatePayment}
            >
              <Update />
              {" Update"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
