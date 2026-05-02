"use client";

import { useState, useRef, useEffect } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

interface CustomDatePickerProps {
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
}

export default function CustomDatePicker({ selectedDate, onSelect }: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const handlePrevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    onSelect(newDate);
    setIsOpen(false);
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    );
  };

  // Generate blank spaces for the days before the 1st of the month
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => <div key={`blank-${i}`} className="w-8 h-8" />);

  // Generate the actual days
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const selected = isSelected(day);
    return (
      <button
        key={day}
        type="button"
        onClick={() => handleDateClick(day)}
        className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200
          ${selected
            ? "bg-cyan-400 text-charcoal-950 shadow-[0_0_15px_-3px_rgba(34,211,238,0.4)] scale-110"
            : "text-zinc-300 hover:bg-charcoal-700 hover:text-white"
          }`}
      >
        {day}
      </button>
    );
  });

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* The visible input-like button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center bg-charcoal-800/50 border rounded-2xl py-4 pl-12 pr-6 transition-all shadow-inner focus:outline-none focus:shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)]
          ${isOpen ? "border-cyan-400/50" : "border-charcoal-700"}
          ${selectedDate ? "text-white" : "text-zinc-500"}
        `}
      >
        <CalendarDays className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isOpen || selectedDate ? "text-cyan-400" : "text-zinc-500"}`} size={20} />
        {selectedDate ? selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "Select an estimated start date"}
      </button>

      {/* The Calendar Dropdown */}
      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 z-50 w-full sm:w-[320px] p-4 bg-charcoal-800 border border-charcoal-700 rounded-2xl shadow-2xl backdrop-blur-xl">

          {/* Calendar Header (Month/Year & Controls) */}
          <div className="flex justify-between items-center mb-4">
            <button type="button" onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-charcoal-700 text-zinc-400 hover:text-white transition-colors">
              <ChevronLeft size={18} />
            </button>
            <h3 className="text-white font-bold tracking-wide">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <button type="button" onClick={handleNextMonth} className="p-2 rounded-full hover:bg-charcoal-700 text-zinc-400 hover:text-white transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Days of the Week Header */}
          <div className="grid grid-cols-7 gap-1 mb-2 text-center">
            {dayNames.map(day => (
              <div key={day} className="text-xs font-bold text-zinc-500 tracking-wider uppercase">{day}</div>
            ))}
          </div>

          {/* The Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 justify-items-center">
            {blanks}
            {days}
          </div>
        </div>
      )}
    </div>
  );
}
