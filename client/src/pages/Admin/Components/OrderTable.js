import React from "react";

import {
  OrderTableWrapper,
  TableWrapper,
  CustomTable,
  CustomTableHead,
  CustomTableBody,
  CustomTableRow,
  CustomTableCell,
  CustomStatusTableCell,
} from "../styles/orderTableStyle";
import EditOrder from "./modals/EditOrder";
import ViewOrder from "./modals/ViewOrder";

export default function OrderTable({ orders }) {
  let index = 0;
  return (
    <OrderTableWrapper>
      <TableWrapper>
        <CustomTable>
          <CustomTableHead>
            <CustomTableRow>
              <CustomTableCell></CustomTableCell>
              <CustomTableCell>S.N.</CustomTableCell>
              <CustomTableCell>Order Id #</CustomTableCell>
              <CustomTableCell>UserId</CustomTableCell>
              <CustomTableCell>Total Bill: </CustomTableCell>
              <CustomTableCell>Order status </CustomTableCell>
              <CustomTableCell>Shipment Type</CustomTableCell>
              <CustomTableCell>Shipment Status</CustomTableCell>
              <CustomTableCell>Placed On</CustomTableCell>
              <CustomTableCell>Actions</CustomTableCell>
              <CustomTableCell></CustomTableCell>
            </CustomTableRow>
          </CustomTableHead>
          <CustomTableBody>
            {orders.map((order) => {
              index++;
              return (
                <CustomTableRow key={order.id}>
                  <CustomTableCell>
                    <input type={"checkbox"} />
                  </CustomTableCell>
                  <CustomTableCell>{index}</CustomTableCell>
                  <CustomTableCell>{order.id}</CustomTableCell>
                  <CustomTableCell>{order.userId}</CustomTableCell>
                  <CustomTableCell>{order.totalBill}</CustomTableCell>
                  <CustomStatusTableCell
                    sx={
                      order.orderStatus === "success"
                        ? { color: "#99CC33" }
                        : order.orderStatus === "cancelled"
                        ? { color: "#FF9966" }
                        : { color: "#077E8C" }
                    }
                  >
                    {order.orderStatus}
                  </CustomStatusTableCell>
                  <CustomTableCell>{order.shipment.type}</CustomTableCell>
                  <CustomStatusTableCell
                    sx={
                      order.shipment.status === "success"
                        ? { color: "#99CC33" }
                        : order.shipment.status === "cancelled"
                        ? { color: "#FF9966" }
                        : { color: "#077E8C" }
                    }
                  >
                    {order.shipment.status}
                  </CustomStatusTableCell>
                  <CustomTableCell>{order.placedOn}</CustomTableCell>
                  <CustomTableCell>
                    <ViewOrder order={order} />
                  </CustomTableCell>
                  <CustomTableCell>
                    <EditOrder order={order} />
                  </CustomTableCell>
                </CustomTableRow>
              );
            })}
          </CustomTableBody>
        </CustomTable>
      </TableWrapper>
    </OrderTableWrapper>
  );
}
