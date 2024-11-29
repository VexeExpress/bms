"use client";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { vi } from "date-fns/locale/vi";
import "../style/calendar.css";
registerLocale("vi", vi);
interface CalendarProps {
  onDateChange: (date: Date | null) => void;
}
const Calendar = forwardRef(({ onDateChange }: CalendarProps, ref) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useImperativeHandle(ref, () => ({
    setToday: () => {
      const today = new Date();
      setSelectedDate(today);
      onDateChange(today);
    },
  }));

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      locale="vi"
      dateFormat="dd/MM/yyyy"
      className="custom-datepicker font-rounded text-black"
      customInput={
        <button className="rounded-md border border-gray-300 p-1">
          {selectedDate?.toLocaleDateString("vi-VN") ?? "Chọn ngày"}
        </button>
      }
    />
  );
});

Calendar.displayName = "Calendar";

export default Calendar;
