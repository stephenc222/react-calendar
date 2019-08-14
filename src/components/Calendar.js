import React, { Component } from 'react'
import Date from './Date'
import DateUI from './DateUI'
import dayjs from 'dayjs'
import { buildDisplay } from '../util/buildDisplay';

const getDayDate = (dayVal, currentMonth, currentYear) => dayjs().month(currentMonth).year(currentYear).date(dayVal).startOf('day').toDate()

// renders dates given to it
export default class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userCalendarObject: {},
      currentDate: {},
      dateToEdit: { date: '', schedule: [] },
      isOpen: false
    }
  }
  componentDidMount() {
    this.setState({ userCalendarObject: this.props.userCalendarObject })
  }
  closeDateUI = () => {
    this.setState({ isOpen: false, dateToEdit: null })
  }
  openDateUI = (date) => {
    // FIXME: this is dependent on a user being in the same timezone as when they updated a date
    this.setState({
      isOpen: true,
      dateToEdit: {
        date,
      }
    })
  }
  updateUserCalendar = (date, schedule) => {
    this.setState({
      isOpen: false,
      userCalendarObject: {
        ...this.state.userCalendarObject,
        [date]: schedule
      }
    })
  }
  render() {
    const { currentMonth, currentYear } = this.props
    const { dateToEdit, userCalendarObject } = this.state
    const today = dayjs().month(currentMonth).date()
    const monthDaysArr = buildDisplay(currentMonth)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <DateUI updateUserCalendar={this.updateUserCalendar} isOpen={this.state.isOpen} dateToEdit={dateToEdit} userCalendarObject={userCalendarObject} closeDateUI={this.closeDateUI} />
        {
          monthDaysArr.map(
            weekArr =>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                {weekArr.map(
                  ({ dayVal, currentMonth, partOfCurrentMonth }) => {

                    const date = getDayDate(dayVal, currentMonth, currentYear)
                    return <Date
                      openDateUI={() => this.openDateUI(date)}
                      monthDay={dayVal}
                      currentMonth={currentMonth}
                      today={today}
                      partOfCurrentMonth={partOfCurrentMonth}
                      hasSchedule={this.state.userCalendarObject[date]}
                    />
                  })
                }
              </div>
          )
        }
      </div>
    )
  }
}
