import { axiosInstance } from ".."
import { TokenResponse } from ".";

type TokenCookieKeys = "access_token" | "refresh_token";

type FetchByRefreshToken = (refreshToken: string) => Promise<TokenResponse>;

class TokenManager {
    deleteAuthorization() {
        axiosInstance.interceptors.request.clear();
        clearCookie('access_token');
        clearCookie('refresh_token');
    }
    
    loadAuthorization() {
        const existingAccessToken = getCookie("access_token");
        if (!existingAccessToken) return false;
        this.setAuthorizationHeader(existingAccessToken);
        return true;
    }
    
    private setAuthorizationHeader(accessToken: string) {
        axiosInstance.interceptors.request.clear();
        axiosInstance.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${accessToken}`
            return config;
        });
    }
    
    setAuthorization(response: TokenResponse) {
        function secondsAhead(seconds: number) {
            const returnDate = new Date();
            returnDate.setSeconds(returnDate.getSeconds() + seconds);
            return returnDate;
        }
    
        // TODO: get these values from the response object
        const dayInSeconds = 60*60*24;
        setCookie("access_token", response.accessToken, secondsAhead(dayInSeconds));
        setCookie("refresh_token", response.refreshToken, secondsAhead(7 * dayInSeconds));
    
        this.setAuthorizationHeader(response.accessToken);
    }
    
    async authorizeRefreshToken(callback: FetchByRefreshToken) {
        const refresh = getCookie('refresh_token');
        if (!refresh) return false;

        const setAuth = this.setAuthorization.bind(this);
        await callback(refresh).then(setAuth);
        return true;
    }
}

function getCookie(name: TokenCookieKeys) {
    return document.cookie.match(`${name}=(.*?)(?:;|$)`)?.pop();
}
function clearCookie(name: TokenCookieKeys): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
function setCookie(name: TokenCookieKeys, value: string, expiration?: Date | string) {
    const cookieValue = `${name}=${value};`;
    if (!expiration) {
        document.cookie = cookieValue;
        return;
    }
    const expirationStr = typeof expiration === 'string' ? expiration : expiration.toUTCString();
    const expirationValue = `expires=${expirationStr};`;
    document.cookie = `${cookieValue} ${expirationValue}`;
}

export default {
    TokenManager
}