import { commonPostJson } from '@/src/http/index'
import type { IPageParam } from '@/composables/use-pagination/usePagination'
import type { IResourceCommentItem } from '@/src/types/resource'

export function commentResource(
    data: {
        commenter: IResourceCommentItem['commenter'],
        content: IResourceCommentItem['content'],
        prevId?: IResourceCommentItem['id'],
        resourceId: string,
    }
) {
    return commonPostJson('/api/v1/resource/comment', data, { cache: 'no-cache' });
}
export function getComments(data: { pageParam: IPageParam, resourceId: string }) {
    return commonPostJson<{
        obj: { pageData: IResourceCommentItem[], pageParam: IPageParam }
    }>('/api/v1/resource/queryComment', data, { cache: 'no-cache' });
}
export function getLikeCount(data: { resourceId: string }) {
    return commonPostJson<{ obj: { likes: number } }>('/api/v1/resource/queryLikes', data, { cache: 'no-cache' });
}
export function likeResource(data: { resourceId: string }) {
    return commonPostJson('/api/v1/resource/like', data, { cache: 'no-cache' });
}
