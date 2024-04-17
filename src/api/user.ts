import { commonPostJson } from '@/src/http/index'

export function user(
    data: {
        username: string,
        password: string,
    }
) {
    return commonPostJson<{ obj: {
            token: string,
        }}>('/api/v1/user/login', data, { cache: 'no-cache' });
}


export function signup(
    data: {
        username: string,
        email: string,
        phone: string,
        password: string,
        firstName: string,
        lastName: string,
    }
) {
    return commonPostJson<{ obj: {}}>('/api/v1/user/register', data, { cache: 'no-cache' });
}