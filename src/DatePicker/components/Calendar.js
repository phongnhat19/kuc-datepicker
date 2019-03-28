import React, { useState } from 'react'
import {getWeekDayLabels, getDisplayingDays, isSameMonth, isToday, isSameDate} from './utils'
import { enUS } from "date-fns/esm/locale";
import {
	format
} from "date-fns/esm";

const Calendar = ({
	date,
	locale = enUS, 
	pickerDisplay = 'block',
	onDateClick=(date)=> {},
}) => {
	const today = new Date();
	const weekDayLabels = getWeekDayLabels(locale);
	const [displayDate, setDisplayDate] = useState(date);
	const displayingDays = getDisplayingDays(displayDate);
	
	if (!date) {
		date = new Date()
	}

	return (
		<div
			className="date-picker-container"
			style={{ display: pickerDisplay }}
		>
			<div className="header">
				<div className="month-year-container">
					<span className="prev" onClick={()=>{
						setDisplayDate(new Date(displayDate.setMonth(displayDate.getMonth()-1,1)))
					}} />
					<span className="label">
						{format(displayDate, "MMMM YYYY", {
							awareOfUnicodeTokens: true,
							locale: locale
						})}
					</span>
					<span className="next" onClick={()=>{
						setDisplayDate(new Date(displayDate.setMonth(displayDate.getMonth()+1,1)))
					}} />
				</div>
				<div className="days-container">
				{weekDayLabels.map((label, index) => {
					const notWeekend = index !== 0 && index !== 6;
					return (
					<span
						className={
							notWeekend ? "wday-header" : "wday-header grayed-out"
						}
						key={`wday-header-${index}`}
					>
						{label}
					</span>
					);
				})}
				{displayingDays.map((day, index) => {
					let className = "day";

					className += isSameMonth(day, displayDate) ? "" : " grayed-out";
					className += isToday(day) ? " today" : "";
					className += isSameDate(day, date) ? " selected" : "";

					return (
						<span className={className} key={`day-${index}`} onClick={()=>{onDateClick(day)}}>
							{format(day, "d")}
						</span>
					);
				})}
				</div>
				<div className="quick-selections-container">
					<span className="today" onClick={()=>{onDateClick(today)}}>Today</span>
					<span className="none" onClick={()=>{onDateClick(null)}}>None</span>
				</div>
			</div>
		</div>
	);
}

export default Calendar