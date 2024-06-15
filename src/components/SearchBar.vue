<template>
  <form class="flex flex-row items-center gap-4 mb-8" @submit.prevent="searchShows">
    <input
      v-model="searchQuery"
      class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none text-black focus:ring focus:border-primary w-60"
      placeholder="Search for shows"
      type="text"
    />
    <button
      class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-75 transition duration-200"
      type="submit"
    >
      Search
    </button>
    <button
      class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200"
      type="button"
      @click="clearSearch"
    >
      Clear
    </button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const searchQuery = ref('')
const router = useRouter()

const searchShows = () => {
  if (searchQuery.value) {
    router.push(`/search/${searchQuery.value}`)
  }
}

const clearSearch = () => {
  searchQuery.value = ''
  router.push('/')
}
</script>
