const axios = require('axios');
import Router from '../router/index'

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_PATH,
    timeout: 5000,
    // headers: {'X-Custom-Header': 'foobar'}
  });

  instance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
  
    if( error.response.status == 403){
      Router.push('/logout')
    }
    throw error
  });

  export {
    instance
  }