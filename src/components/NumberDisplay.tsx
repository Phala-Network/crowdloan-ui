import { Tooltip } from '@geist-ui/react'
import React from 'react'

const NumberDisplay: React.FC<{ value: number; maxLength?: number }> = (
  props
) => {
  const { value, maxLength = 10 } = props

  let display = value?.toString()

  if (display?.length > maxLength) {
    display = display.slice(0, maxLength)

    if (display[display.length - 1] === '.') {
      display = display.slice(0, -1)
    }

    display += '...'
  } else if (display?.length > 8) {
    display = display.split('.')[0]
  }

  return (
    <Tooltip
      text={<div>{value}</div>}
      type="dark"
      placement="top"
      hideArrow={true}
      offset={4}
      portalClassName="TooltipText"
    >
      {display || '-'}
    </Tooltip>
  )
}

export default NumberDisplay
