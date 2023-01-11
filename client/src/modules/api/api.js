import axios from 'axios';

export const axiosInstance = async ({
  endpoints,
  path = {},
  query = {},
  data = {},
  headers = {},
}) => {
  const temp = { ...endpoints };
  Object.entries(path).map((data) => {
    temp.url = temp.url.replace(`:${data[0]}`, data[1]);
  });
  const config = {
    method: temp.method,
    url: temp.url,
    params: query,
    data: data,
  };

  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    timeout: 0,
  });
  return await instance(config);
};
