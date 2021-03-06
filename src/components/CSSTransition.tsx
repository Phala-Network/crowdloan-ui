import React, { useEffect, useState } from 'react'

export interface CSSTransitionProps {
  visible?: boolean
  enterTime?: number
  leaveTime?: number
  clearTime?: number
  className?: string
  name?: string
}

const CSSTransition: React.FC<React.PropsWithChildren<CSSTransitionProps>> = ({
  children,
  className = '',
  visible = false,
  enterTime = 60,
  leaveTime = 60,
  clearTime = 60,
  name = 'transition',
  ...props
}) => {
  const [classes, setClasses] = useState<string>('')
  const [renderable, setRenderable] = useState<boolean>(visible)

  useEffect(() => {
    const statusClassName = visible ? 'enter' : 'leave'
    const time = visible ? enterTime : leaveTime
    if (visible && !renderable) {
      setRenderable(true)
    }

    setClasses(`${name}-${statusClassName}`)

    // set class to active
    const timer = setTimeout(() => {
      setClasses(`${name}-${statusClassName} ${name}-${statusClassName}-active`)
      clearTimeout(timer)
    }, time)

    // remove classess when animation over
    const clearClassesTimer = setTimeout(() => {
      if (!visible) {
        setClasses('')
        setRenderable(false)
      }
      clearTimeout(clearClassesTimer)
    }, time + clearTime)

    return () => {
      clearTimeout(timer)
      clearTimeout(clearClassesTimer)
    }
  }, [visible, renderable])
  if (!React.isValidElement(children) || !renderable) return null

  return React.cloneElement(children, {
    ...props,
    className: `${children.props.className} ${className} ${classes}`,
  })
}

export default CSSTransition
