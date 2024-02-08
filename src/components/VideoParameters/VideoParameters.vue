<script lang="ts" setup>
import { ref, computed } from 'vue'
import DurationSlider from './DurationSlider.vue'
import DeadlineSlider from './DeadlineSlider.vue'

const emit = defineEmits<{
    (e: 'update:duration', duration: number): void
    (e: 'update:deadline', deadline: number): void
}>()

const props = withDefaults(defineProps<{
    duration: number
    deadline: number
}>(), {})
</script>

<template>
    <VCard>
        <template #title>
            Параметры видео
        </template>
        <template #text>

            <DurationSlider :duration="duration" @update:duration="emit('update:duration', $event)" />
            <DeadlineSlider :deadline="deadline" @update:deadline="emit('update:deadline', $event)" />

        </template>
    </VCard>
</template>

<style lang="scss" scoped></style>