import React, { useState } from 'react'
import Popup from './Popup'

const DateUI = (props) => {
  const { dateToEdit, isOpen, closeDateUI, updateUserCalendar, userCalendarObject = {} } = props
  const date = dateToEdit && dateToEdit.date || null
  const [nextSchedule, updateSchedule] = useState(userCalendarObject[date] && userCalendarObject[date].schedule || [])
  return (
    <Popup showPopup={isOpen}>
      <div>
        <div>
          <button onClick={closeDateUI}>X</button>
        </div>
        <div>
          <form onSubmit={(event) => {
            event.preventDefault()
            updateUserCalendar(date, ['some update'])
          }}>
            <pre>{JSON.stringify(props, null, 2)}</pre>
            <button type='submit'>Update</button>
          </form>
        </div>
      </div>
    </Popup>
  )
}

export default DateUI