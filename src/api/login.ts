import { commonPostJson } from '@/src/http/index'
import type { IPlan } from '@/src/types/order'

export function login(
    data: {
        username: string,
        password: string,
    }
) {
    return commonPostJson<{ obj: { plans: IPlan[] }}>('/api/v1/user/login', data, { cache: 'no-cache' });
}
