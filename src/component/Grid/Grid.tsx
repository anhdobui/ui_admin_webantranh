import React from 'react'

interface GridProps {
  children: React.ReactNode
  className?: string
  gap?: number
  rowHeight?: string
  rowGap?: string
  cols?: number
}

function Grid({ children, className, cols = 6, gap = 6, rowHeight = 'min-content', rowGap = '1.5rem' }: GridProps) {
  const classStr = `grid gap-${gap} md:grid-cols-${cols} grid-cols-${cols} lg:grid-cols-${cols} xl:grid-cols-${cols} ${
    className || ''
  }`
  return (
    <div style={{ gridAutoRows: rowHeight, gridRowGap: rowGap }} className={classStr}>
      {children}
    </div>
  )
}

export default Grid
