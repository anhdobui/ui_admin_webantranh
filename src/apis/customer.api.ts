import { CustomerType } from 'src/types/customer.type'
import http from 'src/utils/http'

export const getCustomers = () => http.get<CustomerType[]>('/acc')
