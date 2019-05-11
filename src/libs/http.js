import axios from 'axios'
import Vue from 'vue'
import router from '../router'

//设置基地址
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log(config);
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    console.log(response);
    if (response.data.meta.status === 200) {
        Vue.prototype.$message.success(response.data.meta.msg)
    } else if (
        response.data.meta.status == 400 &&
        response.data.meta.msg == '无效token'
    ) {
        new Vue().$message.warning('token好像是你伪造的！')
        // 编程式导航
        router.push('login')
        // 删除token
        window.sessionStorage.clear('token')
        // 如果token无效 data.data是null 后续代码会提示错误
        response.data.data = []
    }
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
    },
    updateUserStatus(params) {
        return axios.put(`users/${params.id}/state/${params.type}`)
    },
    deleteUseUserById(id) {
        return axios.delete(`users/${id}`)
    },
    addUser(params) {
        return axios.post('users', params)
    },
    getUserById(id) {
        return axios.get(`users/${id}`)
    },
    updateUser(params) {
        return axios.put(`users/${params.id}`, {
            email: params.email,
            mobile: params.mobile
        })
    },
    // 删除角色
    deleteUserById(id) {
        return axios.delete(`users/${id}`)
    },
    getRoles() {
        return axios.get('roles')
    },
    updateUserRole(params) {
        return axios.put(`users/${params.id}/role`, {
            rid: params.rid
        })
    },
    addRoles(params) {
        return axios.post(`roles`, params)
    },

    // 删除角色
    deleteRoles(id) {
        return axios.delete(`roles/${id}`)
    },
    // 获取角色信息
    getRolesById(id) {
        return axios.get(`roles/${id}`)
    },
    // 修改角色
    updateRoles(params) {
        return axios.put(`roles/${params.id}`, {
            roleName: params.roleName,
            roleDesc: params.roleDesc
        })
    },
    getListRights() {
        return axios.get(`rights/list`)
    },

    //获取展示的数据
    getReports() {
        return axios.get('reports/type/1')
    },
    getOrderList(params){
        return axios.get('orders',{
            params
        })
    },
    deleteRight(params){
        return axios.delete(`roles/${params.roleId}/rights/${params.rightId}`)
    }
}


export default {
    install(Vue) {
        Vue.prototype.$request = request
    }
}

