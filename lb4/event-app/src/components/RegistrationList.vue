<script setup>
function formatDate(date) {
  return new Date(date).toLocaleString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

defineProps({
  registrations: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="registered">
    <h3>Зареєстровані учасники</h3>

    <p v-if="registrations.length === 0" class="muted">
      Поки що ніхто не зареєструвався на цю подію.
    </p>

    <ul v-else>
      <li v-for="user in registrations" :key="user.id">
        <div>
          <strong>{{ user.name }}</strong>
          <span>{{ user.email }}</span>
        </div>

        <small>{{ formatDate(user.createdAt) }}</small>
      </li>
    </ul>
  </section>
</template>