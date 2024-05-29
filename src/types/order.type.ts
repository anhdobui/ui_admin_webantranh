import { CartDetailType } from './cartDetail.type'
import { CustomerType } from './customer.type'

export interface Order {
  id: number
  code: string
  orderDate: string
  deliveryDate: string
  completionDate: string
  cancellationDate: string
  finishedDate: string
  status: string
  paymentStatus: string
  details: CartDetailType[]
  shippingCost: number
  shippingAddress: string
  total: number
  cust: CustomerType
}
