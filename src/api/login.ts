import { commonPostJson } from '@/src/http/index'

export function login(
    data: {
        username: string,
        password: string,
    }
) {
    return commonPostJson<{ obj: {}}>('/api/v1/user/login', data, { cache: 'no-cache' });
}
