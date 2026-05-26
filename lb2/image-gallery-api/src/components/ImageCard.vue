<script setup>
defineProps({
  image: {
    type: Object,
    required: true
  },
  isFavorite: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['toggle-favorite'])
</script>

<template>
  <article class="card">
    <img
      :src="image.download_url"
      :alt="image.author"
      class="card-image"
    />

    <div class="card-content">
      <div>
        <h3>{{ image.author }}</h3>
        <p>#{{ image.id }}</p>
      </div>

      <button
        class="favorite-btn"
        :class="{ selected: isFavorite }"
        @click="emit('toggle-favorite', image.id)"
      >
        {{ isFavorite ? '★' : '☆' }}
      </button>
    </div>
  </article>
</template>