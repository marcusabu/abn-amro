import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vitest } from 'vitest'
import axios from 'axios'
import HomeView from '@/views/HomeView.vue'
import SearchBar from '@/components/SearchBar.vue'
import ShowList from '@/components/ShowList.vue'
import type { Show } from '@/types'
import router from '@/router'

const mockShows: Partial<Show>[] = [
  {
    id: 1,
    name: 'Show 1',
    genres: ['Action'],
    rating: { average: 9.0 }
  },
  {
    id: 2,
    name: 'Show 2',
    genres: ['Action', 'Drama'],
    rating: { average: 8.5 }
  },
  {
    id: 3,
    name: 'Show 3',
    genres: ['Drama'],
    rating: { average: 9.2 }
  }
]

const mountHomeView = async () => {
  const wrapper = mount(HomeView, {
    global: {
      plugins: [router]
    }
  })
  await router.isReady()
  await wrapper.vm.$nextTick()
  await wrapper.vm.$nextTick()
  await wrapper.vm.$forceUpdate()

  return wrapper
}

describe('HomeView', () => {
  beforeEach(() => {
    vitest.spyOn(axios, 'get').mockResolvedValue({ data: mockShows })
  })

  afterEach(() => {
    vitest.restoreAllMocks()
  })

  it('renders the SearchBar component', async () => {
    const wrapper = await mountHomeView()
    expect(wrapper.findComponent(SearchBar).exists()).toBe(true)
  })

  it('renders genres and their shows', async () => {
    const wrapper = await mountHomeView()

    const genres = wrapper.findAll('h2')
    expect(genres).toHaveLength(2)
    expect(genres[0].text()).toBe('Action')
    expect(genres[1].text()).toBe('Drama')

    const showLists = wrapper.findAllComponents(ShowList)
    expect(showLists).toHaveLength(2)
    expect(showLists[0].props('shows')).toEqual([
      { id: 1, name: 'Show 1', genres: ['Action'], rating: { average: 9.0 } },
      { id: 2, name: 'Show 2', genres: ['Action', 'Drama'], rating: { average: 8.5 } }
    ])
    expect(showLists[1].props('shows')).toEqual([
      { id: 3, name: 'Show 3', genres: ['Drama'], rating: { average: 9.2 } },
      { id: 2, name: 'Show 2', genres: ['Action', 'Drama'], rating: { average: 8.5 } }
    ])
  })
})
