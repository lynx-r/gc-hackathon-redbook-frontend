import type { YMapCenterZoomLocation } from '@yandex/ymaps3-types'

export const PARKS_SEARCH_TEXT = 'москва заповедник'
// todo поменять лимит на 30
// по запросу PARKS_SEARCH_TEXT выдает 21 парк.
export const PARKS_SEARCH_LIMIT = 3

export const LOCATION: YMapCenterZoomLocation = {
  center: [0, 0], // starting position [lng, lat]
  zoom: 17 // starting zoom
}
