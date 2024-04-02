<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
    name: 'RtSelect',
    props: {
        modelValue: { type: [String, Number] },
        options: { type: Array as () => any[], default: () => [] },
        optionLabel: { type: String, default: 'label' },
        optionValue: { type: String, default: 'value' },
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

        expose({ cpu_value })
        return {
            cpu_value,
        };
    },
})
</script>

<template>
    <div class="rt-select">
        <div class="rt-select__inner">
            <select v-model="cpu_value">
                <option
                    v-for="(option, index) in options"
                    :key="index"
                    :value="option?.[optionValue] || option"
                >{{ option?.[optionLabel] || option }}</option>
            </select>
            <div class="i-mdi-chevron-down rt-select-arrow" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "./rt-select.scss";
</style>
