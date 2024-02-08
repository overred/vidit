<script lang="ts" setup>
import { computed } from 'vue'
import haptic from '@/utils/haptic'
import PlanCard from './PlanCard.vue'
import type { Plan } from '@/types/plan'

const emit = defineEmits<{
    (e: 'update:selected', id: string | undefined): void
}>()

const props = withDefaults(defineProps<{
    plans: Plan[]
    selected?: string
    disabled?: string[]
}>(), {})

const isSelected = (id: string) => {
    return id === props.selected
}

const isActual = (id: string) => {
    return !props.disabled?.includes(id)
}

const isDisabled = (id: string) => {
    return props.disabled?.includes(id)
}

const select = (id: string) => {
    haptic()
    if (props.selected === id) {
        emit('update:selected', undefined)
        return
    }
    emit('update:selected', id)
}
</script>

<template>
    <div class="d-flex flex-column ga-8">

        <VExpandTransition>
            <div v-if="props.selected">
                <div class="text-h6 mb-2 ml-2 font-weight-light">
                    Сейчас активно
                </div>
                <div class="d-flex flex-column ga-1">
                    <template v-for="plan in props.plans" :key="plan.id">
                        <VExpandTransition>
                            <PlanCard v-if="isSelected(plan.id)" class="plan" :plan="plan" active
                                :disabled="isDisabled(plan.id)" @click="select(plan.id)" />
                        </VExpandTransition>
                    </template>
                </div>
            </div>
        </VExpandTransition>

        <div>
            <div class="text-h6 mb-2 ml-2 font-weight-light">
                Доступны к выбору
            </div>
            <div class="d-flex flex-column ga-1">
                <template v-for="plan in props.plans" :key="plan.id">
                    <VExpandTransition>
                        <PlanCard v-if="isActual(plan.id)" class="plan" :plan="plan" :active="isSelected(plan.id)"
                            @click="select(plan.id)" />
                    </VExpandTransition>
                </template>
            </div>
        </div>

        <VExpandTransition>
            <div v-if="props.disabled">
                <div class="text-h6 mb-2 ml-2 font-weight-light">
                    <VDialog width="500">
                        <template #activator="{ props }">
                            <div v-bind="props" style="cursor: pointer;">
                                Недоступны
                                <VIcon size="x-small" icon="mdi-help-circle-outline" />
                            </div>
                        </template>
                        <template #default="{ isActive }">
                            <VCard title="Почему недоступно?">
                                <VCardText>
                                    Тариф может быть недоступен при ваших требованиях к видео.
                                    Например, исполнитель может ограничить тариф только определённой длительностью
                                    видео или сроками исполнения работы.
                                </VCardText>
                                <VCardActions>
                                    <VSpacer></VSpacer>
                                    <VBtn text="Понятно" @click="isActive.value = false"></VBtn>
                                </VCardActions>
                            </VCard>
                        </template>
                    </VDialog>
                </div>
                <div class="d-flex flex-column ga-1">
                    <template v-for="plan in props.plans" :key="plan.id">
                        <VExpandTransition>
                            <PlanCard v-if="isDisabled(plan.id)" class="plan" :plan="plan" :active="isSelected(plan.id)"
                                disabled @click="select(plan.id)" />
                        </VExpandTransition>
                    </template>
                </div>
            </div>
        </VExpandTransition>

    </div>
</template>

<style lang="scss" scoped>
.plan {
    cursor: pointer;
    user-select: none;
}
</style>