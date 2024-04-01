import { commonPostJson } from '@/src/http/index'
import type { IPlan } from '@/src/types/order'

export function getRspPlans() {
    return commonPostJson<{ obj: { plans: IPlan[] }}>('/api/v1/plan/list', {});
}
