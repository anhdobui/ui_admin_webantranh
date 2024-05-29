import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import { changeStatusOrder, ChangeStatusOrderType, getOrders } from 'src/apis/orders.api'
import OrderTable from 'src/component/OrderTable'
import { OrderInf } from 'src/component/OrderTable/OrderTable'
import { HeadingContext } from 'src/contexts/heading.context'

function Orders() {
  const { setHeading } = useContext(HeadingContext)
  useEffect(() => {
    setHeading('Đơn hàng')
  }, [setHeading])
  const [dataOrders, setDataOrders] = useState<OrderInf[]>([])

  const queryOrders = useQuery({
    queryKey: ['orders'],
    queryFn: () => getOrders(),
    refetchInterval: 1000,
    select: (data) => data.data
  })
  useEffect(() => {
    queryOrders.data &&
      setDataOrders(
        queryOrders.data.map((item) => ({
          id: item.id,
          code: item.code,
          account: item.cust.fullname,
          orderDate: item.orderDate.split('T')[0],
          total: item.total,
          status: item.status as 'Ordered' | 'Delivery' | 'Canceled' | 'Completed'
        }))
      )
  }, [queryOrders.data])
  console.log(dataOrders)
  return (
    <>
      <OrderTable orders={dataOrders} />
    </>
  )
}

export default Orders
