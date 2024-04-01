import { commonPostJson } from '@/src/http/index'
import type { IPlan } from '@/src/types/order'

export function addContact(
    data: {
        companyName: string,
        countryOrRegion: string,
        email: string,
        fullName: string,
        hear: string,
        more: string,
        product: string,
    }
) {
    return commonPostJson<{ obj: { plans: IPlan[] }}>('/api/v1/contact/submit', data, { cache: 'no-cache' });
}
export function subscribeMarket(
    data: { email: string, fullName: string }
) {
    return commonPostJson<{ obj: { plans: IPlan[] }}>('/api/v1/market/subscribe', data, { cache: 'no-cache' });
}
