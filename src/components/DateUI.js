import React, { useState, useEffect } from 'react'
import Popup from './Popup'
import dayjs from 'dayjs'
import ScheduleList from './ScheduleList';

const DateUI = (props) => {
  const { shouldHide, dateToEdit, isOpen, closeDateUI, updateUserCalendar, userCalendarObject = null, enterEditMode, zIndexVal } = props
  const date = dateToEdit && dateToEdit.date || null
  const [nextSchedule, updateSchedule] = useState(userCalendarObject && userCalendarObject[date] || [])
  useEffect(() => {
    updateSchedule(userCalendarObject && userCalendarObject[date])
  }, [date, userCalendarObject])
  if (shouldHide) {
    return null
  }
  return (
    <Popup showPopup={isOpen}>
      <div>
        <div style={{ display: 'flex', flexDirection: 'row', flexGrow: 1, padding: 10 }} className='date-ui-header-container'>
          <div style={{ flexBasis: '33.33%' }} />
          <div style={{ flexBasis: '33.33%' }}>{`${dayjs(date).format('MMM DD YYYY')}`}</div>
          <div style={{ flexBasis: '33.33%', display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={closeDateUI}>X</button>
          </div>
        </div>
        <div className='date-ui-date-schedule-container'>
          <ScheduleList
            date={date}
            userCalendarObject={userCalendarObject}
            schedule={nextSchedule}
            addItem={(item) => {
              updateSchedule(item)
            }}
            deleteItem={(item) => {
              updateSchedule(item)
            }}
            enterEditMode={(index) => enterEditMode(userCalendarObject, date, index)}
          />

        </div>
        <div className='date-ui-form-container'>
          <form onSubmit={(event) => {
            event.preventDefault()
            updateUserCalendar(date, nextSchedule)
          }}>
            <button type='submit'>Update</button>
          </form>
        </div>
      </div>
    </Popup>
  )
}

export default DateUI