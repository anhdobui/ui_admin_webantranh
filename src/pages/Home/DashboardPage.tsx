import ChartComp from 'src/component/Chart/ChartComponent'
import KpiCard from 'src/component/KpiCard/KpiCard'
import BarChartComp from './../../component/BarChart/BarChart'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
const dataRandom = Math.random() * 100000
function DashboardPage() {
  const [dataStatusLineChart, setDataStatusLineChart] = useState('')
  const [dataChart, setDataChart] = useState<any[]>([])
  const [dataMothLineChart, setDataMothLineChart] = useState<
    { date: string; 'This Year': number; 'Last Year': number }[]
  >([])
  const [dataTotalLiveDay, setDataTotalLiveDay] = useState<number>(0)
  const [dataTotal, setDataTotal] = useState<number>(0)
  const [strQuery, setStrQuery] = useState('')
  const [dataFilterStatus, setDataFilterStatus] = useState<string>('')
  const [dataFilterLastDay, setDataFilterLastDay] = useState<string>('30')
  useEffect(() => {
    setStrQuery(`${dataFilterStatus != '' ? `status?status=${dataFilterStatus}` : ''}`)
  }, [setStrQuery, dataFilterStatus])
  const queryCubesTotal = useQuery({
    queryFn: () =>
      axios
        .create({
          baseURL: 'http://localhost:3214/api/'
        })
        .get(
          `total-price?lastDay=${dataFilterLastDay}${dataStatusLineChart != '' ? `&status=${dataStatusLineChart}` : ''}`
        ),
    queryKey: ['total-price', { lastDay: dataFilterLastDay, status: dataStatusLineChart }],
    refetchInterval: 1000
  })
  const queryTotalLiveDay = useQuery({
    queryFn: () =>
      axios
        .create({
          baseURL: 'http://localhost:3214/api/'
        })
        .get(`total-live-day${dataStatusLineChart != '' ? `?status=${dataStatusLineChart}` : ''}`),
    queryKey: [`total-live-day`, { status: dataStatusLineChart }],
    refetchInterval: 1000
  })
  console.log(`total-live-day${dataStatusLineChart != '' ? `?status=${dataStatusLineChart}` : ''}`)
  const queryCubesMonth = useQuery({
    queryFn: () =>
      axios
        .create({
          baseURL: 'http://localhost:3214/api/'
        })
        .get(`cube_month${strQuery != '' ? `_${strQuery}` : ''}`),
    queryKey: [`cube_month${strQuery != '' ? `_${strQuery}` : ''}`],
    refetchInterval: 1000
  })
  const queryCubesDayStatus = useQuery({
    queryFn: () =>
      axios
        .create({
          baseURL: 'http://localhost:3214/api/'
        })
        .get<
          {
            day: number
            month_abbr: string
            status: string
            total_revenue: number
          }[]
        >(`lastDay?lastDay=${dataFilterLastDay}`),
    queryKey: ['lastDay', { lastDay: dataFilterLastDay }],
    refetchInterval: 1000
  })

  useEffect(() => {
    queryCubesTotal.data && setDataTotal(queryCubesTotal.data.data[0].total_price)
  }, [queryCubesTotal.data, setDataTotal])

  useEffect(() => {
    if (queryCubesMonth.data) {
      // Mảng chứa tên viết tắt của các tháng bằng tiếng Anh
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

      // Tạo mảng mới với đủ 12 tháng, giá trị totalprice mặc định là 0
      const fullYearData = monthNames.map((month, index) => ({
        date: month,
        'This Year': 0,
        'Last Year': dataRandom
      }))

      // Cập nhật mảng với dữ liệu từ queryCubesMonth.data
      queryCubesMonth.data.data.forEach((item: any) => {
        fullYearData[item.month - 1]['This Year'] = item.total_price
      })

      // Cập nhật state
      setDataMothLineChart(fullYearData)
    }
  }, [queryCubesMonth.data, setDataMothLineChart])
  const handleChangeFilterChart = (value: string) => {
    setDataFilterLastDay(value)
  }
  useEffect(() => {
    if (queryCubesDayStatus.data) {
      const groupedData: any = {}

      // Nhóm dữ liệu theo ngày và tính tổng revenue cho từng status
      queryCubesDayStatus.data.data.forEach((item) => {
        const date = `${item.month_abbr} ${item.day}`

        if (!groupedData[date]) {
          groupedData[date] = {
            date: date,
            Ordered: 0,
            Completed: 0,
            Delivery: 0,
            Canceled: 0
          }
        }

        groupedData[date][item.status] += item.total_revenue
      })

      // Chuyển đổi đối tượng groupedData thành mảng
      const result = Object.keys(groupedData).map((key) => groupedData[key])
      setDataChart(result)
    }
  }, [queryCubesDayStatus.data, setDataChart])
  useEffect(() => {
    queryTotalLiveDay.data && setDataTotalLiveDay(queryTotalLiveDay.data.data.total_revenue)
  }, [queryTotalLiveDay.data, setDataTotalLiveDay])
  const handleChangeSelectLine = (value: string) => {
    value && setDataStatusLineChart(value)
  }
  return (
    <div className='mt-3'>
      <KpiCard />
      <div className='mt-5 grid grid-cols-5 gap-5'>
        <div className='col-span-2'>
          <div className='flex flex-col'>
            <BarChartComp data={dataMothLineChart} />
            <div className='mt-3 '>
              <h2 className='font-bold'>Satus: {dataFilterStatus != '' ? dataFilterStatus : 'All'}</h2>
            </div>
            <div className='mt-3 grid grid-cols-4'>
              <>
                <button
                  onClick={() => {
                    setDataFilterStatus((prev) => {
                      if (prev === 'Delivery') return ''
                      return 'Delivery'
                    })
                  }}
                  type='button'
                  className={`mb-2 me-2 rounded-lg border px-5 py-2.5 text-sm font-medium ${
                    dataFilterStatus === 'Delivery'
                      ? 'bg-blue-700 text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                      : ' border-blue-200 bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700'
                  } `}
                >
                  Delivery
                </button>
                <button
                  onClick={() => {
                    setDataFilterStatus((prev) => {
                      if (prev === 'Completed') return ''
                      return 'Completed'
                    })
                  }}
                  type='button'
                  className={`mb-2 me-2 rounded-lg border px-5 py-2.5 text-sm font-medium ${
                    dataFilterStatus === 'Completed'
                      ? 'bg-green-700   text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
                      : ' border-green-200 bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700'
                  }`}
                >
                  Completed
                </button>
                <button
                  onClick={() => {
                    setDataFilterStatus((prev) => {
                      if (prev === 'Canceled') return ''
                      return 'Canceled'
                    })
                  }}
                  type='button'
                  className={`mb-2 me-2 rounded-lg border px-5 py-2.5 text-sm font-medium ${
                    dataFilterStatus === 'Canceled'
                      ? 'bg-red-700  text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                      : 'border-red-200 bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700'
                  }`}
                >
                  Canceled
                </button>
                <button
                  onClick={() => {
                    setDataFilterStatus((prev) => {
                      if (prev === 'Ordered') return ''
                      return 'Ordered'
                    })
                  }}
                  type='button'
                  className={`mb-2 me-2 rounded-lg border px-5 py-2.5 text-sm font-medium 
                  ${
                    dataFilterStatus === 'Ordered'
                      ? 'bg-yellow-400  text-white hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900'
                      : 'border-yellow-200 bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700'
                  } `}
                >
                  Ordered
                </button>
              </>
            </div>
          </div>
        </div>
        <div className='col-span-3'>
          <ChartComp
            dataTotalLiveDay={dataTotalLiveDay}
            handleChangeSelectLine={handleChangeSelectLine}
            total={dataTotal}
            data={dataChart}
            handleChangeFilter={handleChangeFilterChart}
          />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
