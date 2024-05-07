import {commonGet, commonPostJson} from '@/src/http'
import type {TPagination} from "~types/pagination";

export function getAthleteList(
        data: {
            name: string,
            type: string,
            country: string,
            pageParam: TPagination,
        }
) {
    return commonPostJson<{ obj: {
            pageData: {
                id: number,
                name: string,
                type: string,
                country: string,
                score: string,
            }[],
            pageParam: TPagination
        }}>('/api/v1/athlete/getAthleteList', data, { cache: 'no-cache' });
}

export function getAthleteListByTeamId(
        params: {
            teamId: number
        }
) {
    return commonGet<{}>('/api/v1/athlete/getAthleteListByTeamId', params);
}