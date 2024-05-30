import { ReactNode } from 'react'
import Header from './common/Header'
import Sidebar from './common/Sidebar'
import Body from './common/Body'
import { HeadingProvider } from 'src/contexts/heading.context'

type MainLayoutType = {
  children?: ReactNode
}
function MainLayout({ children }: MainLayoutType) {
  return (
    <div>
      <Header />
      <Sidebar />
      <HeadingProvider>
        <Body>{children}</Body>
      </HeadingProvider>
    </div>
  )
}

export default MainLayout
