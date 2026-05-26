<script setup>
defineProps({
  task: {
    type: Object,
    required: true
  }
})

defineEmits(['toggle-task', 'delete-task'])
</script>

<template>
  <div class="task-item">
    <label class="task-content">
      <input
        type="checkbox"
        :checked="task.completed"
        @change="$emit('toggle-task')"
      />

      <span :class="{ completed: task.completed }">
        {{ task.text }}
      </span>
    </label>

    <button class="delete-btn" @click="$emit('delete-task')">
      Видалити
    </button>
  </div>
</template>