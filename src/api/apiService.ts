import axios, { AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import vueRouter from '../router';
import {ElMessage} from 'element-plus';


const service: AxiosInstance = axios.create({
    baseURL: "http://47.111.162.112:8898",
    timeout: 10000
});

service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        return config;
    },
    (error: AxiosError) => {
        console.error(error); // Replace console.log with console.error for error handling
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 200) {
            const code = response.data.code;
            const msg = response.data.msg;
            // if (code == 401) {
            //     vueRouter.replace('/login');
            //     ElMessage.error(msg);
            //     return Promise.reject(response);
            // }
            return response;
        } else {
            return Promise.reject(response); // Reject with response for further error handling
        }
    },
    (error: AxiosError) => {
        console.error(error); // Rep
        return Promise.reject(error);
    }
);

export const apiService = {

    request: (config: AxiosRequestConfig) => {
        return service.request(config).then((response: AxiosResponse) => {
            return response.data;
        });
    },

    fetchGetData: (url: any) => {
        return service
            .request({
                method: 'GET',
                url: url,
            })
            .then((response: AxiosResponse) => response.data);
    },

    fetchPostData: (url: any,data: any) => {
        return service
            .request({
                method: 'POST',
                url: url,
                data: data
            })
            .then((response: AxiosResponse) => response.data);
    }
};
