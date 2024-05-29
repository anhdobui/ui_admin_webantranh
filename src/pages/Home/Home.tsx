import ChartComponent from 'src/component/Chart/ChartComponent'
import SimpleLineChart from 'src/component/Chart/SimpleLineChart'
import DownloadButton from 'src/component/DownLoadButton/DownLoadButton'
function Home() {
  return (
    <div className='h-screen w-full'>
      <div className='mt-3 flex justify-end'>
        <DownloadButton />
      </div>
      <SimpleLineChart />
    </div>
  )
}

export default Home
