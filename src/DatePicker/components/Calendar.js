import React, { useState } from 'react'
import {getWeekDayLabels, getDisplayingDays, isSameMonth, isToday, isSameDate} from './utils'
import {en} from './Locale'
import {format} from './Locale'

const Calendar = ({
	date,
	locale = en, 
	pickerDisplay = 'block',
	onDateClick=(date)=> {},
}) => {
	const today = new Date();
	const weekDayLabels = getWeekDayLabels(locale);
	const [displayDate, setDisplayDate] = useState(new Date(date));
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
						let newDate = new Date(displayDate)
						newDate.setMonth(newDate.getMonth()-1,1)
						setDisplayDate(newDate)
					}} />
					<span className="label">
						{format(displayDate, "MMMM YYYY", {
							locale: locale
						})}
					</span>
					<span className="next" onClick={()=>{
						let newDate = new Date(displayDate)
						newDate.setMonth(newDate.getMonth()+1,1)
						setDisplayDate(newDate)
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
						<span className={className} key={`day-${index}`} onClick={()=>{
							setDisplayDate(new Date(day))
							onDateClick(day)}
							}
						>
							{format(day, "d")}
						</span>
					);
				})}
				</div>
				<div className="quick-selections-container">
					<span className="today" onClick={()=>{setDisplayDate(new Date());onDateClick(today)}}>Today</span>
					<span className="none" onClick={()=>{onDateClick(null)}}>None</span>
				</div>
			</div>
		</div>
	);
}

export default Calendar