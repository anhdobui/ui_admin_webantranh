import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import ChartComponent from './ChartComponent'

const SimpleLineChart: React.FC = () => {
  const [dataSimpleLineChart, setDataSimpleLineChart] = useState([])

  const queryCubes = useQuery({
    queryFn: () =>
      axios
        .create({
          baseURL: 'http://localhost:3214/api/'
        })
        .get('cube_day'),
    queryKey: ['cube_day'],
    refetchInterval: 1000
  })
  useEffect(() => {
    queryCubes.data &&
      setDataSimpleLineChart(
        queryCubes.data.data
          .sort((a: any, b: any) => a.day - b.day)
          .map((item: any) => ({
            name: `Ngày ${item.day}`,
            value: item.total_price
          }))
      )
  }, [queryCubes.data, setDataSimpleLineChart])
  console.log(dataSimpleLineChart)
  return <ChartComponent data={dataSimpleLineChart} />
}

export default SimpleLineChart
