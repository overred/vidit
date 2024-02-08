<script lang="ts" setup>
import type { Deadline } from '@/types/plan'

const props = withDefaults(defineProps<{
    range?: {
        min?: number
        max?: number
    }
    unit?: string
    empty?: string
}>(), {})
</script>

<template>
    <span style="white-space: nowrap;">
        <span v-if="props.range && props.range?.min || props.range?.max">
            <template v-if="props.range?.min === props.range?.max">
                за {{ props.range?.min }}
            </template>
            <template v-else>
                <span v-if="props.range?.min">
                    от {{ props.range?.min }}
                </span>
                <span v-if="props.range?.max">
                    до {{ props.range?.max }}
                </span>
            </template>
            {{ props.unit }}
        </span>
        <span v-else>
            {{ props.empty }}
        </span>
    </span>
</template>