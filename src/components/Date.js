import React, { Component } from 'react'
import dayjs from 'dayjs'
import listImage from '../assets/images/list.png'

const getDayColor = (day, today, partOfCurrentMonth, currentMonth) => {
  if (day === today && currentMonth === dayjs().month()) {
    return 'blue'
  }
  if (partOfCurrentMonth) {
    return 'lightgreen'
  }
  return 'lightgrey'
}
// Date, one for every day of a month
export default class Date extends Component {
  render() {
    const { monthDay, today, partOfCurrentMonth, currentMonth, hasSchedule } = this.props
    return (
      <div onClick={this.props.openDateUI} className='date-container' style={{
        backgroundColor: getDayColor(monthDay, today, partOfCurrentMonth, currentMonth),
        border: '1px solid black',
        maxWidth: 125,
        minWidth: 125,
        minHeight: 125,
        maxHeight: 125,
      }}>
        <div>{monthDay}</div>
        {hasSchedule && <div><img src={listImage} /></div>}
      </div>
    )
  }
}
