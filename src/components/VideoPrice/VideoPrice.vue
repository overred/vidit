<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { Plan } from '@/types/plan'
import { usePlan } from '@/utils/plan'
import ApplicabilityExplain from './ApplicabilityExplain.vue'

const props = withDefaults(defineProps<{
    plan?: Plan
    duration: number
    deadline: number
}>(), {})

// Определяет, доступен ли тариф
const applicable = computed(() => {
    if (!props.plan) return false
    return usePlan(props.plan).isApplicable(props.duration, props.deadline)
})

// Возвращает сроки исполнения
const minMaxDays = computed(() => {
    if (!props.plan) return `${props.deadline}`
    const estDeadline = usePlan(props.plan).estimatedDeadline(props.duration);
    const [from, to] = [estDeadline, props.deadline].sort((a, b) => a > b ? 1 : -1)
    if (from === to) {
        return `${from}`
    }
    return `${from} - ${to}`
})

// Возвращает итоговую цену работы
const totalPrice = computed(() => {
    if (!props.plan) return 0
    return usePlan(props.plan).totalPrice(props.duration, props.deadline)
})
</script>

<template>
    <VCard>
        <template #text>

            <div v-if="!props.plan">
                Выберите план ниже для отображения цены
                //TODO: Добавить рекомендацию плана когда появится расчёт цен.
                При помощи usePlan мы отфильтровываем все неприменимые тарифы, для всех остальных
                считаем цену и выбираем самый дешёвый из них - его и предлагаем.
            </div>
            <div v-else class="d-flex flex-column ga-2">
                <div class="d-flex flex-column">
                    <div class="text-h6" :style="{ 'text-decoration': applicable ? '' : 'line-through' }"
                        style="line-height: 1rem;">
                        {{ props.plan.title }}
                    </div>
                    <VExpandTransition>
                        <div v-if="!applicable" class="text-caption text-medium-emphasis" style="line-height: 1rem;">
                            недоступно
                        </div>
                    </VExpandTransition>
                </div>
                <div class="d-flex justify-space-between">
                    <div class="d-flex align-center justify-start text-h5">
                        <VIcon class="mr-2" size="x-small" icon="mdi-timer-outline" />
                        {{ props.duration }} мин
                    </div>
                    <div class="d-flex align-center text-h5 justify-center">
                        <VIcon class="mr-2" size="x-small" icon="mdi-speedometer" />
                        {{ minMaxDays }} дн
                    </div>
                    <div class="d-flex align-center text-h4 justify-end">
                        {{ totalPrice }} {{ props.plan.currency }}
                    </div>
                </div>
                <VExpandTransition>
                    <ApplicabilityExplain v-if="!applicable" class="text-medium-emphasis" :plan="props.plan"
                        :duration="props.duration" :deadline="props.deadline" />
                </VExpandTransition>
            </div>

        </template>
    </VCard>
</template>

<style lang="scss" scoped></style>