import React, { useEffect, useState } from "react";

import { DashboardWrapper, DashboardContainer } from "../styles/dashboardStyle";
import Card from "./cards/Card";
import { useGetAllCards } from "../../../hooks";
import { dashboardCard } from "../../../datas";

export default function Dashboard() {
  const [datas, setDatas] = useState([]);

  const allCards = useGetAllCards({ datas: dashboardCard });
  useEffect(() => {
    if (allCards.loading && !allCards.error) {
      setDatas(allCards.data);
    }
  }, [allCards]);

  return (
    <DashboardWrapper>
      <DashboardContainer>
        {datas.length !== 0
          ? datas.map((data) => {
              return <Card key={data.id} data={data} />;
            })
          : ""}
      </DashboardContainer>
    </DashboardWrapper>
  );
}
