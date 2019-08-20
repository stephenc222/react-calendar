import React, { Component } from 'react';
import { Calendar, Control } from './components'
import './App.css';

// handle changing month to work with, sending calendar object to backend
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      // object with the following structure: (not considering timezones for the moment)
      // { day-date: [list of items, in date order]}
      userCalendarObject: JSON.parse(localStorage.getItem('reactCalendar')) || {},
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear()
    }
  }
  componentDidMount() {
    this.setState({ loading: false })
  }
  onMonthChange = (e, currentMonth) => {
    e.preventDefault()
    const { currentYear } = this.state
    this.setState({
      currentMonth:
        currentMonth < 0
          ? 11
          : (currentMonth > 12 ? 0 : currentMonth),
      currentYear:
        currentMonth < 0
          ? currentYear - 1
          : (currentMonth > 12 ? currentYear + 1 : currentYear)
    })

  }
  render() {
    const { userCalendarObject, loading, currentMonth, currentYear } = this.state
    if (loading) {
      return 'loading...'
    }
    return (
      <div className="App">
        <Control currentMonth={currentMonth} currentYear={currentYear} onMonthChange={this.onMonthChange} />
        <Calendar currentMonth={currentMonth} currentYear={currentYear} userCalendarObject={userCalendarObject} />
      </div>
    );
  }
}

export default App;
