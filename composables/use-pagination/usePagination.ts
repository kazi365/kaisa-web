import { reactive } from 'vue'

export interface IPageParam {
    pageNum: number;
    pageSize: number;
    total?: number;
}
export type TUsePaginationOptions = {
    pageNum?: number;
    pageSize?: number;
    total?: number;
}
export type TUsePaginationReturn = {
    paginationInfo: IPageParam;
    setNum: (pageNum?: number) => void;
    setSize: (pageSize?: number) => void;
    setTotal: (total?: number) => void;
}
export function usePagination(options?: TUsePaginationOptions): TUsePaginationReturn {
    const paginationInfo = reactive<IPageParam>({
        pageNum: options?.pageNum ?? 1,
        pageSize: options?.pageSize ?? 10,
        total: options?.total ?? 0,
    })
    const setNum = (pageNum?: number) => {
        paginationInfo.pageNum = pageNum ?? 1
    }
    const setSize = (pageSize?: number) => {
        paginationInfo.pageSize = pageSize ?? 10
    }
    const setTotal = (total?: number) => {
        paginationInfo.total = total ?? 0
    }

    return { paginationInfo, setNum, setSize, setTotal };
}
