/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormRegister } from 'react-hook-form'
import { nanoid } from 'nanoid'

interface TextAreaInfer {
  className?: string
  placeholder?: string
  label?: string
  name: string
  register: UseFormRegister<any>
}

function TextArea({ className, label, register, name, placeholder }: TextAreaInfer) {
  const id = nanoid()

  return (
    <div className={className}>
      <label className='mb-2 block text-sm font-medium text-gray-900 dark:text-white' htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        {...register(name)}
        placeholder={placeholder}
        className='block h-full w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
      />
    </div>
  )
}

export default TextArea
