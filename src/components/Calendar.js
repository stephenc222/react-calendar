import React, { Component } from 'react'
import Date from './Date'
import DateUI from './DateUI'
import dayjs from 'dayjs'

// renders dates given to it
export default class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      yes: false
    }
  }
  render() {
    const { currentMonth } = this.props
    const daysInMonth = dayjs().month(currentMonth).daysInMonth()
    const firstDayOfWeekInMonth = dayjs().month(currentMonth).date(1).day()
    const today = dayjs().month(currentMonth).date()
    const monthDaysArr = []
    let dayVal = 0
    for (let i = 0; i < 6; ++i) {
      const week = []
      for (let j = 0; j < 6; ++j) {
        week.push(dayVal)
        ++dayVal
        if (dayVal > daysInMonth) {
          dayVal = 0
        }
      }
      monthDaysArr.push(week)
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {
          monthDaysArr.map(
            weekArr =>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                {weekArr.map(
                  day => <Date monthDay={day} currentMonth={currentMonth} today={today} partOfCurrentMonth={day >= firstDayOfWeekInMonth && day <= daysInMonth} />)
                }
              </div>
          )
        }


      </div>
    )
  }
}
