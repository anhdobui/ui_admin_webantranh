// 'use client';
import { LineChart } from '@tremor/react'
import FilterBar from './../FilterBar'
import { useState } from 'react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const valueFormatter = (number: string | number | bigint) =>
  `$${Intl.NumberFormat('us').format(Number(number)).toString()}`

export default function ChartComp({
  data,
  total,
  dataTotalLiveDay,
  handleChangeFilter,
  handleChangeSelectLine
}: {
  data: any[]
  handleChangeFilter: (value: string) => void
  handleChangeSelectLine: (value: string) => void
  total: number
  dataTotalLiveDay: number
}) {
  return (
    <>
      <div className=' flex items-center justify-between'>
        <div>
          <h3 className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>
            Portfolio performance
          </h3>
          <p className='mt-1 text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong'>
            ${total}
          </p>
          <p className='mt-1 text-tremor-default font-medium'>
            <span className='text-emerald-700 dark:text-emerald-500'>+$ {dataTotalLiveDay}</span>
            <span className='font-normal text-tremor-content dark:text-dark-tremor-content'>Past 24 hours</span>
          </p>
        </div>
        <FilterBar handleChange={handleChangeFilter} />
      </div>
      <LineChart
        data={data}
        index='date'
        categories={['Delivery', 'Canceled', 'Completed', 'Ordered']}
        colors={['blue', 'red', 'green', 'yellow']}
        valueFormatter={valueFormatter}
        yAxisWidth={55}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onValueChange={(value) => {
          value && handleChangeSelectLine(value.categoryClicked)
        }}
        className='mt-6 hidden h-96 sm:block'
      />
    </>
  )
}
