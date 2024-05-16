// FormInventoryCmp.tsx
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, useFieldArray, Control } from 'react-hook-form'
import * as yup from 'yup'
import Select from '../Select'
import Input from '../Input'
import ProductFilter from '../ProductFilter'

const schema = yup
  .object({
    products: yup
      .array()
      .of(
        yup.object({
          paintingId: yup.number().required('Chưa chọn tranh').notOneOf([0], 'Chưa chọn tranh'),
          qty: yup.number().required('Quantity is required').min(1, 'Số lượng phải lớn hơn 0'),
          unitPrice: yup.number().required('Unit price is required').min(1, 'Giá phải lớn hơn 0')
        })
      )
      .required('Products are required')
  })
  .required()

interface Product {
  paintingId: number
  qty: number
  unitPrice: number
}

interface FormValues {
  products: Product[]
}

const dataProduct = [
  { name: 'san pham 1', value: 1, group: 'A' },
  { name: 'san pham 2', value: 2, group: 'B' }
  // Thêm các sản phẩm khác
]

function FormInventoryCmp({ onSubmit }: { onSubmit: (data: FormValues) => void }) {
  const [filteredProducts, setFilteredProducts] = useState(dataProduct) // Thêm state cho filteredProducts

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { products: [{ paintingId: 0, qty: 1, unitPrice: 1 }] }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products'
  })

  const onSubmitForm = handleSubmit((data) => {
    onSubmit(data)
  })
  const handleRemoveGroup = (index: number) => {
    remove(index)
  }
  const handleFilter = ({ name, group }: { name: string; group: string }) => {
    let filtered = dataProduct
    if (name) {
      filtered = filtered.filter((product) => product.name.toLowerCase().includes(name.toLowerCase()))
    }
    if (group) {
      filtered = filtered.filter((product) => product.group.toLowerCase() === group.toLowerCase())
    }
    setFilteredProducts(filtered)
  }
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-6'>
      <form onSubmit={onSubmitForm} className='col-span-4 col-start-2'>
        <button
          type='button'
          onClick={() => append({ paintingId: 0, qty: 1, unitPrice: 1 })}
          className='mb-4 mr-4 rounded-lg bg-green-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300'
        >
          Thêm
        </button>
        <button
          type='submit'
          className='mr-4 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Submit
        </button>
        {fields.map((item, index) => (
          <div key={item.id} className='relative mb-6 grid gap-6 md:grid-cols-8'>
            <ProductFilter className='flex flex-col justify-center' key={index} onFilter={handleFilter} />
            <div className='relative col-span-2'>
              <Select
                control={control as unknown as Control<any>}
                name={`products[${index}].paintingId`}
                option={filteredProducts}
                label='Chọn sản phẩm nhập'
                className=''
              />
              {errors.products && errors.products[index] && errors.products[index]?.paintingId && (
                <p className='absolute top-[100%] col-span-2 text-sm text-red-500'>
                  {errors.products[index]?.paintingId?.message}
                </p>
              )}
            </div>
            <div className='relative col-span-2'>
              <Input register={register} label='Số lượng' name={`products[${index}].qty`} type='number' className='' />
              {errors.products && errors.products[index] && errors.products[index]?.qty && (
                <p className='absolute top-[100%] col-span-2 text-sm text-red-500'>
                  {errors.products[index]?.qty?.message}
                </p>
              )}
            </div>
            <div className='relative col-span-2'>
              <Input register={register} label='Giá' name={`products[${index}].unitPrice`} type='number' className='' />
              {errors.products && errors.products[index] && errors.products[index]?.unitPrice && (
                <p className='absolute top-[100%] col-span-2 text-sm text-red-500'>
                  {errors.products[index]?.unitPrice?.message}
                </p>
              )}
            </div>
            <div className='flex items-center justify-center'>
              <button
                type='button'
                onClick={() => handleRemoveGroup(index)}
                className='flex h-8 w-8 items-center justify-center rounded-md bg-red-500 text-white opacity-70 shadow-md hover:opacity-100'
              >
                X
              </button>
            </div>
            <div></div>
          </div>
        ))}

        <button
          type='submit'
          className='w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default FormInventoryCmp
