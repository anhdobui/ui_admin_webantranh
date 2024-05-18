import { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { HeadingContext } from 'src/contexts/heading.context'
import { ProductProvider } from 'src/contexts/pageContexts/product.context'

function Product() {
  const { setHeading } = useContext(HeadingContext)
  useEffect(() => {
    setHeading('Tranh')
  }, [setHeading])
  return (
    <div className='mt-5 rounded-lg border-2 border-dashed p-4 '>
      <ProductProvider>
        <Outlet />
      </ProductProvider>
    </div>
  )
}

export default Product
