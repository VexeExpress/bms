import type {IntrospectType, LoginResponseType} from "~/components/Auth/AuthType";
import {decodeJWT} from "~/utils/decodeJWT";

// Tình huống:
// - Nếu không có cookie access_token: Điều hướng về trang đăng nhập.
// - Nếu có token nhưng không thể giải mã: Điều hướng về trang đăng nhập.
// - Nếu token gần hết hạn: Làm mới token và cập nhật cookie với token mới.
// - Nếu có lỗi trong quá trình làm mới token hoặc token không hợp lệ: Điều hướng về trang đăng nhập.

export default defineNuxtRouteMiddleware(async (to, from) => {
    const config = useRuntimeConfig();
    const token = useCookie('access_token');
    const lastActive = useState<number>('lastActive', () => Date.now());

    const inactiveThreshold = 2 * 60 * 1000; // Thời gian không hoạt động
    const currentActiveTime = Date.now();

    if (!token.value) {
        token.value = null;
        return navigateTo('/');
    }
    if (token.value) {
        try {
            const tokenData = decodeJWT(token.value);
            console.log('Decoded Token:', tokenData);
            localStorage.setItem('company_id', tokenData.companyId);
            localStorage.setItem('user_id', tokenData.userId);
            const currentTime = Math.floor(Date.now() / 1000); // Thời gian hiện tại
            const tokenExpiry = tokenData.exp; // Thời gian hết hạn của token
            const refreshThreshold = 60 * 30; // Làm mới token nếu còn dưới 30 phút
            // Nếu token gần hết hạn, gọi API để làm mới
            if (tokenExpiry - currentTime < refreshThreshold) {
                const refreshRes = await $fetch(`${config.public.apiUrl}/auth/refresh-token`, {
                    method: 'POST',
                    body: { token: token.value },
                }) as LoginResponseType;
                if (refreshRes.code === 1000) {
                    token.value = refreshRes.result.token;
                    console.log('Token refreshed successfully:', refreshRes.result.token);
                } else {
                    console.error('Refresh token failed:', refreshRes.message);
                    token.value = null;
                    return navigateTo('/');
                }
            }
        } catch (error) {
            console.error('Error decoding token:', error);
            token.value = null;
            return navigateTo('/');
        }
    }
    // Kiểm tra thời gian không hoạt động (inactive time)
    if (currentActiveTime - lastActive.value > inactiveThreshold) {
        console.log('User has been inactive for too long, checking token validity...');

        try {
            const res = await $fetch(`${config.public.apiUrl}/auth/introspect`, {
                method: 'POST',
                body: { token: token.value },
            }) as IntrospectType;

            if (!res.result.valid) {
                console.error('Token has expired.');
                token.value = null;
                return navigateTo('/');
            }
        } catch (err) {
            console.error('Error introspecting token:', err);
            token.value = null;
            return navigateTo('/');
        }
    }

    // Cập nhật thời gian hoạt động cuối cùng khi có sự kiện người dùng
    lastActive.value = currentActiveTime;



});