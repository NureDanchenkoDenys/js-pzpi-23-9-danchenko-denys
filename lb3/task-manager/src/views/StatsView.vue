<script setup>
import { useTaskStore } from '../stores/taskStore'

const taskStore = useTaskStore()

function formatDate(date) {
  return date.split('-').reverse().join('.')
}
</script>

<template>
  <section>
    <h1>Статистика</h1>

    <div class="stats-grid">
      <div class="stat-card">
        <strong>{{ taskStore.totalTasks }}</strong>
        <span>Всього задач</span>
      </div>

      <div class="stat-card green">
        <strong>{{ taskStore.activeTasks.length }}</strong>
        <span>Активних</span>
      </div>

      <div class="stat-card purple">
        <strong>{{ taskStore.completedTasks.length }}</strong>
        <span>Виконано</span>
      </div>

      <div class="stat-card red">
        <strong>{{ taskStore.overdueTasks.length }}</strong>
        <span>Прострочено</span>
      </div>
    </div>

    <div class="progress-card">
      <div class="progress-header">
        <span>Прогрес виконання</span>
        <strong>{{ taskStore.progressPercent }}%</strong>
      </div>

      <div class="progress-bar">
        <div
          class="progress-fill"
          :style="{ width: taskStore.progressPercent + '%' }"
        ></div>
      </div>
    </div>

    <div class="stats-section">
      <h2>Найближчі дедлайни наступні 3 дні</h2>

      <div v-if="taskStore.nearestDeadlines.length" class="deadline-list">
        <div
          v-for="task in taskStore.nearestDeadlines"
          :key="task.id"
          class="deadline-item"
        >
          <span>{{ task.title }}</span>

          <div>
            <span class="badge category">{{ task.category }}</span>
            <strong>{{ formatDate(task.deadline) }}</strong>
          </div>
        </div>
      </div>

      <p v-else class="empty">Немає найближчих дедлайнів</p>
    </div>

    <div class="stats-section">
      <h2>Кількість задач за категоріями</h2>

      <div class="category-stats">
        <div
          v-for="(count, category) in taskStore.tasksByCategory"
          :key="category"
          class="deadline-item"
        >
          <span>{{ category }}</span>
          <strong>{{ count }}</strong>
        </div>
      </div>
    </div>
  </section>
</template>