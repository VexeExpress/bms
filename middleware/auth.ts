import type {IntrospectType, LoginResponseType} from "~/components/Auth/AuthType";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const config = useRuntimeConfig();
    const cookies = useCookie('access_token');
    if (!cookies.value) {
        cookies.value = null;
        return navigateTo('/');
    }
    try {
        // Kiểm tra token còn hiệu lực hay không (true - false)
        const res = await $fetch(`${config.public.apiUrl}/auth/introspect`, {
            method: 'POST',
            body: {token: cookies.value}
        }) as IntrospectType;
        console.log('Check token ', res)

        if (!res.result.valid) {
            // Token không còn hiệu lực, thực hiện refresh token
            try {
                const refreshRes = await $fetch(`${config.public.apiUrl}/auth/refresh-token`, {
                    method: 'POST',
                    body: {token: cookies.value}
                }) as LoginResponseType;

                // Gán giá trị của token mới vào cookie để đảm bảo cookie đang cầm token hợp lệ
                if (refreshRes.code === 1000) {
                    cookies.value = refreshRes.result.token;
                    console.log('Token refreshed successfully:', refreshRes.result.token);
                } else {
                    console.error('Refresh token failed:', refreshRes.message);
                    cookies.value = null;
                    return navigateTo('/');
                }
            } catch (refreshErr){
                console.error('Error refreshing token:', refreshErr);
                cookies.value = null;
                return navigateTo('/');
            }
        }
    } catch (err) {
        console.log('error', err);
        cookies.value = null;
        return navigateTo('/');
    }
});