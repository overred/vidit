<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { Plan } from '@/types/plan'
import { usePlan } from '@/utils/plan'

const props = withDefaults(defineProps<{
    plan: Plan
    duration: number
    deadline: number
}>(), {})
</script>

<template>
    <span v-if="usePlan(props.plan).isApplicable(props.duration, props.deadline)">
        Всё хорошо, тариф может быть применён.
    </span>
    <span v-else>

        Выбран тариф <b>"{{ props.plan.title }}"</b>.

        <!-- Пояснение в случае выхода за рамки по длительности -->
        <span v-if="!usePlan(props.plan).isApplicableByDuration(props.duration)">
            Заказ видео длительностью <b>{{ props.duration }} мин.</b>, в то время как тариф требует
            <b>
                <span v-if="props.plan.applicability?.duration?.min">
                    от {{ props.plan.applicability?.duration?.min }}
                </span>
                <span v-if="props.plan.applicability?.duration?.max">
                    до {{ props.plan.applicability?.duration?.max }}
                </span>
                мин.
            </b>
        </span>

        <!-- Пояснение в случае выхода за рамки по дедлайну -->
        <span v-if="!usePlan(props.plan).isApplicableByDeadline(props.duration, props.deadline)">
            Исполнитель прогнозирует срок в <b>{{ usePlan(props.plan).estimatedDeadline(props.duration) }} дн.</b> для
            <b>{{ props.duration }} мин.</b> видео.
            <!-- В случае, когда заказчик даёт меньше времени на дедлайн -->
            <span v-if="!usePlan(props.plan).isApplicableByRequestedDeadline(props.duration, props.deadline)">
                Вы требуете <b>{{ props.deadline }} дн.</b>
            </span>
            <!-- В случае, когда исполнитель прогнозирует больше времени на дедлайн, чем в тарифе -->
            <span v-if="!usePlan(props.plan).isApplicableByPlanDeadline(props.duration)">
                Тариф применяется для сроков выполнения до <b>{{ props.plan.applicability?.deadline?.min }} дн.</b>
            </span>
        </span>

    </span>
</template>

<style lang="scss" scoped></style>