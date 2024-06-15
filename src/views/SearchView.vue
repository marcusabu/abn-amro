<template>
  <BackToHome />
  <SearchBar />
  <div v-if="searchResults.length > 0">
    <h2 class="text-2xl font-semibold mb-4">Search Results</h2>
    <ShowList :shows="searchResults" />
  </div>
  <div v-else>
    <p>No results found for "{{ query }}"</p>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import type { AxiosResponse } from 'axios'
import axios from 'axios'
import type { Show } from '@/types'
import { sortByRating } from '@/utils'
import SearchBar from '@/components/SearchBar.vue'
import ShowList from '@/components/ShowList.vue'
import BackToHome from '@/components/BackToHome.vue'

const props = defineProps<{
  query: string
}>()

const searchResults = ref<Show[]>([])

const fetchSearchResults = async (query: string) => {
  try {
    const response: AxiosResponse<{ show: Show }[]> = await axios.get(
      `https://api.tvmaze.com/search/shows?q=${query}`
    )
    searchResults.value = response.data.map((result) => result.show).sort(sortByRating)
  } catch (error) {
    console.error('Error searching shows', error)
  }
}

onMounted(() => {
  fetchSearchResults(props.query)
})

watch(
  () => props.query,
  (newQuery) => {
    fetchSearchResults(newQuery)
  }
)
</script>
