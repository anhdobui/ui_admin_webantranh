// src/App.js
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts'

function Dashboard() {
  const kpi = 4750

  const [dataStatusLineChart, setDataStatusLineChart] = useState([])
  const [dataDayLineChart, setDataDayLineChart] = useState([])
  const [dataYearLineChart, setDataYearLineChart] = useState([])
  const [dataMothLineChart, setDataMothLineChart] = useState([])
  const [dataTotal, setDataTotal] = useState([])
  const [strQuery, setStrQuery] = useState('')
  const [dataFilterStatus, setDataFilterStatus] = useState<string>('')
  useEffect(() => {
    setStrQuery(`${dataFilterStatus != '' ? `status?status=${dataFilterStatus}` : ''}`)
  }, [setStrQuery, dataFilterStatus])
  const queryCubesTotal = useQuery({
    queryFn: () =>
      axios
        .create({
          baseURL: 'http://localhost:3214/api/'
        })
        .get(`cube_${strQuery}`),
    queryKey: [`cube_${strQuery}`],
    refetchInterval: 1000
  })
  const queryCubesStatus = useQuery({
    queryFn: () =>
      axios
        .create({
          baseURL: 'http://localhost:3214/api/'
        })
        .get('cube_status'),
    queryKey: ['cube_status'],
    refetchInterval: 1000
  })
  const queryCubesDay = useQuery({
    queryFn: () =>
      axios
        .create({
          baseURL: 'http://localhost:3214/api/'
        })
        .get(`cube_day${strQuery != '' ? `_${strQuery}` : ''}`),
    queryKey: [`cube_day${strQuery != '' ? `_${strQuery}` : ''}`],
    refetchInterval: 1000
  })
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
  const queryCubesYear = useQuery({
    queryFn: () =>
      axios
        .create({
          baseURL: 'http://localhost:3214/api/'
        })
        .get(`cube_year${strQuery != '' ? `_${strQuery}` : ''}`),
    queryKey: [`cube_year${strQuery != '' ? `_${strQuery}` : ''}`],
    refetchInterval: 1000
  })
  useEffect(() => {
    queryCubesTotal.data &&
      setDataTotal(
        queryCubesTotal.data.data.map((item: any) => ({
          total_price: item.total_price
        }))[0]?.total_price
      )
  }, [queryCubesTotal.data, setDataTotal])
  useEffect(() => {
    queryCubesStatus.data &&
      setDataStatusLineChart(
        queryCubesStatus.data.data.map((item: any) => ({
          status: item.status,
          value: item.total_price
        }))
      )
  }, [queryCubesStatus.data, setDataStatusLineChart])
  useEffect(() => {
    queryCubesDay.data &&
      setDataDayLineChart(
        queryCubesDay.data.data
          .sort((a: any, b: any) => a.day - b.day)
          .map((item: any) => ({
            day: `${item.day}`,
            totalprice: item.total_price
          }))
      )
  }, [queryCubesDay.data, setDataDayLineChart])
  useEffect(() => {
    queryCubesMonth.data &&
      setDataMothLineChart(
        queryCubesMonth.data.data
          .sort((a: any, b: any) => a.month - b.month)
          .map((item: any) => ({
            month: `${item.month}`,
            totalprice: item.total_price
          }))
      )
  }, [queryCubesMonth.data, setDataMothLineChart])
  useEffect(() => {
    queryCubesYear.data &&
      setDataYearLineChart(
        queryCubesYear.data.data
          .sort((a: any, b: any) => a.year - b.year)
          .map((item: any) => ({
            year: `${item.year}`,
            totalprice: item.total_price
          }))
      )
  }, [queryCubesYear.data, setDataYearLineChart])

  return (
    <div className='flex flex-col items-center p-6'>
      <div className='mb-6 grid w-full grid-cols-5 gap-6'>
        <div className='col-span-3 rounded-lg bg-gray-100 p-4 text-center'>
          <div className='mb-4 grid grid-cols-3 gap-4'>
            <button
              onClick={() => {
                setDataFilterStatus('')
              }}
              className={` row-span-2 min-w-[50px] ${
                dataFilterStatus === '' ? 'bg-black' : 'bg-gray-500'
              }  rounded  p-2 text-white`}
            >
              Tất cả
            </button>
            <button
              onClick={() => {
                setDataFilterStatus('Ordered')
              }}
              className={`h-10 min-w-[130px] ${
                dataFilterStatus === 'Ordered' ? 'bg-yellow-500' : 'bg-gray-500'
              }  rounded  p-2 text-white`}
            >
              Mới đặt
            </button>
            <button
              onClick={() => {
                setDataFilterStatus('Delivery')
              }}
              className={`h-10 min-w-[130px] rounded ${
                dataFilterStatus === 'Delivery' ? 'bg-blue-500' : 'bg-gray-500'
              }   p-2 text-white`}
            >
              Đang giao
            </button>
            {/* <div className='row-span-2 flex flex-col gap-4'>
              <div>
                <select
                  onChange={(e) => setDataFilter((prev) => ({ ...prev, year: e.target.value }))}
                  className='mt-1 block w-full rounded border border-gray-300 p-2'
                >
                  <option value={''}>Chọn năm</option>
                  <option value={'2020'}>2020</option>
                  <option value={'2021'}>2021</option>
                  <option value={'2022'}>2022</option>
                  <option value={'2023'}>2023</option>
                  <option value={'2024'}>2024</option>
                </select>
              </div>
              <div>
                <select
                  onChange={(e) => setDataFilter((prev) => ({ ...prev, month: e.target.value }))}
                  className='mt-1 block w-full rounded border border-gray-300 p-2'
                >
                  <option value={''}>Chọn tháng</option>
                  <option value={'1'}>Jan</option>
                  <option value={'2'}>Feb</option>
                  <option value={'3'}>Mar</option>
                  <option value={'4'}>Apr</option>
                  <option value={'5'}>May</option>
                  <option value={'6'}>Jun</option>
                  <option value={'7'}>Jul</option>
                  <option value={'8'}>Aug</option>
                  <option value={'9'}>Sep</option>
                  <option value={'10'}>Oct</option>
                  <option value={'11'}>Nov</option>
                  <option value={'12'}>Dec</option>
                </select>
              </div>
            </div> */}
            <button
              onClick={() => {
                setDataFilterStatus('Completed')
              }}
              className={`h-10 min-w-[130px] ${
                dataFilterStatus === 'Completed' ? 'bg-green-500' : 'bg-gray-500'
              } rounded  p-2 text-white`}
            >
              Đã hoàn thành
            </button>
            <button
              onClick={() => {
                setDataFilterStatus('Canceled')
              }}
              className={`h-10 min-w-[130px] ${
                dataFilterStatus === 'Canceled' ? 'bg-red-500' : 'bg-gray-500'
              } rounded   p-2 text-white`}
            >
              Đã hủy
            </button>
          </div>
        </div>

        <div className='col-span-1 rounded-lg bg-gray-100 p-4 text-center'>
          <h2 className='text-xl font-bold text-green-600'>Total </h2>
          <p className='text-lg font-bold text-indigo-600'>{dataTotal}$</p>
        </div>
        <div className='col-span-1 rounded-lg bg-gray-100 p-4 text-center'>
          <h2 className='text-xl font-bold'>KPI</h2>
          <p className='text-lg'>{kpi}</p>
        </div>
      </div>

      <div className='grid w-full grid-cols-2 gap-6'>
        <div className='rounded-lg bg-white p-4 shadow'>
          <h3 className='mb-2 text-lg font-bold'>Order Status</h3>
          <RadarChart outerRadius={90} width={500} height={300} data={dataStatusLineChart}>
            <PolarGrid />
            <PolarAngleAxis dataKey='status' />
            <PolarRadiusAxis />
            <Radar name='Order Status' dataKey='value' stroke='#8884d8' fill='#8884d8' fillOpacity={0.6} />
            <Legend />
          </RadarChart>
        </div>

        <div className='rounded-lg bg-white p-4 shadow'>
          <h3 className='mb-2 text-lg font-bold'>Day of month</h3>
          <LineChart width={500} height={300} data={dataDayLineChart}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='day' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey='totalprice' stroke='#8884d8' />
          </LineChart>
        </div>

        <div className='rounded-lg bg-white p-4 shadow'>
          <h3 className='mb-2 text-lg font-bold'>Yearly </h3>
          <BarChart width={500} height={300} data={dataYearLineChart}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='year' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='totalprice' fill='#8884d8' />
          </BarChart>
        </div>

        <div className='rounded-lg bg-white p-4 shadow'>
          <h3 className='mb-2 text-lg font-bold'>Month of Year </h3>
          <BarChart width={500} height={300} data={dataMothLineChart}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='month' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='totalprice' fill='#82ca9d' />
          </BarChart>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
