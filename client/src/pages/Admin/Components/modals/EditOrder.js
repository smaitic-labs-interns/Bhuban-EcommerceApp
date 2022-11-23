import React, { useState } from "react";
import {
  Button,
  Modal,
  Table,
  TableCell,
  Select,
  MenuItem,
} from "@mui/material";
import { Close, Edit, Save } from "@mui/icons-material";
import {
  EditOrderWrapper,
  CloseButtonWrapper,
  OrderContentWrapper,
  CustomTableRow,
  CustomTableCell,
  CustomTableCellValue,
} from "../../styles/modals/editOrderStyle";

export default function EditOrder({ order }) {
  const [open, setOpen] = useState(false);
  const [ordStatus, setOrdStatus] = useState(order.orderStatus);

  const {
    id,
    userId,
    orderStatus,
    totalBill,
    products,
    shippingAddress,
    payment,
    shipment,
    placedOn,
  } = order;

  const ordStatuses = [
    "pending",
    "Awaiting Payment",
    "Awaiting Fulfillment",
    "Awaiting Shipment",
    "Awaiting Pickup",
    "Partially Shipped",
    "Completed",
    "Shipped",
    "Cancelled",
    "Declined",
    "Refunded",
    "Disputed",
    "Manual Verification Required",
    "Partially Refunded",
  ];

  let index = 0;
  return (
    <div>
      <Button
        variant="outlined"
        color="info"
        onClick={() => {
          setOpen(true);
        }}
      >
        <Edit />
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditOrderWrapper>
          <CloseButtonWrapper>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                setOpen(false);
              }}
            >
              <Close />
            </Button>
          </CloseButtonWrapper>
          <OrderContentWrapper>
            <Table>
              <CustomTableRow>
                <CustomTableCell>Order Id: </CustomTableCell>
                <TableCell>{id}</TableCell>
              </CustomTableRow>

              <CustomTableRow>
                <CustomTableCell>
                  Order Status:
                  <CustomTableCellValue>({orderStatus})</CustomTableCellValue>
                </CustomTableCell>
                <TableCell>
                  <Select
                    fullWidth
                    id="ordStatus"
                    name="ordStatus"
                    value={ordStatus}
                    label="Update Order Status"
                    onChange={(e) => {
                      setOrdStatus(e.target.value);
                    }}
                  >
                    {ordStatuses.length !== 0 ? (
                      ordStatuses.map((status) => {
                        return (
                          <MenuItem key={status} value={status}>
                            {status}
                          </MenuItem>
                        );
                      })
                    ) : (
                      <MenuItem value={"Not Available"}>
                        {"Not Available"}
                      </MenuItem>
                    )}
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="success"
                    disabled={
                      orderStatus === "delivered" || orderStatus === "cancelled"
                        ? true
                        : false
                    }
                  >
                    <Save /> {" Update"}
                  </Button>
                </TableCell>
              </CustomTableRow>
              <CustomTableRow>
                <CustomTableCell>Products: </CustomTableCell>
                <TableCell>
                  <CustomTableRow>
                    <CustomTableCell>S.N. </CustomTableCell>
                    <CustomTableCell>Product Id #</CustomTableCell>
                    <CustomTableCell> Quantity</CustomTableCell>
                  </CustomTableRow>
                  {products.map((product) => {
                    index++;
                    return (
                      <CustomTableRow key={index}>
                        <CustomTableCell>{index}</CustomTableCell>
                        <CustomTableCellValue>
                          {product.productId}
                        </CustomTableCellValue>
                        <CustomTableCellValue>
                          {product.quantity}
                        </CustomTableCellValue>
                      </CustomTableRow>
                    );
                  })}
                </TableCell>
              </CustomTableRow>
              <CustomTableRow>
                <CustomTableCell>Shipping Address: </CustomTableCell>
                <TableCell>
                  <CustomTableRow>
                    <CustomTableCell>Country</CustomTableCell>
                    <CustomTableCell>Province</CustomTableCell>
                    <CustomTableCell> District</CustomTableCell>
                    <CustomTableCell> City</CustomTableCell>
                  </CustomTableRow>
                  <CustomTableRow>
                    <CustomTableCellValue>
                      {shippingAddress.country}
                    </CustomTableCellValue>
                    <CustomTableCellValue>
                      {shippingAddress.province}
                    </CustomTableCellValue>
                    <CustomTableCellValue>
                      {shippingAddress.district}
                    </CustomTableCellValue>
                    <CustomTableCellValue>
                      {shippingAddress.city}
                    </CustomTableCellValue>
                  </CustomTableRow>
                  <CustomTableRow>
                    <CustomTableCell> Ward</CustomTableCell>
                    <CustomTableCell> Tole</CustomTableCell>
                    <CustomTableCell> House No:</CustomTableCell>
                  </CustomTableRow>
                  <CustomTableRow>
                    <CustomTableCellValue>
                      {shippingAddress.ward}
                    </CustomTableCellValue>
                    <CustomTableCellValue>
                      {shippingAddress.tole}
                    </CustomTableCellValue>
                    <CustomTableCellValue>
                      {shippingAddress.houseNo}
                    </CustomTableCellValue>
                  </CustomTableRow>
                </TableCell>
              </CustomTableRow>

              <CustomTableRow>
                <CustomTableRow>
                  <CustomTableCell></CustomTableCell>
                  <CustomTableCell>Shipment</CustomTableCell>
                  <CustomTableCell>Payment</CustomTableCell>
                </CustomTableRow>
                <CustomTableRow>
                  <CustomTableCell>Type</CustomTableCell>
                  <CustomTableCellValue>{shipment.type}</CustomTableCellValue>
                  <CustomTableCellValue> {payment.type}</CustomTableCellValue>
                </CustomTableRow>
                <CustomTableRow>
                  <CustomTableCell>Status</CustomTableCell>
                  <CustomTableCellValue>{shipment.status}</CustomTableCellValue>
                  <CustomTableCellValue>{payment.status}</CustomTableCellValue>
                </CustomTableRow>
              </CustomTableRow>
            </Table>
          </OrderContentWrapper>
          <CloseButtonWrapper>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                setOpen(false);
              }}
            >
              <Close />
            </Button>
          </CloseButtonWrapper>
        </EditOrderWrapper>
      </Modal>
    </div>
  );
}
