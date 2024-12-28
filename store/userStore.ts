// stores/userStore.ts
import { defineStore } from 'pinia';
import type {UserData} from "~/components/Auth/AuthType";

export const useUserStore = defineStore('user', {
    state: () => ({
        userData: null as UserData | null,
    }),

    actions: {
        // Tải dữ liệu từ localStorage khi khởi tạo store
        loadUserData() {
            const storedUserData = localStorage.getItem('userInfo');
            if (storedUserData) {
                this.userData = JSON.parse(storedUserData);
            }
        },

        // Lưu dữ liệu vào localStorage khi có sự thay đổi
        setUserData(userData: UserData) {
            this.userData = userData;
            localStorage.setItem('userInfo', JSON.stringify(userData));
        },

        clearUserData() {
            this.userData = null;
            localStorage.clear();
            const token = useCookie('access_token');
            token.value = null;
        },
    },

});
