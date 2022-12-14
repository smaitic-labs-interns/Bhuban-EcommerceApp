import { useEffect, useState } from "react";
import { axios_instance } from "Api/config";

const useFetchApiData = ({
  endpoints,
  path = {},
  query = {},
  data = {},
  headers = {},
}) => {
  const [datas, setData] = useState({ data: {}, error: null, loading: false });

  useEffect(() => {
    axios_instance({
      endpoints,
      path,
      query,
      data,
      headers,
    })
      .then((response) => {
        setData((pre) => ({
          ...pre,
          data: response.data,
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

export default useFetchApiData;
