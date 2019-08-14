import dayjs from 'dayjs'

// not very nice logic for building the display with partial previous and next month, but it works! 
export const buildDisplay = (currentMonth) => {
  const daysInMonth = dayjs().month(currentMonth).daysInMonth()
  const daysInLastMonth = dayjs().month(currentMonth - 1).daysInMonth()
  const firstDayOfWeekInMonth = dayjs().month(currentMonth).date(1).day()
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
        // the first row of the display will never include the next month
        let currentMonthToUpdate = notInCurrentMonth ? currentMonth - 1 : currentMonth
        week.push({
          dayVal: notInCurrentMonth ? nextDayVal : dayVal,
          dayOfWeek: j,
          currentMonth:
            currentMonthToUpdate - 1 < 0
              ? 11
              : currentMonthToUpdate,
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
  return monthDaysArr
}