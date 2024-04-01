<script lang="ts">
import { computed, defineComponent, } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
    name: 'RtTextarea',
    props: {
        modelValue: { type: [String, Number] },
        autofocus: { type: Boolean as PropType<HTMLTextAreaElement['autofocus']> },
    },
    emits: {
        'update:modelValue': (val?: string | number) => true,
        blur: (event: FocusEvent) => true,
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

        const blur = (event: FocusEvent) => {
            emit('blur', event)
        }

        expose({ cpu_value })
        return {
            cpu_value,
            blur,
        };
    },
})
</script>

<template>
    <textarea
        class="rt-textarea"
        v-model="cpu_value"
        :autofocus="autofocus"
        @blur="blur"
    />
</template>

<style lang="scss" scoped>
@use "./rt-textarea.scss";
</style>
