import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval
    //format
} from "date-fns/esm";
import {format} from './Locale'
const getWeekDays = (date) => {
    const startDayOfWeek = startOfWeek(date);
    const endDayOfWeek = endOfWeek(date);
    const eachDayOfWeek = eachDayOfInterval({
        start: startDayOfWeek,
        end: endDayOfWeek
    });
  
    return eachDayOfWeek;
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
    const startDayOfMonth = startOfMonth(date);
    const endDayOfMonth = endOfMonth(date);
  
    const startDayOfFirstWeek = startOfWeek(startDayOfMonth);
    const endDayOfEndWeek = endOfWeek(endDayOfMonth);
  
    const days = eachDayOfInterval({
        start: startDayOfFirstWeek,
        end: endDayOfEndWeek
    });
  
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

export {
    getWeekDays,
    getWeekDayLabels,
    getDisplayingDays,
    isSameMonth,
    isToday,
    isSameDate,
    parseStringToDate
}