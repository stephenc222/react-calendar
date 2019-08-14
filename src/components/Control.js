import React, { Component } from 'react'
import dayjs from 'dayjs'

export default class Control extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { currentMonth, currentYear } = this.props
    const formattedCurrentMonth = dayjs().year(currentYear).month(currentMonth).format('MMMM YYYY')
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 50 }}>
        <button onClick={(e) => this.props.onMonthChange(e, currentMonth - 1)}>Prev</button>
        <div style={{ paddingLeft: 50, paddingRight: 50 }}>{formattedCurrentMonth}</div>
        <button onClick={(e) => this.props.onMonthChange(e, currentMonth + 1)}>Next</button>
      </div>
    )
  }
}
