import React, { useState } from 'react'

const ScheduleListItem = (props) => {
  return (
    <div>{JSON.stringify(props, null, 0)}</div>
  )
}

// an item in the schedule Array has the following structure:
// date is assumed from parent (different format)
// if hasPassed, it will be "greyed" but still removable - idk
// { time: 9am, description: '', hasPassed: false }
const ScheduleList = (props) => {
  const { schedule } = props
  return (
    <div className='schedule-list-container'>
      {schedule && schedule.length && schedule.map((itemProps, index) => <ScheduleListItem key={`SLI_${index}`} {...itemProps} />)}



    </div>
  )
}

export default ScheduleList
