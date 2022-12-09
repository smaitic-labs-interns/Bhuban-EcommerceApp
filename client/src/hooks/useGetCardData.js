import { useEffect, useState } from "react";
import { axios_instance } from "../api/config";

const useGetCardData = (endpoints, id, title, desc, bgColor, icon) => {
  const [datas, setData] = useState({ data: {}, error: null, loading: false });

  useEffect(() => {
    axios_instance({
      endpoints: endpoints,
    })
      .then((response) => {
        setData((pre) => ({
          ...pre,
          data: {
            id,
            count: response.data.length,
            title,
            desc,
            bgColor,
            icon,
          },
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

export default useGetCardData;
