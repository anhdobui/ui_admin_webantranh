import React, { ReactNode, useEffect, useState } from 'react'
import ComponentPortal from '../ComponentPortal/ComponentPortal'

// Component ButtonOpenPopup
interface ButtonOpenPopupProps {
  className?: string
  labelBtn: string | ReactNode
  onClick?: () => void
}

const ButtonOpenPopup: React.FC<ButtonOpenPopupProps> = ({ className, labelBtn, onClick }) => {
  return (
    <button onClick={onClick} type='button' className={className}>
      {labelBtn}
    </button>
  )
}

// Component PopupContent
interface PopupContentProps {
  children: ReactNode
}

const PopupContent: React.FC<PopupContentProps> = ({ children }) => {
  return <div>{children}</div>
}

// Component Popup
const Popup = ({
  propsButton,
  childrenContent,
  title,
  className,
  showPopup,
  setShowPopup
}: {
  propsButton?: {
    className?: string
    labelBtn?: string
    onClick?: () => void
  }
  childrenContent?: ReactNode
  title: string
  className?: string
  showPopup: boolean
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const handleButtonClick = () => {
    setShowPopup(true)
  }
  const handleClose = () => {
    setShowPopup(false)
  }
  return (
    <div className={className}>
      {propsButton && (
        <ButtonOpenPopup
          onClick={() => {
            handleButtonClick()
            propsButton.onClick && propsButton.onClick()
          }}
          labelBtn={propsButton.labelBtn}
          className={propsButton.className}
        />
      )}
      {showPopup && (
        <ComponentPortal>
          <div className='fixed left-0 top-0  z-[1000] flex h-full w-full  items-center justify-center bg-gray-800 bg-opacity-50'>
            <div className='min-w-[500px]  max-w-[600px] rounded-lg bg-white p-6 shadow-md'>
              <div className='mb-4 flex justify-between'>
                <h2 className='text-xl font-bold'>{title}</h2>
                <button
                  className='mb-2 rounded-lg bg-red-700 px-2.5 py-1 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
                  onClick={handleClose}
                >
                  X
                </button>
              </div>
              {childrenContent}
            </div>
          </div>
        </ComponentPortal>
      )}
    </div>
  )
}

export { ButtonOpenPopup, PopupContent, Popup }
