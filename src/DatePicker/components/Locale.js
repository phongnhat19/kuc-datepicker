const seperators = ["/", "-", " "]
const en = {
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    weekDay: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    weekDayShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    weekDayMedium: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
} 

const cn = {
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    weekDay: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    weekDayShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    weekDayMedium: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
}

const jp = {
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    weekDay: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    weekDayShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    weekDayMedium: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
}

const getSeperator = (dateFormatString) => {
    let seperator = ""
    seperators.forEach((char)=>{
        if (dateFormatString.indexOf(char) !== -1) {
            seperator = char
        }
    })
    return seperator
}

const getDateData = (dateObj, dateCode, locale) => {
    switch (dateCode) {
        case 'E': 
            return locale.weekDayShort[dateObj.day]
        case 'EE':
            return locale.weekDayMedium[dateObj.day]
        case 'EEEE':
            return locale.weekDay[dateObj.day]
        case 'd':
            return `${dateObj.date}`
        case 'dd':
            if (dateObj.date < 10) return `0${dateObj.date}`
            return `${dateObj.date}`
        case 'MM':
            if (dateObj.month+1 < 10) return `0${dateObj.month+1}`
            return `${dateObj.month+1}`
        case 'MMM':
            return locale.monthNamesShort[dateObj.month]
        case 'MMMM':
            return locale.monthNames[dateObj.month]
        case 'YYYY':
            return `${dateObj.year}`
        default:
            break;
    }
}

const format = (dirtyDate, dateFormat, option = {}) => {
    try {
        let dateObj = {
            millisecond: dirtyDate.getMilliseconds(),
            second: dirtyDate.getSeconds(),
            minute: dirtyDate.getMinutes(),
            hour: dirtyDate.getHours(),
            date: dirtyDate.getDate(),
            day: dirtyDate.getDay(),
            month: dirtyDate.getMonth(),
            year: dirtyDate.getFullYear()
        }
        let seperator = getSeperator(dateFormat)
        let formattedDate = dateFormat.split(seperator)
        formattedDate = formattedDate.map((item)=>{
            return getDateData(dateObj, item, option.locale)
        })
        return formattedDate.join(seperator)
    } catch (error) {
        return dateFormat
    }
}

const Locale = {
    en: en,
    cn: cn,
    jp: jp,
    format: format
}

export default Locale
export {
    en,
    cn,
    jp,
    format
}