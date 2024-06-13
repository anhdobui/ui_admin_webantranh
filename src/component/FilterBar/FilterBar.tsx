import { RiBuilding2Line, RiStackFill, RiStackLine } from '@remixicon/react'

// This example requires Tremor Raw Select component, install here: https://raw.tremor.so/docs/inputs/select
// This example requires Tremor Raw Tooltip component, install here: https://raw.tremor.so/docs/ui/tooltip

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../SelectFilter'
import { Tooltip } from '../Tooltip/Tooltip'
import { ReactNode } from 'react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const data: {
  value: string
  label: string
  icon: any
  description: string
  disabled: boolean
}[] = [
  // array-start
  {
    value: '7',
    label: 'Last 7 day',
    icon: undefined,
    description: 'Show latest 7 days data',
    disabled: false
  },
  {
    value: '30',
    label: 'Last 30 day',
    icon: undefined,
    description: 'Show latest 30 days data',
    disabled: false
  }
]

export default function FilterBar({ handleChange }: { handleChange: (value: string) => void }) {
  return (
    <div className=''>
      <Select
        onValueChange={(value) => {
          handleChange(value)
        }}
        defaultValue='30'
      >
        <SelectTrigger className='border-tremor-border sm:w-48 dark:border-dark-tremor-border'>
          <SelectValue placeholder='Select' />
        </SelectTrigger>
        <SelectContent align='end' className='border-tremor-border dark:border-dark-tremor-border'>
          {data.map((item) => (
            <SelectItem key={item.value} value={item.value} disabled={item.disabled}>
              <Tooltip
                side='left'
                showArrow={true}
                className='z-50'
                content={item.description}
                triggerAsChild={true}
                sideOffset={15}
              >
                <div className='flex w-full items-center gap-x-2'>
                  {item.icon && (
                    <item.icon
                      className={classNames(
                        item.disabled ? 'text-tremor-content-subtle/50' : 'text-tremor-content',
                        'size-4 shrink-0'
                      )}
                      aria-hidden={true}
                    />
                  )}
                  {item.label}
                </div>
              </Tooltip>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
