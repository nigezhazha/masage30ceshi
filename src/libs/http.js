import axios from 'axios'

//设置基地址
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log(config);
    config.headers.Authorization=window.sessionStorage.getItem('token')
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

const request = {
    // sayHi(){
    //     console.log('666');
    // }
    login(params) {
        return axios.post('login', params)
    },
    getUsers(params) {
        return axios.get('users', {
            params,
            // headers: {
                // Authorization: window.sessionStorage.getItem('token')
            // }
        })
    }
}


export default {
    install(Vue) {
        Vue.prototype.$request = request
    }
}