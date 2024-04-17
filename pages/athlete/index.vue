<script setup lang="ts">
import {getTeamList} from "@/src/api/team";
import {getAthleteList} from "@/src/api/athlete";

const columns = [
    { name: 'name', align: 'left', label: '运动员名称', type: '', },
    { name: 'type', align: 'left', label: '运动类型', type: ''},
    { name: 'country', align: 'left', label: '国家', type: '', },
    { name: 'score', align: 'left', label: '得分', type: '', },
]

const rows = ref<any>([])

const searchForm = ref({
    name: '',
    type: '',
    country: ''
})

const typeOptions = [
    { label: '足球', value: '足球' },
    { label: '篮球', value: '篮球' },
    { label: '乒乓球', value: '乒乓球' },
    { label: '羽毛球', value: '羽毛球' }
]

const search = () => {
    getAthleteListData()
}

const tablePagination = ref({
    sortBy: 'desc',
    descending: false,
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 0
})

const tableLoading = ref(false)

const getAthleteListData = async () => {
    tableLoading.value = true
    const { obj } = await getAthleteList(
            {
                name: searchForm.value.name,
                type: searchForm.value.type,
                country: searchForm.value.country,
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

const onRequest = (props: any) => {
    tablePagination.value.page = props.pagination.page
    tablePagination.value.rowsPerPage = props.pagination.rowsPerPage
    getAthleteListData()
}

getAthleteListData()
</script>

<template>
    <article class="game">
        <div class="banner">
            <div class="news-card__img">
                <img src="@/assets/imgs/news/news_bg.png" alt="news" />
            </div>
            <div>
                <p class="title mt-2 ml-2 text-2xl">
                    运动员浏览
                </p>
            </div>
            <div class="q-pa-md">
                <q-card>
                    <q-card-section>
                        <q-form class="search-form">
                            <q-input outlined label="运动员名称" v-model="searchForm.name" />
                            <q-input outlined label="国家" v-model="searchForm.country" />
                            <q-select
                                    outlined
                                    label="赛事类型"
                                    v-model="searchForm.type"
                                    :options="typeOptions"
                                    option-label="label"
                                    option-value="value"
                                    emitValue
                                    clearable
                            />

                            <q-btn dense label="搜索" color="primary" @click="search" />
                        </q-form>
                    </q-card-section>
                    <q-card-section>
                        <q-table
                                title="运动员信息"
                                :rows="rows"
                                :columns="columns"
                                row-key="name"
                                v-model:pagination="tablePagination"
                                :loading="tableLoading"
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
                            <template #body-cell-name="props">
                                <q-td :props="props">{{ props.row.name }}</q-td>
                            </template>
                            <template #body-cell-type="props">
                                <q-td :props="props">{{ props.row.type }}</q-td>
                            </template>
                            <template #body-cell-country="props">
                                <q-td :props="props">{{ props.row.country }}</q-td>
                            </template>
                            <template #body-cell-score="props">
                                <q-td :props="props">{{ props.row.score }}</q-td>
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