import { useContext, useEffect } from 'react'
import { HeadingContext } from 'src/contexts/heading.context'

function Orders() {
  const { setHeading } = useContext(HeadingContext)
  useEffect(() => {
    setHeading('Đơn hàng')
  }, [setHeading])
  return <></>
}

export default Orders
