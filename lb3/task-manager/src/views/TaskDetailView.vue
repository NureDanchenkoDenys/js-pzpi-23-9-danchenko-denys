<script setup>
import { computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useTaskStore } from '../stores/taskStore'

const route = useRoute()
const router = useRouter()
const taskStore = useTaskStore()

const task = computed(() =>
  taskStore.tasks.find((task) => task.id === Number(route.params.id))
)

function deleteTask() {
  if (confirm('Видалити цю задачу?')) {
    taskStore.deleteTask(route.params.id)
    router.push('/')
  }
}

function formatDate(date) {
  return date.split('-').reverse().join('.')
}
</script>

<template>
  <section>
    <RouterLink to="/" class="back-link">← Назад до списку</RouterLink>

    <div v-if="task">
      <h1>{{ task.title }}</h1>

      <div class="badges detail-badges">
        <span class="badge category">{{ task.category }}</span>
        <span class="badge priority">{{ task.priority }} пріоритет</span>
      </div>

      <div class="detail-grid">
        <div class="detail-card">
          <span>Статус</span>
          <strong>{{ task.completed ? 'Виконана' : 'Активна' }}</strong>
        </div>

        <div class="detail-card">
          <span>Категорія</span>
          <strong>{{ task.category }}</strong>
        </div>

        <div class="detail-card">
          <span>Дата створення</span>
          <strong>{{ formatDate(task.createdAt) }}</strong>
        </div>

        <div class="detail-card">
          <span>Дедлайн</span>
          <strong>{{ formatDate(task.deadline) }}</strong>
        </div>
      </div>

      <div class="description-card">
        <span>Опис</span>
        <p>{{ task.description || 'Опис відсутній' }}</p>
      </div>

      <div class="actions-row">
        <RouterLink :to="`/tasks/${task.id}/edit`" class="btn primary">
          ✎ Редагувати
        </RouterLink>

        <button class="btn danger" @click="deleteTask">
          × Видалити
        </button>
      </div>
    </div>

    <div v-else class="empty">
      <h2>Задачу не знайдено</h2>
      <RouterLink to="/" class="btn primary">Повернутися до списку</RouterLink>
    </div>
  </section>
</template>