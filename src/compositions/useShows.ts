import { ref } from 'vue'
import type { AxiosResponse } from 'axios'
import axios from 'axios'
import type { Show } from '@/types'
import { sortByRating } from '@/utils'

export function useShows() {
  const groupedShows = ref<Record<string, Show[]>>({})

  async function fetchShows() {
    try {
      const response: AxiosResponse<Show[]> = await axios.get('https://api.tvmaze.com/shows')
      response.data.forEach((show) => {
        show.genres.forEach((genre) => {
          if (!groupedShows.value[genre]) {
            groupedShows.value[genre] = []
          }
          groupedShows.value[genre].push(show)
        })
      })

      Object.keys(groupedShows.value).forEach((genre) => {
        groupedShows.value[genre].sort(sortByRating)
      })
    } catch (error) {
      console.error('Error fetching shows', error)
    }
  }

  return {
    groupedShows,
    fetchShows
  }
}
