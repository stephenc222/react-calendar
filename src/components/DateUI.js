import React, { useState, useEffect } from 'react'
import Popup from './Popup'
import dayjs from 'dayjs'
import ScheduleList from './ScheduleList';

const DateUI = (props) => {
  const { dateToEdit, isOpen, closeDateUI, updateUserCalendar, userCalendarObject = null } = props
  const date = dateToEdit && dateToEdit.date || null
  const [nextSchedule, updateSchedule] = useState(userCalendarObject && userCalendarObject[date] || [])
  useEffect(() => {
    updateSchedule(userCalendarObject && userCalendarObject[date])
  }, [date])
  return (
    <Popup showPopup={isOpen}>
      <div>
        <div style={{ display: 'flex', flexDirection: 'row', flexGrow: 1, padding: 10 }} className='date-ui-header-container'>
          <div style={{ flexBasis: '33.33%' }} />
          <div style={{ flexBasis: '33.33%' }}>Bob</div>
          <div style={{ flexBasis: '33.33%', display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={closeDateUI}>X</button>
          </div>
        </div>
        <div className='date-ui-date-schedule-container'>
          <ScheduleList
            schedule={nextSchedule}
          />

        </div>
        <div className='date-ui-form-container'>
          <form onSubmit={(event) => {
            event.preventDefault()
            updateUserCalendar(date, [{ date, description: 'something planned', hasPassed: dayjs().isAfter(new Date()) }])
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