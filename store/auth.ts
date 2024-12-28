import { defineStore } from 'pinia';

import type {AuthState, LoginResponseType, LoginType} from "~/components/Auth/AuthType";

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        authenticated: false,
        loading: false,
        fullName: '',
        companyName: '',
        employeeId: 0,
        companyId: 0,
    }),
    actions: {
        async restoreUserInfo() {
            const storedUserInfo = localStorage.getItem('userInfo');
            if (storedUserInfo) {
                const userInfo = JSON.parse(storedUserInfo);
                this.authenticated = true;
                this.companyId = userInfo.companyId;
                this.employeeId = userInfo.employeeId;
                this.companyName = userInfo.companyName;
                this.fullName = userInfo.fullName;
            }
            this.loading = false; // Sau khi khôi phục xong, đặt loading thành false
        },



        async authenticateUser({ username, password }: LoginType) {
            const { data, pending }: any = await useFetch<LoginResponseType>('http://localhost:8080/api/auth/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: {
                    username,
                    password,
                },
            });
            console.log(data);
            this.loading = pending;
            if (data.value.code === 1000) {
                const token = useCookie('token');
                token.value = data.value.result.token;

                const userInfo = {
                    companyId: data.value.result.companyId,
                    employeeId: data.value.result.employeeId,
                    companyName: data.value.result.companyName,
                    fullName: data.value.result.fullName,
                }
                localStorage.setItem('userInfo', JSON.stringify(userInfo));

                this.authenticated = true;
                this.companyId = data.value.result.companyId;
                this.employeeId = data.value.result.employeeId;
                this.companyName = data.value.result.companyName;
                this.fullName = data.value.result.fullName;
            }
        },
        logUserOut() {
            const token = useCookie('token');
            this.authenticated = false;
            token.value = null;
            this.fullName = '';
            this.companyName = '';
            this.employeeId = 0;
            this.companyId = 0;
            localStorage.removeItem('userInfo');
        },
    },
});
