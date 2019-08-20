import React, { useState } from 'react'
import dayjs from 'dayjs'
window.dayjs = dayjs

const ScheduleListItem = (props) => {
  const { date, description, hasPassed, deleteScheduleItem, deleteItem, index, editItem, schedule, enterEditMode } = props
  const time = dayjs(date).format('h:mm a')
  return (
    <div style={{ display: 'flex' }}>
      <div>{time}</div>
      <div>{description}</div>
      <div></div>
      <div>
        <button onClick={(event) => enterEditMode(event, schedule, index)}>E</button>
        <button onClick={(event) => deleteScheduleItem(event, deleteItem, schedule, index)}>X</button>
      </div>
    </div>
  )
}

const deleteScheduleItem = (event, deleteItem, schedule, index) => {
  const nextSchedule = schedule.slice()
  nextSchedule.splice(index, 1)
  deleteItem(nextSchedule)
}
const addScheduleItem = (event, addItem, schedule, item) => {
  const nextSchedule = schedule.slice()
  nextSchedule.push(item)
  addItem(nextSchedule)
}

// an item in the schedule Array has the following structure:
// date is assumed from parent (different format)
// if hasPassed, it will be "greyed" but still removable - idk
// { time: 9am, description: '', hasPassed: false }
const ScheduleList = (props) => {
  const { schedule = [], addItem, deleteItem, enterEditMode, date } = props
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
      addScheduleItem(event, addItem, schedule, nextItem)
      onNextItemValChange('')
      onNextItemDateChange(new Date())
    }
  }
  return (
    <div className='schedule-list-container'>
      <div className='schedule-list-new-item-form-container'>
        <form onSubmit={onSubmit}>
          <input type='time' value={nextItemDate} onChange={(e) => onNextItemDateChange(e.target.value)} />
          <input type='text' placeholder='Next thing to do...' value={nextItemVal} onChange={(e) => onNextItemValChange(e.target.value)} />
          <input type='submit' value='Add Item' />
        </form>
      </div>
      {schedule
        && schedule.length
        && schedule.map(
          (itemProps, index) => <ScheduleListItem hasPassed={dayjs(itemProps.date).isBefore(new Date())} schedule={schedule} index={index} deleteItem={deleteItem} deleteScheduleItem={deleteScheduleItem} enterEditMode={enterEditMode} key={`SLI_${index}`} {...itemProps} />)
        || ''
      }



    </div>
  )
}

export default ScheduleList
