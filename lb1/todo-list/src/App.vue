<script setup>
import { ref, computed, watch } from 'vue'
import TaskList from './components/TaskList.vue'

const savedTasks = localStorage.getItem('tasks')

const tasks = ref(savedTasks ? JSON.parse(savedTasks) : [])
const newTask = ref('')
const filter = ref('all')

function addTask() {
  const text = newTask.value.trim()

  if (!text) {
    return
  }

  tasks.value.push({
    id: Date.now(),
    text: text,
    completed: false
  })

  newTask.value = ''
}

function toggleTask(id) {
  const task = tasks.value.find(task => task.id === id)

  if (task) {
    task.completed = !task.completed
  }
}

function deleteTask(id) {
  tasks.value = tasks.value.filter(task => task.id !== id)
}

const filteredTasks = computed(() => {
  if (filter.value === 'active') {
    return tasks.value.filter(task => !task.completed)
  }

  if (filter.value === 'completed') {
    return tasks.value.filter(task => task.completed)
  }

  return tasks.value
})

watch(tasks, (newTasks) => {
  localStorage.setItem('tasks', JSON.stringify(newTasks))
}, { deep: true })
</script>

<template>
  <div class="app">
    <div class="todo-card">
      <h1>Список завдань TO-DO List</h1>

      <form class="todo-form" @submit.prevent="addTask">
        <input
          v-model="newTask"
          type="text"
          placeholder="Введіть завдання"
        />

        <button type="submit">
          Додати
        </button>
      </form>

      <div class="filters">
        <button
          :class="{ active: filter === 'all' }"
          @click="filter = 'all'"
        >
          Усі
        </button>

        <button
          :class="{ active: filter === 'active' }"
          @click="filter = 'active'"
        >
          Активні
        </button>

        <button
          :class="{ active: filter === 'completed' }"
          @click="filter = 'completed'"
        >
          Виконані
        </button>
      </div>

      <TaskList
        :tasks="filteredTasks"
        @toggle-task="toggleTask"
        @delete-task="deleteTask"
      />
    </div>
  </div>
</template>