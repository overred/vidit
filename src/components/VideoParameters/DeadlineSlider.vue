<script lang="ts" setup>
import { ref, computed } from 'vue'
import haptic from '@/utils/haptic'

const emit = defineEmits<{
    (e: 'update:deadline', deadline: number): void
}>()

const props = withDefaults(defineProps<{
    deadline: number
}>(), {})

const durationTicks = ref({
    '1': 'Быстро и сердито',
    '3': 'Что-то небольшое',
    '5': 'Небольшое, но качественное',
    '7': 'Хорошее повседневное видео',
    '14': 'Хорошее большое видео',
    '21': 'Отличное большое видео',
    '30': 'Невероятный проект',
})
const durationTimings = computed(() => {
    const ticks = {} as Record<string, string>
    for (let tick in durationTicks.value) {
        ticks[tick] = ''
    }
    return ticks
})
const deadlineFormat = computed(() => {
    for (let tick in durationTicks.value) {
        if (props.deadline <= +tick) {
            return (durationTicks.value as Record<string, string>)[tick]
        }
    }
    return ''
})
</script>

<template>
    <div>
        <div class="text-caption">
            Срок в рабочих днях: <b>{{ deadline }}</b> | {{ deadlineFormat }}
        </div>
        <VSlider :modelValue="props.deadline" :min="1" :max="30" :step="1" color="primary" append-icon="mdi-speedometer"
            show-ticks="always" :ticks="durationTimings" @update:modelValue="v => { haptic(); emit('update:deadline', v) }">
        </VSlider>
    </div>
</template>

<style lang="scss" scoped></style>