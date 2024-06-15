import type { Show } from '@/types'

export const sortByRating = (a: Show, b: Show) => b.rating.average - a.rating.average
