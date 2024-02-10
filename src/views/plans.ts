import type { Plan } from '@/types/plan'

// export const plans1: Plan[] = [
//   {
//     id: 'tiktok',
//     title: 'TikTok Edition',
//     description: 'Простой монтаж для TikTok, YouTube Shorts или Instagram Reels. Будет готово в течение дня.',
//     icon: 'mdi-fast-forward',
//     pricing: {
//       initial: 200,
//       perMinute: 150,
//     },
//     deadline: {
//       minutesPerDay: 10,
//     },
//     currency: '₽',
//     applicability: {
//       duration: {
//         min: 1,
//         max: 10,
//       },
//       deadline: {
//         min: 1,
//         max: 1,
//       },
//       price: {
//         min: 150,
//         max: 150,
//       }
//     },
//   },
//   {
//     id: 'short',
//     title: 'Короткое видео',
//     description: 'Короткометражное видео с качественным монтажом. Подойдёт для небольшого блога.',
//     icon: 'mdi-circle-slice-2',
//     pricing: {
//       perMinute: 250,
//     },
//     deadline: {
//       minutesPerDay: 10,
//     },
//     currency: '₽',
//     applicability: {
//       duration: {
//         min: 10,
//         max: 25,
//       },
//       deadline: {
//         min: 1,
//         max: 3,
//       },
//       price: {
//         min: 250,
//         max: 250,
//       }
//     },
//   },
//   {
//     id: 'medium',
//     title: 'Среднее видео',
//     description: 'Видео средней длительности с качественным монтажом. Подойдёт для среднего блога.',
//     icon: 'mdi-circle-slice-4',
//     pricing: {
//       perMinute: 350,
//     },
//     deadline: {
//       minutesPerDay: 10,
//     },
//     currency: '₽',
//     applicability: {
//       duration: {
//         min: 20,
//         max: 40,
//       },
//       deadline: {
//         min: 3,
//         max: 4,
//       },
//       price: {
//         min: 350,
//         max: 350,
//       }
//     },
//   },
//   {
//     id: 'long',
//     title: 'Длинное видео',
//     description: 'Видео большой длительности с качественным монтажом. Подойдёт для большого блога.',
//     icon: 'mdi-circle-slice-6',
//     pricing: {
//       perMinute: 450,
//     },
//     deadline: {
//       minutesPerDay: 10,
//     },
//     currency: '₽',
//     applicability: {
//       duration: {
//         min: 30,
//         max: 60,
//       },
//       deadline: {
//         min: 4,
//         max: 7,
//       },
//       price: {
//         min: 350,
//         max: 500,
//       }
//     },
//   },
//   {
//     id: 'super-long',
//     title: 'Большой выпуск',
//     description: 'Видео огромной длительности и отличным монтажом. Подойдёт для travel блога или итогов года.',
//     icon: 'mdi-shimmer',
//     pricing: {
//       perMinute: 450,
//     },
//     deadline: {
//       minutesPerDay: 10,
//     },
//     currency: '₽',
//     applicability: {
//       duration: {
//         min: 50,
//         max: 120,
//       },
//       deadline: {
//         min: 7,
//         max: 30,
//       },
//       price: {
//         min: 350,
//         max: 600,
//       }
//     },
//   },
// ]

export const plans1: Plan[] = [
  {
    id: 'test1',
    title: 'Тариф Дани',
    description: 'Король монтажа выполнит любой каприз за ваши деньги',
    icon: 'mdi-video',
    pricing: {
      initial: 0,
      perMinute: 500,
    },
    deadline: {
      minutesPerDay: 2,
    },
    currency: '₽',
    applicability: {
      duration: {
        min: 1,
        max: 120,
      },
      deadline: {
        min: 1,
        max: 30,
      },
      price: {
        min: 500,
        max: undefined,
      }
    },
  },
]
