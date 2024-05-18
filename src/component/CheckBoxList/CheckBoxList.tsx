import React, { ReactNode, useEffect, useState } from 'react'
import { UseFormRegister } from 'react-hook-form'

export interface CheckboxData {
  id: number
  label: string
  isChecked: boolean
}

interface CheckboxListProps {
  className?: string
  maxCol?: number
  label: string
  children?: ReactNode
  name: string
  register: UseFormRegister<any>
  data: CheckboxData[]
}

const CheckboxList: React.FC<CheckboxListProps> = ({
  className,
  label,
  maxCol = 2,
  children,
  name,
  register,
  data
}) => {
  const [checkboxes, setCheckboxes] = useState<CheckboxData[]>([])

  useEffect(() => {
    setCheckboxes(data)
  }, [data])

  const handleCheckboxChange = (id: number) => {
    const updatedCheckboxes = checkboxes.map((checkbox) =>
      checkbox.id === id ? { ...checkbox, isChecked: !checkbox.isChecked } : checkbox
    )
    setCheckboxes(updatedCheckboxes)
  }

  const gridClasses = `grid grid-cols-${maxCol} gap-4 rounded border border-gray-300 bg-custom-gray p-4 
                        sm:grid-cols-${maxCol} md:grid-cols-${maxCol} lg:grid-cols-${maxCol} xl:grid-cols-${maxCol}`

  return (
    <div className={className}>
      <div className='flex items-end justify-between'>
        <label className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>{label}</label>
        {children}
      </div>
      <div className={gridClasses}>
        {checkboxes.map((checkbox) => (
          <div key={checkbox.id} className='mb-2'>
            <label className='inline-flex items-center'>
              <input
                type='checkbox'
                {...register(name)}
                checked={checkbox.isChecked}
                onChange={() => handleCheckboxChange(checkbox.id)}
                value={checkbox.id}
                className='form-checkbox h-5 w-5 text-gray-600'
              />
              <span className='ml-2'>{checkbox.label}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CheckboxList
