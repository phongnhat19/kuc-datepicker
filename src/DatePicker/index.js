import React, { useState, useEffect, useRef } from "react";
import {en} from './components/Locale'
import {format} from './components/Locale'

import Calendar from './components/Calendar'

import "./DatePicker.css";
import { parseStringToDate } from "./components/utils";

const DatePicker = ({date, onChange=(date)=> {} ,locale = en, dateFormat="MM/dd/YYYY"}) => {
	const [pickerDisplay, setPickerDisplay] = useState("none")
	const [dateError, setDateError] = useState("")
	const wrapperRef = useRef(null);

	useEffect(()=>{
		document.addEventListener('mousedown', handleClickOutside, true);
		return(()=>{
			document.removeEventListener('mousedown', handleClickOutside, true);
		})
	})

	const handleClickOutside = (event) => {
		if (wrapperRef && !wrapperRef.current.contains(event.target) && pickerDisplay === 'block') {
			setPickerDisplay('none')
		}
	}
	
	return (
		<div className="date-time-container" ref={wrapperRef}>
			<div className="text-input-container" key={date}>
				<input
					type="text"
					className="text-input"
					onFocus={() => setPickerDisplay("block")}
					defaultValue={date ? format(date, dateFormat) : ""}
					onBlur={
						(e)=>{
							setDateError("")
							let date = parseStringToDate(e.target.value)
							if (date instanceof Date && !isNaN(date)) {
								onChange(parseStringToDate(e.target.value))
							}
							else if (e.target.value) {
								setDateError("Invalid date")
								setPickerDisplay("none")
							}
						}
					}
					onKeyDown= {
						(e) => {
							if (e.key === 'Tab') {
								setPickerDisplay("none")
							}
						}
					}
				/>
			</div>
			{
				dateError && 
				<div className="label-error">
					<span>{dateError}</span>
				</div>
			}
			<Calendar 
				pickerDisplay={pickerDisplay} 
				date={date} 
				locale={locale} 
				onDateClick={
					(date) => {
						onChange(date)
						setPickerDisplay("none")
					}
				}
			/>
		</div>
	);
}

export default DatePicker;
export {
	Calendar
}
export * from './components/Locale'
