import en from './localizationData/en'
import cn from './localizationData/cn'
import jp from './localizationData/jp'

const seperators = ["/", "-", " "]

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
        case 'calendartitle':
            if (locale.name === 'jp' || locale.name === 'cn') return `${dateObj.year}年${dateObj.month+1}月`
            return `${locale.monthNames[dateObj.month]} ${dateObj.year}`
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
        if (dateFormat === 'calendartitle') {
            return getDateData(dateObj, 'calendartitle', option.locale)
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