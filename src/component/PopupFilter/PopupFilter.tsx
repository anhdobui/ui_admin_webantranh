// PopupFilter.tsx
import React, { useState } from 'react'

interface PopupFilterProps {
  onFilter: (filters: { name: string; group: string }) => void
  onClose: () => void // Thêm prop onClose
}

const PopupFilter: React.FC<PopupFilterProps> = ({ onFilter, onClose }) => {
  const [name, setName] = useState('')
  const [group, setGroup] = useState('')

  const handleFilter = () => {
    onFilter({ name, group })
    onClose() // Đóng PopupFilter sau khi áp dụng bộ lọc
  }

  return (
    <div className='absolute right-[110%] top-[50%] z-10 w-64 rounded-lg border border-gray-300 bg-white p-4'>
      <h3 className='mb-2 text-lg font-semibold'>Filter Products</h3>
      <div className='mb-2'>
        <label htmlFor='productName' className='mb-1 block'>
          Name
        </label>
        <input
          type='text'
          id='productName'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full rounded-lg border p-2'
        />
      </div>
      <div className='mb-2'>
        <label htmlFor='productTopic' className='mb-1 block'>
          Group
        </label>
        <input
          type='text'
          id='productTopic'
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          className='w-full rounded-lg border p-2'
        />
      </div>
      <button type='button' onClick={handleFilter} className='mt-2 w-full rounded-lg bg-blue-700 px-4 py-2 text-white'>
        Filter
      </button>
    </div>
  )
}

export default PopupFilter
