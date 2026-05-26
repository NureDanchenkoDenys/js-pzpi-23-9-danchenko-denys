<script setup>
import { computed, reactive } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useTaskStore } from '../stores/taskStore'

const route = useRoute()
const router = useRouter()
const taskStore = useTaskStore()

const isEditMode = computed(() => Boolean(route.params.id))

const existingTask = computed(() =>
  taskStore.tasks.find((task) => task.id === Number(route.params.id))
)

const form = reactive({
  title: existingTask.value?.title || '',
  description: existingTask.value?.description || '',
  category: existingTask.value?.category || 'Навчання',
  priority: existingTask.value?.priority || 'Середній',
  deadline: existingTask.value?.deadline || '',
  completed: existingTask.value?.completed || false,
})

const errors = reactive({
  title: '',
  deadline: '',
})

function validateForm() {
  errors.title = ''
  errors.deadline = ''

  let isValid = true

  if (!form.title.trim()) {
    errors.title = 'Назва задачі є обовʼязковою'
    isValid = false
  }

  if (!form.deadline) {
    errors.deadline = 'Дедлайн є обовʼязковим'
    isValid = false
  }

  const today = new Date().toISOString().split('T')[0]

  if (!isEditMode.value && form.deadline < today) {
    errors.deadline = 'Дедлайн не може бути у минулому'
    isValid = false
  }

  return isValid
}

function saveTask() {
  if (!validateForm()) return

  const taskData = {
    title: form.title,
    description: form.description,
    category: form.category,
    priority: form.priority,
    deadline: form.deadline,
    completed: form.completed,
  }

  if (isEditMode.value) {
    taskStore.updateTask(route.params.id, taskData)
    router.push(`/tasks/${route.params.id}`)
  } else {
    taskStore.addTask(taskData)
    router.push('/')
  }
}
</script>

<template>
  <section>
    <RouterLink
      :to="isEditMode ? `/tasks/${route.params.id}` : '/'"
      class="back-link"
    >
      ← Назад
    </RouterLink>

    <h1>{{ isEditMode ? 'Редагування задачі' : 'Створення задачі' }}</h1>

    <form class="task-form" @submit.prevent="saveTask">
      <label>
        Назва задачі
        <input v-model="form.title" type="text" />
        <span v-if="errors.title" class="error">{{ errors.title }}</span>
      </label>

      <label>
        Опис
        <textarea v-model="form.description"></textarea>
      </label>

      <div class="form-row">
        <label>
          Категорія
          <select v-model="form.category">
            <option value="Навчання">Навчання</option>
            <option value="Робота">Робота</option>
            <option value="Особисте">Особисте</option>
          </select>
        </label>

        <label>
          Пріоритет
          <select v-model="form.priority">
            <option value="Високий">Високий</option>
            <option value="Середній">Середній</option>
            <option value="Низький">Низький</option>
          </select>
        </label>
      </div>

      <div class="form-row">
        <label>
          Дедлайн
          <input v-model="form.deadline" type="date" />
          <span v-if="errors.deadline" class="error">
            {{ errors.deadline }}
          </span>
        </label>

        <label>
          Статус
          <select v-model="form.completed">
            <option :value="false">Активна</option>
            <option :value="true">Виконана</option>
          </select>
        </label>
      </div>

      <div class="actions-row">
        <RouterLink to="/" class="btn secondary">
          Скасувати
        </RouterLink>

        <button class="btn primary" type="submit">
          {{ isEditMode ? 'Зберегти зміни' : 'Створити задачу' }}
        </button>
      </div>
    </form>
  </section>
</template>