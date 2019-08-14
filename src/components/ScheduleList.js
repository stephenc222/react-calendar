import React, { useState } from 'react'
import dayjs from 'dayjs'

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
const addScheduleItem = (event, addItem, schedule) => {
  const nextSchedule = schedule.slice()
  nextSchedule.push({ date: new Date(), description: 'something new', hasPassed: false })
  addItem(nextSchedule)
}

// an item in the schedule Array has the following structure:
// date is assumed from parent (different format)
// if hasPassed, it will be "greyed" but still removable - idk
// { time: 9am, description: '', hasPassed: false }
const ScheduleList = (props) => {
  const { schedule = [], addItem, deleteItem, enterEditMode } = props
  return (
    <div className='schedule-list-container'>
      {schedule
        && schedule.length
        && schedule.map(
          (itemProps, index) => <ScheduleListItem hasPassed={dayjs(itemProps.date).isBefore(new Date())} schedule={schedule} index={index} deleteItem={deleteItem} deleteScheduleItem={deleteScheduleItem} enterEditMode={enterEditMode} key={`SLI_${index}`} {...itemProps} />)
      }
      <div><button onClick={(event) => addScheduleItem(event, addItem, schedule)}>Add item</button></div>



    </div>
  )
}

export default ScheduleList
