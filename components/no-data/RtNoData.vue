<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

type TDataStatus = 'loading' | 'more' | 'nodata' | 'nomore' | 'normal' | undefined

export default defineComponent({
    name: 'RtNoData',
    props: {
        status: { type: String as PropType<TDataStatus> },
    },
    setup(props) {
        return {};
    }
})
</script>

<template>
    <div class="rt-no-data">
        <template v-if="status === 'loading'">
            <slot name="loading">
                <div>Loading</div>
            </slot>
        </template>
        <template v-if="status === 'more'">
            <slot name="more"></slot>
        </template>
        <template v-if="status === 'nodata'">
            <slot name="nodata">
                <div>No data</div>
            </slot>
        </template>
        <template v-if="status === 'nomore'">
            <slot name="nomore"></slot>
        </template>
        <template v-if="status === 'normal'">
            <slot name="normal"></slot>
        </template>
    </div>
</template>

<style lang="scss" scoped>
@use "./rt-no-data.scss";
</style>
