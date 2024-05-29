function StatusTableOrder({ status }: { status: 'Ordered' | 'Delivery' | 'Canceled' | 'Completed' }) {
  const renderStatus = (status: string) => {
    switch (status) {
      case 'Ordered':
        return (
          <dd className='bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 me-2 mt-1.5 inline-flex items-center rounded  py-0.5 text-xs font-medium'>
            <svg
              className='me-1 h-3 w-3'
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
                d='M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z'
              />
            </svg>
            Pre-order
          </dd>
        )
      case 'Delivery':
        return (
          <dd className='me-2 mt-1.5 inline-flex items-center rounded bg-yellow-100  py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'>
            <svg
              className='me-1 h-3 w-3'
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
                d='M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z'
              />
            </svg>
            In transit
          </dd>
        )
      case 'Canceled':
        return (
          <dd className='me-2 mt-1.5 inline-flex items-center rounded bg-red-100  py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300'>
            <svg
              className='me-1 h-3 w-3'
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
                d='M6 18 17.94 6M18 18 6.06 6'
              />
            </svg>
            Cancelled
          </dd>
        )
      case 'Completed':
        return (
          <dd className='me-2 mt-1.5 inline-flex items-center rounded bg-green-100  py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300'>
            <svg
              className='me-1 h-3 w-3'
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
                d='M5 11.917 9.724 16.5 19 7.5'
              />
            </svg>
            Completed
          </dd>
        )
    }
  }

  return (
    <dl className='w-1/2 sm:w-1/4 lg:w-auto lg:flex-1'>
      <dt className='text-base font-medium text-gray-500 dark:text-gray-400'>Status:</dt>
      {renderStatus(status)}
    </dl>
  )
}

export default StatusTableOrder
