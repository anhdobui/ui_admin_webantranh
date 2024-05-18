import { ReactNode, createContext, useState } from 'react'

interface ProductContextInterface {
  showPopupForm: boolean
  setShowPopupForm: React.Dispatch<React.SetStateAction<boolean>>
}
const initialProductContext: ProductContextInterface = {
  showPopupForm: false,
  setShowPopupForm: () => null
}
export const ProductContext = createContext<ProductContextInterface>(initialProductContext)
export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [showPopupForm, setShowPopupForm] = useState<boolean>(initialProductContext.showPopupForm)
  return (
    <ProductContext.Provider
      value={{
        showPopupForm,
        setShowPopupForm
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
