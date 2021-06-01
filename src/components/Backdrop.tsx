import React, { MouseEvent, useCallback } from 'react'
import CSSTransition from '@/components/CSSTransition'
import { useCurrentState } from '@geist-ui/react'
import styled from 'styled-components'

const Wrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  z-index: 1000;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  text-align: center;

  .content {
    position: relative;
    z-index: 1001;
    outline: none;
    width: 100%;
    margin: 20px auto;
    vertical-align: middle;
    display: inline-block;
  }
  .backdrop:before {
    display: inline-block;
    width: 0;
    height: 100%;
    vertical-align: middle;
    content: '';
  }
  .layer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    opacity: 0.6;
    background-color: black;
    transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
    z-index: 1000;
  }
  .backdrop-wrapper-enter .layer {
    opacity: 0;
  }
  .backdrop-wrapper-enter-active .layer {
    opacity: 0.6;
  }
  .backdrop-wrapper-leave .layer {
    opacity: 0.6;
  }
  .backdrop-wrapper-leave-active .layer {
    opacity: 0;
  }
`

type Props = {
  onClick?: (event: MouseEvent<HTMLElement>) => void
  visible?: boolean
}

const Backdrop2: React.FC<Props> = ({
  children,
  onClick,
  visible = false,
  ...props
}) => {
  const [, setIsContentMouseDown, IsContentMouseDownRef] =
    useCurrentState(false)
  const clickHandler = (event: MouseEvent<HTMLElement>) => {
    if (IsContentMouseDownRef.current) return
    onClick && onClick(event)
  }
  const childrenClickHandler = useCallback((event: MouseEvent<HTMLElement>) => {
    event.stopPropagation()
  }, [])
  const mouseUpHandler = () => {
    if (!IsContentMouseDownRef.current) return
    const timer = setTimeout(() => {
      setIsContentMouseDown(false)
      clearTimeout(timer)
    }, 0)
  }

  return (
    <CSSTransition name="backdrop-wrapper" visible={visible} clearTime={300}>
      <Wrap
        className="backdrop"
        onClick={clickHandler}
        onMouseUp={mouseUpHandler}
        {...props}
      >
        <div className="layer" />
        <div
          onClick={childrenClickHandler}
          className="content"
          onMouseDown={() => setIsContentMouseDown(true)}
        >
          {children}
        </div>
      </Wrap>
    </CSSTransition>
  )
}

export default Backdrop2
