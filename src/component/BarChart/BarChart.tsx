// 'use client';
import { BarChart, Card, Divider, Switch } from '@tremor/react'
import { useState } from 'react'

function valueFormatter(number: string | number | bigint) {
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
    notation: 'compact',
    compactDisplay: 'short',
    style: 'currency',
    currency: 'USD'
  })

  return formatter.format(Number(number))
}

export default function BarChartComp({ data }: { data: { date: string; 'This Year': number; 'Last Year': number }[] }) {
  const [showComparison, setShowComparison] = useState(false)
  return (
    <>
      <h3 className='ml-1 mr-1 font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong'>
        Sales overview
      </h3>
      <p className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
      </p>
      <BarChart
        data={data}
        index='date'
        categories={showComparison ? ['Last Year', 'This Year'] : ['This Year']}
        colors={showComparison ? ['cyan', 'blue'] : ['blue']}
        valueFormatter={valueFormatter}
        yAxisWidth={45}
        className='mt-6 hidden h-60 sm:block'
      />
      <BarChart
        data={data}
        index='date'
        categories={showComparison ? ['Last Year', 'This Year'] : ['This Year']}
        colors={showComparison ? ['cyan', 'blue'] : ['blue']}
        valueFormatter={valueFormatter}
        showYAxis={false}
        className='mt-4 h-56 sm:hidden'
      />
      <Divider />
      <div className='mb-2 flex items-center space-x-3'>
        <Switch id='comparison' onChange={() => setShowComparison(!showComparison)} />
        <label htmlFor='comparison' className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>
          Show same period last year
        </label>
      </div>
    </>
  )
}
