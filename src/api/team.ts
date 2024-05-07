import {commonGet, commonPostJson} from '@/src/http'
import type {TPagination} from "~types/pagination";

export function getTeamList(
        data: {
            teamName: string,
            type: string,
            country: string,
            pageParam: TPagination,
        }
) {
    return commonPostJson<{ obj: {
            pageData: {
                id: number,
                teamName: string,
                type: string,
                country: string,
                score: string,
            }[],
            pageParam: TPagination
        }}>('/api/v1/team/getTeamList', data, { cache: 'no-cache' });
}

export function getVsTeamList(
        params: {
            gameId: number
        }
) {
    return commonGet<{}>('/api/v1/team/getVsTeam', params);
}