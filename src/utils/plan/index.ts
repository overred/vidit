import type { Plan } from "@/types/plan"

/**
 * Принимает план и возвращает метрики по нему
 */
export function usePlan(plan: Plan) {

    /** Определяет прогнозируемое исполнителем время работы над видео в днях (округлено в большую до целого) */
    const estimatedDeadline = (duration: number) => {
        return Math.ceil(duration / plan.deadline.minutesPerDay)
    }

    /** Может ли план быть применён в соответствии с критериями максимальной и минимальной длительности видео */
    const isApplicableByDuration = (duration: number) => {
        if (plan.applicability?.duration?.max) {
            if (duration > plan.applicability.duration.max) {
                return false
            }
        }
        if (plan.applicability?.duration?.min) {
            if (duration < plan.applicability.duration.min) {
                return false
            }
        }
        return true
    }

    /** Проверяем, что дедлайн выставленный исполнителем не превышает дедлайн заказчика */
    const isApplicableByRequestedDeadline = (duration: number, deadline: number) => {
        const estDeadline = estimatedDeadline(duration)
        if (deadline < estDeadline) {
            return false
        }
        return true
    }

    /** Проверяем, что дедлайн исполнителя не превышает максимальный дедлайн видео в критериях плана */
    const isApplicableByPlanDeadline = (duration: number) => {
        const estDeadline = estimatedDeadline(duration)
        if (plan.applicability?.deadline?.max) {
            if (estDeadline > plan.applicability.deadline.max) {
                return false
            }
        }
        return true
    }

    /** Может ли план быть применён в соответствии с прогнозом исполнителя и требуемыми критериями дедлайна */
    const isApplicableByDeadline = (duration: number, deadline: number) => {
        return isApplicableByRequestedDeadline(duration, deadline) && isApplicableByPlanDeadline(duration)
    }

    /** Проверяет применимость плана */
    const isApplicable = (duration: number, deadline: number) => {
        return isApplicableByDuration(duration) && isApplicableByDeadline(duration, deadline)
    }

    /** Рассчитывает стоимость выполнения работы */
    const totalPrice = (duration: number, deadline: number) => {
        // TODO: Здесь сделать расчёт стоимости работы
        // Потом добавить повышающий и понижающий коэффициенты
        // Также надо добавить информацию о том, на сколько быстрее исполнитель может выполнить работу для повышающего
        // коэффициента. И на сколько он готов растянуть сроки для понижающего коэффициента.
        const pricePerMinute = plan.pricing.perMinute
        const priceInitial = plan.pricing.initial || 0
        return pricePerMinute * duration + priceInitial
    }

    return {
        plan,
        estimatedDeadline,
        isApplicable,
        isApplicableByDuration,
        isApplicableByDeadline,
        isApplicableByRequestedDeadline,
        isApplicableByPlanDeadline,
        totalPrice,
    }
}