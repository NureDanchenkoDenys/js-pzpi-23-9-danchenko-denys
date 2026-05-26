<script setup>
defineProps({
  event: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="event-card">
    <div class="event-image" :class="event.gradient">
      <h3>{{ event.title }}</h3>
      <p>{{ event.shortDescription }}</p>
    </div>

    <div class="event-content">
      <span class="tag">{{ event.type }}</span>

      <h2>{{ event.title }}</h2>
      <p class="date">{{ event.date }}</p>
      <p>{{ event.shortDescription }}</p>

      <div class="buttons">
        <RouterLink :to="`/events/${event.id}`" class="btn dark">
          Деталі
        </RouterLink>

        <RouterLink :to="`/events/${event.id}/register`" class="btn gold">
          Реєстрація
        </RouterLink>
      </div>
    </div>
  </article>
</template>