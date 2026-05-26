<script setup>
import { ref, computed, onMounted } from 'vue'
import ImageCard from './components/ImageCard.vue'

const images = ref([])
const favorites = ref([])
const searchQuery = ref('')
const filterMode = ref('all')
const isLoading = ref(false)
const error = ref('')
const page = ref(1)
const limit = 20

const loadImages = async () => {
  isLoading.value = true
  error.value = ''

  try {
    const response = await fetch(
      `https://picsum.photos/v2/list?page=${page.value}&limit=${limit}`
    )

    if (!response.ok) {
      throw new Error('Не вдалося завантажити зображення')
    }

    images.value = await response.json()
  } catch (err) {
    error.value = err.message || 'Сталася помилка під час запиту'
  } finally {
    isLoading.value = false
  }
}

const nextPage = () => {
  page.value++
  loadImages()
}

const prevPage = () => {
  if (page.value > 1) {
    page.value--
    loadImages()
  }
}

const toggleFavorite = (imageId) => {
  if (favorites.value.includes(imageId)) {
    favorites.value = favorites.value.filter(id => id !== imageId)
  } else {
    favorites.value.push(imageId)
  }
}

const isFavorite = (imageId) => {
  return favorites.value.includes(imageId)
}

const filteredImages = computed(() => {
  let result = images.value

  if (filterMode.value === 'favorites') {
    result = result.filter(image => favorites.value.includes(image.id))
  }

  if (searchQuery.value.trim()) {
    result = result.filter(image =>
      image.author.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  return result
})

onMounted(() => {
  loadImages()
})
</script>

<template>
  <main class="page">
    <section class="container">
      <div class="header">
        <h1>Галерея зображень</h1>
      </div>

      <div class="controls">
        <input
          v-model="searchQuery"
          class="search"
          type="text"
          placeholder="Пошук за автором..."
        />

        <div class="buttons">
          <button
            :class="{ active: filterMode === 'all' }"
            @click="filterMode = 'all'"
          >
            Усі
          </button>

          <button
            :class="{ active: filterMode === 'favorites' }"
            @click="filterMode = 'favorites'"
          >
            Обрані {{ favorites.length }}
          </button>
        </div>
      </div>

      <div class="pagination">
        <button :disabled="page === 1 || isLoading" @click="prevPage">
          Назад
        </button>

        <span>Сторінка {{ page }}</span>

        <button :disabled="isLoading" @click="nextPage">
          Далі
        </button>
      </div>

      <div v-if="isLoading" class="status">
        Завантаження...
      </div>

      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
        <button @click="loadImages">Спробувати ще раз</button>
      </div>

      <div v-else>
        <div v-if="filteredImages.length" class="gallery">
          <ImageCard
            v-for="image in filteredImages"
            :key="image.id"
            :image="image"
            :is-favorite="isFavorite(image.id)"
            @toggle-favorite="toggleFavorite"
          />
        </div>

        <div v-else class="status">
          Зображень не знайдено
        </div>
      </div>
    </section>
  </main>
</template>