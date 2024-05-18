import { ReactNode, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DataTableType } from 'src/types/DataTable.type'
import ComponentPortal from '../ComponentPortal/ComponentPortal'
import { toast } from 'react-toastify'
type TableViewType = {
  buttonAdd?: string
  data: DataTableType
  childrenAdd?: ReactNode | boolean
  showEdit?: boolean
  childrenDelete?: ReactNode | boolean
  isLoading?: boolean
  onDelete?: (data: number[]) => Promise<boolean>
}
type ListDeleteType =
  | {
      all: boolean
      [key: string]: boolean
    }
  | { all: boolean }
function TableView({
  buttonAdd,
  data,
  childrenAdd,
  showEdit = true,
  childrenDelete,
  isLoading,
  onDelete
}: TableViewType) {
  const [isHiddenConfirmDelete, setIsHiddenConfirmDeletes] = useState(true)
  const [listDelete, setListDelete] = useState<any>({ all: false })

  useEffect(() => {
    setListDelete((prev: any) => ({
      ...data.dataRow.reduce(
        (accumulator, currentValue) => {
          return {
            ...accumulator,
            [currentValue?.id as any]: false
          }
        },
        { all: false }
      )
    }))
  }, [data.dataRow])
  const handleShowConfirm = () => {
    setIsHiddenConfirmDeletes(false)
  }
  const handleCancelConfirm = () => {
    setIsHiddenConfirmDeletes(true)
  }
  const handleDelete = () => {
    const list = []

    for (const key in listDelete) {
      if (key != 'all' && listDelete[key]) {
        list.push(Number(key))
      }
    }
    onDelete &&
      onDelete(list)
        .then((res) => {
          console.log(res)
          setIsHiddenConfirmDeletes(true)
        })
        .catch((err) => {
          console.log(err)
        })
  }
  return (
    <>
      {childrenDelete != false && (
        <ComponentPortal>
          <main
            className={`${
              isHiddenConfirmDelete ? 'hidden' : ''
            } fixed right-0 top-0 z-[100] w-full overflow-x-hidden bg-transparent font-sans text-gray-900 antialiased`}
          >
            <div className='relative min-h-screen px-4 md:flex md:items-center md:justify-center'>
              <div className='absolute inset-0 z-10 h-full w-full bg-black opacity-25' />
              <div className='fixed inset-x-0 bottom-0 z-50 mx-4 mb-4 rounded-lg bg-white p-4 md:relative md:mx-auto md:max-w-md'>
                <div className='items-center md:flex'>
                  <div className='mt-4 text-center md:ml-6 md:mt-0 md:text-left'>
                    <p className='font-bold'>Delete </p>
                    <p className='mt-1 text-sm text-gray-700'>Hãy suy nghĩ kĩ trước khi ấn xóa!</p>
                  </div>
                </div>
                <div className='mt-4 text-center md:flex md:justify-end md:text-right'>
                  <button
                    onClick={() => handleDelete()}
                    className='block w-full rounded-lg bg-red-200 px-4 py-3 text-sm font-semibold text-red-700 md:order-2 md:ml-2 md:inline-block md:w-auto md:py-2'
                  >
                    Delete
                  </button>
                  <button
                    onClick={handleCancelConfirm}
                    className='mt-4 block w-full rounded-lg bg-gray-200 px-4 py-3 text-sm font-semibold md:order-1 md:mt-0 md:inline-block
    md:w-auto md:py-2'
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </main>
        </ComponentPortal>
      )}

      <div className='flex items-center justify-between'>
        <div className='bg-white pb-4 dark:bg-gray-900'>
          <label htmlFor='table-search' className='sr-only'>
            Search
          </label>
          <div className='relative mt-1'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              <svg
                className='h-5 w-5 text-gray-500 dark:text-gray-400'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <input
              type='text'
              id='table-search'
              className='block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
              placeholder='Search for items'
            />
          </div>
        </div>
        <div className='flex'>
          {childrenDelete != false &&
            (childrenDelete || (
              <button
                onClick={() => handleShowConfirm()}
                className='mb-2 mr-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
              >
                Delete
              </button>
            ))}

          {childrenAdd != false &&
            (childrenAdd || (
              <Link
                to='add'
                className='mb-2 mr-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
              >
                {buttonAdd}
              </Link>
            ))}
        </div>
      </div>
      {isLoading && (
        <div role='status' className='mt-6 animate-pulse'>
          <div className='mb-4 h-4  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10 rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <span className='sr-only'>Loading...</span>
        </div>
      )}
      {!isLoading && data && (
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
            <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                {childrenDelete != false && (
                  <th scope='col' className='p-4'>
                    <div className='flex items-center'>
                      <input
                        id='checkbox-all-search'
                        type='checkbox'
                        className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
                        checked={listDelete.all}
                        onChange={(e) => {
                          setListDelete((prev: any) => {
                            const result = { ...prev, all: e.target.checked }
                            for (const key in result) {
                              result[key] = e.target.checked
                            }
                            return result
                          })
                        }}
                      />
                      <label htmlFor='checkbox-all-search' className='sr-only'>
                        checkbox
                      </label>
                    </div>
                  </th>
                )}

                {Object.keys(data.label).map((label, index) => (
                  <th key={'' + label + index} scope='col' className='px-6 py-3'>
                    {data.label[label]}
                  </th>
                ))}
                <th scope='col' className='px-6 py-3'>
                  Thao tác
                </th>
              </tr>
            </thead>

            <tbody>
              {data.dataRow &&
                data.dataRow.map((item, index) => (
                  <tr
                    key={item.id + '' + index}
                    className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'
                  >
                    {childrenDelete != false && (
                      <td className='w-4 p-4'>
                        <div className='flex items-center'>
                          <input
                            id='checkbox-table-search-1'
                            type='checkbox'
                            className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
                            checked={listDelete[item.id as string] || false}
                            onChange={(e) => {
                              setListDelete((prev: any) => {
                                const itemIsChecked = e.target.checked
                                return {
                                  ...prev,
                                  [item.id as string]: itemIsChecked,
                                  all: itemIsChecked ? prev['all'] : false
                                }
                              })
                            }}
                          />
                          <label htmlFor='checkbox-table-search-1' className='sr-only'>
                            checkbox
                          </label>
                        </div>
                      </td>
                    )}
                    {Object.keys(data.label).map((label) => {
                      if (label == 'name') {
                        return (
                          <th
                            key={label}
                            scope='row'
                            className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'
                          >
                            {item['name']}
                          </th>
                        )
                      } else if (label == 'thumbnail') {
                        return (
                          <td key={label} className='px-6 py-4'>
                            <img src={`${item['thumbnail']}`} alt='' className='h-auto w-9' />
                          </td>
                        )
                      }
                      return (
                        <td key={label} className='px-6 py-4'>
                          {item[label]}
                        </td>
                      )
                    })}
                    <td className='px-6 py-4'>
                      {showEdit && (
                        <Link
                          to={`edit/${item.id}`}
                          className='font-medium text-blue-600 hover:underline dark:text-blue-500'
                        >
                          Edit
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default TableView
