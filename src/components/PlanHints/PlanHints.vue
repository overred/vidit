<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { Plan } from '@/types/plan'
import { usePlan } from '@/utils/plan'

const emit = defineEmits<{
    (e: 'update:selected', id: string | undefined): void
}>()

const props = withDefaults(defineProps<{
    plans: Plan[]
    selected?: string
    duration: number
    deadline: number
}>(), {})

// Возвращает текущий выбранный тариф
const currentPlan = computed(() => {
    if (!props.selected) return
    return props.plans.find(plan => plan.id === props.selected)
})

// Ищет наиболее дешёвый из доступных под критерии тарифов
const cheapestAvailable = computed(() => {
    // Находим все доступные
    const available = [] as Plan[]
    for (const plan of props.plans) {
        if (usePlan(plan).isApplicable(props.duration, props.deadline)) {
            available.push(plan)
        }
    }
    // Сортируем планы в порядке возрастания стоимости
    available.sort((a, b) => {
        const priceA = usePlan(a).totalPrice(props.duration, props.deadline)
        const priceB = usePlan(b).totalPrice(props.duration, props.deadline)
        return priceA - priceB
    })
    // Берём самый дешёвый
    if (available[0]) {
        return available[0]
    }
})

const cheapestTitle = computed(() => {
    return cheapestAvailable.value?.title
})

const cheapestDeadline = computed(() => {
    if (!cheapestAvailable.value) return
    return usePlan(cheapestAvailable.value).estimatedDeadline(props.duration)
})

const cheapestPrice = computed(() => {
    if (!cheapestAvailable.value) return
    return usePlan(cheapestAvailable.value).totalPrice(props.duration, props.deadline)
})
</script>

<template>
    <!-- Ни один тариф не выбран -->
    <template v-if="!currentPlan">

        <!-- Есть доступное предложение -->
        <VExpandTransition>
            <VCard v-if="cheapestAvailable">
                <template #title>
                    <VIcon class="mr-2" icon="mdi-star" />
                    Есть предложение
                </template>
                <template #text>
                    Под ваши критерии подходит тариф <b>"{{ cheapestTitle }}"</b>.
                    <br>
                    Будет готово за <b>{{ cheapestDeadline }} дн.</b>
                    по цене
                    <b>
                        {{ cheapestPrice }}
                        {{ cheapestAvailable.currency }}
                    </b>
                </template>
                <template #actions>
                    <VSpacer />
                    <VBtn color="primary" @click="emit('update:selected', cheapestAvailable.id)">
                        Выбрать этот тариф
                    </VBtn>
                </template>
            </VCard>
        </VExpandTransition>

        <!-- Нет доступных предложений -->
        <VExpandTransition>
            <VCard v-if="!cheapestAvailable">
                <template #title>
                    <VIcon class="mr-2" icon="mdi-emoticon-sad-outline" />
                    Ничего подходящего
                </template>
                <template #text>
                    Похоже, этот исполнитель не готов взяться за работу на ваших условиях.
                    Попробуйте увеличить срок сдачи работы.
                </template>
            </VCard>
        </VExpandTransition>

    </template>

    <!-- Сейчас выбран какой-то тариф -->
    <template v-else>

        <!-- Этот тариф не может быть применён -->
        <template v-if="!usePlan(currentPlan).isApplicable(props.duration, props.deadline)">

            <!-- Но есть другой тариф который подходит -->
            <VExpandTransition>
                <VCard v-if="cheapestAvailable">
                    <template #title>
                        <VIcon class="mr-2" icon="mdi-thumb-up" />
                        Есть другой
                    </template>
                    <template #text>
                        Попробуйте выбрать <b>"{{ cheapestTitle }}"</b>.
                        <br>
                        Будет готово за <b>{{ cheapestDeadline }} дн.</b>
                        по цене
                        <b>
                            {{ cheapestPrice }}
                            {{ cheapestAvailable.currency }}
                        </b>
                    </template>
                    <template #actions>
                        <VSpacer />
                        <VBtn color="primary" @click="emit('update:selected', cheapestAvailable.id)">
                            Выбрать этот тариф
                        </VBtn>
                    </template>
                </VCard>
            </VExpandTransition>

            <!-- Но нет подходящих -->
            <VExpandTransition>
                <VCard v-if="!cheapestAvailable">
                    <template #title>
                        <VIcon class="mr-2" icon="mdi-emoticon-sad-outline" />
                        Ничего подходящего
                    </template>
                    <template #text>
                        Похоже, этот исполнитель не готов взяться за работу на ваших условиях.
                        Попробуйте увеличить срок сдачи работы.
                    </template>
                </VCard>
            </VExpandTransition>

        </template>

        <!-- Этот тариф может быть применён -->
        <template v-else>

            <!-- Но есть тариф дешевле -->
            <template v-if="cheapestAvailable">

                <!-- Который не является выбранным -->
                <VExpandTransition>
                    <VCard v-if="cheapestAvailable.id !== currentPlan.id">
                        <template #title>
                            <VIcon class="mr-2" icon="mdi-shimmer" />
                            Есть дешевле
                        </template>
                        <template #text>
                            Лучше выбрать тариф <b>"{{ cheapestTitle }}"</b>.
                            <br>
                            Будет готово за <b>{{ cheapestDeadline }} дн.</b>
                            и стоит
                            <b>
                                {{ cheapestPrice }}
                                {{ cheapestAvailable.currency }}
                            </b>
                        </template>
                        <template #actions>
                            <VSpacer />
                            <VBtn color="primary" @click="emit('update:selected', cheapestAvailable.id)">
                                Выбрать этот тариф
                            </VBtn>
                        </template>
                    </VCard>
                </VExpandTransition>

            </template>

        </template>

    </template>
</template>

<style lang="scss" scoped></style>