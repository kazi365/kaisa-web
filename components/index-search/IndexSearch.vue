<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { $indexSearch } from './index'

interface IResultItem {
    anchor?: string;
    description?: string;
    group: string;
    keyword?: string;
    id: string;
    pageId: string;
    path?: string;
    title: string;
}

interface IFormattedResultGroupItem {
    children: (IResultItem & { anchors?: IResultItem[] })[];
    group: string;
}

export default defineComponent({
    name: 'IndexSearch',
    setup(props) {
        const runtimeConf = useRuntimeConfig()
        const { push } = useRouter()
        const { search, result } = useAlgoliaSearch<IResultItem>(runtimeConf.public.NUXT_ALGOLIA_INDEX_NAME)

        const keywordInputRef = ref<HTMLInputElement | null>(null)

        const formData = reactive({
            keyword: '',
        })

        const inputKeyword = useDebounceFn(() => {
            const { keyword } = formData
            if (!keyword) return;
            search({ query: formData.keyword })
        }, 200)
        watch(() => result.value, (val) => {
            activeResultId.value = cpu_searchResults.value[0]?.children[0].id
        })
        const submit = (e: Event) => {
            const { keyword } = formData
            if (!keyword) return;
            if (!result.value) return;
            const activeResult = result.value.hits.find(({ id }) => id === activeResultId.value)
            if (!activeResult) return;
        }

        const activeResultId = ref('')
        const cpu_searchResults = computed(() => {
            const { keyword } = formData
            if (!keyword) return [];
            if (!result.value) return [];

            const arr: IFormattedResultGroupItem[] = []
            const hits = result.value.hits
            const pageResults: typeof hits = []
            const anchorResults: typeof hits = []
            for (const result of hits) {
                const { group, path, anchor } = result
                if (anchor) {
                    anchorResults.push(result)
                } else if (path) {
                    pageResults.push(result)
                }
                if (!arr.find(item => item.group === group)) {
                    arr.push({ group, children: [] })
                }
            }
            
            for (const pageResult of pageResults) {
                const { id, group, pageId, title, description, path } = pageResult
                let groupItem = arr.find(item => item.group === group)!
                const groupPages = groupItem.children
                const pageItem: IFormattedResultGroupItem['children'][number] = {
                    id, group, pageId, title, description, path, anchors: []
                }
                groupPages.push(pageItem)
                const anchors = pageItem.anchors!
                for (const anchorResult of anchorResults) {
                    const { id, group, pageId: anchorPageId, title, description, path: anchorPath, anchor } = anchorResult
                    if (anchorPageId === pageId) {
                        anchors.push({
                            id,
                            group,
                            pageId: anchorPageId,
                            title,
                            description,
                            path: anchorPath || path,
                            anchor,
                        })
                    } else {
                        // 
                    }
                }
            }

            return arr;
        })
        const strokeResult = (result: IFormattedResultGroupItem['children'][number]) => {
            activeResultId.value = result.id
        }
        const pickResult = (result: IFormattedResultGroupItem['children'][number]) => {
            const { path, anchor } = result
            if (!path) return;
            const fullPath = `${path}${anchor ? `#${anchor}` : ''}`
            push(fullPath)
            close()
        }

        const close = () => {
            $indexSearch.unmount()
        }

        onMounted(() => {
            keywordInputRef.value?.focus()
        })

        return {
            keywordInputRef,
            formData,
            inputKeyword,
            submit,
            activeResultId,
            cpu_searchResults,
            strokeResult,
            pickResult,
            close,
        };
    }
})
</script>

<template>
    <div class="index-search">
        <div class="index-search-mask" @click="close" />
        <div class="index-search-box">
            <form class="search-box-bar" @submit.prevent="submit">
                <div class="box-bar-keyword">
                    <div class="i-mdi-magnify text-2xl" />
                    <input
                        ref="keywordInputRef"
                        class="keyword-input"
                        v-model="formData.keyword"
                        autofocus
                        placeholder="Search"
                        type="text"
                        @update:model-value="inputKeyword"
                    />
                </div>
            </form>
            <div class="search-box-result">
                <template v-if="!cpu_searchResults.length">
                    <div class="py-4 text-center">No result</div>
                </template>
                <template v-else>
                    <div v-for="item in cpu_searchResults" :key="item.group" class="result-group-item">
                        <p class="group-name">{{ item.group }}</p>
                        <ul class="list-none pl-0 my-0">
                            <template v-for="resItem in item.children" :key="resItem.id">
                                <li
                                    class="result-item"
                                    :class="{ 'result--active': resItem.id === activeResultId }"
                                    @mouseenter="strokeResult(resItem)"
                                    @click="pickResult(resItem)"
                                >
                                    <div class="flex items-center">
                                        <div
                                            class="mr-2 text-2xl"
                                            :class="resItem.anchor ? 'i-mdi-pound' : 'i-mdi-file-document-outline'"
                                        />
                                        <div class="flex-1 min-w-0">
                                            <p class="result-title">{{ resItem.title }}</p>
                                            <p v-if="resItem.description" class="result-desc">{{ resItem.description }}</p>
                                        </div>
                                        <div
                                            class="i-mdi-arrow-left-bottom ml-2 text-2xl"
                                            :class="resItem.id === activeResultId ? void 0 : 'invisible'"
                                        />
                                    </div>
                                </li>
                                <li
                                    v-for="anchorItem in resItem.anchors"
                                    :key="anchorItem.id"
                                    class="result-item"
                                    :class="{ 'result--active': anchorItem.id === activeResultId }"
                                    @mouseenter="strokeResult(anchorItem)"
                                    @click="pickResult(anchorItem)"
                                >
                                    <div class="flex items-center pl-5">
                                        <div
                                            class="mr-2 text-2xl"
                                            :class="anchorItem.anchor ? 'i-mdi-pound' : 'i-mdi-file-document-outline'"
                                        />
                                        <div class="flex-1 min-w-0">
                                            <p class="result-title">{{ anchorItem.title }}</p>
                                            <p v-if="anchorItem.description" class="result-desc">{{ anchorItem.description }}</p>
                                        </div>
                                        <div
                                            class="i-mdi-arrow-left-bottom ml-2 text-2xl"
                                            :class="anchorItem.id === activeResultId ? void 0 : 'invisible'"
                                        />
                                    </div>
                                </li>
                            </template>
                        </ul>
                    </div>
                </template>
            </div>
            <div class="search-box__footer">
                <a href="https://www.algolia.com/" target="_blank">
                    <span class="align-middle text-xs rt-color-text-lighter">Search by</span>
                    <img class="w-20 ml-2 align-middle" alt="" src="~/assets/imgs/Algolia-logo-blue.png" />
                </a>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "~/assets/css/variables.module.scss";

.index-search {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    padding-right: 1rem;
    padding-left: 1rem;
    .index-search-mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.25);
    }
    .index-search-box {
        position: relative;
        width: 100%;
        max-width: $--container-md;
        border-radius: 0.25rem;
        margin: 10vh auto 0 auto;
        background-color: var(--color-bg-dark);
        box-shadow: 0 0 0.25rem 0.125rem rgba(255, 255, 255, 0.25);
        overflow: hidden;
    }
    .search-box-bar {
        padding: 1rem 1rem 0 1rem;
        margin-bottom: 1rem;
    }
    .box-bar-keyword {
        display: flex;
        align-items: center;
        padding-right: 1rem;
        padding-left: 1rem;
        border: 1px solid var(--color-border);
        border-radius: 0.25rem;
        font-size: 1.125rem;
        background-color: #ffffff;
        &:has(input:focus) {
            border-color: var(--color-theme);
        }
    }
    .keyword-input {
        flex: 1;
        min-width: 0;
        padding: 1rem 0 1rem 0.5rem;
        border: none;
        outline: none;
    }
    .search-box-result {
        max-height: 50vh;
        padding-right: 1rem;
        padding-left: 1rem;
        overflow-y: auto;
    }
    .result-group-item {
        .group-name {
            margin-block-start: 0;
            margin-block-end: 0;
            line-height: 1.5;
            color: var(--color-theme);
        }
    }
    .result-group-item + .result-group-item {
        margin-top: 0.5rem;
    }
    .result-item {
        padding: 1rem;
        border-radius: 0.25rem;
        background-color: var(--color-bg);
        cursor: pointer;
        .result-title {
            margin-block-start: 0;
            margin-block-end: 0;
            line-height: 1.5;
        }
        .result-desc {
            margin-block-start: 0;
            margin-block-end: 0;
            font-size: 0.875rem;
            color: var(--color-text-lighter);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        &.result--active {
            background-color: var(--color-theme-light);
        }
    }
    .result-item + .result-item {
        margin-top: 0.5rem;
    }
    .search-box__footer {
        display: flex;
        justify-content: flex-end;
        padding: 1rem;
        margin-top: 1rem;
        background-color: #ffffff;
        box-shadow: 0 0 0.25rem 0 rgba(0, 0, 0, 0.1);
    }
}
</style>
