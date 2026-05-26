import { defineStore } from 'pinia'

const STORAGE_KEY = 'task-manager-tasks'

function loadTasks() {
  const savedTasks = localStorage.getItem(STORAGE_KEY)

  if (savedTasks) {
    return JSON.parse(savedTasks)
  }

  return []
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: loadTasks(),
  }),

  getters: {
    totalTasks: (state) => state.tasks.length,

    activeTasks: (state) =>
      state.tasks.filter((task) => !task.completed),

    completedTasks: (state) =>
      state.tasks.filter((task) => task.completed),

    overdueTasks: (state) => {
      const today = new Date().toISOString().split('T')[0]

      return state.tasks.filter(
        (task) => !task.completed && task.deadline < today
      )
    },

    tasksByCategory: (state) => {
      return state.tasks.reduce((acc, task) => {
        acc[task.category] = (acc[task.category] || 0) + 1
        return acc
      }, {})
    },

    nearestDeadlines: (state) => {
      const today = new Date()
      const threeDaysLater = new Date()

      threeDaysLater.setDate(today.getDate() + 3)

      return state.tasks
        .filter((task) => {
          const deadline = new Date(task.deadline)

          return (
            !task.completed &&
            deadline >= today &&
            deadline <= threeDaysLater
          )
        })
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    },

    progressPercent: (state) => {
      if (state.tasks.length === 0) {
        return 0
      }

      const completed = state.tasks.filter(
        (task) => task.completed
      ).length

      return Math.round(
        (completed / state.tasks.length) * 100
      )
    },
  },

  actions: {
    addTask(taskData) {
      const newTask = {
        id: Date.now(),
        ...taskData,
        completed: false,
        createdAt: new Date()
          .toISOString()
          .split('T')[0],
      }

      this.tasks.push(newTask)

      saveTasks(this.tasks)
    },

    updateTask(id, updatedTask) {
      const index = this.tasks.findIndex(
        (task) => task.id === Number(id)
      )

      if (index !== -1) {
        this.tasks[index] = {
          ...this.tasks[index],
          ...updatedTask,
        }

        saveTasks(this.tasks)
      }
    },

    deleteTask(id) {
      this.tasks = this.tasks.filter(
        (task) => task.id !== Number(id)
      )

      saveTasks(this.tasks)
    },

    toggleTaskStatus(id) {
      const task = this.tasks.find(
        (task) => task.id === Number(id)
      )

      if (task) {
        task.completed = !task.completed

        saveTasks(this.tasks)
      }
    },
  },
})