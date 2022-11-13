import axios from "axios";

export const axios_instance = async ({
  endpoints,
  path = {},
  query = {},
  data = {},
  headers = {},
}) => {
  try {
    Object.entries(path).map((data) => {
      endpoints.url = endpoints.url.replace(`:${data[0]}`, data[1]);
    });
    console.log("URL: ", endpoints);
    const config = {
      method: endpoints.method,
      url: endpoints.url,
      params: query,
      data: data,
    };

    const instance = axios.create({
      baseURL: "http://localhost:5000/api/",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      timeout: 0,
    });
    const res = await instance(config);
    return res;
  } catch (err) {
    throw err;
  }
};
