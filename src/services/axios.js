const axios = require('axios');

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_PATH,
    timeout: 5000,
    // headers: {'X-Custom-Header': 'foobar'}
  });

  instance.interceptors.response.use(function (response) {
      console.log({response});
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

  export {
    instance
  }