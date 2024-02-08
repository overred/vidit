<script setup lang="ts">
import { ref, computed } from 'vue'
import VideoParameters from '@/components/VideoParameters/VideoParameters.vue'
import VideoPrice from '@/components/VideoPrice/VideoPrice.vue'
import PlanSelector from '@/components/PlanSelector/PlanSelector.vue'
import PlanHints from '@/components/PlanHints/PlanHints.vue'
import { usePlan } from '@/utils/plan'
import type { Plan } from '@/types/plan'
import { plans1 } from './plans'

const plans = ref<Plan[]>(plans1)
const duration = ref(20)
const deadline = ref(3)

const selected = ref<string | undefined>()
const selectedPlan = computed(() => {
  return plans.value.find(plan => plan.id === selected.value)
})
const disabled = computed(() => {
  const disable = [] as string[]
  for (const plan of plans.value) {
    if (!usePlan(plan).isApplicable(duration.value, deadline.value)) {
      disable.push(plan.id)
    }
  }
  return [...new Set(disable)]
})
</script>

<template>
  <div class="d-flex flex-column ga-4">
    <VideoParameters v-model:duration="duration" v-model:deadline="deadline" />
    <VExpandTransition>
      <VideoPrice v-if="selectedPlan" :plan="selectedPlan" :duration="duration" :deadline="deadline" />
    </VExpandTransition>
    <PlanHints :plans="plans" v-model:selected="selected" :duration="duration" :deadline="deadline" />
    <PlanSelector class="mt-8" :plans="plans" v-model:selected="selected" :disabled="disabled" />
  </div>
</template>

<style lang="scss" scoped></style>