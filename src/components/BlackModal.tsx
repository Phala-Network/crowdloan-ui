import { Modal } from '@geist-ui/react'
import React from 'react'
import { X } from '@geist-ui/react-icons'

const BlackModal: React.FC = (props) => {
  const HeaderChilden = []
  const ContentChildren = []
  const ActionChildren = []
  React.Children.forEach(props.children, (item) => {
    if (!React.isValidElement(item)) {
      ContentChildren.push(item)
    } else if (item.type === Modal.Title || item.type === Modal.Subtitle) {
      HeaderChilden.push(item)
      return null
    } else if (item.type === Modal.Action) {
      ActionChildren.push(item)
    } else {
      ContentChildren.push(item)
    }
  })

  return (
    <Modal {...{ ...props, children: [] }} wrapClassName="BlackModal">
      <div className="modal-header">
        {HeaderChilden}
        <span className="close">
          <Modal.Action onClick={({ close }) => close()}>
            <X size={16} />
          </Modal.Action>
        </span>
      </div>
      <div className="modal-content">{ContentChildren}</div>
      <div className="modal-footer">{ActionChildren}</div>
    </Modal>
  )
}
export default BlackModal
