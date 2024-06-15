<template>
  <div class="max-w-4xl mx-auto py-4">
    <div class="h-96 overflow-y-auto">
      <ul class="divide-y divide-gray-200">
        <li v-for="show in shows" :key="show.id" class="py-2">
          <router-link
            :to="'/show/' + show.id"
            class="block hover:bg-gray-500 transition duration-200 rounded-lg p-2"
          >
            <div class="flex items-center justify-between">
              <div class="text-base font-semibold text-gray-100">{{ show.name }}</div>
              <div class="text-sm text-gray-100">{{ show.rating.average }}</div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Show } from '@/types'

defineProps<{
  shows: Show[]
}>()
</script>
