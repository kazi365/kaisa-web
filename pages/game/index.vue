<script setup lang="ts">
import {getGameList} from "@/src/api/game";

const columns = [
    { name: 'gameName', align: 'left', label: '赛事名称', type: '', },
    { name: 'type', align: 'left', label: '比赛类型', type: ''},
    { name: 'startTime', align: 'left', label: '开始时间', type: '', },
    { name: 'status', align: 'left', label: '状态', type: '', },
    { name: 'operation', align: 'left', label: '操作', type: '', },
]

const rows = ref<any>([])
const tablePagination = ref({
    sortBy: 'desc',
    descending: false,
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 0
})
const tableLoading = ref(false)

const searchForm = ref({
    name: '',
    type: '',
    startTime: '',
    status: ''
})

const typeOptions = [
    { label: '足球', value: '足球' },
    { label: '篮球', value: '篮球' },
    { label: '乒乓球', value: '乒乓球' },
    { label: '羽毛球', value: '羽毛球' }
]

const statusOptions = [
    { label: '未开始', value: '0' },
    { label: '进行中', value: '1' },
    { label: '已结束', value: '2' }
]

const getGameListData = async () => {
    tableLoading.value = true
    const { obj } = await getGameList(
        {
            gameName: searchForm.value.name,
            type: searchForm.value.type,
            status: searchForm.value.status,
            pageParam: {
                pageNum: !tablePagination.value?.page ? 1 : tablePagination.value.page,
                pageSize: !tablePagination.value?.rowsPerPage ? 10 : tablePagination.value.rowsPerPage,
                total: 0
            }
        }
    )
    rows.value = obj.pageData
    tablePagination.value.rowsNumber = obj.pageParam.total
    tableLoading.value = false
}

const search = () => {
    getGameListData()
}

const cpu_displayStatusValue = (value: string) => {
    const status = statusOptions.find(item => item.value === value)
    return status?.label
}

const cpu_timestampToTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
}

getGameListData()

const onRequest = (props: any) => {
    tablePagination.value.page = props.pagination.page
    tablePagination.value.rowsPerPage = props.pagination.rowsPerPage
    getGameListData()

}
</script>

<template>
    <article class="game">
        <div class="banner">
            <div class="news-card__img">
                <img src="@/assets/imgs/news/news_bg.png" alt="news" />
            </div>
            <div>
                <p class="title mt-2 ml-2 text-2xl">
                    赛事浏览
                </p>
            </div>
            <div class="q-pa-md">
                <q-card>
                    <q-card-section>
                        <q-form class="search-form">
                            <q-input outlined label="赛事名称" v-model="searchForm.name" />
                            <q-select
                                    outlined
                                    label="赛事类型"
                                    emitValue
                                    clearable
                                    v-model="searchForm.type"
                                    :options="typeOptions"
                                    option-label="label"
                                    option-value="value"
                            />
                            <q-select
                                    outlined
                                    label="状态"
                                    clearable
                                    v-model="searchForm.status"
                                    :display-value="cpu_displayStatusValue(searchForm.status)"
                                    :options="statusOptions"
                                    emitValue
                                    option-label="label"
                                    option-value="value"
                            />
                            <q-btn dense label="搜索" color="primary" @click="search" />
                        </q-form>
                    </q-card-section>
                    <q-card-section>
                        <q-table
                                title="赛事信息"
                                :rows="rows"
                                :columns="columns"
                                :loading="tableLoading"
                                row-key="name"
                                v-model:pagination="tablePagination"
                                :rows-per-page-options="[10, 20, 50, 100]"
                                @request="onRequest"
                            >

                            <template v-slot:header="props">
                                <q-tr :props="props">
                                    <q-th
                                            v-for="col in props.cols"
                                            :key="col.name"
                                            :props="props"
                                    >
                                        {{ col.label }}
                                    </q-th>
                                </q-tr>
                            </template>
                            <template #body-cell-gameName="props">
                                <q-td :props="props">{{ props.row.gameName }}</q-td>
                            </template>
                            <template #body-cell-type="props">
                                <q-td :props="props">{{ props.row.type }}</q-td>
                            </template>
                            <template #body-cell-startTime="props">
                                <q-td :props="props">{{ cpu_timestampToTime(props.row.startTime) }}</q-td>
                            </template>
                            <template #body-cell-status="props">
                                <q-td :props="props">{{ props.row.status }}</q-td>
                            </template>

                            <template #body-cell-operation="props">
                                <q-td :props="props">
                                    <q-btn
                                            dense
                                            no-wrap
                                            outline
                                            padding="sm"
                                            flat
                                            color="primary"
                                            label="查看" >
                                    </q-btn>
                                </q-td>
                            </template>
                        </q-table>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </article>
</template>

<style lang="scss" scoped>
.game {
    &::before {
        content: "";
        display: block;
        height: var(--header-height);
    }
    .search-form {
        display: flex;
        .q-field {
            width: 30%;
        }
        // 每个间隔
        .q-field + .q-field {
            margin-left: 1rem;
        }
        // 按钮 上下居中
        .q-btn {
            margin-left: 1rem;
            width: 6rem;
            height: 3rem;
        }
    }
}
</style>