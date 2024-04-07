// @ts-ignore
import type { UseFetchOptions } from 'nuxt/dist/app'
import { useNotify } from '@/composables/use-notify/useNotify'

const { notify } = useNotify()

export declare interface IHttpExtendConfig {
    notifyOnError?: boolean; // default true
}

function requestInterceptors(requestConfig: any) {
    const { options, request } = requestConfig
    options.headers ||= {}
    return requestConfig;
}

export async function commonRequest<R>(
    url: string,
    config: UseFetchOptions<R> = {},
    customConfig: IHttpExtendConfig = {}
) {
    const runtimeConfig = useRuntimeConfig()
    try {
        // baseURL
        config.baseURL ||= runtimeConfig.public.NUXT_API_BASE_URL

        const res = await useFetch(url, {
            ...config,
            onRequest: (requestConfig) => requestInterceptors(requestConfig),
        })

        const data =  JSON.parse(JSON.stringify(res.data.value))
        if (data?.success === false) {
            const error = data.msg
            const { notifyOnError = true } = customConfig
            error && notifyOnError && notify({ msg: JSON.stringify(error?.message ?? error), type: 'negative' });
            return;
        }
        return Promise.resolve(data);
    } catch (error: any) {
        console.error(error)
        const { notifyOnError = true } = customConfig
        error && notifyOnError && notify({ msg: JSON.stringify(error?.message ?? error), type: 'negative' });
        return Promise.reject(error);
    }
}

export function commonGet<R = any, P = Record<string, any>>(
        url: string,
        params: P,
        config: UseFetchOptions<R> = {},
) {
    config.method = 'get'
    config.params = params || config.params
    return commonRequest<R>(url, config);
}

export function commonPostJson<R = any, D = any>(
    url: string,
    data: D,
    config: UseFetchOptions<R> = {},
) {
    config.method = 'post'
    config.body = data as any
    return commonRequest<R>(url, config);
}
