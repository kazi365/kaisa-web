<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'RtSwitch',
    props: {
        modelValue: { type: Boolean },
        disabled: { type: Boolean, default: void 0 },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const self_value = ref(false)
        const cpu_value = computed({
            get() {
                return props.modelValue ?? self_value.value;
            },
            set(val) {
                if (props.disabled) return;
                emit('update:modelValue', val)
                self_value.value = val
            }
        })

        return {
            cpu_value,
        };
    }
})
</script>

<template>
    <div class="rt-switch">
        <label>
            <input class="switch-input" v-model="cpu_value" :disabled="disabled" type="checkbox" />
            <div class="switch-operation" />
        </label>
    </div>
</template>

<style lang="scss">
@use "./rt-switch.scss";
</style>
