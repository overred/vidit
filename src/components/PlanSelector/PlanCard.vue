<script lang="ts" setup>
import { computed } from 'vue'
import type { Plan } from '@/types/plan'
import RangeDisplay from './RangeDisplay.vue'

const props = withDefaults(defineProps<{
    plan: Plan
    active?: boolean
    disabled?: boolean
}>(), {})

const priceString = computed(() => {
    const parts = [] as string[]
    if (props.plan.pricing.perMinute) {
        parts.push(`${props.plan.pricing.perMinute} ${props.plan.currency}/мин`)
    }
    if (props.plan.pricing.initial) {
        parts.push(`${props.plan.pricing.initial} ${props.plan.currency}`)
    }
    return parts.join(' + ')
})
</script>

<template>
    <VCard :color="props.active ? 'primary' : ''">
        <template #text>
            <div class="d-flex ga-4">

                <div class="d-flex flex-column ga-2" style="flex-grow: 1;">
                    <div class="text-h6 d-flex align-center ga-2" style="line-height: 1rem;">
                        <VIcon :icon="props.plan.icon ?? 'mdi-circle-medium'"
                            :class="{ 'text-medium-emphasis': props.disabled }" />
                        <div class="d-flex flex-column">
                            <div :class="{ 'text-medium-emphasis': props.disabled }"
                                :style="{ 'text-decoration': props.disabled ? 'line-through' : '' }">
                                {{ props.plan.title }}
                            </div>
                            <VExpandTransition>
                                <div v-if="props.disabled" class="text-caption text-medium-emphasis"
                                    style="line-height: 1rem;">
                                    недоступно
                                </div>
                            </VExpandTransition>
                        </div>
                    </div>
                    <div class="text-subtitle-2 text-medium-emphasis" style="line-height: 1rem;">
                        {{ props.plan.description }}
                    </div>
                </div>

                <div class="d-flex flex-column" style="min-width: 30%;">
                    <div class="text-subtitle-1 font-weight-bold d-flex flex-column align-end mb-2"
                        style="line-height: 1rem;">
                        <div>
                            {{ props.plan.pricing.perMinute }} {{ props.plan.currency }}/мин
                        </div>
                        <div v-if="props.plan.pricing.initial" class="text-caption">
                            <b>
                                + {{ props.plan.pricing.initial }} {{ props.plan.currency }}
                            </b>
                        </div>
                    </div>
                    <div class="text-caption text-medium-emphasis d-flex flex-column align-end" style="line-height: 1rem;">
                        <RangeDisplay :range="props.plan.applicability?.price" :unit="`${props.plan.currency}/мин`"
                            empty="вилка цен не указана" />
                        <RangeDisplay :range="props.plan.applicability?.duration" unit="мин" empty="время не указано" />
                        <RangeDisplay :range="props.plan.applicability?.deadline" unit="дн" empty="дедлайн не указан" />
                    </div>
                </div>

            </div>
        </template>
    </VCard>
</template>

<style lang="scss" scoped></style>