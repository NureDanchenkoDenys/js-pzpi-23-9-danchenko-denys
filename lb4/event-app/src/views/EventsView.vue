<script setup>
import EventCard from '../components/EventCard.vue'
import { useEvents } from '../composables/useEvents'

const { eventList } = useEvents()
</script>

<template>
  <section class="events-grid">
    <EventCard
      v-for="event in eventList"
      :key="event.id"
      :event="event"
    />
  </section>
</template>