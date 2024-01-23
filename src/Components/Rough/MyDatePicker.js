import React, { useState, useEffect } from 'react';
import DatePicker from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';

const MyDatePicker = ({ selectedDates, setSelectedDates }) => {
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    // Update available dates when selectedDates change
    if (selectedDates.length === 2) {
      const datesInRange = getDatesInRange(selectedDates[0], selectedDates[1]);
      setAvailableDates(datesInRange);
    } else {
      setAvailableDates([]);
    }
  }, [selectedDates]);

  const handleDateChange = (dates) => {
    // Update selectedDates state when individual dates are selected
    setSelectedDates(dates);
  };

  const getDatesInRange = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  return (
    <div style={{ marginTop: 20 }}>
      <DatePicker
        multiple
        value={selectedDates}
        onChange={handleDateChange}
        format="MM/dd/yyyy"
        minDate={selectedDates[0]}
        maxDate={selectedDates[1]}
        plugins={[<DatePanel />]}
        showOtherDays
        weekends={['Sat', 'Sun']}
        disabledDates={availableDates.filter((date) => !selectedDates.includes(date))}
      />
    </div>
  );
};

export default MyDatePicker;
