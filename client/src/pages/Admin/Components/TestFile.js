import { useEffect, useState } from "react";
import { order, cart, user, product } from "../../../api/config/api-endpoints";
import { axios_instance } from "../../../api/config/config";

const useTest = () => {
  const [datas, setData] = useState({ data: [], error: null, loading: false });

  useEffect(() => {
    axios_instance({
      endpoints: user.all,
    })
      .then((response) => {
        setData((pre) => ({
          ...pre,
          data: [
            ...pre.data,
            {
              id: 2,
              count: response.data.length,
              title: "Total Users",
              desc: "Registered today",
              bgColor: "#278CFC",
              icon: "<Group />",
            },
          ],
          loading: true,
        }));
      })
      .catch((err) => {
        setData((pre) => ({
          ...pre,
          error: err,
          loading: true,
        }));
      });

    axios_instance({
      endpoints: order.all,
    })
      .then((response) => {
        setData((pre) => ({
          ...pre,
          data: [
            ...pre.data,
            {
              id: 2,
              count: response.data.length,
              title: "Total Orders",
              desc: "placed today",
              bgColor: "#28a745",
              icon: "<ShoppingCartCheckoutOutlined />",
            },
          ],
          loading: true,
        }));
      })
      .catch((err) => {
        setData((pre) => ({
          ...pre,
          error: err,
          loading: true,
        }));
      });
  }, []);

  return datas;
};

export default useTest;
