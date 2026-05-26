<script setup>
import { useRoute, RouterLink } from 'vue-router'
import { useEvents } from '../composables/useEvents'
import { useRegistrations } from '../composables/useRegistrations'
import RegistrationList from '../components/RegistrationList.vue'

const route = useRoute()

const { getEventById } = useEvents()
const { getRegistrationsByEvent } = useRegistrations()

const event = getEventById(route.params.id)
const eventRegistrations = getRegistrationsByEvent(route.params.id)
</script>

<template>
  <section v-if="event">
    <RouterLink to="/" class="back-link">← Назад</RouterLink>

    <div class="details-card">
      <div class="event-image large" :class="event.gradient">
        <h3>{{ event.title }}</h3>
        <p>{{ event.shortDescription }}</p>
      </div>

      <div class="details-info">
        <span class="tag">{{ event.type }}</span>
        <h1>{{ event.title }}</h1>
        <p class="date">{{ event.date }}</p>
        <p>{{ event.description }}</p>

        <RouterLink :to="`/events/${event.id}/register`" class="btn gold full">
          Зареєструватися →
        </RouterLink>
      </div>
    </div>

    <RegistrationList :registrations="eventRegistrations" />
  </section>

  <section v-else>
    <h1>Подію не знайдено</h1>
    <RouterLink to="/" class="btn gold">До списку подій</RouterLink>
  </section>
</template>