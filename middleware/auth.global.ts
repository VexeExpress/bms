import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';


export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = useCookie('access_token');

    if (token.value) {
        // Xác minh token

        if (to.path === '/') {
            return navigateTo('/room-work');
        }
    }

    if (!token.value && to.path !== '/') {
        return navigateTo('/');
    }
});
