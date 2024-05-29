import { Order } from 'src/types/order.type'
import http from 'src/utils/http'
export type OrderPost = {
  cartId: number
  accountId: number
  shippingCost?: number
  deliveryAddress?: string
}
export type ChangeStatusOrderType = { orderId: number; body: { status: string } }
export const orderPainting = (body: OrderPost) => http.post<Order>(`orders`, body)
export const getOrders = () => http.get<Order[]>(`orders`)
export const changeStatusOrder = ({ orderId, body }: ChangeStatusOrderType) =>
  http.put<Order>(`orders/${orderId}`, body)
