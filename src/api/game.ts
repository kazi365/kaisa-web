import { commonPostJson } from '@/src/http'
import type {TPagination} from "~types/pagination";

export function getGameList(
        data: {
            gameName: string,
            type: string,
            status?: string,
            pageParam: TPagination,
        }
) {
    return commonPostJson<{ obj: {
        pageData: {
            gameName: string,
            startTime: Date,
            type: string,
            status: string,
            subscribeStatus: string,
        }[],
        pageParam: TPagination
        }}>('/api/v1/game/getGameList', data, { cache: 'no-cache' });
}

// subscribeGame
export function subscribeGame(
        data: {
            gameId: string,
        }
) {
    return commonPostJson<{ obj: {
    }}>('/api/v1/game/subscribeGame', data);
}

// unsubscribeGame
export function unsubscribeGame(
        data: {
            gameId: string,
        }
) {
    return commonPostJson<{ obj: {
    }}>('/api/v1/game/cancelSubscribeGame', data);
}