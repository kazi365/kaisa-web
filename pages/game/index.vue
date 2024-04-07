<script setup lang="ts">
const columns = [
    { name: 'name', align: 'left', label: '赛事名称', type: '', },
    { name: 'type', align: 'left', label: '比赛类型', type: ''},
    { name: 'startTime', align: 'left', label: '开始时间', type: '', },
    { name: 'status', align: 'left', label: '状态', type: '', },
    { name: 'operation', align: 'left', label: '操作', type: '', },
]

const rows = [
    {
        name: 'FBL01',
        type: '足球',
        startTime: '2021-09-01 12:00:00',
        status: '未开始',
        operation: '查看'
    },
    {
        name: 'BB-2021-001',
        type: '篮球',
        startTime: '2021-09-01 12:00:00',
        status: '进行中',
        operation: '查看'
    },
    {
        name: 'PP-2021-001',
        type: '乒乓球',
        startTime: '2021-09-01 12:00:00',
        status: '已结束',
        operation: '查看'
    },
    {
        name: 'YM-2021-001',
        type: '羽毛球',
        startTime: '2021-09-01 12:00:00',
        status: '未开始',
        operation: '查看'
    },
    {
        name: 'FB-2021-002',
        type: '足球',
        startTime: '2021-09-01 12:00:00',
        status: '未开始',
        operation: '查看'
    },
    {
        name: 'BB-2021-002',
        type: '篮球',
        startTime: '2021-09-01 12:00:00',
        status: '进行中',
        operation: '查看'
    },
    {
        name: 'PP-2021-002',
        type: '乒乓球',
        startTime: '2021-09-01 12:00:00',
        status: '已结束',
        operation: '查看'
    },
    {
        name: 'YM-2021-002',
        type: '羽毛球',
        startTime: '2021-09-01 12:00:00',
        status: '未开始',
        operation: '查看'
    },
    {
        name: 'FB-2021-003',
        type: '足球',
        startTime: '2021-09-01 12:00:00',
        status: '未开始',
        operation: '查看'
    },
    {
        name: 'BB-2021-003',
        type: '篮球',
        startTime: '2021-09-01 12:00:00',
        status: '进行中',
        operation: '查看'
    }
]

const searchForm = ref({
    name: '',
    type: '',
    startTime: '',
    status: ''
})

const typeOptions = [
    { label: '全部', value: '' },
    { label: '足球', value: '1' },
    { label: '篮球', value: '2' },
    { label: '乒乓球', value: '3' },
    { label: '羽毛球', value: '4' }
]

const statusOptions = [
    { label: '未开始', value: '0' },
    { label: '进行中', value: '1' },
    { label: '已结束', value: '2' }
]
const search = () => {
    console.log(searchForm.value)
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
                                    v-model="searchForm.type"
                                    :options="typeOptions"
                            />
                            <q-select
                                    outlined
                                    label="状态"
                                    v-model="searchForm.status"
                                    :options="statusOptions"
                            />
                            <q-btn dense label="搜索" color="primary" @click="search" />
                        </q-form>
                    </q-card-section>
                    <q-card-section>
                        <q-table
                                title="赛事信息"
                                :rows="rows"
                                :columns="columns"
                                row-key="name"
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
                            <template v-slot:body="props">
                                <q-tr :props="props">
                                    <q-td
                                            v-for="col in props.cols"
                                            :key="col.name"
                                            :props="props"
                                    >
                                        {{ props.row[col.name] }}
                                    </q-td>
                                </q-tr>
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