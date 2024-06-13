import { Card, Metric, Text } from '@tremor/react'
function CartDashboard() {
  return (
    <Card className='mx-auto max-w-xs' decoration='top' decorationColor='indigo'>
      <p className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>Sales</p>
      <p className='text-3xl font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong'>$34,743</p>
    </Card>
  )
}

export default CartDashboard
