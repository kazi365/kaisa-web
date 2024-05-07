<script setup lang="ts">
import {getTeamList} from "@/src/api/team";
import {getAthleteListByTeamId} from "@/src/api/athlete";

const { query } = useRoute()
const router = useRouter()


const columns = [
    { name: 'teamName', align: 'left', label: '队伍名称', field: 'name', sortable: true },
    { name: 'type', align: 'left', label: '类型', field: 'type', sortable: true },
    { name: 'country', align: 'left', label: '国家', field: 'country', sortable: true },
    { name: 'score', align: 'left', label: '得分', field: 'score', sortable: true },
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
    country: '',
    type: ''
})

const typeOptions = [
    { label: '足球', value: '足球' },
    { label: '篮球', value: '篮球' },
    { label: '乒乓球', value: '乒乓球' },
    { label: '羽毛球', value: '羽毛球' }
]

const onRequest = (props: any) => {
    tablePagination.value.page = props.pagination.page
    tablePagination.value.rowsPerPage = props.pagination.rowsPerPage
    getTeamListData()

}

const search = () => {
    getTeamListData()
}

const getTeamListData = async () => {
    tableLoading.value = true
    const { obj } = await getTeamList(
            {
                teamName: searchForm.value.name,
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
    searchForm.value.name = ''
}

const medium = ref(false)
const detailRow = ref<any>({})

const athletes = ref([])

const detail = async (row: any) => {

    const { obj } : any = await getAthleteListByTeamId({
        teamId: row.id
    })

    athletes.value = obj
    console.log(obj)
    medium.value = true
    detailRow.value = row
}

if(query) {
    searchForm.value.name = query.teamName
    if(!searchForm.value.type) {
        searchForm.value.type = query.type
    }
}

getTeamListData()

const toAthletePage = (athlete: any) => {
    router.push({name: 'athlete', query: { athleteName: athlete.name, type: athlete.type }} )
}

</script>

<template>
    <article class="game">
        <q-dialog
                v-model="medium"
                class="dialog-medium"
        >
            <q-card class="dialog-medium-card" style="width: 700px; max-width: 80vw; ">
                <q-card-section>
                    <div class="text-h4">队伍详情</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div>
                        <div class="text-xl mb-2">队伍信息</div>
                        <q-separator />
                        <div class="mt-4" id="dialog-item">
                            <span class="">队伍名称：</span>
                            <span class="">{{ detailRow.teamName }}</span>
                        </div>
                        <div class="" id="dialog-item">
                            <span class="">队伍国家：</span>
                            <span  class="detail-content-item-content">{{ detailRow.country }}</span>
                        </div>
                        <div class="" id="dialog-item">
                            <span class="">队伍类型：</span>
                            <span  class="">{{ detailRow.type }}</span>
                        </div>
                        <div class="" id="dialog-item">
                            <span class="">队伍得分：</span>
                            <span  class="">{{ detailRow.score }}</span>
                        </div>
                    </div>

                    <div class="mb-4">
                        <div class="text-xl mt-8 mb-2">队伍成员信息</div>
                        <q-separator />
                        <div v-for="item in athletes">
                            <div  id="dialog-item">
                                <span class="">队员：</span>
                                <a  class="ml-4" @click="toAthletePage(item)">{{ item.name }}</a>
                            </div>
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>
        <div class="banner">
            <div class="news-card__img">
                <img src="@/assets/imgs/news/news_bg.png" alt="news" />
            </div>
            <div>
                <p class="title mt-2 ml-2 text-2xl">
                    队伍信息浏览
                </p>
            </div>
            <div class="q-pa-md">
                <q-card>
                    <q-card-section>
                        <q-form class="search-form">
                            <q-input outlined label="国家" v-model="searchForm.country" />
                            <q-select
                                    outlined
                                    label="赛事类型"
                                    clearable
                                    v-model="searchForm.type"
                                    :options="typeOptions"
                                    emitValue
                                    option-label="label"
                                    option-value="value"
                            />

                            <q-btn dense label="搜索" color="primary" @click="search" />
                        </q-form>
                    </q-card-section>
                    <q-card-section>
                        <q-table
                                title="队伍信息"
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
                            <template #body-cell-teamName="props">
                                <q-td :props="props">{{ props.row.teamName }}</q-td>
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
                                            label="查看详情"
                                            @click="detail(props.row)"
                                    >
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