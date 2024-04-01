/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly NUXT_PACK_ENV: string;
    readonly NUXT_APP_BASE_PATH: string;

    readonly NUXT_HREF_URL: string;
    readonly NUXT_API_BASE_URL: string;

    readonly NUXT_FORUM_URL: string;
    readonly NUXT_EIM_SIGNUP_URL: string;
    readonly NUXT_NUSIM_URL: string;
    readonly NUXT_RSP_SIGNUP_URL: string;
    readonly NUXT_SIMLESSLY_DOC_URL: string;

    readonly NUXT_ALGOLIA_INDEX_NAME: string;

    readonly NUXT_GOOGLE_TAG_MANAGER_CONTAINER_ID: string;

    readonly NUXT_HUBSPOT_MEETING_BRUCE_URL: string;
}
interface ImportMeta {
    readonly env: ImportMetaEnv;
}
