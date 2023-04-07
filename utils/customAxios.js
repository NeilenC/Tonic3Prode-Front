import axios from "axios";

const customAxios = axios.create({
  baseURL: "http://localhost:3001/api",
});

const addUidInterceptor = (config) => {
  const uid = localStorage.getItem("uid");
  if (config.method === "get") {
    config.url += `/${uid}`;
  }
  return config;
};

customAxios.interceptors.request.use(addUidInterceptor);

export default customAxios;
