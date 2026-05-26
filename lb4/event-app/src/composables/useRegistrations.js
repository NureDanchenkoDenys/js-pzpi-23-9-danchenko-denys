import { computed, ref, watch } from 'vue'

const savedRegistrations = localStorage.getItem('event-registrations')

const registrations = ref(
  savedRegistrations ? JSON.parse(savedRegistrations) : []
)

const isLoading = ref(false)
const error = ref('')

watch(
  registrations,
  (newValue) => {
    localStorage.setItem('event-registrations', JSON.stringify(newValue))
  },
  { deep: true }
)

export function useRegistrations() {
  function getRegistrationsByEvent(eventId) {
    return computed(() =>
      registrations.value.filter(
        (registration) => registration.eventId === Number(eventId)
      )
    )
  }

  function validateForm(form) {
    if (!form.name.trim()) {
      return 'Введіть ім’я'
    }

    if (!form.email.trim()) {
      return 'Введіть email'
    }

    if (!form.email.includes('@')) {
      return 'Email має бути коректним'
    }

    return ''
  }

  async function registerUser(eventId, form) {
    error.value = ''

    const validationError = validateForm(form)

    if (validationError) {
      error.value = validationError
      return false
    }

    const newRegistration = {
      id: Date.now(),
      eventId: Number(eventId),
      name: form.name.trim(),
      email: form.email.trim(),
      createdAt: new Date().toISOString(),
    }

    registrations.value.push(newRegistration)

    try {
      isLoading.value = true

      await new Promise((resolve, reject) => {
        setTimeout(() => {
          const isSuccess = Math.random() > 0.15

          if (isSuccess) {
            resolve()
          } else {
            reject(new Error('Помилка сервера. Спробуйте ще раз.'))
          }
        }, 1000)
      })

      return true
    } catch (err) {
      registrations.value = registrations.value.filter(
        (registration) => registration.id !== newRegistration.id
      )

      error.value = err.message
      return false
    } finally {
      isLoading.value = false
    }
  }

  return {
    registrations,
    isLoading,
    error,
    getRegistrationsByEvent,
    registerUser,
  }
}