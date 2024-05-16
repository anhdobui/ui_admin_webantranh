import { useContext, useEffect } from 'react'
import { HeadingContext } from 'src/contexts/heading.context'

function WareHouse() {
  const { setHeading } = useContext(HeadingContext)
  useEffect(() => {
    setHeading('Tồn kho')
  }, [setHeading])
  return <></>
}

export default WareHouse
