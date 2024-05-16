import { nanoid } from 'nanoid'
import { Control, FieldValues, useController } from 'react-hook-form'
interface SelectInfer {
  className?: string
  name: string
  control: Control<FieldValues>
  option: { name: string; value: string | number }[]
  defaultValue?: string
  label?: string
  checkError?: boolean
  errorMessage?: string | any
}
function Select({
  className,
  option,
  name,
  control,
  defaultValue,
  label,
  checkError = false,
  errorMessage
}: SelectInfer) {
  const id = nanoid()
  const { field } = useController({
    control,
    name,
    defaultValue: defaultValue || ''
  })
  return (
    <div className={className}>
      <label htmlFor={id} className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
        {label}
      </label>
      <select
        id={id}
        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
        {...field}
      >
        <option value=''>--Chon tap tranh--</option>
        {option &&
          option.map((item) => (
            <option key={item.value} value={item.value}>
              {item.name}
            </option>
          ))}
      </select>
      {checkError && <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errorMessage}</div>}
    </div>
  )
}

export default Select
