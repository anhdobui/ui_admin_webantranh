import { useMutation, useQueryClient } from '@tanstack/react-query'
import ButtonGroupTableOrder from './GroupButtonTableOrder'
import StatusTableOrder from './StatusTableOrder'
import { changeStatusOrder, ChangeStatusOrderType } from 'src/apis/orders.api'
export interface OrderInf {
  id: number
  code: string
  account: string
  orderDate: string
  total: number
  status: 'Ordered' | 'Delivery' | 'Canceled' | 'Completed'
}
function OrderTable({ orders }: { orders: OrderInf[] }) {
  const clientQuery = useQueryClient()
  const mutationChangeStatus = useMutation({
    mutationFn: (param: ChangeStatusOrderType) => changeStatusOrder(param),
    onSuccess: () => {
      clientQuery.invalidateQueries(['orders'])
    }
  })
  const handleView = (id: number) => {
    console.log(id)
  }
  const handleChangeStatus = ({ id, status }: { id: number; status: string }) => {
    mutationChangeStatus.mutate({ orderId: id, body: { status } })
  }

  return (
    <section className='bg-white  antialiased  dark:bg-gray-900'>
      <div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
        <div className='mx-auto max-w-full'>
          <div className='gap-4 sm:flex sm:items-center sm:justify-between'>
            <div></div>
            <div className='mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0'>
              <div>
                <label
                  htmlFor='order-type'
                  className='sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                >
                  Select order type
                </label>
                <select
                  id='order-type'
                  className='focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400'
                >
                  <option defaultValue={'d'}>All orders</option>
                  <option value='pre-order'>Pre-order</option>
                  <option value='transit'>In transit</option>
                  <option value='confirmed'>Confirmed</option>
                  <option value='cancelled'>Cancelled</option>
                </select>
              </div>
              <span className='inline-block text-gray-500 dark:text-gray-400'> from </span>
              <div>
                <label
                  htmlFor='duration'
                  className='sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                >
                  Select duration
                </label>
                <select
                  id='duration'
                  className='focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400'
                >
                  <option defaultValue={'now'}>this week</option>
                  <option value='this month'>this month</option>
                  <option value='last 3 months'>the last 3 months</option>
                  <option value='lats 6 months'>the last 6 months</option>
                  <option value='this year'>this year</option>
                </select>
              </div>
            </div>
          </div>
          <div className='mt-6 flow-root sm:mt-8'>
            <div className='divide-y divide-gray-200 dark:divide-gray-700'>
              {orders &&
                orders.map((item) => (
                  <div key={item.id} className='flex flex-wrap items-center gap-y-4 py-6'>
                    <dl className='w-1/2 sm:w-1/4 lg:w-auto lg:flex-1'>
                      <dt className='text-base font-medium text-gray-500 dark:text-gray-400'>Order ID:</dt>
                      <dd className='mt-1.5 text-base font-semibold text-gray-900 hover:underline dark:text-white'>
                        #{item.code}
                      </dd>
                    </dl>
                    <dl className='w-1/2 sm:w-1/4 lg:w-auto lg:flex-1'>
                      <dt className='text-base font-medium text-gray-500 dark:text-gray-400'>Account:</dt>
                      <dd className='mt-1.5 text-base font-semibold text-gray-900 dark:text-white'>{item.account}</dd>
                    </dl>
                    <dl className='w-1/2 sm:w-1/4 lg:w-auto lg:flex-1'>
                      <dt className='text-base font-medium text-gray-500 dark:text-gray-400'>Order Date:</dt>
                      <dd className='mt-1.5 text-base font-semibold text-gray-900 dark:text-white'>{item.orderDate}</dd>
                    </dl>
                    <dl className='w-1/2 sm:w-1/4 lg:w-auto lg:flex-1'>
                      <dt className='text-base font-medium text-gray-500 dark:text-gray-400'>Total:</dt>
                      <dd className='mt-1.5 text-base font-semibold text-gray-900 dark:text-white'>${item.total}</dd>
                    </dl>
                    <StatusTableOrder status={item.status} />
                    <div className='grid w-full gap-4 sm:grid-cols-3 lg:flex lg:w-64 lg:items-center lg:justify-end'>
                      <ButtonGroupTableOrder
                        id={item.id}
                        handleChangeStatus={handleChangeStatus}
                        handleView={() => handleView(item.id)}
                        status={item.status}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <nav className='mt-6 flex items-center justify-center sm:mt-8' aria-label='Page navigation example'>
            <ul className='flex h-8 items-center -space-x-px text-sm'>
              <li>
                <a
                  href='/'
                  className='ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                >
                  <span className='sr-only'>Previous</span>
                  <svg
                    className='h-4 w-4 rtl:rotate-180'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    width={24}
                    height={24}
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='m15 19-7-7 7-7'
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href='/'
                  className='flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href='/'
                  className='flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href='/'
                  aria-current='page'
                  className='border-primary-300 bg-primary-50 text-primary-600 hover:bg-primary-100 hover:text-primary-700 z-10 flex h-8 items-center justify-center border px-3 leading-tight dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href='/'
                  className='flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                >
                  ...
                </a>
              </li>
              <li>
                <a
                  href='/'
                  className='flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                >
                  100
                </a>
              </li>
              <li>
                <a
                  href='/'
                  className='flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                >
                  <span className='sr-only'>Next</span>
                  <svg
                    className='h-4 w-4 rtl:rotate-180'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    width={24}
                    height={24}
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='m9 5 7 7-7 7'
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  )
}

export default OrderTable
