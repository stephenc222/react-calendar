import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import Popup from './Popup'

const editScheduleItem = (event, editCalendarObject, userCalendarObject, date, item, index) => {
  userCalendarObject[date][index] = item
  editCalendarObject(userCalendarObject)
}

const EditDateUI = (props) => {
  const { isOpen, leaveEditMode, schedule, editCalendarObject, date, currentDate, currentIndex, userCalendarObject } = props
  // TODO: initialize these states with the current values
  const [nextItemVal, onNextItemValChange] = useState('')
  const [nextItemDate, onNextItemDateChange] = useState(new Date())
  const onSubmit = (event) => {
    event.preventDefault()
    if (nextItemVal.length && nextItemDate.length) {
      const [hour, minute] = nextItemDate.split(':')
      const nextItem = {
        date: dayjs(date).hour(hour).minute(minute).toDate(),
        description: nextItemVal,
        hasPassed: false
      }
      editScheduleItem(event, editCalendarObject, userCalendarObject, date, nextItem, currentIndex)
      leaveEditMode()
    }
  }
  useEffect(() => {
    let description = ''
    let _date = new Date()
    if (userCalendarObject && userCalendarObject[currentDate] && userCalendarObject[currentDate][currentIndex]) {
      description = userCalendarObject[currentDate][currentIndex].description
      _date = userCalendarObject[currentDate][currentIndex].date
    }
    onNextItemDateChange(_date)
    onNextItemValChange(description)
  }, [userCalendarObject, userCalendarObject[currentDate]])
  return (
    <Popup showPopup={isOpen}>
      Edit
      <button onClick={leaveEditMode}>X</button>
      <div className='edit-item-form-container'>
        <form onSubmit={onSubmit}>
          <input type='time' value={nextItemDate} onChange={(e) => onNextItemDateChange(e.target.value)} />
          <input type='text' placeholder='Next thing to do...' value={nextItemVal} onChange={(e) => onNextItemValChange(e.target.value)} />
          <input type='submit' value='Edit Item' />
        </form>
      </div>
    </Popup>
  )
}

export default EditDateUI
