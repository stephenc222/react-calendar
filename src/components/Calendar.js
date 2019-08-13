import React, { Component } from 'react'
import Date from './Date'
import DateUI from './DateUI'
import dayjs from 'dayjs'
import { tsExpressionWithTypeArguments } from '@babel/types';

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
    const daysInLastMonth = dayjs().month(currentMonth - 1).daysInMonth()
    const firstDayOfWeekInMonth = dayjs().month(currentMonth).date(1).day()
    const today = dayjs().month(currentMonth).date()
    let notInCurrentMonth = firstDayOfWeekInMonth >= 0
    const monthDaysArr = []
    let dayVal = 0
    let nextMonth = currentMonth
    for (let i = 0; i < 5; ++i) {
      const week = []
      for (let j = 0; j < 7; ++j) {
        // top row of display
        if (i === 0) {
          const nextDayVal = daysInLastMonth - firstDayOfWeekInMonth + 1 + j
          if (nextDayVal > daysInLastMonth && notInCurrentMonth) {
            dayVal = 0
            notInCurrentMonth = false
            ++dayVal
          }
          week.push({
            dayVal: notInCurrentMonth ? nextDayVal : dayVal,
            dayOfWeek: j,
            currentMonth: currentMonth - 1 >= 0 ? currentMonth - 1 : 11,
            partOfCurrentMonth: !notInCurrentMonth
          })
          // bottom row of display
        } else if (i === 4) {
          nextMonth = nextMonth === currentMonth ? currentMonth : nextMonth
          if (dayVal > daysInMonth) {
            dayVal = 1
            nextMonth++
          }
          week.push({ dayVal, dayOfWeek: j, currentMonth: nextMonth, partOfCurrentMonth: (nextMonth === currentMonth) })

        } else {
          week.push({ dayVal, dayOfWeek: j, currentMonth, partOfCurrentMonth: true })
        }
        ++dayVal
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
                  ({ dayVal, currentMonth, partOfCurrentMonth }) => <Date monthDay={dayVal} currentMonth={currentMonth} today={today} partOfCurrentMonth={partOfCurrentMonth} />)
                }
              </div>
          )
        }
      </div>
    )
  }
}
