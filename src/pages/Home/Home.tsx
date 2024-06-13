import Dashboard from 'src/component/Dashboard'
import DownloadButton from 'src/component/DownLoadButton/DownLoadButton'
import DashboardPage from './DashboardPage'
function Home() {
  return (
    <div className='h-screen w-full'>
      <div className='mt-3 flex justify-between'>
        <div className='px-5 font-bold'>
          {/* <p className=''>!Đây là sản phẩm demo</p>
          <p className=''>Dữ liệu sẽ được cập nhật liên tục hãy thử bắt đầu mua sản phẩm</p> */}
        </div>
        <DownloadButton />
      </div>
      <DashboardPage />
    </div>
  )
}

export default Home
