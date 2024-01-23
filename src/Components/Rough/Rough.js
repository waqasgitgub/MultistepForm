import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MultiplePicker from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import { Box, Modal, Typography } from '@mui/material';
import dayjs from 'dayjs';

const RangePicker = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [personal_startdate2020, personal_enddate2020] = dateRange;
  const [numberOffDays, setNumberOffDays] = useState(0);
  const [selectedDates, setSelectedDates] = useState([]);
  console.log(selectedDates.map(date => dayjs(date).format('YYYY-MM-DD')));
  const selectedDated = [ '2020-04-01' , '2020-04-02','2020-04-05','2020-04-14']


  const minDate = new Date(2020, 3, 1);
  const maxDate = new Date(2020, 11, 31);
  const initialOpenDate = new Date(2020, 3, 1);


  const handleDateChange = (update) => {
    setDateRange(update);
  };
  const isWeekend = (date) => [0, 6].includes(date.weekDay.index);


  // const handleMerge = () => {
  //   const newDates = getDatesInRange();
  //   setSelectedDates([...selectedDates, ...newDates]);
  //   setDateRange([null, null]);
  // };
  const handleMerge = () => {
    
    const newDates = getDatesInRange();
   
 
    if (selectedDates?.length == 0) {
      // Show alert message if the date range is empty
      alert("Please select start and end date before merging.");
      return;
    }

    // Check for overlapping dates before adding new dates
    const overlappingDates = newDates.filter((date) =>
      selectedDates.includes(date)
    );

    if (overlappingDates.length === 0) {
      setSelectedDates([...selectedDates, ...newDates]);
    } else {
      console.log('Selected dates overlap with existing dates. Merge aborted.');
    }

    setDateRange([null, null]);
  };

  // Function to filter out weekends (Saturday and Sunday)
  const filterWeekends = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };
  const isDateDisabled = (date) => {


      // Disable weekends
      if (!filterWeekends(date)) {
        return true;
        }
        // Disable selected dates
    return selectedDates.some((selectedDate) => dayjs(date).isSame(selectedDate, 'day'));

  };


  const getDatesInRange = () => {
    const dates = [];
    let currentDate = new Date(personal_startdate2020);

    while (currentDate <= personal_enddate2020) {
      if (filterWeekends(currentDate)) {
        dates.push(currentDate.toISOString());
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  return (
    <>
      <div style={{ marginTop: 90, marginLeft: 30 }}>
        <div className="date-picker-container" style={{ marginTop: 20 }}>
          <DatePicker
            selectsRange={true}
            startDate={personal_startdate2020}
            endDate={personal_enddate2020}
            onChange={handleDateChange}
            isClearable={true}
            minDate={minDate}
            maxDate={maxDate}
            filterDate={(date) => !isDateDisabled(date)}

            placeholderText="Select date range"
            openToDate={initialOpenDate}
            className="custom-date-picker-input"
          />
          <div className="d-flex justify-content-start mt-3">
            <button
              onClick={handleMerge}
              type="button"
              className="px-3 py-2 next-step"
            >
              Add Merge
            </button>
          </div>
          <div style={{ marginTop: 10, marginLeft: 2 }}>
            You have selected {selectedDates?.length} days
          </div>
        </div>
        <div style={{ marginTop: 20 }}>
          <MultiplePicker
            multiple
            value={selectedDates}
            minDate={new Date(2020, 3, 1)} // April 1, 2020
            maxDate={new Date(2020, 11, 31)} // December 31, 2020
            onChange={(dates) => setSelectedDates(dates)}
            mapDays={({ date }) => {
              let props = {};
      
              // Check if the day is a weekend (Sunday or Saturday)
              if (isWeekend(date)) {
                props.disabled = true;
              }
      
              // Check if the day is in the selectedDates array and is a weekend
             if (selectedDated.includes(date.format('YYYY-MM-DD'))){
              props.disabled = true
             }
              return props;
            }}
            plugins={[<DatePanel />]}
          />
        </div>
      </div>
    </>
  );
};

export default RangePicker;








