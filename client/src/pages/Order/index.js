import React from "react";

import { OrderWrapper } from "./Styles/orderStyle";
import ShippingForm from "./Components/ShippingForm";

export default function Order() {
  return (
    <OrderWrapper>
      <ShippingForm />
    </OrderWrapper>
  );
}
