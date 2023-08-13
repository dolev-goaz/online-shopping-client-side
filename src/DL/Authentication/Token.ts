import { axiosInstance } from ".."
import { AuthenticationResponse } from ".";

type TokenCookieKeys = "access_token" | "refresh_token";

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

function deleteAuthorization() {
    axiosInstance.interceptors.request.clear();
    clearCookie('access_token');
    clearCookie('refresh_token');
}

function loadAuthorization() {
    const existingAccessToken = getCookie("access_token");
    if (!existingAccessToken) return false;
    setAuthorizationHeader(existingAccessToken);
    return true;
}

function setAuthorizationHeader(accessToken: string) {
    axiosInstance.interceptors.request.clear();
    axiosInstance.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${accessToken}`
        return config;
    });
}

function setAuthorization(response: AuthenticationResponse) {
    function secondsAhead(seconds: number) {
        const returnDate = new Date();
        returnDate.setSeconds(returnDate.getSeconds() + seconds);
        return returnDate;
    }

    // TODO: get these values from the response object
    const dayInSeconds = 60*60*24;
    setCookie("access_token", response.access_token, secondsAhead(dayInSeconds));
    setCookie("refresh_token", response.refresh_token, secondsAhead(7 * dayInSeconds));

    setAuthorizationHeader(response.access_token);
}

export default {
    setAuthorization,
    loadAuthorization,
    deleteAuthorization
}