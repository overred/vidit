<script lang="ts" setup>
import { ref, computed } from 'vue'
import haptic from '@/utils/haptic'

const emit = defineEmits<{
    (e: 'update:duration', duration: number): void
}>()

const props = withDefaults(defineProps<{
    duration: number
}>(), {})

const durationTicks = ref({
    '5': 'Реклама, TikTok или промо',
    '10': 'Обзорное видео',
    '15': 'Небольшая беседа',
    '20': 'Видео-блог',
    '25': 'Серия для сериала',
    '30': 'Видео на YouTube',
    '45': 'Видеоурок',
    '60': 'Небольшой фильм',
    '90': 'Лекция',
    '120': 'Полноформатный фильм'
})
const durationTimings = computed(() => {
    const ticks = {} as Record<string, string>
    for (let tick in durationTicks.value) {
        ticks[tick] = ''
    }
    return ticks
})
const durationFormat = computed(() => {
    for (let tick in durationTicks.value) {
        if (props.duration <= +tick) {
            return (durationTicks.value as Record<string, string>)[tick]
        }
    }
    return ''
})
</script>

<template>
    <div>
        <div class="text-caption">
            Длительность в минутах: <b>{{ duration }}</b> | {{ durationFormat }}
        </div>
        <VSlider :modelValue="props.duration" :min="1" :max="120" :step="1" color="primary" append-icon="mdi-timer-outline"
            show-ticks="always" :ticks="durationTimings" @update:modelValue="v => { haptic(); emit('update:duration', v) }">
        </VSlider>
    </div>
</template>

<style lang="scss" scoped></style>