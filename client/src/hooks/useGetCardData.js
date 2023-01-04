import { useEffect, useState } from 'react';
import axiosInstance from 'Modules/api';

const useGetCardData = (endpoints, id, title, desc, bgColor, icon) => {
  const [datas, setData] = useState({ data: {}, error: null, loading: false });

  useEffect(() => {
    axiosInstance({
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
