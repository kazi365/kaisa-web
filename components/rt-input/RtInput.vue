<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
    name: 'RtInput',
    props: {
        modelValue: { type: [String, Number] },
        type: { type: String, default: 'text' },
    },
    emits: {
        'change': (e: Event) => true,
        'update:modelValue': (value?: string | number) => true,
    },
    setup(props, { emit, expose }) {
        const self_value = ref<string | number>('')
        const cpu_value = computed({
            get() {
                return props.modelValue ?? self_value.value;
            },
            set(val) {
                emit('update:modelValue', val)
                self_value.value = val
            }
        })

        const change = (e: Event) => {
            emit('change', e)
        }

        expose({ cpu_value })
        return {
            cpu_value,
            change,
        };
    },
})
</script>

<template>
    <input class="rt-input" v-model="cpu_value" :type="type" @change="change" />
</template>

<style lang="scss" scoped>
@use "./rt-input.scss";
</style>
