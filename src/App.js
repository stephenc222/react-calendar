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
      userCalendarObject: {},
      currentMonth: new Date().getMonth()
    }
  }
  componentDidMount() {
    this.setState({ loading: false })
  }
  onMonthChange = (e, currentMonth) => {
    e.preventDefault()
    this.setState({ currentMonth: currentMonth < 0 ? 11 : currentMonth })

  }
  render() {
    const { userCalendarObject, loading, currentMonth } = this.state
    if (loading) {
      return 'loading...'
    }
    return (
      <div style={{ border: '1px solid red' }} className="App">
        <Control currentMonth={currentMonth} onMonthChange={this.onMonthChange} />
        <Calendar currentMonth={currentMonth} userCalendarObject={userCalendarObject} />
      </div>
    );
  }
}

export default App;
