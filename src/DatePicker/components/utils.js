import {format} from './Locale'
const getWeekDays = (date) => {
    let startDate = new Date(date)
    startDate.setDate(startDate.getDate()-startDate.getDay())
    let result = [startDate]
    for (let index = 1; index < 7; index++) {
        let tempDate = new Date(result[index-1])
        tempDate.setDate(tempDate.getDate()+1)
        result.push(tempDate)
    }
    return result;
  }
  
const getWeekDayLabels = (locale) => {
    const date = new Date();
    const eachDayOfWeek = getWeekDays(date);
    const labels = eachDayOfWeek.map(day => {
        return format(day, "E", { locale: locale });
    });

    return labels;
}

const getDisplayingDays = (date) => {
    let startDayOfMonth = new Date(date)
    startDayOfMonth.setDate(1)
    let endDayOfMonth = new Date(date)
    endDayOfMonth.setMonth(endDayOfMonth.getMonth()+1,0)
  
    let startDayOfFirstWeek = new Date(startDayOfMonth);
    startDayOfFirstWeek.setDate(startDayOfFirstWeek.getDate()-startDayOfFirstWeek.getDay())
    let endDayOfEndWeek = new Date(endDayOfMonth);
    endDayOfEndWeek.setDate(endDayOfEndWeek.getDate() + (6-endDayOfEndWeek.getDay()) )

    let days = []
    for (var d = new Date(startDayOfFirstWeek); d <= endDayOfEndWeek; d.setDate(d.getDate() + 1)) {
        days.push(new Date(d));
    }
  
    return days;
}

const isSameMonth = (day1, day2) => day1.getMonth() === day2.getMonth();
const isToday = (day) => day.toDateString() === (new Date()).toDateString();
const isSameDate = (day1, day2) => day1.toDateString() === day2.toDateString();

const parseStringToDate = (dateString) => {
    let dateData = {
        date: parseInt(dateString.split("/")[1],10),
        month: parseInt(dateString.split("/")[0],10) - 1,
        year: parseInt(dateString.split("/")[2],10)
    }
    return new Date(dateData.year, dateData.month, dateData.date)
}

const parseStringToTime = (timeString) => {
    let timeData = {
        hour: parseInt(timeString.split(":")[0],10),
        minute: parseInt(timeString.split(":")[1],10)
    }
    let result = new Date()
    result.setHours(timeData.hour)
    result.setMinutes(timeData.minute)
    return result
}

export {
    getWeekDays,
    getWeekDayLabels,
    getDisplayingDays,
    isSameMonth,
    isToday,
    isSameDate,
    parseStringToDate,
    parseStringToTime
}