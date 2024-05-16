// ProductFilter.tsx
import React, { useState } from 'react'
import PopupFilter from '../PopupFilter'

interface ProductFilterProps {
  onFilter: (filters: { name: string; group: string }) => void
  className?: string
}

const ProductFilter: React.FC<ProductFilterProps> = ({ onFilter, className }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const handleClickPopup = () => {
    setIsPopupOpen((prev) => !prev)
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
  }

  return (
    <div className={`relative ${className}`}>
      <button className='rounded-md bg-gray-200 px-4 py-2 ' onClick={handleClickPopup}>
        Filter
      </button>
      {isPopupOpen && <PopupFilter onFilter={onFilter} onClose={handleClosePopup} />}
    </div>
  )
}

export default ProductFilter
