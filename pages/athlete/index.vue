<script setup lang="ts">
const columns = [
    { name: 'name', align: 'left', label: '运动员名称', type: '', },
    { name: 'type', align: 'left', label: '运动类型', type: ''},
    { name: 'country', align: 'left', label: '国家', type: '', },
    { name: 'score', align: 'left', label: '得分', type: '', },
    { name: 'operation', align: 'left', label: '操作', type: '', },
]

const rows = [
    {
        name: '张三',
        type: '足球',
        country: '中国',
        score: '2:1',
        operation: '查看'
    },
    {
        name: '李四',
        type: '篮球',
        country: '美国',
        score: '100:99',
        operation: '查看'
    },
    {
        name: '王五',
        type: '乒乓球',
        country: '日本',
        score: '3:2',
        operation: '查看'
    },
    {
        name: '赵六',
        type: '羽毛球',
        country: '韩国',
        score: '2:1',
        operation: '查看'
    },
    {
        name: '孙七',
        type: '足球',
        country: '英国',
        score: '2:1',
        operation: '查看'
    },
    {
        name: '周八',
        type: '篮球',
        country: '法国',
        score: '100:99',
        operation: '查看'
    },
    {
        name: '吴九',
        type: '乒乓球',
        country: '德国',
        score: '3:2',
        operation: '查看'
    },
    {
        name: '郑十',
        type: '羽毛球',
        country: '韩国',
        score: '2:1',
        operation: '查看'
    },
    {
        name: '钱十一',
        type: '足球',
        country: '英国',
        score: '2:1',
        operation: '查看'
    },
    {
        name: '孙十二',
        type: '篮球',
        country: '法国',
        score: '100:99',
        operation: '查看'
    },
    {
        name: '周十三',
        type: '乒乓球',
        country: '德国',
        score: '3:2',
        operation: '查看'
    }
]

const searchForm = ref({
    name: '',
    type: '',
    country: ''
})

const typeOptions = [
    { label: '全部', value: '' },
    { label: '足球', value: '1' },
    { label: '篮球', value: '2' },
    { label: '乒乓球', value: '3' },
    { label: '羽毛球', value: '4' }
]

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