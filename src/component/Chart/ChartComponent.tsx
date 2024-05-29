import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface Data {
  name: string
  value: number
}

interface ChartProps {
  data: Data[]
}

const ChartComponent: React.FC<ChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type='monotone' dataKey='value' stroke='#8884d8' />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default ChartComponent
