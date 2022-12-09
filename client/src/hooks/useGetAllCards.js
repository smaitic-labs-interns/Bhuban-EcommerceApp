import { useEffect, useState } from "react";
import { axios_instance } from "../api/config";

const useGetAllCards = ({ datas = [] }) => {
  console.log(datas);
  const [result, setResult] = useState({
    data: [],
    error: null,
    loading: false,
  });
  let index = 1;
  datas.map((data) => {
    useEffect(() => {
      axios_instance({
        endpoints: data.endpoints,
      })
        .then((response) => {
          setResult((pre) => ({
            ...pre,
            data: [
              ...pre.data,
              {
                id: index,
                count: response.data.length,
                title: data.title,
                desc: data.desc,
                bgColor: data.bgColor,
                icon: data.icon,
              },
            ],
            loading: true,
          }));
        })
        .catch((err) => {
          setResult((pre) => ({
            ...pre,
            error: err,
            loading: true,
          }));
        });
    }, []);
    index++;
  });
  return result;
};

export default useGetAllCards;
