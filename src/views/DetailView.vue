<template>
  <BackButton />
  <div v-if="show">
    <h2 class="text-2xl font-semibold mb-4">{{ show.name }}</h2>

    <div class="details flex flex-wrap gap-8">
      <div class="image w-48">
        <img
          :src="show.image.original"
          alt="Show Poster"
          class="w-full h-auto rounded-lg shadow-md"
        />
      </div>
      <div class="info flex-1">
        <p><b>Type:</b> {{ show.type }}</p>
        <p><b>Language:</b> {{ show.language }}</p>
        <p><b>Genres:</b> {{ show.genres.join(', ') }}</p>
        <p><b>Status:</b> {{ show.status }}</p>
        <p><b>Premiered:</b> {{ show.premiered }}</p>
        <p><b>Network:</b> {{ show.network.name }} ({{ show.network.country.name }})</p>
        <p>
          <b>Official Site:</b>
          <a :href="show.officialSite" class="text-primary hover:underline" target="_blank">{{
            show.officialSite
          }}</a>
        </p>
        <p v-if="show.schedule.days.length > 0">
          <b>Schedule:</b> {{ show.schedule.days.join(', ') }} at {{ show.schedule.time }}
        </p>
        <p><b>Rating:</b> {{ show.rating.average }}</p>
        <div class="summary" v-html="show.summary"></div>
      </div>
    </div>

    <div class="external-links mt-4">
      <p>
        <b>IMDb:</b>
        <a :href="show.externals.imdb" class="text-primary hover:underline" target="_blank"
          >Visit IMDb</a
        >
      </p>
      <p v-if="show._links.previousepisode">
        <b>Previous Episode:</b>
        <a
          :href="show._links.previousepisode.href"
          class="text-primary hover:underline"
          target="_blank"
          >{{ show._links.previousepisode.name }}</a
        >
      </p>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script lang="ts" setup>
import type { Show } from '@/types'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import BackButton from '@/components/BackButton.vue'

const props = defineProps<{
  id: string
}>()

const show = ref<Show | null>(null)

onMounted(async () => {
  try {
    const response = await axios.get(`https://api.tvmaze.com/shows/${props.id}`)
    show.value = response.data
  } catch (error) {
    console.error('Error fetching show details', error)
  }
})
</script>
