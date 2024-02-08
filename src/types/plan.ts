/**
 * Описывает тарифный план.
 * Такие параметры как название и описание, цена за минуту обрабатываемого видео,
 * количество дней требуемое на создание одной минуты видео.
 */
export type Plan = {
    /** Уникальный идентификатор тарифа */
    id: string
    /** Название тарифа */
    title: string
    /** Описание тарифа, какого уровня монтаж получим и какие возможности могут быть использованы */
    description?: string
    /** Иконка MDI */
    icon?: string
    /** Прогнозирование сроков исполнителем */
    deadline: Deadline
    /** Условия тарификации */
    pricing: Pricing
    /** Валюта оплаты */
    currency: string
    /** Условия применимости тарифа */
    applicability?: Applicability
}

/** Описывает прогнозируемые сроки дедлайна исполнителя */
export type Deadline = {
    /** Количество минут видео которое готов произвести исполнитель в сутки */
    minutesPerDay: number
}

/** Описывает политику ценообразования */
export type Pricing = {
    /** Сумма для начала работы */
    initial?: number
    /** Базовая ставка цена за минуту обрабатываемого видео */
    perMinute: number
}

/** 
 * Критерии при которых тарифный план может быть применён.
 * Такие критерии как минимальное и максимальное количество минут обрабатываемого видео,
 * минимальное и максимальное количество дней на выполнение работы.
 */
export type Applicability = {
    /** Минимальное и максимальное количество минут видео */
    duration?: Range
    /** Минимальное и максимальное количество дней работы над видео */
    deadline?: Range
    /** Вилка цены за минуту видео */
    price?: Range
}

/** Представляет диапазон значений от и до */
export type Range = {
    min?: number
    max?: number
}
