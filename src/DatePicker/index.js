import React, { useState, useEffect, useRef } from "react";
import { enUS } from "date-fns/esm/locale";
import {
  format
} from "date-fns/esm";

import Calendar from './components/Calendar'

import "./DatePicker.css";
import { parseStringToDate } from "./components/utils";

const DatePicker = ({date, onChange=(date)=> {} ,locale = enUS, dateFormat="MM/dd/YYYY"}) => {
	const [pickerDisplay, setPickerDisplay] = useState("none")
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
		<div className="date-time-container" >
			<div className="text-input-container" key={date}>
				<input
					type="text"
					className="text-input"
					onFocus={() => setPickerDisplay("block")}
					defaultValue={date ? format(date, dateFormat, { awareOfUnicodeTokens: true }) : ""}
					onBlur={
						(e)=>{
							onChange(parseStringToDate(e.target.value))
						}
					}
				/>
			</div>
			<div ref={wrapperRef}>
				<Calendar 
					pickerDisplay={pickerDisplay} 
					date={date} 
					locale={locale} 
					onDateClick={
						(date) => {
							setPickerDisplay("none")
							onChange(date)
						}
					}
				/>
			</div>
		</div>
	);
}

export default DatePicker;
