import type { PointGeometry } from '@yandex/ymaps3-types'

export const emptyPoint: () => PointGeometry = () => ({ coordinates: [0, 0], type: 'Point' })
