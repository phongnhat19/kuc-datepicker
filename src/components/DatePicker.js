import React, { useState } from "react";
import { enUS, ja } from "date-fns/esm/locale";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format
} from "date-fns/esm";

import "./DatePicker.css";

function getWeekDays(date) {
  const startDayOfWeek = startOfWeek(date);
  const endDayOfWeek = endOfWeek(date);
  const eachDayOfWeek = eachDayOfInterval({
    start: startDayOfWeek,
    end: endDayOfWeek
  });

  return eachDayOfWeek;
}

function getWeekDayLabels(locale) {
  const date = new Date();
  const eachDayOfWeek = getWeekDays(date);
  const labels = eachDayOfWeek.map(day => {
    return format(day, "E", { locale: locale });
  });

  return labels;
}

function getDisplayingDays(date) {
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

function Calendar(props) {
  const today = new Date();
  const date = props.date;
  const locale = props.locale ? props.locale : enUS;
  const weekDayLabels = getWeekDayLabels(locale);
  const displayingDays = getDisplayingDays(date);

  return (
    <div
      className="date-picker-container"
      style={{ display: props.pickerDisplay }}
    >
      <div className="header">
        <div className="month-year-container">
          <span className="prev" />
          <span className="label">
            {format(date, "MMMM YYYY", {
              awareOfUnicodeTokens: true,
              locale: locale
            })}
          </span>
          <span className="next" />
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
            const isSameMonth = day.getMonth() === date.getMonth();
            const isToday = day.toDateString() === today.toDateString();
            const isSelected = day.toDateString() === date.toDateString();

            className += isSameMonth ? "" : " grayed-out";
            className += isToday ? " today" : "";
            className += isSelected ? " selected" : "";

            return (
              <span className={className} key={`day-${index}`}>
                {format(day, "d")}
              </span>
            );
          })}
        </div>
        <div className="quick-selections-container">
          <span className="today">Today</span>
          <span className="none">None</span>
        </div>
      </div>
    </div>
  );
}

function DatePicker() {
  const date = new Date();

  const [pickerDisplay, setPickerDisplay] = useState("none");

  return (
    <div className="date-time-container">
      <div className="text-input-container">
        <input
          type="text"
          className="text-input"
          onFocus={() => setPickerDisplay("block")}
          value={format(date, "MM/dd/YYYY", { awareOfUnicodeTokens: true })}
        />
      </div>
      <Calendar pickerDisplay={pickerDisplay} date={date} locale={enUS} />
    </div>
  );
}

export default DatePicker;
