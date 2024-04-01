import type { UseFetchOptions } from 'nuxt/dist/app'

function requestInterceptors(requestConfig: any) {
    const { options, request } = requestConfig
    options.headers ||= {}
    // timestamp
    if (!options.headers['RT-Timestamp']) {
        const timestamp = Date.now().toString()
        options.headers['RT-Timestamp'] = timestamp
    }
    // requestId
    if (!options.headers['RT-RequestID']) {
        let requestId: string
        try {
            requestId = self.crypto.randomUUID()
        } catch (error) {
            requestId = request.replace(/[^\w]/gi, '') + options.headers['RT-Timestamp']
        }
        options.headers['RT-RequestID'] ||= requestId
    }
    return requestConfig;
}

export async function commonRequest<R>(
    url: string,
    config: UseFetchOptions<R> = {},
) {
    const runtimeConfig = useRuntimeConfig()
    try {
        // baseURL
        config.baseURL ||= runtimeConfig.public.NUXT_API_BASE_URL

        const res = await useFetch(url, {
            ...config,
            onRequest: (requestConfig) => requestInterceptors(requestConfig),
        })
        if (res.error.value) {
            throw res.error.value.message;
        }
        return res.data;
    } catch (error) {
        return Promise.reject(error);
    }
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
