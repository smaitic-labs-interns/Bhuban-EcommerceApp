import { useMemo, useState } from 'react';
import axiosInstance from 'modules/api';

const useFetchCountries = ({ endpoints, path = {}, query = {}, data = {}, headers = {} }) => {
  const [address, setAddress] = useState({
    data: {
      country: {
        selected: {
          id: '',
          name: '',
        },
        all: [],
      },
      state: {
        selected: {
          id: '',
          name: '',
        },
        all: [],
      },
      district: {
        selected: {
          id: '',
          name: '',
        },
        all: [],
      },
    },
    error: null,
    loading: true,
  });
  useMemo(() => {
    axiosInstance({
      endpoints,
      path,
      query,
      data,
      headers,
    })
      .then((response) => {
        let cAll = [];
        for (let c of response.data) {
          cAll.push({ id: c.id, name: c.name });
        }
        setAddress((address) => ({
          ...address,
          data: {
            ...address.data,
            country: { ...address.data.country, all: cAll },
          },
          loading: false,
        }));
      })
      .catch((err) => {
        setAddress((pre) => ({
          ...pre,
          error: err,
          loading: false,
        }));
      });
  }, []);

  return address;
};

export default useFetchCountries;
