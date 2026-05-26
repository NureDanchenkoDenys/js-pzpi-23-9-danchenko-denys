import { computed } from 'vue'

const events = [
  {
    id: 1,
    title: 'Vue Meetup',
    type: 'Мітап',
    date: '2026-04-01',
    shortDescription: 'Talks, networking and snacks — meet other Vue devs.',
    description:
      'Подія для Vue-розробників, де можна поспілкуватися, послухати доповіді та дізнатися більше про сучасну розробку.',
    gradient: 'purple',
  },
  {
    id: 2,
    title: 'Frontend Conf',
    type: 'Конференція',
    date: '2026-04-12',
    shortDescription: 'Performance, accessibility, modern tooling.',
    description:
      'Конференція про сучасний frontend, оптимізацію продуктивності, доступність та інструменти розробника.',
    gradient: 'green',
  },
  {
    id: 3,
    title: 'Hackathon',
    type: 'Хакатон',
    date: '2026-05-10',
    shortDescription: '48 hours to build something awesome.',
    description:
      'Інтенсивний хакатон для команд, які хочуть створити власний проєкт за обмежений час.',
    gradient: 'orange',
  },
]

export function useEvents() {
  const eventList = computed(() => events)

  function getEventById(id) {
    return events.find((event) => event.id === Number(id))
  }

  return {
    eventList,
    getEventById,
  }
}