import React from 'react'
import Popup from './Popup'

const EditDateUI = (props) => {
  const { isOpen, leaveEditMode } = props
  return (
    <Popup showPopup={isOpen}>
      TODO: EditDateUI
      <button onClick={leaveEditMode}>X</button>
    </Popup>
  )
}

export default EditDateUI
