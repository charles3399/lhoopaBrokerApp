import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';
import _ from 'lodash';
import { api, request } from '_utils/config';
import useAuthStore from '_reducers/authReducer';

const authStore = useAuthStore.getState();

// login function
export async function login(username: string | null, password: string | null) {
    let params = Object.assign({
        username,
        pin: password
    })

    try {
        let response: any = await axios.post(api.login, qs.stringify(params), request.headers as AxiosRequestConfig);

        console.log('response', response);
        
        if (response?.data?.success) {
            let data = response.data;

            console.log('success')
            authStore.updateUser(data.user, 'normal');

            return data;
        } else {
            console.log('Error while logging in.', response);
            throw new Error('Error while logging in');
        }
    } catch (error: any) {
        console.log('Error while logging in..', error);
        return error.response;
    }
}