import { useContext, useEffect } from 'react'
import { HeadingContext } from 'src/contexts/heading.context'

function User() {
  const { setHeading } = useContext(HeadingContext)
  useEffect(() => {
    setHeading('Thành viên')
  }, [setHeading])
  return <h1>User page</h1>
}

export default User
