import React, { useEffect, useState } from "react";
import {
  DashboardWrapper,
  DashboardContainer,
} from "Pages/Admin/styles/dashboardStyle";
import Card from "Pages/Admin/Components/cards/Card";
import { useGetAllCards } from "Hooks";

export default function Dashboard() {
  const [datas, setDatas] = useState([]);

  const allCards = useGetAllCards();
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
