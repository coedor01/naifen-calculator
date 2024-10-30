import axios from "axios";
function createService(baseURL: string) {
  // axios拦截器
  const service = axios.create({
    baseURL, // 开发服务器接口
    timeout: 60000, // request timeout
  });

  // 请求拦截器
  service.interceptors.request.use(
    async (config) => {
      return config;
    },
    (error) => {
      console.log(error); // for debug
      return Promise.reject(error);
    }
  );

  // 响应拦截器
  service.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error); // for debug
      return Promise.reject(error);
    }
  );

  return service;
}

const Services = {
  localService: createService(""),
};

export default Services;
