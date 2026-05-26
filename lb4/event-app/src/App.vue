<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="app">
    <header class="header">
      <RouterLink to="/" class="logo">EventApp</RouterLink>

      <nav>
        <RouterLink to="/">Список подій</RouterLink>
      </nav>
    </header>

    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" :key="route.fullPath" />
      </KeepAlive>
    </RouterView>
  </div>
</template>