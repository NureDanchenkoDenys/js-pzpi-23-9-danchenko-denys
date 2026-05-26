<script setup>
import TaskItem from './TaskItem.vue'

defineProps({
  tasks: {
    type: Array,
    required: true
  }
})

defineEmits(['toggle-task', 'delete-task'])
</script>

<template>
  <div class="task-list">
    <p v-if="tasks.length === 0" class="empty">
      Список завдань порожній
    </p>

    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @toggle-task="$emit('toggle-task', task.id)"
      @delete-task="$emit('delete-task', task.id)"
    />
  </div>
</template>