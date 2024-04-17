import { defineStore } from 'pinia'
import { logout } from '@/api/user'
import { COOKIE_KEY_MAP, getCookieValue, removeCookie } from '@/src/utils/cookier'

interface ISignUserInfo {
    clientId?: string;
    email?: string;
    planType?: string;
}

interface IUserState {
    userInfo: ISignUserInfo;
}

function getUserInfoByToken(token: string) {
    if (!token) return;
    const payloadCipher = /^\w+\.(\w+)\..+$/.exec(token)?.[1]
    if (!payloadCipher) return;
    const payloadPlain = window.atob(payloadCipher)
    const newUserInfo: ISignUserInfo = JSON.parse(payloadPlain || '{}')
    return newUserInfo;
}

export const useUserStore = defineStore('user', {
    state: (): IUserState => ({
        userInfo: getUserInfoByToken(getCookieValue(COOKIE_KEY_MAP.TOKEN)) ?? {},
    }),
    actions: {
        init(token: string) {
            this.userInfo = getUserInfoByToken(token) ?? {};
        },

        logout() {
            return new Promise((resolve, reject) => {
                logout()
                setTimeout(() => {
                    removeCookie(COOKIE_KEY_MAP.TOKEN, {
                        path: import.meta.env.VITE_BASE,
                        domain: import.meta.env.VITE_COOKIE_DOMAIN,
                    })
                    this.userInfo = {}
                    resolve(true)
                }, 0)
            })
        }
    }
})
