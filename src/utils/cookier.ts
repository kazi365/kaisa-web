type setCookieOptions = {
    domain?: string;
    expires?: string | number;
    maxAge?: number;
    path?: string;
}

export const COOKIE_KEY_MAP = {
    TOKEN: 'Token',
    ERROR: 'error',
}
export function getCookieValue(name: string): string {
    if (!name) {
        console.warn(`getCookieValue: 'name' isn't found`);
        return '';
    }
    const cookie = document.cookie.match(new RegExp(`(^| )${name}=([^;]*)`))
    return cookie?.[2] || '';
}
export function removeCookie(name: string, options?: setCookieOptions) {
    if (!name) {
        console.warn(`setCookie: 'name' isn't found`);
        return;
    }
    setCookie(name, '', { ...options, expires: new Date(Date.now() - 1000).toUTCString() })
}
export function setCookie(name: string, value: string, options?: setCookieOptions) {
    if (!name) {
        console.warn(`setCookie: 'name' isn't found`);
    }
    const strs: string[] = [`${name}=${value}`]
    options?.path && strs.push(`; path=${options.path}`);
    options?.domain && strs.push(`; domain=${options.domain}`);
    const maxAge = Number(options?.maxAge)
    maxAge && strs.push(`; max-age=${maxAge}`);
    options?.expires && strs.push(`; expires=${new Date(options.expires).toUTCString()}`);
    document.cookie = strs.join('')
}
