import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vitest } from 'vitest'
import axios from 'axios'
import SearchView from '@/views/SearchView.vue'
import SearchBar from '@/components/SearchBar.vue'
import ShowList from '@/components/ShowList.vue'
import BackToHome from '@/components/BackToHome.vue'
import type { Show } from '@/types'
import router from '@/router'

const mockSearchResults: { show: Partial<Show> }[] = [
  {
    show: {
      id: 1,
      name: 'Search Result 1',
      genres: ['Action'],
      rating: { average: 9.0 }
    }
  },
  {
    show: {
      id: 2,
      name: 'Search Result 2',
      genres: ['Drama'],
      rating: { average: 8.5 }
    }
  }
]

describe('SearchView', () => {
  afterEach(() => {
    vitest.restoreAllMocks()
  })

  it('renders search results when query has results', async () => {
    vitest.spyOn(axios, 'get').mockResolvedValue({ data: mockSearchResults })

    const wrapper = mount(SearchView, {
      global: {
        plugins: [router]
      },
      props: {
        query: 'action'
      }
    })

    await router.isReady()
    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent(BackToHome).exists()).toBe(true)
    expect(wrapper.findComponent(SearchBar).exists()).toBe(true)

    const searchResultsTitle = wrapper.find('h2')
    expect(searchResultsTitle.exists()).toBe(true)
    expect(searchResultsTitle.text()).toContain('Search Results')

    const showList = wrapper.findComponent(ShowList)
    expect(showList.exists()).toBe(true)
    expect(showList.props('shows')).toEqual(mockSearchResults.map((result) => result.show))
  })

  it('renders no results message when query has no results', async () => {
    vitest.spyOn(axios, 'get').mockResolvedValue({ data: [] })

    const wrapper = mount(SearchView, {
      global: {
        plugins: [router]
      },
      props: {
        query: 'nonexistentquery'
      }
    })

    await router.isReady()
    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent(BackToHome).exists()).toBe(true)
    expect(wrapper.findComponent(SearchBar).exists()).toBe(true)

    const noResultsMessage = wrapper.find('p')
    expect(noResultsMessage.exists()).toBe(true)
    expect(noResultsMessage.text()).toContain('No results found for "nonexistentquery"')
  })
})
