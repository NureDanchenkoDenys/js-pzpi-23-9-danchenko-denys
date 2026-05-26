<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useEvents } from '../composables/useEvents'
import { useRegistrations } from '../composables/useRegistrations'

const route = useRoute()
const router = useRouter()

const { getEventById } = useEvents()
const { registerUser, isLoading, error } = useRegistrations()

const event = getEventById(route.params.id)

const form = reactive({
  name: '',
  email: '',
})

const successMessage = ref('')

async function submitForm() {
  successMessage.value = ''

  const success = await registerUser(route.params.id, form)

  if (success) {
    successMessage.value = 'Ви успішно зареєструвалися на подію!'

    form.name = ''
    form.email = ''

    setTimeout(() => {
      successMessage.value = ''
    }, 3000)

    setTimeout(() => {
      router.push(`/events/${route.params.id}`)
    }, 1000)
  }
}
</script>

<template>
  <section v-if="event">
    <RouterLink :to="`/events/${event.id}`" class="back-link">
      ← Назад
    </RouterLink>

    <div class="register-layout">
      <div>
        <h1>{{ event.title }}</h1>
        <p class="date">{{ event.date }}</p>
        <p>{{ event.description }}</p>
      </div>

      <form class="form-card" @submit.prevent="submitForm">
        <h2>Реєстрація</h2>
        <p>Заповніть форму для підтвердження участі</p>

        <input
          v-model="form.name"
          type="text"
          placeholder="Ваше ім’я"
        />

        <input
          v-model="form.email"
          type="email"
          placeholder="Email"
        />

        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>

        <button class="btn gold full" :disabled="isLoading">
          {{ isLoading ? 'Реєстрація...' : 'Зареєструватися' }}
        </button>
      </form>
    </div>

    <Teleport to="body">
      <div v-if="successMessage" class="toast">
        {{ successMessage }}
      </div>
    </Teleport>
  </section>

  <section v-else>
    <h1>Подію не знайдено</h1>
    <RouterLink to="/" class="btn gold">До списку подій</RouterLink>
  </section>
</template>