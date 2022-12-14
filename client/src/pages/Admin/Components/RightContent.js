import React from "react";
import { RightContentWrapper } from "Pages/Admin/styles/rightContentStyle";

export default function RightContent({ children, ...res }) {
  return (
    <>
      <RightContentWrapper {...res}>{children}</RightContentWrapper>
    </>
  );
}
