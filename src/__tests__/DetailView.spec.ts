import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vitest } from 'vitest'
import axios from 'axios'
import DetailView from '@/views/DetailView.vue'
import BackButton from '@/components/BackButton.vue'
import router from '@/router'

const mockShow = {
  id: 1,
  name: 'Show Name',
  image: {
    original: 'https://example.com/show_image.jpg'
  },
  type: 'TV Show',
  language: 'English',
  genres: ['Action', 'Drama'],
  status: 'Running',
  premiered: '2022-01-01',
  network: {
    name: 'Example Network',
    country: {
      name: 'United States'
    }
  },
  officialSite: 'https://example.com',
  schedule: {
    days: ['Monday', 'Wednesday'],
    time: '20:00'
  },
  rating: {
    average: 8.5
  },
  summary: '<p>Summary of the show.</p>',
  externals: {
    imdb: 'https://www.imdb.com/'
  },
  _links: {
    previousepisode: {
      href: 'https://example.com/previous_episode',
      name: 'Previous Episode Name'
    }
  }
}

describe('ShowDetail', () => {
  afterEach(() => {
    vitest.restoreAllMocks()
  })

  it('renders show details when show is loaded', async () => {
    vitest.spyOn(axios, 'get').mockResolvedValue({ data: mockShow })

    const wrapper = mount(DetailView, {
      global: {
        plugins: [router]
      },
      props: {
        id: '1'
      }
    })

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$forceUpdate()

    expect(wrapper.findComponent(BackButton).exists()).toBe(true)
    expect(wrapper.find('h2').text()).toContain(mockShow.name)
    expect(wrapper.find('img').attributes('src')).toBe(mockShow.image.original)
    expect(wrapper.find('.info').text()).toContain(`Type: ${mockShow.type}`)
    expect(wrapper.find('.info').text()).toContain(`Language: ${mockShow.language}`)
    expect(wrapper.find('.info').text()).toContain(`Genres: ${mockShow.genres.join(', ')}`)
    expect(wrapper.find('.info').text()).toContain(`Status: ${mockShow.status}`)
    expect(wrapper.find('.info').text()).toContain(`Premiered: ${mockShow.premiered}`)
    expect(wrapper.find('.info').text()).toContain(
      `Network: ${mockShow.network.name} (${mockShow.network.country.name})`
    )
    expect(wrapper.find('.info').text()).toContain(`Rating: ${mockShow.rating.average}`)
    expect(wrapper.find('.summary').html()).toContain(mockShow.summary)
    expect(wrapper.find('.external-links').text()).toContain(`IMDb:`)
    expect(wrapper.find('.external-links').text()).toContain(`Visit IMDb`)
    expect(wrapper.find('.external-links').text()).toContain(`Previous Episode:`)
    expect(wrapper.find('.external-links').text()).toContain(mockShow._links.previousepisode.name)
  })
})
