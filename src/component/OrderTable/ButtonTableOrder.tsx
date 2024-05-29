function ButtonTableOrder({
  type,
  onClick
}: {
  type: 'Completed' | 'Confirm' | 'Cancel' | 'View'
  onClick?: () => void
}) {
  const renderClass = (type: string) => {
    switch (type) {
      case 'Completed':
        return 'w-full rounded-lg border border-green-700 px-3 py-2 text-center text-sm font-medium text-green-700 hover:bg-green-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-300 lg:w-auto dark:border-green-500 dark:text-green-500 dark:hover:bg-green-600 dark:hover:text-white dark:focus:ring-green-900'
      case 'Confirm':
        return 'w-full rounded-lg border border-blue-700 px-3 py-2 text-center text-sm font-medium text-blue-700 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 lg:w-auto dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-900'
      // Add more cases as needed
      case 'Cancel':
        return 'w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 lg:w-auto dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900'
      // Add more cases as needed
      case 'View':
        return 'hover:text-primary-700 inline-flex w-full justify-center  rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 lg:w-auto dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700'

      default:
        break
    }
  }
  return (
    <button onClick={onClick} type='button' className={renderClass(type)}>
      {type}
    </button>
  )
}

export default ButtonTableOrder
