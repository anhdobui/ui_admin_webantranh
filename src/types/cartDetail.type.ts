import { Painting } from './Painting.type'

export type CartDetailType = {
  id: number
  qty: number
  painting: Painting
  cartId: number
  total: number
}
