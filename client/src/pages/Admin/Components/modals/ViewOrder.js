import React, { useState } from "react";
import { Button, Modal, Table, TableCell } from "@mui/material";
import { Close, RemoveRedEye } from "@mui/icons-material";
import {
  ViewOrderWrapper,
  CloseButtonWrapper,
  OrderContentWrapper,
  CustomTableRow,
  CustomTableCell,
  CustomTableCellValue,
} from "../../styles/modals/viewOrderStyle";

export default function ViewOrder({ order }) {
  const [open, setOpen] = useState(false);

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

  let index = 0;
  return (
    <div>
      <Button
        variant="outlined"
        color="success"
        onClick={() => {
          setOpen(true);
        }}
      >
        <RemoveRedEye />
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ViewOrderWrapper>
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
                <CustomTableCell>User Id : </CustomTableCell>
                <TableCell>{userId}</TableCell>
              </CustomTableRow>
              <CustomTableRow>
                <CustomTableCell>Order Status: </CustomTableCell>
                <TableCell>{orderStatus}</TableCell>
              </CustomTableRow>
              <CustomTableRow>
                <CustomTableCell>Total Bill: </CustomTableCell>
                <TableCell>{totalBill}</TableCell>
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
                <CustomTableCell>
                  <CustomTableRow>
                    <CustomTableCell></CustomTableCell>
                  </CustomTableRow>
                  <CustomTableRow>
                    <CustomTableCell>{"Type"}</CustomTableCell>
                  </CustomTableRow>
                  <CustomTableRow>
                    <CustomTableCell>{"Status"}</CustomTableCell>
                  </CustomTableRow>
                </CustomTableCell>
                <CustomTableCell>
                  <CustomTableRow>
                    <CustomTableCell>{"Payment"}</CustomTableCell>
                    <CustomTableCell>{"Shipment"}</CustomTableCell>
                  </CustomTableRow>
                  <CustomTableRow>
                    <CustomTableCellValue>{payment.type}</CustomTableCellValue>
                    <CustomTableCellValue>{shipment.type}</CustomTableCellValue>
                  </CustomTableRow>
                  <CustomTableRow>
                    <CustomTableCellValue>
                      {payment.status}
                    </CustomTableCellValue>
                    <CustomTableCellValue>
                      {shipment.status}
                    </CustomTableCellValue>
                  </CustomTableRow>
                </CustomTableCell>
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
        </ViewOrderWrapper>
      </Modal>
    </div>
  );
}
