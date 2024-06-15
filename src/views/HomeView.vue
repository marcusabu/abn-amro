<template>
  <SearchBar />
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    <div v-for="(shows, genre) in groupedShows" :key="genre" class="mb-8">
      <h2 class="text-xl font-semibold mb-4 text-primary">{{ genre }}</h2>
      <ShowList :shows="shows" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import ShowList from '@/components/ShowList.vue'
import { useShows } from '@/compositions/useShows'
import SearchBar from '@/components/SearchBar.vue'

const { groupedShows, fetchShows } = useShows()

onMounted(fetchShows)
</script>
