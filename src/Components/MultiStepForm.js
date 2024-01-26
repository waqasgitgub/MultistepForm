import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import frameFluid from "./GlobalImages/Frame1.png";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./GlobalStyles/globalStyles.css";
import firstPage from "./GlobalImages/verifyy.jpg";
import Pdf2019 from "../../src/Pdf/2019Step2.pdf";
import Pdf2020 from "../../src/Pdf/2020Step2.pdf";
import Pdf2021 from "../../src/Pdf/2021Step2.pdf";
import PdfNetEarning from "../../src/Pdf/netEarn.pdf";
import { removeToken, setToken } from "../Redux/Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import gifTick from "./GlobalImages/gif-submit.gif";
import taxSet from "./GlobalImages/Tax_set.png";
import newImage from "./GlobalImages/Group 940.png";
import framepng from "./GlobalImages/Frame.png";
import qustMark from "./GlobalImages/Qust_mark.png";
import congrats from "./GlobalImages/congratss.png";
import Confetti from "react-confetti";
import MultiplePicker, { DateObject } from "react-multi-date-picker";
import dayjs from "dayjs";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "@mui/material/Modal";
import { Clear, Visibility, VisibilityOff } from "@mui/icons-material";

import {
  CheckBoxSharp,
  CheckCircle,
  CheckCircleOutline,
  DomainVerification,
  QuestionMark,
  TaskAlt,
} from "@mui/icons-material";
import FileInputComponent from "./FileInputComponent";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

import Check from "@mui/icons-material/Check";
import { styled } from "@mui/system";
import { Avatar, FormControl, Input, InputLabel } from "@mui/material";
import LoadingScreen from "./LoadingScreen";
function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", marginTop: 5 }}>
      <Box sx={{ width: "100%" }}>
        <LinearProgress
          sx={{ height: "10px", borderRadius: "6px" }}
          variant="determinate"
          {...props}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          style={{ fontWeight: 600 }}
          variant="body2"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
  "Step 4",
  "Step 5",
  "Step 6",
  "Step 7",
  "Step 8",
  "Step 9",
  "Step 10",
  "Step 11",
  "Step 12",
  "Step 13",
  "Step 14",
  "Step 15",
  "Step 16",
  "Step 17",
  "Step 18",
  "Step 19",
  "Step 20",
  "Step 21",
  "Step 22",
  "Step 23",
  "Step 24",
];

const firstPreQualifier = [
  "Create User Initial Form",
  "Prequations",
  "Step 2",
  "Step 3",
  "Step 4",
  "Step 5",
  "Step 6",
];

const firstPreQualifier2 = [
  "Step 1",
  "Step 2",
  "Step 3",
  "Step 4",
  "Step 5",
  "Step 6",
  "Step 7",
  "Step 8",
  "Step 9",
  "Step 10",
  "Step 11",
  "Step 12",
  "Step 13",
];
const stepss = ["Estimate Calculator", "Verification", "Confirmation"];

const steps18 = ["Affirmation", "Estimated Calculator", "Upload Documents"];

const MultiStepForm = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  // personal start date 2020

  // const [dateRange, setDateRange] = useState([null, null]);
  // const [personal_startdate2020, personal_enddate2020] = dateRange;
  // const [numberOffDays, setNumberOffDays] = useState(0);
  // const [openModalDate, setOpenModalDate] = useState(false);
  // const [skippedDates, setSkippedDates] = useState([]); // Add this line

  // const minDate = new Date(2020, 3, 1); // April 2020 (Note: Month is zero-based)
  // const maxDate = new Date(2020, 11, 31); // December 2020
  // const initialOpenDate = new Date(2020, 3, 1); // December 2020 initially

  // useEffect(() => {
  //   if (personal_startdate2020 && personal_enddate2020) {
  //     const daysInRange = calculateWorkingDays(
  //       personal_startdate2020,
  //       personal_enddate2020,
  //       skippedDates
  //     );
  //     setNumberOffDays(daysInRange);
  //   } else {
  //     setNumberOffDays(0);
  //   }
  // }, [personal_startdate2020, personal_enddate2020, skippedDates]);
  // const calculateWorkingDays = (startDate, endDate, skippedDates) => {
  //   let workingDays = 0;
  //   let currentDate = new Date(startDate);

  //   while (currentDate <= endDate) {
  //     const dayOfWeek = currentDate?.getDay();
  //     // Check if the current date is not a weekend, not in the skippedDates array, and not skipped as a weekend
  //     if (
  //       dayOfWeek !== 0 &&
  //       dayOfWeek !== 6 &&
  //       !skippedDates?.includes(currentDate)
  //     ) {
  //       workingDays++;
  //     }
  //     currentDate.setDate(currentDate?.getDate() + 1);
  //   }

  //   return workingDays;
  // };

  // const handleDateChange = (update) => {
  //   setDateRange(update);
  // };

  // const handleCloseModal = () => {
  //   setOpenModalDate(false);
  // };

  // // Function to filter out weekends (Saturday and Sunday)
  // const filterWeekends = (date) => {
  //   const day = date.getDay();
  //   return day !== 0 && day !== 6;
  // };

  //  new code

  const [dateRange, setDateRange] = useState([null, null]);
  const [personal_startdate2020, personal_enddate2020] = dateRange;
  const [numberOffDays, setNumberOffDays] = useState(0);
  const [selectedDates, setSelectedDates] = useState([]);

  const format = "YYYY-MM-DD";
  const specificDate1 = new DateObject().set({
    day: 1,
    month: 4,
    year: 2020,
    format,
  });
  const specificDate2 = new DateObject().set({
    day: 1,
    month: 1,
    year: 2021,
    format,
  });
  console.log(selectedDates);

  const [openModalDate, setOpenModalDate] = useState(false);

  const minDate = new Date(2020, 3, 1); // April 2020 (Note: Month is zero-based)
  const maxDate = new Date(2020, 11, 31); // December 2020
  const initialOpenDate = new Date(2020, 3, 1); // December 2020 initially

  const handleDateChange = (update) => {
    setDateRange(update);
  };
  const isWeekend = (date) => [0, 6].includes(date.weekDay.index);

  const handleMerge = () => {
    const newDates = getDatesInRange();
    const mergedDates = [...selectedDates, ...newDates];

    // Check if '1970/01/01' is present in mergedDates
    if (mergedDates.includes("1970-01-01T00:00:00.000Z")) {
      // Log a message indicating that the date is present
      console.log(
        "Selected dates include '1970/01/01'. Array will not be updated."
      );
      return;
    }
    // Check for overlapping dates before adding new dates
    const overlappingDates = newDates.filter((date) =>
      selectedDates.includes(date)
    );

    if (overlappingDates.length === 0) {
      setSelectedDates(mergedDates);
    } else {
      console.log("Selected dates overlap with existing dates. Merge aborted.");
    }

    setDateRange([null, null]);
  };

  const getDatesInRange = () => {
    const dates = [];
    let currentDate = new Date(personal_startdate2020);

    while (currentDate <= personal_enddate2020) {
      if (!isDateDisabledOne(currentDate) && filterWeekends(currentDate)) {
        dates.push(currentDate.toISOString());
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const handleCloseModal = () => {
    setOpenModalDate(false);
  };

  // Function to filter out weekends (Saturday and Sunday)
  const filterWeekends = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };
  const isDateDisabledOne = (date) => {
    // Disable weekends
    if (!filterWeekends(date)) {
      return true;
    }
    // Disable selected dates
    return selectedDates.some((selectedDate) =>
      dayjs(date).isSame(selectedDate, "day")
    );
  };

  // personal start date 2021
  const [dateRangeTwo, setDateRangeTwo] = useState([null, null]);
  const [personal_startdate2021, personal_enddate2021] = dateRangeTwo;
  const [numberOffDaysTwo, setNumberOffDaysTwo] = useState(0);
  const [selectedDatesTwo, setSelectedDatesTwo] = useState([]);

  const [openModalDateTwo, setOpenModalDateTwo] = useState(false);
  const [skippedDatesTwo, setSkippedDatesTwo] = useState([]); // Add this line

  const minDateTwo = new Date(2021, 0, 1); // January 1, 2021 (Note: Month is zero-based)
  const maxDateTwo = new Date(2021, 8, 30); // September 30, 2021
  const initialOpenDateTwo = new Date(2021, 0, 1); // January 1, 2021 initially
  // useEffect(() => {
  //   if (personal_startdate2021 && personal_enddate2021) {
  //     const daysInRange = calculateWorkingDaysTwo(
  //       personal_startdate2021,
  //       personal_enddate2021,
  //       skippedDatesTwo
  //     );
  //     setNumberOffDaysTwo(daysInRange);
  //   } else {
  //     setNumberOffDaysTwo(0);
  //   }
  // }, [personal_startdate2021, personal_enddate2021, skippedDatesTwo]);
  // const calculateWorkingDaysTwo = (startDate, endDate, skippedDates) => {
  //   let workingDays = 0;
  //   let currentDate = new Date(startDate);

  //   while (currentDate <= endDate) {
  //     const dayOfWeek = currentDate.getDay();
  //     // Check if the current date is not a weekend, not in the skippedDates array, and not skipped as a weekend
  //     if (
  //       dayOfWeek !== 0 &&
  //       dayOfWeek !== 6 &&
  //       !skippedDates.includes(currentDate)
  //     ) {
  //       workingDays++;
  //     }
  //     currentDate.setDate(currentDate.getDate() + 1);
  //   }

  //   return workingDays;
  // };

  const handleDateChangeTwo = (update) => {
    setDateRangeTwo(update);
  };
  const handleMergeTwo = () => {
    const newDates = getDatesInRangeTwo();
    const mergedDates = [...selectedDatesTwo, ...newDates];

    // Check if '1970/01/01' is present in mergedDates
    if (mergedDates.includes("1970-01-01T00:00:00.000Z")) {
      // Log a message indicating that the date is present
      console.log(
        "Selected dates include '1970/01/01'. Array will not be updated."
      );
      return;
    }

    // Check for overlapping dates before adding new dates
    const overlappingDates = newDates.filter((date) =>
      selectedDatesTwo.includes(date)
    );

    if (overlappingDates.length === 0) {
      setSelectedDatesTwo(mergedDates);
    } else {
      console.log("Selected dates overlap with existing dates. Merge aborted.");
    }

    setDateRangeTwo([null, null]);
  };

  const getDatesInRangeTwo = () => {
    const dates = [];
    let currentDate = new Date(personal_startdate2021);

    while (currentDate <= personal_enddate2021) {
      if (!isDateDisabledTwoo(currentDate) && filterWeekends(currentDate)) {
        dates.push(currentDate.toISOString());
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const handleCloseModalTwo = () => {
    setOpenModalDateTwo(false);
  };

  const isDateDisabledTwoo = (date) => {
    // Disable weekends
    if (!filterWeekends(date)) {
      return true;
    }
    // Disable selected dates
    return selectedDatesTwo.some((selectedDate) =>
      dayjs(date).isSame(selectedDate, "day")
    );
  };

  // cared start date 2020
  const [caredDateRange, setCaredDateRange] = useState([null, null]);
  const [cared_startdate2020, cared_enddate2020] = caredDateRange;
  const [symptomsDays, setSymptomsDays] = useState(0);

  const [selectedDatesCared2020, setSelectedDatesCared2020] = useState([]);
  const datesFormatCared2020 = selectedDates.map((date) =>
    dayjs(date).format("YYYY-MM-DD")
  );
  const [openModalSymptoms, setOpenModalSymptoms] = useState(false);
  const [skippedDatesThree, setSkippedDatesThree] = useState([]); // Add this line

  // Update the minDate and maxDate as needed for symptoms
  const minSymptomsDate = new Date(2020, 3, 1); // April 2020
  const maxSymptomsDate = new Date(2020, 11, 31); // December 2020
  const initialOpenSymptomsDate = new Date(2020, 3, 1); // Initial open date for symptoms

  // useEffect(() => {
  //   if (cared_startdate2020 && cared_enddate2020) {
  //     const differenceInTime = cared_enddate2020.getTime() - cared_startdate2020.getTime();
  //     const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)) + 1;
  //     setSymptomsDays(differenceInDays);
  //   } else {
  //     setSymptomsDays(0);
  //   }
  // }, [cared_startdate2020, cared_enddate2020]);
  // useEffect(() => {
  //   if (cared_startdate2020 && cared_enddate2020) {
  //     const daysInRange = calculateWorkingDaysThree(
  //       cared_startdate2020,
  //       cared_enddate2020,
  //       skippedDatesThree
  //     );
  //     setSymptomsDays(daysInRange);
  //   } else {
  //     setSymptomsDays(0);
  //   }
  // }, [cared_startdate2020, cared_enddate2020, skippedDatesThree]);

  // const calculateWorkingDaysThree = (startDate, endDate, skippedDates) => {
  //   let workingDays = 0;
  //   let currentDate = new Date(startDate);

  //   while (currentDate <= endDate) {
  //     const dayOfWeek = currentDate.getDay();
  //     // Check if the current date is not a weekend, not in the skippedDates array,
  //     // not skipped as a weekend, and not disabled
  //     if (
  //       dayOfWeek !== 0 &&
  //       dayOfWeek !== 6 &&
  //       !skippedDates.includes(currentDate) &&
  //       !isDateDisabled(currentDate)
  //     ) {
  //       workingDays++;
  //     }
  //     currentDate.setDate(currentDate.getDate() + 1);
  //   }

  //   return workingDays;
  // };

  const handleCaredDateChange = (update) => {
    setCaredDateRange(update);
  };

  const handleMergeCared2020 = () => {
    const newDates = getDatesInRangeCared2020();
    const mergedDates = [...selectedDatesCared2020, ...newDates];

    // Check if '1970/01/01' is present in mergedDates
    if (mergedDates.includes("1970-01-01T00:00:00.000Z")) {
      // Log a message indicating that the date is present
      console.log(
        "Selected dates include '1970/01/01'. Array will not be updated."
      );
      return;
    }

    // Check for overlapping dates before adding new dates
    const overlappingDates = newDates.filter((date) =>
      selectedDatesCared2020.includes(date)
    );

    if (overlappingDates.length === 0) {
      setSelectedDatesCared2020(mergedDates);
    } else {
      console.log("Selected dates overlap with existing dates. Merge aborted.");
    }

    setCaredDateRange([null, null]);
  };

  const getDatesInRangeCared2020 = () => {
    const dates = [];
    let currentDate = new Date(cared_startdate2020);

    while (currentDate <= cared_enddate2020) {
      if (!isDateDisabled(currentDate) && filterWeekends(currentDate)) {
        dates.push(currentDate.toISOString());
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const handleCloseSymptomsModal = () => {
    setOpenModalSymptoms(false);
  };

  const isDateDisabled = (date) => {
    const startDate = new Date(personal_startdate2020);
    const endDate = new Date(personal_enddate2020);

    // Disable weekends
    if (!filterWeekends(date)) {
      return true;
    }

    // Disable dates within the range or in selectedDatesCared2020 or selectedDates
    return (
      selectedDatesCared2020.some((selectedDate) =>
        dayjs(date).isSame(selectedDate, "day")
      ) ||
      selectedDates.some((selectedDate) =>
        dayjs(date).isSame(selectedDate, "day")
      )
    );
  };

  // cared start date 2021
  const [caredDateRangeTwo, setCaredDateRangeTwo] = useState([null, null]);
  const [cared_startdate2021, cared_enddate2021] = caredDateRangeTwo;
  const [symptomsDaysTwo, setSymptomsDaysTwo] = useState(0);
  const [openModalSymptomsTwo, setOpenModalSymptomsTwo] = useState(false);
  const [skippedDatesFour, setSkippedDatesFour] = useState([]); // Add this line
  const [selectedDatesCared2021, setSelectedDatesCared2021] = useState([]);
  const datesFormatCared2021 = selectedDatesTwo.map((date) =>
    dayjs(date).format("YYYY-MM-DD")
  );

  // Update the minDate and maxDate as needed for symptoms

  const minSymptomsDateTwo = new Date(2021, 0, 1); // January 1, 2020 (Note: Month is zero-based)
  const maxSymptomsDateTwo = new Date(2021, 8, 30); // September 30, 2020
  const initialOpenSymptomsDateTwo = new Date(2021, 0, 1); // January 1, 2020 initially

  // useEffect(() => {
  //   if (cared_startdate2021 && cared_enddate2021) {
  //     const daysInRange = calculateWorkingDaysFour(
  //       cared_startdate2021,
  //       cared_enddate2021,
  //       skippedDatesFour
  //     );
  //     setSymptomsDaysTwo(daysInRange);
  //   } else {
  //     setSymptomsDaysTwo(0);
  //   }
  // }, [cared_startdate2021, cared_enddate2021, skippedDatesFour]);

  // const calculateWorkingDaysFour = (startDate, endDate, skippedDates) => {
  //   let workingDays = 0;
  //   let currentDate = new Date(startDate);

  //   while (currentDate <= endDate) {
  //     const dayOfWeek = currentDate.getDay();
  //     // Check if the current date is not a weekend, not in the skippedDates array, and not skipped as a weekend
  //     if (
  //       dayOfWeek !== 0 &&
  //       dayOfWeek !== 6 &&
  //       !skippedDates.includes(currentDate) &&
  //       !isDateDisabledTwo(currentDate)
  //     ) {
  //       workingDays++;
  //     }
  //     currentDate.setDate(currentDate.getDate() + 1);
  //   }

  //   return workingDays;
  // };

  const handleCaredDateChangeTwo = (update) => {
    setCaredDateRangeTwo(update);
  };

  const handleMergeCared2021 = () => {
    const newDates = getDatesInRangeCared2021();
    const mergedDates = [...selectedDatesCared2021, ...newDates];

    // Check if '1970/01/01' is present in mergedDates
    if (mergedDates.includes("1970-01-01T00:00:00.000Z")) {
      // Log a message indicating that the date is present
      console.log(
        "Selected dates include '1970/01/01'. Array will not be updated."
      );
      return;
    }

    // Check for overlapping dates before adding new dates
    const overlappingDates = newDates.filter((date) =>
      selectedDatesCared2021.includes(date)
    );
    console.log(overlappingDates);

    if (overlappingDates.length === 0) {
      setSelectedDatesCared2021(mergedDates);
    } else {
      console.log("Selected dates overlap with existing dates. Merge aborted.");
    }

    setCaredDateRangeTwo([null, null]);
  };

  const getDatesInRangeCared2021 = () => {
    const dates = [];
    let currentDate = new Date(cared_startdate2021);

    while (currentDate <= cared_enddate2021) {
      if (!isDateDisabledTwo(currentDate) && filterWeekends(currentDate)) {
        dates.push(currentDate.toISOString());
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const handleCloseSymptomsModalTwo = () => {
    setOpenModalSymptomsTwo(false);
  };

  const isDateDisabledTwo = (date) => {
    const startDate = new Date(personal_enddate2021);
    const endDate = new Date(personal_startdate2021);

    // Disable weekends
    if (!filterWeekends(date)) {
      return true;
    }

    // Disable dates within the range or in selectedDatesCared2020 or selectedDates
    return (
      selectedDatesCared2021.some((selectedDate) =>
        dayjs(date).isSame(selectedDate, "day")
      ) ||
      selectedDatesTwo.some((selectedDate) =>
        dayjs(date).isSame(selectedDate, "day")
      )
    );
  };

  // Closure states 2020
  const [closureDateRange, setClosureDateRange] = useState([null, null]);
  const [minor_startdate2020, minor_enddate2020] = closureDateRange;
  const [minordays2020, setMinordays2020] = useState(0);

  const [selectedDatesClosure2020, setSelectedDatesClosure2020] = useState([]);
  const datesFormatClosure2020 = selectedDatesCared2020.map((date) =>
    dayjs(date).format("YYYY-MM-DD")
  );
  // const datesFormatClosure2021 = selectedDatesCared2021.map(date => dayjs(date).format('YYYY-MM-DD'));

  const [openModalClosure, setOpenModalClosure] = useState(false);
  const [skippedDatesFive, setSkippedDatesFive] = useState([]); // Add this line

  // Closure date range limits
  const minClosureDate = new Date(2020, 3, 1); // April 2020
  const maxClosureDate = new Date(2020, 11, 31); // December 2020
  const initialOpenClosureDate = new Date(2020, 3, 1); // Initial open date for closure

  // useEffect(() => {
  //   if (minor_startdate2020 && minor_enddate2020) {
  //     const daysInRange = calculateWorkingDaysFive(
  //       minor_startdate2020,
  //       minor_enddate2020,
  //       skippedDatesFive
  //     );
  //     setMinordays2020(daysInRange);
  //   } else {
  //     setMinordays2020(0);
  //   }
  // }, [minor_startdate2020, minor_enddate2020, skippedDatesFive]);

  // const calculateWorkingDaysFive = (startDate, endDate, skippedDates) => {
  //   let workingDays = 0;
  //   let currentDate = new Date(startDate);

  //   while (currentDate <= endDate) {
  //     const dayOfWeek = currentDate.getDay();
  //     // Check if the current date is not a weekend, not in the skippedDates array, and not skipped as a weekend
  //     if (
  //       dayOfWeek !== 0 &&
  //       dayOfWeek !== 6 &&
  //       !skippedDates.includes(currentDate) &&
  //       !isDateDisabledThree(currentDate)
  //     ) {
  //       workingDays++;
  //     }
  //     currentDate.setDate(currentDate.getDate() + 1);
  //   }

  //   return workingDays;
  // };

  const handleMinorDateChange = (update) => {
    setClosureDateRange(update);
  };
  const handleMergeClosure2020 = () => {
    const newDates = getDatesInRangeClosure2020();
    const mergedDates = [...selectedDatesClosure2020, ...newDates];

    // Check if '1970/01/01' is present in mergedDates
    if (mergedDates.includes("1970-01-01T00:00:00.000Z")) {
      // Log a message indicating that the date is present
      console.log(
        "Selected dates include '1970/01/01'. Array will not be updated."
      );
      return;
    }

    // Check for overlapping dates before adding new dates
    const overlappingDates = newDates.filter((date) =>
      selectedDatesClosure2020.includes(date)
    );

    if (overlappingDates.length === 0) {
      setSelectedDatesClosure2020(mergedDates);
    } else {
      console.log("Selected dates overlap with existing dates. Merge aborted.");
    }

    setClosureDateRange([null, null]);
  };

  const handleCloseClosureModal = () => {
    setOpenModalClosure(false);
  };

  const getDatesInRangeClosure2020 = () => {
    const dates = [];
    let currentDate = new Date(minor_startdate2020);

    while (currentDate <= minor_enddate2020) {
      if (!isDateDisabledThree(currentDate) && filterWeekends(currentDate)) {
        dates.push(currentDate.toISOString());
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  // const isDateDisabledThree = (date) => {
  //   const personalStartDate2020 = new Date(personal_startdate2020);
  //   const personalEndDate2020 = new Date(personal_enddate2020);
  //   const caredStartDate2020 = new Date(cared_startdate2020);
  //   const caredEndDate2020 = new Date(cared_enddate2020);

  //   // Disable dates within the personal date range
  //   if (date >= personalStartDate2020 && date <= personalEndDate2020) {
  //     return true;
  //   }
  // // Disable weekends
  // if (!filterWeekends(date)) {
  //   return true;
  //   }
  //   // Disable dates within the cared date range
  //   if (date >= caredStartDate2020 && date <= caredEndDate2020) {
  //     return true;
  //   }

  //   // Allow other dates
  //   return false;
  // };
  const isDateDisabledThree = (date) => {
    const startDate = new Date(personal_startdate2020);
    const endDate = new Date(personal_enddate2020);

    // Disable weekends
    if (!filterWeekends(date)) {
      return true;
    }

    // Disable dates within the range or in selectedDatesCared2020 or selectedDates
    return (
      selectedDatesClosure2020.some((selectedDate) =>
        dayjs(date).isSame(selectedDate, "day")
      ) ||
      selectedDates.some((selectedDate) =>
        dayjs(date).isSame(selectedDate, "day")
      ) ||
      selectedDatesCared2020.some((selectedDate) =>
        dayjs(date).isSame(selectedDate, "day")
      )
    );
  };

  // Closure states 2021
  const [closureDateRangeTwo, setClosureDateRangeTwo] = useState([null, null]);
  const [minor_startdate2021, minor_enddate2021] = closureDateRangeTwo;
  const [minordays2021, setMinordays2021] = useState(0);

  const [selectedDatesClosure2021, setSelectedDatesClosure2021] = useState([]);
  const datesFormatClosure2021 = selectedDatesCared2021.map((date) =>
    dayjs(date).format("YYYY-MM-DD")
  );

  const [openModalClosureTwo, setOpenModalClosureTwo] = useState(false);
  const [skippedDatesSix, setSkippedDatesSix] = useState([]); // Add this line

  // Closure date range limits

  const minClosureDateTwo = new Date(2021, 0, 1); // January 1, 2020 (Note: Month is zero-based)
  const maxClosureDateTwo = new Date(2021, 8, 30); // September 30, 2020
  const initialOpenClosureDateTwo = new Date(2021, 0, 1); // January 1, 2020 initially

  const handleMinorDateChangeTwo = (update) => {
    setClosureDateRangeTwo(update);
  };

  const handleMergeClosure2021 = () => {
    const newDates = getDatesInRangeClosure2021();
    const mergedDates = [...selectedDatesClosure2021, ...newDates];

    // Check if '1970/01/01' is present in mergedDates
    if (mergedDates.includes("1970-01-01T00:00:00.000Z")) {
      // Log a message indicating that the date is present
      console.log(
        "Selected dates include '1970/01/01'. Array will not be updated."
      );
      return;
    }

    // Check for overlapping dates before adding new dates
    const overlappingDates = newDates.filter((date) =>
      selectedDatesClosure2021.includes(date)
    );

    if (overlappingDates.length === 0) {
      setSelectedDatesClosure2021(mergedDates);
    } else {
      console.log("Selected dates overlap with existing dates. Merge aborted.");
    }

    setClosureDateRangeTwo([null, null]);
  };

  const handleCloseClosureModalTwo = () => {
    setOpenModalClosureTwo(false);
  };

  const getDatesInRangeClosure2021 = () => {
    const dates = [];
    let currentDate = new Date(minor_startdate2021);

    while (currentDate <= minor_enddate2021) {
      if (!isDateDisabledFour(currentDate) && filterWeekends(currentDate)) {
        dates.push(currentDate.toISOString());
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const isDateDisabledFour = (date) => {
    const startDate = new Date(personal_startdate2020);
    const endDate = new Date(personal_enddate2020);

    // Disable weekends
    if (!filterWeekends(date)) {
      return true;
    }

    // Disable dates within the range or in selectedDatesCared2020 or selectedDates
    return (
      selectedDatesClosure2021.some((selectedDate) =>
        dayjs(date).isSame(selectedDate, "day")
      ) ||
      selectedDatesTwo.some((selectedDate) =>
        dayjs(date).isSame(selectedDate, "day")
      ) ||
      selectedDatesCared2021.some((selectedDate) =>
        dayjs(date).isSame(selectedDate, "day")
      )
    );
  };

  const [activeStep, setActiveStep] = useState(0);

  const [finalCreditAmountStorage, setFinalCreditAmountStorage] =
    useState(null);

  const [uploadCompleteTimes, setUploadCompleteTimes] = useState({
    // driving_licence: null,
    schedule_pdf: null,
    Tax_Return_2020: null,
    Tax_Return_2021: null,
    supplemental_attachment_2020: null,
    supplemental_attachment_2021: null,
    FormA1099: null,
    FormB1099: null,
    ks2020: null,
    ks22020: null,
  });

  const [finalIncomeValue, setFinalIncomeValue] = useState(null);

  console.log(finalIncomeValue, "finalIcomeValue");
  const [activeErrorQualifyOne, setActiveErrorQualifyOne] = useState(false);
  const [activeErrorQualifyTwoo, setActiveErrorQualifyTwoo] = useState(false);
  const [activeErrorStep16, setActiveErrorStep16] = useState(false);

  const [activeErrorQualifyTen, setActiveErrorQualifyTen] = useState(false);
  const [activeErrorQualifyThree, setActiveErrorQualifyThree] = useState(false);
  const [
    activeErrorDidRecieveUnemployement,
    setActiveErrorDidRecieveUnemployement,
  ] = useState(false);

  const [activeErrorQualifyFive, setActiveErrorQualifyFive] = useState(false);
  const [activeErrorQualifySix, setActiveErrorQualifySix] = useState(false);
  const [activeErrorQualify17, setActiveErrorQualify17] = useState(false);

  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [userData, setUserData] = useState();
  const [selectedFiles, setSelectedFiles] = useState({
    // driving_licence: [],
    schedule_pdf: [],
    Tax_Return_2020: [],
    Tax_Return_2021: [],
    supplemental_attachment_2020: [],
    supplemental_attachment_2021: [],
    FormA1099: [],
    FormB1099: [],
    ks2020: [],
    ks22020: [],
  });

  const [uploadProgress, setUploadProgress] = useState({
    // driving_licence: 0,
    schedule_pdf: 0,
    Tax_Return_2020: 0,
    Tax_Return_2021: 0,
    supplemental_attachment_2020: 0,
    supplemental_attachment_2021: 0,
    FormA1099: 0,
    FormB1099: 0,
    ks2020: 0,
    ks22020: 0,
  });

  const [uploadingFile, setUploadingFile] = useState("");

  const [addingFileType, setAddingFileType] = useState(null);

  const width = 800; // Set your desired width here
  const height = 600; // Set your desired height here
  const [showRemoveButton, setShowRemoveButton] = useState(true);

  const handleAddFileClick = (type) => {
    setAddingFileType(type);
  };

  const confettiStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    pointerEvents: "none",
  };

  const boxStyle = {
    position: "relative",
    width: "100%",
    maxWidth: "1500px",
    boxShadow: "0 0 5px 5px rgb(60 125 147 / 30%)",
    borderRadius: "8px",
    margin: "0 auto",
    padding: "90px 20px",
    display: "block",
  };
  const boxSttyle = {
    position: "relative",
    width: "100%",
    maxWidth: "1500px",
    // boxShadow: '0 0 1px 1px rgb(60 125 147 / 30%)',
    borderRadius: "8px",
    margin: "0 auto",
    padding: "189px 20px",
    display: "block",
  };

  const mobileBoxStyle = {
    width: "100%",
    maxWidth: "none",
    display: "none",
    padding: "30px 20px",
  };

  // Media query for mobile screens
  const mediaQuery = "@media (max-width: 768px)";

  const styles = {
    [mediaQuery]: {
      ".desktop-box": {
        display: "block",
      },
      ".mobile-box": {
        display: "none",
      },
    },
  };

  const handleRemoveInput = () => {
    setAddingFileType(null);
  };

  const handleGo = () => {
    history.push("/status");
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const handleFileChange = (inputName, event) => {
    const selectedFiles = event.target.files;
    const fileNames = Array.from(selectedFiles).map((file) => file.name); // Extract file names

    setSelectedFiles((prevSelectedFiles) => ({
      ...prevSelectedFiles,
      [inputName]: selectedFiles, // Assign an array of files
    }));

    const formData = new FormData(); // Create a new FormData object

    // Append all selected files for the inputName
    for (const file of selectedFiles) {
      formData.append(inputName, file);
    }

    // Call the upload function with the prepared formData
    uploadFile(formData, inputName, fileNames);
  };

  // Function to upload the file

  const handleCheckboxChange = (event) => {
    setCheckboxChecked(event.target.checked);
  };

  const allFilesSelected = () => {
    return (
      // selectedFiles?.driving_licence?.length > 0 &&
      selectedFiles?.schedule_pdf?.length > 0 &&
      selectedFiles?.Tax_Return_2020?.length > 0 &&
      selectedFiles?.Tax_Return_2021?.length > 0
    );
  };

  const allFilesSelectedAdditional = () => {
    return (
      // selectedFiles?.driving_licence?.length > 0 &&
      selectedFiles?.schedule_pdf?.length > 0 &&
      selectedFiles?.Tax_Return_2020?.length > 0 &&
      selectedFiles?.Tax_Return_2021?.length > 0 &&
      selectedFiles?.supplemental_attachment_2020?.length > 0 &&
      selectedFiles?.supplemental_attachment_2021?.length > 0 &&
      selectedFiles?.FormA1099?.length > 0 &&
      selectedFiles?.FormB1099?.length > 0 &&
      selectedFiles?.ks2020?.length > 0 &&
      selectedFiles?.ks22020?.length > 0
    );
  };

  const shouldDisableButtons = () => {
    return !(checkboxChecked && allFilesSelected());
  };

  const shouldDisableButtonsAdditional = () => {
    return !(checkboxChecked && allFilesSelectedAdditional());
  };

  const shouldDisableButtonLater = () => {
    return !checkboxChecked;
  };

  useEffect(() => {
    // Fetch final_roundedValue from local storage when the component mounts
    const storedFinalCreditAmount = localStorage.getItem("final_roundedValue");
    if (storedFinalCreditAmount) {
      setFinalCreditAmountStorage(storedFinalCreditAmount);
    }
  }, []);

  const handleSubmitLater = async () => {
    const token = localStorage.getItem("token");

    try {
      setLoading(true); // Set loading to true to display the loader

      const response = await axios.put(
        "https://app.setczone.com/api/user/updateApplication",
        {}, // You might need to pass data here if required by the API
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Change content type if not sending multipart/form-data
          },
          onUploadProgress: (progressEvent) => {
            // Update progress for each file
            // Handle progress tracking for multiple files as needed
          },
        }
      );

      console.log(`Files uploaded successfully`, response.data);
      // // await submitHubspotForm();
      // await callFilesCom();

      await fetchUserDataa();
    } catch (error) {
      console.error(`Error uploading files:`, error);
      // Handle error
    } finally {
      setLoading(false); // Hide the loader when the request is completed (either success or failure)
    }
  };

  const handleSubmiDocuments = async () => {
    const token = localStorage.getItem("token");

    try {
      setLoading(true); // Set loading to true to display the loader

      const response = await axios.put(
        "https://app.setczone.com/api/user/updateDocumentStatus",
        {}, // You might need to pass data here if required by the API
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          onUploadProgress: (progressEvent) => {
            // Update progress for each file
            // Handle progress tracking for multiple files as needed
          },
        }
      );

      // // await submitHubspotForm();
      // await callFilesCom();

      console.log(`Files uploaded successfully`, response.data);
      await fetchUserDataa();
      // Handle success response
    } catch (error) {
      console.error(`Error uploading files:`, error);
      // Handle error
    } finally {
      setLoading(false); // Hide the loader when the request is completed (either success or failure)
    }
  };
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.user);

  console.log(token, "selectttttt token");

  const initialFormData = {
    firstName: "",
    lastName: "",
    adGroupDetails: "",
    phone: "",
    email: "",
    bussinessName: "",
    tradeName: "",
    streetAddressOne: "",
    streetAddressTwo: "",
    city: "",
    province: "",
    zipCode: "",
    knowAbout: "",
    accounting_professional: "",
    accounting_partnership: "",
    isChecked: false,

    selfEmployedFrom: "",
    isCheckedStepThree: false,

    scheduleSelfEmployement: "",
    positive_net_earning: "",
    covid_related_issues: "",
    setc_program: "",
    isCheckedStepNine: false,
    mandatory_questions: "",

    netIncome2019: "",
    netIncome2020: "",
    netIncome2021: "",

    bussinessNegatively: "",

    personallySick2020: "",

    personal_startdate2020: "",
    personal_enddate2020: "",
    numberOfDays: "", // Added field for number of days

    personallySick2021: "",

    personal_startdate2021: "",
    personal_enddate2021: "",
    numberOfDays2021: "",

    symptoms2020: "",
    cared_startdate2020: "",
    cared_enddate2020: "",
    symptomsdays2020: "",

    symptoms2021: "",
    cared_startdate2021: "",
    cared_enddate2021: "",
    symptomsdays2021: "",

    closure2020: "",
    minor_startdate2020: "",
    minor_enddate2020: "",
    minordays2020: "",

    closure2021: "",
    minor_startdate2021: "",
    minor_enddate2021: "",
    minordays2021: "",

    employed_as_W2: "",
    family_sick: "",
    amount2020: "",
    amount2021: "",

    did_receive_unemployement20: "",
    did_receive_unemployement21: "",
    care_for_minor_child: "",
    minor_child_tax_20: "",
    minor_child_tax_21: "",

    // Add other form fields here
  };

  const [formData, setFormData] = useState(initialFormData);
  const [emailValidated, setEmailValidated] = useState(false);

  const [taxYears, setTaxYears] = useState([
    { year: 2020, eFiled: false, mailed: false },
    { year: 2021, eFiled: false, mailed: false },
  ]);

  const toggleBackground = (year, option) => {
    setTaxYears((prevTaxYears) =>
      prevTaxYears.map((taxYear) =>
        taxYear.year === year
          ? { ...taxYear, [option]: !taxYear[option] }
          : taxYear
      )
    );
  };

  const updateDatabase = (year, option, isActive) => {
    // Here you can send the values (year, option, isActive) to your server or database
    // For simplicity, we'll just log the values in the console
    console.log(`Year: ${year}, Option: ${option}, isActive: ${isActive}`);
  };

  console.log(formData.symptomsdays2020, "dayssssssssssss");

  const [errors, setErrors] = useState({});

  const handleToken = (token) => {
    localStorage.setItem("token", token);

    dispatch(setToken(token));
  };

  const formDataPreparing = async (step) => {
    try {
      setLoading(true);
      const response = await fetch("https://app.setczone.com/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          step: step,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          email: formData.email,
          business_name: formData.bussinessName,
          employees: formData.employees,
          trade_name: formData.tradeName,
          address_line_1: formData.streetAddressOne,
          city: formData.city, // Add more fields as needed
          state: formData.province,
          address_line_2: formData.streetAddressTwo,
          zip: formData.zipCode,
          know_about_us: formData.knowAbout,
          accounting_professional: formData.accounting_professional,
          accounting_partnership: formData.accounting_partnership,
        }),
      });
      if (response.ok) {
        // alert(selectToken)
        const data = await response.json();
        handleToken(data.user.token);

        console.log(data.user.first_name, data.user.last_name, "hamzawaqas");

        localStorage.setItem("fName", data.user.first_name);
        localStorage.setItem("lName", data.user.last_name);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        // setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        // Handle error
        console.error("Error in API call");
      }
    } catch (error) {
      // Handle network error
      console.error("Network error", error);
    } finally {
      // Reset loading to false after the API call is completed or errored
      setLoading(false);
    }
  };

  const handleVerification = async (step) => {
    try {
      setLoading(true);
      let token = localStorage.getItem("token");

      if (!token) {
        // Handle missing token - Redirect or handle the situation accordingly
        console.error("Token is missing");
        // For example, redirect to the step where the token should be available
        setActiveStep(0); // Redirect to step 0 for token creation
        return;
      }

      const response = await fetch(
        `https://app.setczone.com/api/user/${step}/updateuser`,
        {
          method: "PUT", // Change the method to PUT
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            step: step,
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
            email: formData.email,
            business_name: formData.bussinessName,
            trade_name: formData.tradeName,
            address_line_1: formData.streetAddressOne,
            city: formData.city,
            state: formData.province,
            address_line_2: formData.streetAddressTwo,
            zip: formData.zipCode,
            know_about_us: formData.knowAbout,
            accounting_professional: formData.accounting_professional,
            accounting_partnership: formData.accounting_partnership,

            self_employed_from: formData.selfEmployedFrom,
            net_income_2019: formData.netIncome2019,
            net_income_2020: formData.netIncome2020,
            net_income_2021: formData.netIncome2021,
            business_negatively_impacted: formData.bussinessNegatively,


             personally_sick_symptoms_2020_dates: selectedDates,
            onedays: selectedDates?.length,

            personally_sick_symptoms_2021_dates: selectedDatesTwo,
            twodays: selectedDatesTwo?.length,

            covid_experienced_symptoms_2020_dates: selectedDatesCared2020,
            threedays: selectedDatesCared2020?.length,

            covid_experienced_symptoms_2021_dates: selectedDatesCared2021,
            fourdays: selectedDatesCared2021?.length,

            childs_daycare_2020_dates: selectedDatesClosure2020,
            fivedays: selectedDatesClosure2020?.length,

            childs_daycare_2021_dates: selectedDatesClosure2021,
            sixdays: selectedDatesClosure2021?.length,


            // personal_startdate2020: formData.personal_startdate2020,
            // personal_enddate2020: formData.personal_enddate2020,
            // // onedays: formData.numberOfDays,

            // personal_startdate2021: formData.personal_startdate2021,
            // personal_enddate2021: formData.personal_enddate2021,
            // twodays: formData.numberOfDays2021,

            // cared_startdate2020: formData.cared_startdate2020,
            // cared_enddate2020: formData.cared_enddate2020,
            // threedays: formData.symptomsdays2020,

            // cared_startdate2021: formData.cared_startdate2021,
            // cared_enddate2021: formData.cared_enddate2021,
            // fourdays: formData.symptomsdays2021,

            // minor_startdate2020: formData.minor_startdate2020,
            // minor_enddate2020: formData.minor_enddate2020,
            // fivedays: formData.minordays2020,

            // minor_startdate2021: formData.minor_startdate2021,
            // minor_enddate2021: formData.minor_enddate2021,
            // sixdays: formData.minordays2021,

            employed_as_W2: formData.employed_as_W2,
            Family_Sick_Leave: formData.family_sick,

            amount2020: formData.amount2020,
            amount2021: formData.amount2021,

            your_file_schedule: formData.scheduleSelfEmployement,
            mandatory_questions: formData.mandatory_questions,
            if_you_have_positive_earning: formData.positive_net_earning,
            did_you_miss_SEWDTC: formData.covid_related_issues,
            have_you_filed_already_for_setc: formData.setc_program,
          }),
        }
      );

      if (response.ok) {
        // alert(`success ${step}`);

        const data = await response.json();

        if (data?.user?.approval_status === "approved") {
          // If approval status is "approved," increment the active step
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
          // If approval status is not "approved," proceed with calling the Veriff API
          await callVeriffAPI(token);
        }

        await fetchUserDataa();
      } else {
        // Handle error
        console.error("Error in API call");
      }
    } catch (error) {
      // Handle network error
      console.error("Network error", error);
    } finally {
      // Reset loading to false after the API call is completed or errored
      setLoading(false);
    }
  };

  const callVeriffAPI = (token) => {
    // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
    const apiEndpoint = "https://app.setczone.com/api/user/createSession"; // Replace with your actual API endpoint

    // Replace 'YOUR_BEARER_TOKEN' with the actual Bearer token

    // Set up the headers for the API request
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Make the API call
    fetch(apiEndpoint, {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          console.log("Veriff API Response:", data);

          // Get the verification URL from the response
          const verificationUrl = data.verification.url;

          window.location.href = verificationUrl;
        } else {
          console.error("Veriff API call failed:", data);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const formDataUpdate = async (step) => {
    const formattedStartDate = personal_startdate2020
      ? personal_startdate2020.toLocaleDateString()
      : "";
    const formattedEndDate = personal_enddate2020
      ? personal_enddate2020.toLocaleDateString()
      : "";

    const formattedStartDate2021 = personal_startdate2021
      ? personal_startdate2021.toLocaleDateString()
      : "";
    const formattedEndDate20221 = personal_enddate2021
      ? personal_enddate2021.toLocaleDateString()
      : "";

    const formattedStartDate2020 = cared_startdate2020
      ? cared_startdate2020.toLocaleDateString()
      : "";
    const formattedEndDate2020 = cared_enddate2020
      ? cared_enddate2020.toLocaleDateString()
      : "";

    const formattedStartDaate2021 = cared_startdate2021
      ? cared_startdate2021.toLocaleDateString()
      : "";
    const formattedEndDate2021 = cared_enddate2021
      ? cared_enddate2021.toLocaleDateString()
      : "";

    const formatedClosureStartDaate2020 = minor_startdate2020
      ? minor_startdate2020.toLocaleDateString()
      : "";
    const formatedClosureEndDaate2020 = minor_enddate2020
      ? minor_enddate2020.toLocaleDateString()
      : "";

    const formatedClosureStartDaate2021 = minor_startdate2021
      ? minor_startdate2021.toLocaleDateString()
      : "";
    const formatedClosureEndDaate2021 = minor_enddate2021
      ? minor_enddate2021.toLocaleDateString()
      : "";

    try {
      setLoading(true);
      let token = localStorage.getItem("token");

      if (!token) {
        // Handle missing token - Redirect or handle the situation accordingly
        console.error("Token is missing");
        // For example, redirect to the step where the token should be available
        setActiveStep(0); // Redirect to step 0 for token creation
        return;
      }

      let stepToSend = step; // Default step value to send

      // if (
      //   formData.care_for_minor_child === "No"  && activeStep === 14 ) {
      //   stepToSend = 18; // Set step to 11 based on conditions
      // }
      // else
      if (formData.minor_child_tax_20 === "No" && activeStep === 14) {
        stepToSend = 16;
      } else if (formData.minor_child_tax_21 === "No" && activeStep === 16) {
        stepToSend = 18;
      } else {
        stepToSend = step;
      }

      const response = await fetch(
        `https://app.setczone.com/api/user/${stepToSend}/updateuser`,
        {
          method: "PUT", // Change the method to PUT
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            step: stepToSend,

            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
            email: formData.email,
            business_name: formData.bussinessName,
            trade_name: formData.tradeName,
            address_line_1: formData.streetAddressOne,
            city: formData.city,
            state: formData.province,
            address_line_2: formData.streetAddressTwo,
            zip: formData.zipCode,
            know_about_us: formData.knowAbout,
            self_employed_from: formData.selfEmployedFrom,
            net_income_2019: formData.netIncome2019,
            net_income_2020: formData.netIncome2020,
            net_income_2021: formData.netIncome2021,
            business_negatively_impacted: formData.bussinessNegatively,

            // personal_startdate2020: formattedStartDate,
            // personal_enddate2020: formattedEndDate,
            // onedays: numberOffDays,

            // personal_startdate2021: formattedStartDate2021,
            // personal_enddate2021: formattedEndDate20221,
            // twodays: numberOffDaysTwo,

            // cared_startdate2020: formattedStartDate2020,
            // cared_enddate2020: formattedEndDate2020,
            // threedays: symptomsDays,

            // // cared_startdate2021: formData.cared_startdate2021,
            // // cared_enddate2021: formData.cared_enddate2021,
            // // fourdays: formData.symptomsdays2021,

            // cared_startdate2021: formattedStartDaate2021,
            // cared_enddate2021: formattedEndDate2021,
            // fourdays: symptomsDaysTwo,

            // // minor_startdate2020: formData.minor_startdate2020,
            // // minor_enddate2020: formData.minor_enddate2020,
            // // fivedays: formData.minordays2020,

            // minor_startdate2020: formatedClosureStartDaate2020,
            // minor_enddate2020: formatedClosureEndDaate2020,
            // fivedays: minordays2020,

            // // minor_startdate2021: formData.minor_startdate2021,
            // // minor_enddate2021: formData.minor_enddate2021,
            // // sixdays: formData.minordays2021,

            // minor_startdate2021: formatedClosureStartDaate2021,
            // minor_enddate2021: formatedClosureEndDaate2021,
            // sixdays: minordays2021,

            personally_sick_symptoms_2020: formData.personallySick2020,
            personally_sick_symptoms_2021: formData.personallySick2021,
            covid_experienced_symptoms_2020: formData.symptoms2020,
            covid_experienced_symptoms_2021: formData.symptoms2021,
            childs_daycare_2020: formData.closure2020,
            childs_daycare_2021: formData.closure2021,

            employed_as_W2: formData.employed_as_W2,
            Family_Sick_Leave: formData.family_sick,

            amount2020: formData.amount2020,
            amount2021: formData.amount2021,

            your_file_schedule: formData.scheduleSelfEmployement,
            mandatory_questions: formData.mandatory_questions,
            if_you_have_positive_earning: formData.positive_net_earning,
            did_you_miss_SEWDTC: formData.covid_related_issues,
            have_you_filed_already_for_setc: formData.setc_program,

            did_receive_unemployement20: formData.did_receive_unemployement20,
            did_receive_unemployement21: formData.did_receive_unemployement21,
            // care_for_minor_child: formData.care_for_minor_child,
            minor_child_tax_20: formData.minor_child_tax_20,
            minor_child_tax_21: formData.minor_child_tax_21,

            E_File_My_texes_2020: taxYears[0].eFiled,
            Mail_My_texes_2020: taxYears[0].mailed,
            E_File_My_texes_2021: taxYears[1].eFiled,
            Mail_My_texes_2021: taxYears[1].mailed,
          }),
        }
      );

      if (response.ok) {
        // alert(`success ${step}`);
        const data = await response.json();

        console.log(data);
        await fetchUserDataa();

        // setActiveStep((prevActiveStep) => prevActiveStep + 1);

        // if (formData.care_for_minor_child === "No"  && activeStep === 14 )
        // {
        //   setActiveStep(18);
        // } else
        if (formData.minor_child_tax_20 === "No" && activeStep === 14) {
          setActiveStep(16);
        } else if (formData.minor_child_tax_21 === "No" && activeStep === 16) {
          setActiveStep(18);
        } else {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      } else {
        // Handle error
        console.error("Error in API call");
        const errorData = await response.json();

        if (
          errorData.errMessage === "Authorization token invalid" &&
          errorData.details.name === "TokenExpiredError"
        ) {
          dispatch(removeToken());

          localStorage.removeItem("activeTab");
          localStorage.removeItem("isModalOpened");
          history.push("/login");
          alert("Your session expired, please login again. Thanks");
          setTimeout(() => {
            window.location.reload();
          }, 200);
          // Token is invalid or expired, remove it from local storage and navigate to /login
          // localStorage.removeItem('yourAuthTokenKey'); // Replace 'yourAuthTokenKey' with the actual key used to store the token
          // You can use your preferred navigation method, e.g., react-router-dom or window.location
          // Example using react-router-dom:
          // history.push('/login'); // Assuming history is available, you may need to pass it as a parameter
        } else {
          // Handle other types of errors
          console.error("Unhandled error:", errorData);
        }
      }
    } catch (error) {
      // Handle network error
      console.error("Network error", error);
    } finally {
      // Reset loading to false after the API call is completed or errored
      setLoading(false);
    }
  };
  const formDataUpdateWithoutLoader = async (step) => {
    const formattedStartDate = personal_startdate2020
      ? personal_startdate2020.toLocaleDateString()
      : "";
    const formattedEndDate = personal_enddate2020
      ? personal_enddate2020.toLocaleDateString()
      : "";

    const formattedStartDate2021 = personal_startdate2021
      ? personal_startdate2021.toLocaleDateString()
      : "";
    const formattedEndDate20221 = personal_enddate2021
      ? personal_enddate2021.toLocaleDateString()
      : "";

    const formattedStartDate2020 = cared_startdate2020
      ? cared_startdate2020.toLocaleDateString()
      : "";
    const formattedEndDate2020 = cared_enddate2020
      ? cared_enddate2020.toLocaleDateString()
      : "";

    const formattedStartDaate2021 = cared_startdate2021
      ? cared_startdate2021.toLocaleDateString()
      : "";
    const formattedEndDate2021 = cared_enddate2021
      ? cared_enddate2021.toLocaleDateString()
      : "";

    const formatedClosureStartDaate2020 = minor_startdate2020
      ? minor_startdate2020.toLocaleDateString()
      : "";
    const formatedClosureEndDaate2020 = minor_enddate2020
      ? minor_enddate2020.toLocaleDateString()
      : "";

    const formatedClosureStartDaate2021 = minor_startdate2021
      ? minor_startdate2021.toLocaleDateString()
      : "";
    const formatedClosureEndDaate2021 = minor_enddate2021
      ? minor_enddate2021.toLocaleDateString()
      : "";

    try {
      let token = localStorage.getItem("token");

      if (!token) {
        // Handle missing token - Redirect or handle the situation accordingly
        console.error("Token is missing");
        // For example, redirect to the step where the token should be available
        setActiveStep(0); // Redirect to step 0 for token creation
        return;
      }

      let stepToSend = step; // Default step value to send

      // if (
      //   formData.care_for_minor_child === "No"  && activeStep === 14 ) {
      //   stepToSend = 18; // Set step to 11 based on conditions
      // }
      // else
      if ((formData.minor_child_tax_20 === "No" && activeStep === 14 && formData.did_receive_unemployement21 === "Yes") || (formData.minor_child_tax_21 === "No" && activeStep === 16)) {
        stepToSend = 18;
      } else if (formData.minor_child_tax_20 === "No" && activeStep === 14) {
        stepToSend = 16;
      } else {
        stepToSend = step;
      }

      const response = await fetch(
        `https://app.setczone.com/api/user/${stepToSend}/updateuser`,
        {
          method: "PUT", // Change the method to PUT
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            step: stepToSend,
            // first_name: formData.firstName,
            // last_name: formData.lastName,
            // phone: formData.phone,
            // email: formData.email,
            // business_name: formData.bussinessName,
            // employees: formData.employees,
            // trade_name: formData.tradeName,
            // address_line_1: formData.streetAddressOne,
            // city: formData.city,
            // state: formData.province,
            // address_line_2: formData.streetAddressTwo,
            // zip: formData.zipCode,
            // know_about_us: formData.knowAbout,
            // accounting_professional: formData.accounting_professional,
            // accounting_partnership: formData.accounting_partnership,

            // self_employed_from: formData.selfEmployedFrom,
            // net_income_2019: formData.netIncome2019,
            // net_income_2020: formData.netIncome2020,
            // net_income_2021: formData.netIncome2021,
            // business_negatively_impacted: formData.bussinessNegatively,

            // personal_startdate2020: formData.personal_startdate2020,
            // personal_enddate2020: formData.personal_enddate2020,
            // onedays: formData.numberOfDays,

            // personal_startdate2021: formData.personal_startdate2021,
            // personal_enddate2021: formData.personal_enddate2021,
            // twodays: formData.numberOfDays2021,

            // cared_startdate2020: formData.cared_startdate2020,
            // cared_enddate2020: formData.cared_enddate2020,
            // threedays: formData.symptomsdays2020,

            // cared_startdate2021: formData.cared_startdate2021,
            // cared_enddate2021: formData.cared_enddate2021,
            // fourdays: formData.symptomsdays2021,

            // minor_startdate2020: formData.minor_startdate2020,
            // minor_enddate2020: formData.minor_enddate2020,
            // fivedays: formData.minordays2020,

            // minor_startdate2021: formData.minor_startdate2021,
            // minor_enddate2021: formData.minor_enddate2021,
            // sixdays: formData.minordays2021,

            // employed_as_W2: formData.employed_as_W2,
            // Family_Sick_Leave: formData.family_sick,

            // amount2020: formData.amount2020,
            // amount2021: formData.amount2021,

            // your_file_schedule: formData.scheduleSelfEmployement,
            // mandatory_questions: formData.mandatory_questions,
            // if_you_have_positive_earning: formData.positive_net_earning,
            // did_you_miss_SEWDTC: formData.covid_related_issues,
            // have_you_filed_already_for_setc: formData.setc_program,

            // did_receive_unemployement20: formData.did_receive_unemployement20,
            // did_receive_unemployement21: formData.did_receive_unemployement21,
            // care_for_minor_child: formData.care_for_minor_child,
            // minor_child_tax_20: formData.minor_child_tax_20,
            // minor_child_tax_21: formData.minor_child_tax_21
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
            email: formData.email,
            business_name: formData.bussinessName,
            trade_name: formData.tradeName,
            address_line_1: formData.streetAddressOne,
            city: formData.city,
            state: formData.province,
            address_line_2: formData.streetAddressTwo,
            zip: formData.zipCode,
            know_about_us: formData.knowAbout,
            self_employed_from: formData.selfEmployedFrom,
            net_income_2019: formData.netIncome2019,
            net_income_2020: formData.netIncome2020,
            net_income_2021: formData.netIncome2021,
            business_negatively_impacted: formData.bussinessNegatively,


            personally_sick_symptoms_2020_dates: selectedDates,
            onedays: selectedDates?.length,

            personally_sick_symptoms_2021_dates: selectedDatesTwo,
            twodays: selectedDatesTwo?.length,

            covid_experienced_symptoms_2020_dates: selectedDatesCared2020,
            threedays: selectedDatesCared2020?.length,

            covid_experienced_symptoms_2021_dates: selectedDatesCared2021,
            fourdays: selectedDatesCared2021?.length,

            childs_daycare_2020_dates: selectedDatesClosure2020,
            fivedays: selectedDatesClosure2020?.length,

            childs_daycare_2021_dates: selectedDatesClosure2021,
            sixdays: selectedDatesClosure2021?.length,
            // personal_startdate2020: formData.personal_startdate2020,
            // personal_enddate2020: formData.personal_enddate2020,
            // onedays: formData.numberOfDays,

            // personal_startdate2020: formattedStartDate,
            // personal_enddate2020: formattedEndDate,
            // onedays: numberOffDays,

            // personal_startdate2021: formData.personal_startdate2021,
            // personal_enddate2021: formData.personal_enddate2021,
            // twodays: formData.numberOfDays2021,

            // personal_startdate2021: formattedStartDate2021,
            // personal_enddate2021: formattedEndDate20221,
            // twodays: numberOffDaysTwo,

            // cared_startdate2020: formData.cared_startdate2020,
            // cared_enddate2020: formData.cared_enddate2020,
            // threedays: formData.symptomsdays2020,

            // cared_startdate2020: formattedStartDate2020,
            // cared_enddate2020: formattedEndDate2020,
            // threedays: symptomsDays,

            // cared_startdate2021: formData.cared_startdate2021,
            // cared_enddate2021: formData.cared_enddate2021,
            // fourdays: formData.symptomsdays2021,

            // cared_startdate2021: formattedStartDaate2021,
            // cared_enddate2021: formattedEndDate2021,
            // fourdays: symptomsDaysTwo,

            // minor_startdate2020: formData.minor_startdate2020,
            // minor_enddate2020: formData.minor_enddate2020,
            // fivedays: formData.minordays2020,

            // minor_startdate2020: formatedClosureStartDaate2020,
            // minor_enddate2020: formatedClosureEndDaate2020,
            // fivedays: minordays2020,

            // minor_startdate2021: formData.minor_startdate2021,
            // minor_enddate2021: formData.minor_enddate2021,
            // sixdays: formData.minordays2021,

            // minor_startdate2021: formatedClosureStartDaate2021,
            // minor_enddate2021: formatedClosureEndDaate2021,
            // sixdays: minordays2021,

            personally_sick_symptoms_2020: formData.personallySick2020,
            personally_sick_symptoms_2021: formData.personallySick2021,
            covid_experienced_symptoms_2020: formData.symptoms2020,
            covid_experienced_symptoms_2021: formData.symptoms2021,
            childs_daycare_2020: formData.closure2020,
            childs_daycare_2021: formData.closure2021,

            employed_as_W2: formData.employed_as_W2,
            Family_Sick_Leave: formData.family_sick,

            amount2020: formData.amount2020,
            amount2021: formData.amount2021,

            your_file_schedule: formData.scheduleSelfEmployement,
            mandatory_questions: formData.mandatory_questions,
            if_you_have_positive_earning: formData.positive_net_earning,
            did_you_miss_SEWDTC: formData.covid_related_issues,
            have_you_filed_already_for_setc: formData.setc_program,

            did_receive_unemployement20: formData.did_receive_unemployement20,
            did_receive_unemployement21: formData.did_receive_unemployement21,
            // care_for_minor_child: formData.care_for_minor_child,
            minor_child_tax_20: formData.minor_child_tax_20,
            minor_child_tax_21: formData.minor_child_tax_21,

            E_File_My_texes_2020: taxYears[0].eFiled,
            Mail_My_texes_2020: taxYears[0].mailed,
            E_File_My_texes_2021: taxYears[1].eFiled,
            Mail_My_texes_2021: taxYears[1].mailed,
          }),
        }
      );

      if (response.ok) {
        // alert(`success ${step}`);
        const data = await response.json();

        console.log(data);
        await fetchUserDataa();

        // setActiveStep((prevActiveStep) => prevActiveStep + 1);

        // if (formData.care_for_minor_child === "No"  && activeStep === 14 )
        // {
        //   setActiveStep(18);
        // } else

        // if (formData.minor_child_tax_20 === "No" && activeStep === 14) {
        //   setActiveStep(16);
        // } else if (formData.minor_child_tax_21 === "No" && activeStep === 16) {
        //   setActiveStep(18);
        // } else {
        //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
        // }

        if ((formData.minor_child_tax_20 === "No" && activeStep === 14 && formData.did_receive_unemployement21 === "Yes") || (formData.minor_child_tax_21 === "No" && activeStep === 16)) {
          setActiveStep(18);
        } else if (formData.minor_child_tax_20 === "No" && activeStep === 14) {
          setActiveStep(16);
        } else {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      } else {
        // Handle error
        console.error("Error in API call");
        const errorData = await response.json();

        if (
          errorData.errMessage === "Authorization token invalid" &&
          errorData.details.name === "TokenExpiredError"
        ) {
          dispatch(removeToken());

          localStorage.removeItem("activeTab");
          localStorage.removeItem("isModalOpened");
          history.push("/login");
          alert("Your session expired, please login again. Thanks");
          setTimeout(() => {
            window.location.reload();
          }, 200);
          // Token is invalid or expired, remove it from local storage and navigate to /login
          // localStorage.removeItem('yourAuthTokenKey'); // Replace 'yourAuthTokenKey' with the actual key used to store the token
          // You can use your preferred navigation method, e.g., react-router-dom or window.location
          // Example using react-router-dom:
          // history.push('/login'); // Assuming history is available, you may need to pass it as a parameter
        } else {
          // Handle other types of errors
          console.error("Unhandled error:", errorData);
        }
      }
    } catch (error) {
      // Handle network error
      console.error("Network error", error);
    }
  };

  const formDataConfirmation = async (step) => {
    try {
      setLoading(true);
      let token = localStorage.getItem("token");

      if (!token) {
        // Handle missing token - Redirect or handle the situation accordingly
        console.error("Token is missing");
        // For example, redirect to the step where the token should be available
        setActiveStep(0); // Redirect to step 0 for token creation
        return;
      }

      const response = await fetch(
        `https://app.setczone.com/api/user/${step}/updateuser`,
        {
          method: "PUT", // Change the method to PUT
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            step: step,
            first_name: userData?.verified_first,
            last_name: userData?.verified_last,
            phone: formData.phone,
            email: formData.email,
            business_name: formData.bussinessName,
            trade_name: formData.tradeName,
            address_line_1: formData.streetAddressOne,
            city: formData.city,
            state: formData.province,
            address_line_2: formData.streetAddressTwo,
            zip: formData.zipCode,
            know_about_us: formData.knowAbout,
            accounting_professional: formData.accounting_professional,
            accounting_partnership: formData.accounting_partnership,

            self_employed_from: formData.selfEmployedFrom,
            net_income_2019: formData.netIncome2019,
            net_income_2020: formData.netIncome2020,
            net_income_2021: formData.netIncome2021,
            business_negatively_impacted: formData.bussinessNegatively,
            personally_sick_symptoms_2020_dates: selectedDates,
            onedays: selectedDates?.length,

            personally_sick_symptoms_2021_dates: selectedDatesTwo,
            twodays: selectedDatesTwo?.length,

            covid_experienced_symptoms_2020_dates: selectedDatesCared2020,
            threedays: selectedDatesCared2020?.length,

            covid_experienced_symptoms_2021_dates: selectedDatesCared2021,
            fourdays: selectedDatesCared2021?.length,

            childs_daycare_2020_dates: selectedDatesClosure2020,
            fivedays: selectedDatesClosure2020?.length,

            childs_daycare_2021_dates: selectedDatesClosure2021,
            sixdays: selectedDatesClosure2021?.length,


            // personal_startdate2020: formData.personal_startdate2020,
            // personal_enddate2020: formData.personal_enddate2020,
            // onedays: formData.numberOfDays,

            // personal_startdate2021: formData.personal_startdate2021,
            // personal_enddate2021: formData.personal_enddate2021,
            // twodays: formData.numberOfDays2021,

            // cared_startdate2020: formData.cared_startdate2020,
            // cared_enddate2020: formData.cared_enddate2020,
            // threedays: formData.symptomsdays2020,

            // cared_startdate2021: formData.cared_startdate2021,
            // cared_enddate2021: formData.cared_enddate2021,
            // fourdays: formData.symptomsdays2021,

            // minor_startdate2020: formData.minor_startdate2020,
            // minor_enddate2020: formData.minor_enddate2020,
            // fivedays: formData.minordays2020,

            // minor_startdate2021: formData.minor_startdate2021,
            // minor_enddate2021: formData.minor_enddate2021,
            // sixdays: formData.minordays2021,

            employed_as_W2: formData.employed_as_W2,
            Family_Sick_Leave: formData.family_sick,

            amount2020: formData.amount2020,
            amount2021: formData.amount2021,

            your_file_schedule: formData.scheduleSelfEmployement,
            mandatory_questions: formData.mandatory_questions,
            if_you_have_positive_earning: formData.positive_net_earning,
            did_you_miss_SEWDTC: formData.covid_related_issues,
            have_you_filed_already_for_setc: formData.setc_program,
          }),
        }
      );

      if (response.ok) {
        // alert(`success ${step}`);
        const data = await response.json();
        // console.log(data.user.first_name, data.user.last_name, "hamzawaqas");

        localStorage.setItem("fName", data?.user?.first_name);
        localStorage.setItem("lName", data?.user?.last_name);
        console.log(data);
        await fetchUserDataa();
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        // Handle error
        console.error("Error in API call");
      }
    } catch (error) {
      // Handle network error
      console.error("Network error", error);
    } finally {
      // Reset loading to false after the API call is completed or errored
      setLoading(false);
    }
  };

  const formDataUpdateCalculation = async (step) => {
    const formattedStartDate = personal_startdate2020
      ? personal_startdate2020.toLocaleDateString()
      : "";
    const formattedEndDate = personal_enddate2020
      ? personal_enddate2020.toLocaleDateString()
      : "";

    const formattedStartDate2021 = personal_startdate2021
      ? personal_startdate2021.toLocaleDateString()
      : "";
    const formattedEndDate20221 = personal_enddate2021
      ? personal_enddate2021.toLocaleDateString()
      : "";

    const formattedStartDate2020 = cared_startdate2020
      ? cared_startdate2020.toLocaleDateString()
      : "";
    const formattedEndDate2020 = cared_enddate2020
      ? cared_enddate2020.toLocaleDateString()
      : "";

    const formattedStartDaate2021 = cared_startdate2021
      ? cared_startdate2021.toLocaleDateString()
      : "";
    const formattedEndDate2021 = cared_enddate2021
      ? cared_enddate2021.toLocaleDateString()
      : "";

    const formatedClosureStartDaate2020 = minor_startdate2020
      ? minor_startdate2020.toLocaleDateString()
      : "";
    const formatedClosureEndDaate2020 = minor_enddate2020
      ? minor_enddate2020.toLocaleDateString()
      : "";

    const formatedClosureStartDaate2021 = minor_startdate2021
      ? minor_startdate2021.toLocaleDateString()
      : "";
    const formatedClosureEndDaate2021 = minor_enddate2021
      ? minor_enddate2021.toLocaleDateString()
      : "";

    try {
      setLoading(true);
      let token = localStorage.getItem("token");

      if (!token) {
        // Handle missing token - Redirect or handle the situation accordingly
        console.error("Token is missing");
        // For example, redirect to the step where the token should be available
        setActiveStep(0); // Redirect to step 0 for token creation
        return;
      }
      // let stepToSend = step; // Default step value to send

      // if (
      //   formData.personallySick2020 === "Yes" &&
      //   numberOffDays === 10 &&
      //   activeStep === 9
      // ) {
      //   stepToSend = 11; // Set step to 11 based on conditions
      // }
      // if (
      //   formData.personallySick2021 === "Yes" &&
      //   numberOffDaysTwo === 10 &&
      //   activeStep === 9
      // ) {
      //   stepToSend = 12; // Set step to 13 based on conditions
      // }

      const response = await fetch(
        `https://app.setczone.com/api/user/${step}/updateuser`,
        {
          method: "PUT", // Change the method to PUT
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            step: step,

            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
            email: formData.email,
            business_name: formData.bussinessName,
            trade_name: formData.tradeName,
            address_line_1: formData.streetAddressOne,
            city: formData.city,
            state: formData.province,
            address_line_2: formData.streetAddressTwo,
            zip: formData.zipCode,
            know_about_us: formData.knowAbout,
            self_employed_from: formData.selfEmployedFrom,
            net_income_2019: formData.netIncome2019,
            net_income_2020: formData.netIncome2020,
            net_income_2021: formData.netIncome2021,
            business_negatively_impacted: formData.bussinessNegatively,

            // personal_startdate2020: formData.personal_startdate2020,
            // personal_enddate2020: formData.personal_enddate2020,
            // onedays: formData.numberOfDays,
            personal_startdate2020: formattedStartDate,
            personal_enddate2020: formattedEndDate,
            onedays: numberOffDays,

            // personal_startdate2021: formData.personal_startdate2021,
            // personal_enddate2021: formData.personal_enddate2021,
            // twodays: formData.numberOfDays2021,

            personal_startdate2021: formattedStartDate2021,
            personal_enddate2021: formattedEndDate20221,
            twodays: numberOffDaysTwo,

            // cared_startdate2020: formData.cared_startdate2020,
            // cared_enddate2020: formData.cared_enddate2020,
            // threedays: formData.symptomsdays2020,

            cared_startdate2020: formattedStartDate2020,
            cared_enddate2020: formattedEndDate2020,
            threedays: symptomsDays,

            // cared_startdate2021: formData.cared_startdate2021,
            // cared_enddate2021: formData.cared_enddate2021,
            // fourdays: formData.symptomsdays2021,

            cared_startdate2021: formattedStartDaate2021,
            cared_enddate2021: formattedEndDate2021,
            fourdays: symptomsDaysTwo,

            // minor_startdate2020: formData.minor_startdate2020,
            // minor_enddate2020: formData.minor_enddate2020,
            // fivedays: formData.minordays2020,

            minor_startdate2020: formatedClosureStartDaate2020,
            minor_enddate2020: formatedClosureEndDaate2020,
            fivedays: minordays2020,

            // minor_startdate2021: formData.minor_startdate2021,
            // minor_enddate2021: formData.minor_enddate2021,
            // sixdays: formData.minordays2021,

            minor_startdate2021: formatedClosureStartDaate2021,
            minor_enddate2021: formatedClosureEndDaate2021,
            sixdays: minordays2021,

            personally_sick_symptoms_2020: formData.personallySick2020,
            personally_sick_symptoms_2021: formData.personallySick2021,
            covid_experienced_symptoms_2020: formData.symptoms2020,
            covid_experienced_symptoms_2021: formData.symptoms2021,
            childs_daycare_2020: formData.closure2020,
            childs_daycare_2021: formData.closure2021,

            employed_as_W2: formData.employed_as_W2,
            Family_Sick_Leave: formData.family_sick,

            amount2020: formData.amount2020,
            amount2021: formData.amount2021,

            your_file_schedule: formData.scheduleSelfEmployement,
            mandatory_questions: formData.mandatory_questions,
            if_you_have_positive_earning: formData.positive_net_earning,
            did_you_miss_SEWDTC: formData.covid_related_issues,
            have_you_filed_already_for_setc: formData.setc_program,

            E_File_My_texes_2020: taxYears[0].eFiled,
            Mail_My_texes_2020: taxYears[0].mailed,
            E_File_My_texes_2021: taxYears[1].eFiled,
            Mail_My_texes_2021: taxYears[1].mailed,
          }),
        }
      );

      if (response.ok) {
        // alert(`success ${step}`);
        const data = await response.json();

        console.log(data);

        // setActiveStep((prevActiveStep) => prevActiveStep + 1);

        // Call the separate function for calculation API

        await callSetcformData(token, formData);

        // setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        // Handle error
        console.error("Error in API call");
      }
    } catch (error) {
      // Handle network error
      console.error("Network error", error);
    } finally {
      // Reset loading to false after the API call is completed or errored
      setLoading(false);
    }
  };
  const callSetcformData = async (token, formData) => {
    setLoading(true);
    try {
      const response = await fetch("https://app.setczone.com/api/user/setcformData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          net_income_2019: formData.netIncome2019,
          net_income_2020: formData.netIncome2020,
          net_income_2021: formData.netIncome2021,
          "1days": numberOffDays,
          "2days": numberOffDaysTwo,
          "3days": symptomsDays,
          "4days": symptomsDaysTwo,
          "5days": minordays2020,
          "6days": minordays2021,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // if (
        //   formData.personallySick2021 === "Yes" &&
        //   numberOffDaysTwo === 10 &&
        //   activeStep === 9
        // ) {
        //   setActiveStep(12); // Move to step 14 for sick2021
        // } else if (
        //   formData.personallySick2020 === "Yes" &&
        //   numberOffDays === 10 &&
        //   activeStep === 9
        // ) {
        //   setActiveStep(11); // Move to step 13 for sick2020
        // } else {
        //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
        // }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);

        // Check if final_credit_amount is not null and store it in local storage
        if (data.user && data.user.final_roundedValue !== null) {
          setFinalIncomeValue(data.user.final_roundedValue);

          localStorage.setItem(
            "final_roundedValue",
            data.user.final_roundedValue
          );
        }
        await fetchUserDataa();
        // if(activeStep === 16){
        //   await fetchUserDataa();
        // }
      } else {
        console.error("Error in calculation API call");
      }
    } catch (error) {
      console.error("Network error", error);
    } finally {
      // Reset loading to false after the API call is completed or errored
      setLoading(false);
    }
  };
  const formDataUpdateCalculationWithoutLoader = async (step) => {
    const formattedStartDate = personal_startdate2020
      ? personal_startdate2020.toLocaleDateString()
      : "";
    const formattedEndDate = personal_enddate2020
      ? personal_enddate2020.toLocaleDateString()
      : "";

    const formattedStartDate2021 = personal_startdate2021
      ? personal_startdate2021.toLocaleDateString()
      : "";
    const formattedEndDate20221 = personal_enddate2021
      ? personal_enddate2021.toLocaleDateString()
      : "";

    const formattedStartDate2020 = cared_startdate2020
      ? cared_startdate2020.toLocaleDateString()
      : "";
    const formattedEndDate2020 = cared_enddate2020
      ? cared_enddate2020.toLocaleDateString()
      : "";

    const formattedStartDaate2021 = cared_startdate2021
      ? cared_startdate2021.toLocaleDateString()
      : "";
    const formattedEndDate2021 = cared_enddate2021
      ? cared_enddate2021.toLocaleDateString()
      : "";

    const formatedClosureStartDaate2020 = minor_startdate2020
      ? minor_startdate2020.toLocaleDateString()
      : "";
    const formatedClosureEndDaate2020 = minor_enddate2020
      ? minor_enddate2020.toLocaleDateString()
      : "";

    const formatedClosureStartDaate2021 = minor_startdate2021
      ? minor_startdate2021.toLocaleDateString()
      : "";
    const formatedClosureEndDaate2021 = minor_enddate2021
      ? minor_enddate2021.toLocaleDateString()
      : "";

    try {
      let token = localStorage.getItem("token");

      if (!token) {
        // Handle missing token - Redirect or handle the situation accordingly
        console.error("Token is missing");
        // For example, redirect to the step where the token should be available
        setActiveStep(0); // Redirect to step 0 for token creation
        return;
      }

      // let stepToSend = step; // Default step value to send

      // if (
      //   formData.did_receive_unemployement20 === "Yes" &&
      //   formData.did_receive_unemployement21 === "No" &&
      //   activeStep === 13
      // ) {
      //   stepToSend = 16;
      // } else if (
      //   formData.did_receive_unemployement21 === "Yes" &&
      //   formData.did_receive_unemployement20 === "No" &&
      //   activeStep === 13
      // ) {
      //   stepToSend = 18;
      // } else {
      //   stepToSend = step;
      // }
      let stepToSend = step;

      const { did_receive_unemployement20, did_receive_unemployement21 } =
      formData;

    // Check the conditions in a more organized way
    if (activeStep === 13) {
      if (did_receive_unemployement20 === "No") {
       
        stepToSend = 14;
      } else if (did_receive_unemployement20 === "Yes") {
       
        stepToSend = 16;
      }
    } else if (activeStep === 15) {
      if (did_receive_unemployement21 === "No") {
        stepToSend = 16
      } else if (did_receive_unemployement21 === "Yes") {
       
        stepToSend = 18
      }
    } else {
      // Default case if none of the specific conditions are met
      stepToSend = step;
    }

      const response = await fetch(
        `https://app.setczone.com/api/user/${stepToSend}/updateuser`,
        {
          method: "PUT", // Change the method to PUT
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            step: stepToSend,

            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
            email: formData.email,
            business_name: formData.bussinessName,
            trade_name: formData.tradeName,
            address_line_1: formData.streetAddressOne,
            city: formData.city,
            state: formData.province,
            address_line_2: formData.streetAddressTwo,
            zip: formData.zipCode,
            know_about_us: formData.knowAbout,
            self_employed_from: formData.selfEmployedFrom,
            net_income_2019: formData.netIncome2019,
            net_income_2020: formData.netIncome2020,
            net_income_2021: formData.netIncome2021,
            business_negatively_impacted: formData.bussinessNegatively,

            personally_sick_symptoms_2020_dates: selectedDates,
            onedays: selectedDates?.length,

            personally_sick_symptoms_2021_dates: selectedDatesTwo,
            twodays: selectedDatesTwo?.length,

            covid_experienced_symptoms_2020_dates: selectedDatesCared2020,
            threedays: selectedDatesCared2020?.length,

            covid_experienced_symptoms_2021_dates: selectedDatesCared2021,
            fourdays: selectedDatesCared2021?.length,

            childs_daycare_2020_dates: selectedDatesClosure2020,
            fivedays: selectedDatesClosure2020?.length,

            childs_daycare_2021_dates: selectedDatesClosure2021,
            sixdays: selectedDatesClosure2021?.length,

            personally_sick_symptoms_2020: formData.personallySick2020,
            personally_sick_symptoms_2021: formData.personallySick2021,
            covid_experienced_symptoms_2020: formData.symptoms2020,
            covid_experienced_symptoms_2021: formData.symptoms2021,
            childs_daycare_2020: formData.closure2020,
            childs_daycare_2021: formData.closure2021,

            employed_as_W2: formData.employed_as_W2,
            Family_Sick_Leave: formData.family_sick,

            amount2020: formData.amount2020,
            amount2021: formData.amount2021,

            your_file_schedule: formData.scheduleSelfEmployement,
            mandatory_questions: formData.mandatory_questions,
            if_you_have_positive_earning: formData.positive_net_earning,
            did_you_miss_SEWDTC: formData.covid_related_issues,
            have_you_filed_already_for_setc: formData.setc_program,

            E_File_My_texes_2020: taxYears[0].eFiled,
            Mail_My_texes_2020: taxYears[0].mailed,
            E_File_My_texes_2021: taxYears[1].eFiled,
            Mail_My_texes_2021: taxYears[1].mailed,
          }),
        }
      );

      if (response.ok) {
        // alert(`success ${step}`);
        const data = await response.json();

        console.log(data);

        // setActiveStep((prevActiveStep) => prevActiveStep + 1);

        // Call the separate function for calculation API

        await callSetcformDataWithoutLoader(token, formData);

        // setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        // Handle error
        console.error("Error in API call");
      }
    } catch (error) {
      // Handle network error
      console.error("Network error", error);
    }
  };

  const callSetcformDataWithoutLoader = async (token, formData) => {
    try {
      const response = await fetch("https://app.setczone.com/api/user/setcformData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          net_income_2019: formData.netIncome2019,
          net_income_2020: formData.netIncome2020,
          net_income_2021: formData.netIncome2021,
          "1days": selectedDates?.length,
          "2days": selectedDatesTwo?.length,
          "3days": selectedDatesCared2020?.length,
          "4days": selectedDatesCared2021?.length,
          "5days": selectedDatesClosure2020?.length,
          "6days": selectedDatesClosure2021?.length,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        const { did_receive_unemployement20, did_receive_unemployement21 } =
          formData;

        // Check the conditions in a more organized way
        if (activeStep === 13) {
          if (did_receive_unemployement20 === "No") {
            setActiveStep(14);
          } else if (did_receive_unemployement20 === "Yes") {
            setActiveStep(16);
          }
        } else if (activeStep === 15) {
          if (did_receive_unemployement21 === "No") {
            setActiveStep(16);
          } else if (did_receive_unemployement21 === "Yes") {
            setActiveStep(18);
          }
        } else {
          // Default case if none of the specific conditions are met
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }

        // setActiveStep((prevActiveStep) => prevActiveStep + 1);

        // Check if final_credit_amount is not null and store it in local storage
        if (data.user && data.user.final_roundedValue !== null) {
          setFinalIncomeValue(data.user.final_roundedValue);

          localStorage.setItem(
            "final_roundedValue",
            data.user.final_roundedValue
          );
        }
        await fetchUserDataa();
        // if(activeStep === 16){
        //   await fetchUserDataa();
        // }
      } else {
        console.error("Error in calculation API call");
      }
    } catch (error) {
      console.error("Network error", error);
    }
  };

  const formDataUpdateStepTwo = async (step) => {
    try {
      let token = localStorage.getItem("token");

      if (!token) {
        // Handle missing token - Redirect or handle the situation accordingly
        console.error("Token is missing");
        // For example, redirect to the step where the token should be available
        setActiveStep(0); // Redirect to step 0 for token creation
        return;
      }

      const response = await fetch(
        `https://app.setczone.com/api/user/${step}/updateuser`,
        {
          method: "PUT", // Change the method to PUT
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
            email: formData.email,
            business_name: formData.bussinessName,
            trade_name: formData.tradeName,
            address_line_1: formData.streetAddressOne,
            city: formData.city,
            state: formData.province,
            address_line_2: formData.streetAddressTwo,
            zip: formData.zipCode,
            know_about_us: formData.knowAbout,
            self_employed_from: formData.selfEmployedFrom,
          }),
        }
      );

      if (response.ok) {
        // alert(`success ${step}`);
        const data = await response.json();
        setActiveStep((prevActiveStep) => prevActiveStep + 1);

        // setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        // Handle error
        console.error("Error in API call");
      }
    } catch (error) {
      // Handle network error
      console.error("Network error", error);
    }
  };
  const formDataUpdateWithoutNextStep = async (step) => {
    try {
      let token = localStorage.getItem("token");

      if (!token) {
        // Handle missing token - Redirect or handle the situation accordingly
        console.error("Token is missing");
        // For example, redirect to the step where the token should be available
        setActiveStep(0); // Redirect to step 0 for token creation
        return;
      }

      const response = await fetch(
        `https://app.setczone.com/api/user/${step}/updateuser`,
        {
          method: "PUT", // Change the method to PUT
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            step: step,
           first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
            email: formData.email,
            business_name: formData.bussinessName,
            trade_name: formData.tradeName,
            address_line_1: formData.streetAddressOne,
            city: formData.city,
            state: formData.province,
            address_line_2: formData.streetAddressTwo,
            zip: formData.zipCode,
            know_about_us: formData.knowAbout,
            self_employed_from: formData.selfEmployedFrom,
            net_income_2019: formData.netIncome2019,
            net_income_2020: formData.netIncome2020,
            net_income_2021: formData.netIncome2021,
            business_negatively_impacted: formData.bussinessNegatively,

            
            personally_sick_symptoms_2020_dates: selectedDates,
            onedays: selectedDates?.length,

            personally_sick_symptoms_2021_dates: selectedDatesTwo,
            twodays: selectedDatesTwo?.length,

            covid_experienced_symptoms_2020_dates: selectedDatesCared2020,
            threedays: selectedDatesCared2020?.length,

            covid_experienced_symptoms_2021_dates: selectedDatesCared2021,
            fourdays: selectedDatesCared2021?.length,

            childs_daycare_2020_dates: selectedDatesClosure2020,
            fivedays: selectedDatesClosure2020?.length,

            childs_daycare_2021_dates: selectedDatesClosure2021,
            sixdays: selectedDatesClosure2021?.length,
            // personal_startdate2020: formData.personal_startdate2020,
            // personal_enddate2020: formData.personal_enddate2020,
            // onedays: formData.numberOfDays,

            // personal_startdate2020: formattedStartDate,
            // personal_enddate2020: formattedEndDate,
            // onedays: numberOffDays,

            // personal_startdate2021: formData.personal_startdate2021,
            // personal_enddate2021: formData.personal_enddate2021,
            // twodays: formData.numberOfDays2021,

            // personal_startdate2021: formattedStartDate2021,
            // personal_enddate2021: formattedEndDate20221,
            // twodays: numberOffDaysTwo,

            // cared_startdate2020: formData.cared_startdate2020,
            // cared_enddate2020: formData.cared_enddate2020,
            // threedays: formData.symptomsdays2020,

            // cared_startdate2020: formattedStartDate2020,
            // cared_enddate2020: formattedEndDate2020,
            // threedays: symptomsDays,

            // cared_startdate2021: formData.cared_startdate2021,
            // cared_enddate2021: formData.cared_enddate2021,
            // fourdays: formData.symptomsdays2021,

            // cared_startdate2021: formattedStartDaate2021,
            // cared_enddate2021: formattedEndDate2021,
            // fourdays: symptomsDaysTwo,

            // minor_startdate2020: formData.minor_startdate2020,
            // minor_enddate2020: formData.minor_enddate2020,
            // fivedays: formData.minordays2020,

            // minor_startdate2020: formatedClosureStartDaate2020,
            // minor_enddate2020: formatedClosureEndDaate2020,
            // fivedays: minordays2020,

            // minor_startdate2021: formData.minor_startdate2021,
            // minor_enddate2021: formData.minor_enddate2021,
            // sixdays: formData.minordays2021,

            // minor_startdate2021: formatedClosureStartDaate2021,
            // minor_enddate2021: formatedClosureEndDaate2021,
            // sixdays: minordays2021,

            personally_sick_symptoms_2020: formData.personallySick2020,
            personally_sick_symptoms_2021: formData.personallySick2021,
            covid_experienced_symptoms_2020: formData.symptoms2020,
            covid_experienced_symptoms_2021: formData.symptoms2021,
            childs_daycare_2020: formData.closure2020,
            childs_daycare_2021: formData.closure2021,

            employed_as_W2: formData.employed_as_W2,
            Family_Sick_Leave: formData.family_sick,

            amount2020: formData.amount2020,
            amount2021: formData.amount2021,

            your_file_schedule: formData.scheduleSelfEmployement,
            mandatory_questions: formData.mandatory_questions,
            if_you_have_positive_earning: formData.positive_net_earning,
            did_you_miss_SEWDTC: formData.covid_related_issues,
            have_you_filed_already_for_setc: formData.setc_program,

            did_receive_unemployement20: formData.did_receive_unemployement20,
            did_receive_unemployement21: formData.did_receive_unemployement21,
            // care_for_minor_child: formData.care_for_minor_child,
            minor_child_tax_20: formData.minor_child_tax_20,
            minor_child_tax_21: formData.minor_child_tax_21,

            E_File_My_texes_2020: taxYears[0].eFiled,
            Mail_My_texes_2020: taxYears[0].mailed,
            E_File_My_texes_2021: taxYears[1].eFiled,
            Mail_My_texes_2021: taxYears[1].mailed,
          }),
        }
      );

      if (response.ok) {
        // alert(`success ${step}`);
        const data = await response.json();

        // setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        // Handle error
        console.error("Error in API call");
      }
    } catch (error) {
      // Handle network error
      console.error("Network error", error);
    }
  };

  const formDataUpdateWithoutNextStepTwo = async (step) => {
    try {
      let token = localStorage.getItem("token");

      if (!token) {
        // Handle missing token - Redirect or handle the situation accordingly
        console.error("Token is missing");
        // For example, redirect to the step where the token should be available
        setActiveStep(0); // Redirect to step 0 for token creation
        return;
      }

      const response = await fetch(
        `https://app.setczone.com/api/user/${step}/updateuser`,
        {
          method: "PUT", // Change the method to PUT
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            step: step,
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
            email: formData.email,
            business_name: formData.bussinessName,
            trade_name: formData.tradeName,
            address_line_1: formData.streetAddressOne,
            city: formData.city,
            state: formData.province,
            address_line_2: formData.streetAddressTwo,
            zip: formData.zipCode,
            know_about_us: formData.knowAbout,
            self_employed_from: formData.selfEmployedFrom,
            net_income_2019: formData.netIncome2019,
            net_income_2020: formData.netIncome2020,
            net_income_2021: formData.netIncome2021,
            business_negatively_impacted: formData.bussinessNegatively,

            
            personally_sick_symptoms_2020_dates: selectedDates,
            onedays: selectedDates?.length,

            personally_sick_symptoms_2021_dates: selectedDatesTwo,
            twodays: selectedDatesTwo?.length,

            covid_experienced_symptoms_2020_dates: selectedDatesCared2020,
            threedays: selectedDatesCared2020?.length,

            covid_experienced_symptoms_2021_dates: selectedDatesCared2021,
            fourdays: selectedDatesCared2021?.length,

            childs_daycare_2020_dates: selectedDatesClosure2020,
            fivedays: selectedDatesClosure2020?.length,

            childs_daycare_2021_dates: selectedDatesClosure2021,
            sixdays: selectedDatesClosure2021?.length,
            // personal_startdate2020: formData.personal_startdate2020,
            // personal_enddate2020: formData.personal_enddate2020,
            // onedays: formData.numberOfDays,

            // personal_startdate2020: formattedStartDate,
            // personal_enddate2020: formattedEndDate,
            // onedays: numberOffDays,

            // personal_startdate2021: formData.personal_startdate2021,
            // personal_enddate2021: formData.personal_enddate2021,
            // twodays: formData.numberOfDays2021,

            // personal_startdate2021: formattedStartDate2021,
            // personal_enddate2021: formattedEndDate20221,
            // twodays: numberOffDaysTwo,

            // cared_startdate2020: formData.cared_startdate2020,
            // cared_enddate2020: formData.cared_enddate2020,
            // threedays: formData.symptomsdays2020,

            // cared_startdate2020: formattedStartDate2020,
            // cared_enddate2020: formattedEndDate2020,
            // threedays: symptomsDays,

            // cared_startdate2021: formData.cared_startdate2021,
            // cared_enddate2021: formData.cared_enddate2021,
            // fourdays: formData.symptomsdays2021,

            // cared_startdate2021: formattedStartDaate2021,
            // cared_enddate2021: formattedEndDate2021,
            // fourdays: symptomsDaysTwo,

            // minor_startdate2020: formData.minor_startdate2020,
            // minor_enddate2020: formData.minor_enddate2020,
            // fivedays: formData.minordays2020,

            // minor_startdate2020: formatedClosureStartDaate2020,
            // minor_enddate2020: formatedClosureEndDaate2020,
            // fivedays: minordays2020,

            // minor_startdate2021: formData.minor_startdate2021,
            // minor_enddate2021: formData.minor_enddate2021,
            // sixdays: formData.minordays2021,

            // minor_startdate2021: formatedClosureStartDaate2021,
            // minor_enddate2021: formatedClosureEndDaate2021,
            // sixdays: minordays2021,

            personally_sick_symptoms_2020: formData.personallySick2020,
            personally_sick_symptoms_2021: formData.personallySick2021,
            covid_experienced_symptoms_2020: formData.symptoms2020,
            covid_experienced_symptoms_2021: formData.symptoms2021,
            childs_daycare_2020: formData.closure2020,
            childs_daycare_2021: formData.closure2021,

            employed_as_W2: formData.employed_as_W2,
            Family_Sick_Leave: formData.family_sick,

            amount2020: formData.amount2020,
            amount2021: formData.amount2021,

            your_file_schedule: formData.scheduleSelfEmployement,
            mandatory_questions: formData.mandatory_questions,
            if_you_have_positive_earning: formData.positive_net_earning,
            did_you_miss_SEWDTC: formData.covid_related_issues,
            have_you_filed_already_for_setc: formData.setc_program,

            did_receive_unemployement20: formData.did_receive_unemployement20,
            did_receive_unemployement21: formData.did_receive_unemployement21,
            // care_for_minor_child: formData.care_for_minor_child,
            minor_child_tax_20: formData.minor_child_tax_20,
            minor_child_tax_21: formData.minor_child_tax_21,

            E_File_My_texes_2020: taxYears[0].eFiled,
            Mail_My_texes_2020: taxYears[0].mailed,
            E_File_My_texes_2021: taxYears[1].eFiled,
            Mail_My_texes_2021: taxYears[1].mailed,
          }),
        }
      );

      if (response.ok) {
        // alert(`success ${step}`);
        const data = await response.json();

        // setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        // Handle error
        console.error("Error in API call");
      }
    } catch (error) {
      // Handle network error
      console.error("Network error", error);
    }
  };

  const checkEmailAvailability = async () => {
    try {
      const response = await axios.post(
        "https://app.setczone.com/api/user/checkMail",
        {
          email: formData.email,
        }
      );

      if (response.status === 200) {
        console.log(response.data.message); // Log the message from the response
        // Email is available
        setEmailValidated(true);
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email is available",
        }));
      } else {
        setEmailValidated(false);

        // Email is not available
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email already in use!",
        }));
      }
    } catch (error) {
      setEmailValidated(false);
      // Handle API error
      console.error("Error checking email availability", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email already in use!",
      }));
    } finally {
      // Reset loading to false after the API call is completed or errored
    }
  };

  const handleNext = async () => {
    console.log(activeStep, "here is my active step");
    const isValid = validateInputs();
    if (!isValid) {
      return;
    }

    // if (!emailValidated) {
    //   // Validate email before proceeding to the next step
    //   await checkEmailAvailability();
    const token = localStorage.getItem("token");

    // }

    if (token) {
      if (activeStep === 0) {
        formDataUpdate(activeStep);
      }
    } else {
      if (activeStep === 0) {
        formDataPreparing(activeStep);
      }
    }

    // if (activeStep === 1) {

    //   formDataUpdate(activeStep);
    // }
    if (activeStep === 1) {
      formDataUpdateWithoutLoader(activeStep);
    }

    if (activeStep === 2) {
      formDataUpdateWithoutLoader(activeStep);
      // formDataUpdateStepTwo(activeStep);
    }

    if (activeStep === 3) {
      formDataUpdateWithoutLoader(activeStep);
    }

    // if (activeStep === 4) {
    //   formDataUpdate(activeStep);
    // }
    if (activeStep === 4) {
      formDataUpdateWithoutLoader(activeStep);
    }

    // if (activeStep === 5) {
    //   formDataUpdateCalculation(activeStep);
    // }
    if (activeStep === 5) {
      formDataUpdateWithoutLoader(activeStep);
    }

    if (activeStep === 6) {
      formDataUpdate(activeStep);
    }

    if (activeStep === 7) {
      formDataUpdateWithoutLoader(activeStep);
    }
    if (activeStep === 8) {
      formDataUpdateWithoutLoader(activeStep);
    }
    if (activeStep === 9) {
      formDataUpdateWithoutLoader(activeStep);
    }

    // if (activeStep === 10) {
    //   // formDataUpdateCalculation(activeStep);
    //   if (formData.personallySick2020 === "Yes") {
    //     if (personal_startdate2020 && personal_enddate2020) {
    //       if (numberOffDays > 10) {
    //         setOpenModalDate(true);
    //       } else {
    //         formDataUpdateCalculationWithoutLoader(activeStep);

    //         // console.log(formattedStartDate, formattedEndDate, numberOffDays)
    //       }
    //     } else {
    //       setOpenModalDate(true);
    //     }
    //   }

    //   if (formData.personallySick2020 === "No") {
    //     formDataUpdateCalculationWithoutLoader(activeStep);
    //   }
    // }
    if (activeStep === 10) {
      // formDataUpdateCalculation(activeStep);
      if (formData.personallySick2020 === "Yes") {
        if (selectedDates?.length > 0) {
          if (selectedDates?.length > 10) {
            setOpenModalDate(true);
          } else {
            formDataUpdateCalculationWithoutLoader(activeStep);

            // console.log(formattedStartDate, formattedEndDate, numberOffDays)
          }
        } else {
          setOpenModalDate(true);
        }
      }

      if (formData.personallySick2020 === "No") {
        formDataUpdateCalculationWithoutLoader(activeStep);
      }
    }

    // if (activeStep === 11) {
    //   if (formData.personallySick2021 === "Yes") {
    //     if (personal_startdate2021 && personal_enddate2021) {
    //       if (numberOffDaysTwo > 10) {
    //         setOpenModalDateTwo(true);
    //       } else {
    //         formDataUpdateCalculationWithoutLoader(activeStep);

    //         // console.log(formattedStartDate, formattedEndDate, numberOffDays)
    //       }
    //     } else {
    //       setOpenModalDateTwo(true);
    //     }
    //   }

    //   if (formData.personallySick2021 === "No") {
    //     formDataUpdateCalculationWithoutLoader(activeStep);
    //   }
    // }
    if (activeStep === 11) {
      // formDataUpdateCalculation(activeStep);
      if (formData.personallySick2021 === "Yes") {
        if (selectedDatesTwo?.length > 0) {
          if (selectedDatesTwo?.length > 10) {
            setOpenModalDateTwo(true);
          } else {
            formDataUpdateCalculationWithoutLoader(activeStep);

            // console.log(formattedStartDate, formattedEndDate, numberOffDays)
          }
        } else {
          setOpenModalDateTwo(true);
        }
      }

      if (formData.personallySick2021 === "No") {
        formDataUpdateCalculationWithoutLoader(activeStep);
      }
    }

    // if (activeStep === 12) {
    //   // formDataUpdateCalculation(activeStep);
    //   if (formData.symptoms2020 === "Yes") {
    //     if (cared_startdate2020 && cared_enddate2020) {
    //       if (symptomsDays > 10) {
    //         setOpenModalSymptoms(true);
    //       } else {
    //         formDataUpdateCalculationWithoutLoader(activeStep);

    //         // console.log(formattedStartDate, formattedEndDate, numberOffDays)
    //       }
    //     } else {
    //       setOpenModalSymptoms(true);
    //     }
    //   }

    //   if (formData.symptoms2020 === "No") {
    //     formDataUpdateCalculationWithoutLoader(activeStep);
    //   }
    // }

    if (activeStep === 12) {
      console.log(datesFormatCared2020, "format");

      if (formData.symptoms2020 === "Yes") {
        if (selectedDatesCared2020?.length > 0) {
          if (selectedDatesCared2020?.length > 10) {
            setOpenModalSymptoms(true);
          } else {
            formDataUpdateCalculationWithoutLoader(activeStep);

            // console.log(formattedStartDate, formattedEndDate, numberOffDays)
          }
        } else {
          setOpenModalSymptoms(true);
        }
      }

      if (formData.symptoms2020 === "No") {
        formDataUpdateCalculationWithoutLoader(activeStep);
      }
    }

    // if (activeStep === 13) {
    //   // formDataUpdateCalculation(activeStep);
    //   if (formData.symptoms2021 === "Yes") {
    //     if (cared_startdate2021 && cared_enddate2021) {
    //       if (symptomsDaysTwo > 10) {
    //         setOpenModalSymptomsTwo(true);
    //       } else {
    //         formDataUpdateCalculationWithoutLoader(activeStep);

    //         // console.log(formattedStartDate, formattedEndDate, numberOffDays)
    //       }
    //     } else {
    //       setOpenModalSymptomsTwo(true);
    //     }
    //   }

    //   if (formData.symptoms2021 === "No") {
    //     formDataUpdateCalculationWithoutLoader(activeStep);
    //   }
    // }
    if (activeStep === 13) {
      if (formData.symptoms2021 === "Yes") {
        if (selectedDatesCared2021?.length > 0) {
          if (selectedDatesCared2021?.length > 10) {
            setOpenModalSymptomsTwo(true);
          } else {
            formDataUpdateCalculationWithoutLoader(activeStep);
          }
        } else {
          setOpenModalSymptomsTwo(true);
        }
      }

      if (formData.symptoms2021 === "No") {
        formDataUpdateCalculationWithoutLoader(activeStep);
      }
    }

    if (activeStep === 14) {
      formDataUpdateWithoutLoader(activeStep);
    }

    // if (activeStep === 15) {
    //   // formDataUpdateCalculation(activeStep);
    //   if (formData.closure2020 === "Yes") {
    //     if (minor_startdate2020 && minor_enddate2020) {
    //       if (minordays2020 > 50) {
    //         setOpenModalClosure(true);
    //       } else {
    //         formDataUpdateCalculationWithoutLoader(activeStep);

    //         // console.log(formattedStartDate, formattedEndDate, numberOffDays)
    //       }
    //     } else {
    //       setOpenModalClosure(true);
    //     }
    //   }

    //   if (formData.closure2020 === "No") {
    //     formDataUpdateCalculationWithoutLoader(activeStep);
    //   }
    // }

    if (activeStep === 15) {
      if (formData.closure2020 === "Yes") {
        if (selectedDatesClosure2020?.length > 0) {
          if (selectedDatesClosure2020?.length > 50) {
            setOpenModalClosure(true);
          } else {
            formDataUpdateCalculationWithoutLoader(activeStep);
          }
        } else {
          setOpenModalClosure(true);
        }
      }

      if (formData.closure2020 === "No") {
        formDataUpdateCalculationWithoutLoader(activeStep);
      }
    }

    if (activeStep === 16) {
      formDataUpdateWithoutLoader(activeStep);
    }

    // if (activeStep === 17) {
    //   // formDataUpdateCalculation(activeStep);
    //   if (formData.closure2021 === "Yes") {
    //     if (minor_startdate2021 && minor_enddate2021) {
    //       if (minordays2021 > 60) {
    //         setOpenModalClosureTwo(true);
    //       } else {
    //         formDataUpdateCalculationWithoutLoader(activeStep);

    //         // console.log(formattedStartDate, formattedEndDate, numberOffDays)
    //       }
    //     } else {
    //       setOpenModalClosureTwo(true);
    //     }
    //   }

    //   if (formData.closure2021 === "No") {
    //     formDataUpdateCalculationWithoutLoader(activeStep);
    //   }
    // }
    if (activeStep === 17) {
      if (formData.closure2021 === "Yes") {
        if (selectedDatesClosure2021?.length > 0) {
          if (selectedDatesClosure2021?.length > 60) {
            setOpenModalClosureTwo(true);
          } else {
            formDataUpdateCalculationWithoutLoader(activeStep);
          }
        } else {
          setOpenModalClosureTwo(true);
        }
      }

      if (formData.closure2021 === "No") {
        formDataUpdateCalculationWithoutLoader(activeStep);
      }
    }

    if (activeStep === 18) {
      formDataUpdateWithoutLoader(activeStep);
    }

    if (activeStep === 19) {
      formDataUpdateWithoutLoader(activeStep);
    }

    if (activeStep === 20) {
      // alert(finalIncomeValue)
      //  alert(finalCreditAmountStorage)
      formDataUpdateCalculationWithoutLoader(activeStep);
    }

    if (activeStep === 21) {
      formDataUpdateWithoutLoader(activeStep);
    }
    if (activeStep === 22) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);

      // handleVerification(activeStep);
    }

    if (activeStep === 23) {
      formDataConfirmation(activeStep);
    }

    window.scrollTo(0, 0);

    //  setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // const handlePrevious = () => {
  //   if (formData.minor_child_tax_20 === "No" && activeStep === 16) {
  //     setActiveStep(14);
  //   } else if (formData.minor_child_tax_21 === "No" && activeStep === 18) {
  //     setActiveStep(16);
  //   } else {
  //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
  //   }

  //   window.scrollTo(0, 0);
  // };

 const handlePrevious = () => {

if(
  formData.did_receive_unemployement20 === "No" 
  &&  activeStep === 14)
  {
    setActiveStep(13); 
  } else if(  formData.did_receive_unemployement20 === "Yes" 
 && activeStep === 16)
  {
    setActiveStep(13); 
  } else if(  formData.did_receive_unemployement21 === "No" && formData.minor_child_tax_20 === "Yes"
  && activeStep === 16)
   {
     setActiveStep(15); 
   } else if(  formData.did_receive_unemployement21 === "Yes" && formData.minor_child_tax_20 === "Yes" 
   && activeStep === 18)
    {
      setActiveStep(15); 
    }  else if (formData.minor_child_tax_20 === "No" && activeStep === 18 && formData.did_receive_unemployement21 === "Yes")
       {
        setActiveStep(14); 
      } else if (
      formData.minor_child_tax_20 === "No" && activeStep === 16)
       {
        setActiveStep(14); 
      } else if( formData.minor_child_tax_21 === "No" && activeStep === 18)
      {
        setActiveStep(16); 
      } 
       else {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      }
    
    window.scrollTo(0, 0);
  };
  

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    let inputValue = value;

    if (name.startsWith("netIncome") || name.startsWith("amount")) {
      inputValue = value.replace(/\D/g, ""); // Remove non-digit characters
      inputValue = inputValue ? `$${Number(inputValue).toLocaleString()}` : "$"; // Format as currency with dollar sign
    }
    if (type === "checkbox") {
      inputValue = event.target.checked;
    } else if (type === "date") {
      if (value === "") {
        inputValue = ""; // Set to an empty string for no date selected
      } else {
        const dateValue = new Date(value);
        const formattedDate = dateValue.toISOString().substr(0, 10);
        inputValue = formattedDate;
      }
    }

    if (name === "personallySick2020" && inputValue === "No") {
      // setNumberOffDays("");
      // setDateRange(["", ""]);
      setSelectedDates([]);
    } else if (name === "personallySick2021" && inputValue === "No") {
      // setDateRangeTwo(["", ""]);
      // setNumberOffDaysTwo("");
      setSelectedDatesTwo([]);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: inputValue,
      }));
    }

    if (name === "care_for_minor_child" && inputValue === "No") {
      // setClosureDateRange(["", ""]);
      // setMinordays2020("");

      setSelectedDatesClosure2020([]);
      setSelectedDatesClosure2021([]);

      // setClosureDateRangeTwo(["", ""]);
      // setMinordays2021("");

      setFormData((prevFormData) => ({
        ...prevFormData,
        minor_child_tax_20: "",
        [name]: inputValue,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: inputValue,
      }));
    }
    if ( (name === "minor_child_tax_20" && inputValue === "No") 
    || (formData.did_receive_unemployement20 === "Yes")) {
      // setClosureDateRange(["", ""]);
      // setMinordays2020("");
      setSelectedDatesClosure2020([]);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: inputValue,
      }));
    }

    if ((name === "minor_child_tax_21" && inputValue === "No") ||
     (formData.did_receive_unemployement20 === "Yes") ) {
      // setClosureDateRangeTwo(["", ""]);
      // setMinordays2021("");
      setSelectedDatesClosure2021([]);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: inputValue,
      }));
    }

    if (name === "symptoms2020" && inputValue === "No") {
      // Clear values for 2020 if "No" is selected
      // setSymptomsDays("");
      // setCaredDateRange(["", ""]);
      setSelectedDatesCared2020([]);
    } else if (name === "symptoms2021" && inputValue === "No") {
      // setSymptomsDaysTwo("");
      // setCaredDateRangeTwo(["", ""]);
      setSelectedDatesCared2021([]);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: inputValue,
      }));
    }

    if (name === "closure2020" && inputValue === "No") {
      // Clear values for 2020 if "No" is selected
      // setClosureDateRange(["", ""]);
      // setMinordays2020("");
      setSelectedDatesClosure2020([]);
    } else if (name === "closure2021" && inputValue === "No") {
      // setClosureDateRangeTwo(["", ""]);
      // setMinordays2021("");
      setSelectedDatesClosure2021([]);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: inputValue,
      }));
    }

    if (
      (name === "family_sick" && inputValue === "No") ||
      (name === "employed_as_W2" && inputValue === "No")
    ) {
      // Clear values for 2020 if "No" is selected
      setFormData((prevFormData) => ({
        ...prevFormData,
        amount2020: "",
        amount2021: "",
        [name]: inputValue,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: inputValue,
      }));
    }

    // if (name === "numberOfDays" && inputValue === "0") {
    //   // Reset date values to empty strings if numberOfDays becomes zero
    //   setFormData((prevFormData) => ({
    //     ...prevFormData,
    //     personal_startdate2020: "",
    //     personal_enddate2020: "",
    //     [name]: value,
    //   }));
    // } else if (name === "numberOfDays2021" && inputValue === "0") {
    //   setFormData((prevFormData) => ({
    //     ...prevFormData,
    //     personal_startdate2021: "",
    //     personal_enddate2021: "",
    //     [name]: value,
    //   }));
    // } else if (name === "symptomsdays2020" && inputValue === "0") {
    //   setFormData((prevFormData) => ({
    //     ...prevFormData,
    //     cared_startdate2020: "",
    //     cared_enddate2020: "",
    //     [name]: inputValue,
    //   }));
    // } else if (name === "symptomsdays2021" && inputValue === "0") {
    //   setFormData((prevFormData) => ({
    //     ...prevFormData,
    //     cared_startdate2021: "",
    //     cared_enddate2021: "",
    //     [name]: inputValue,
    //   }));
    // } else if (name === "minordays2020" && inputValue === "0") {
    //   setFormData((prevFormData) => ({
    //     ...prevFormData,
    //     minor_startdate2020: "",
    //     minor_enddate2020: "",
    //     [name]: inputValue,
    //   }));
    // } else if (name === "minordays2021" && inputValue === "0") {
    //   setFormData((prevFormData) => ({
    //     ...prevFormData,
    //     minor_startdate2021: "",
    //     minor_enddate2021: "",
    //     [name]: inputValue,
    //   }));
    // } else {
    //   setFormData((prevFormData) => ({
    //     ...prevFormData,
    //     [name]: inputValue,
    //   }));
    // }
  };
  const handleEmailBlur = async () => {
    const token = localStorage.getItem("token");
    const email = formData.email.trim();

    if (!token && email !== "" && email.includes("@")) {
      await checkEmailAvailability();
    } else {
      console.log("nothing");
    }
  };

  const validateInputs = () => {
    let hasErrors = false;
    const errorsObj = {};
    let largerThan25KCount = 0;
    const token = localStorage.getItem("token");

    if (activeStep === 0) {
      if (formData.firstName.trim() === "") {
        errorsObj.firstName = "First name cannot be empty";
        hasErrors = true;
      }

      if (formData.lastName.trim() === "") {
        errorsObj.lastName = "Last name cannot be empty";
        hasErrors = true;
      }

      if (formData.phone.trim() === "") {
        errorsObj.phone = "Phone number cannot be empty";
        hasErrors = true;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.email.trim() === "" || !emailRegex.test(formData.email)) {
        errorsObj.email = "Please enter valid email";
        hasErrors = true;
      }

      if (formData.email.trim() !== "" && !emailValidated && !token) {
        errorsObj.email = "Email already in use!";
        hasErrors = true;
        window.scrollTo(0, 0);
      }

      if (formData.bussinessName.trim() === "") {
        errorsObj.bussinessName = "Bussiness name cannot be empty";
        hasErrors = true;
      }
      if (!formData.employees) {
        errorsObj.employees = "Please enter employess number";
        hasErrors = true;
      }

      if (formData.tradeName.trim() === "") {
        errorsObj.tradeName = "Trade name cannot be empty";
        hasErrors = true;
      }

      if (formData.streetAddressOne.trim() === "") {
        errorsObj.streetAddressOne = "Street address cannot be empty";
        hasErrors = true;
      }

      if (formData.city.trim() === "") {
        errorsObj.city = "City name cannot be empty";
        hasErrors = true;
      }

      if (formData.province.trim() === "") {
        errorsObj.province = "Province name cannot be empty";
        hasErrors = true;
      }

      if (formData.zipCode.trim() === "") {
        errorsObj.zipCode = "Zip code cannot be null";
        hasErrors = true;
      }

      if (formData?.knowAbout?.trim() === "") {
        errorsObj.knowAbout = "Required field";
        hasErrors = true;
      }

      if (!formData.accounting_professional) {
        errorsObj.accounting_professional = "Please select an option";
        hasErrors = true;
      }

      // if (
      //   !formData.accounting_partnership &&
      //   formData.accounting_professional === "Yes"
      // ) {
      //   errorsObj.accounting_partnership = "Please select an option";
      //   hasErrors = true;
      // }

      if (!formData.isChecked) {
        errorsObj.isChecked = "Please check the terms & conditions policy";
        hasErrors = true;
      }
    }

    if (activeStep === 23) {
      // if (formData.firstName.trim() === "") {
      //   errorsObj.firstName = "First name cannot be empty";
      //   hasErrors = true;
      // }

      // if (formData.lastName.trim() === "") {
      //   errorsObj.lastName = "Last name cannot be empty";
      //   hasErrors = true;
      // }

      if (formData.phone.trim() === "") {
        errorsObj.phone = "Phone number cannot be empty";
        hasErrors = true;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.email.trim() === "" || !emailRegex.test(formData.email)) {
        errorsObj.email = "Please enter valid email";
        hasErrors = true;
      }

      if (formData.email.trim() !== "" && !emailValidated && !token) {
        errorsObj.email = "Email already in use!";
        hasErrors = true;
        window.scrollTo(0, 0);
      }

      if (formData.bussinessName.trim() === "") {
        errorsObj.bussinessName = "Bussiness name cannot be empty";
        hasErrors = true;
      }

      if (formData.tradeName.trim() === "") {
        errorsObj.tradeName = "Trade name cannot be empty";
        hasErrors = true;
      }

      if (formData.streetAddressOne.trim() === "") {
        errorsObj.streetAddressOne = "Street address cannot be empty";
        hasErrors = true;
      }

      if (formData.city.trim() === "") {
        errorsObj.city = "City name cannot be empty";
        hasErrors = true;
      }

      if (formData.province.trim() === "") {
        errorsObj.province = "Province name cannot be empty";
        hasErrors = true;
      }

      if (formData?.zipCode?.trim() === "") {
        errorsObj.zipCode = "Zip code cannot be null";
        hasErrors = true;
      }

      if (formData?.knowAbout?.trim() === "") {
        errorsObj.knowAbout = "Required field";
        hasErrors = true;
      }

      if (!formData.isChecked) {
        errorsObj.isChecked = "Please check the box";
        hasErrors = true;
      }
    }

    if (activeStep === 2) {
      if (!formData.selfEmployedFrom) {
        errorsObj.selfEmployedFrom = "Please select an option";
        hasErrors = true;
      }

      if (
        formData.selfEmployedFrom === "No" &&
        formData.selfEmployedFrom !== "Yes"
      ) {
        setActiveErrorQualifyOne(true);
        formDataUpdateWithoutNextStep(activeStep);
        hasErrors = true;
      }
      if (formData.selfEmployedFrom === "Yes") {
        setActiveErrorQualifyOne(false);
        hasErrors = false;
      }
    }

    if (activeStep === 16) {
      if (!formData.minor_child_tax_21) {
        errorsObj.minor_child_tax_21 = "Please select an option";
        hasErrors = true;
      }

      // if (
      //   formData.minor_child_tax_20 === "No" &&
      //   formData.minor_child_tax_21 === "No" &&
      //   formData.minor_child_tax_21 !== "Yes"
      // ) {
      //   setActiveErrorStep16(true);
      //   formDataUpdateWithoutNextStep(activeStep);
      //   hasErrors = true;
      // }
      // if (formData.minor_child_tax_21 === "Yes") {
      //   setActiveErrorStep16(false);
      //   hasErrors = false;
      // }
    }

    if (activeStep === 3) {
      if (!formData.scheduleSelfEmployement) {
        errorsObj.scheduleSelfEmployement = "Please select an option";
        hasErrors = true;
      }
      if (
        formData.scheduleSelfEmployement === "No" &&
        formData.scheduleSelfEmployement !== "Yes"
      ) {
        setActiveErrorQualifyTwoo(true);
        formDataUpdateWithoutNextStep(activeStep);
        hasErrors = true;
      }
      if (formData.scheduleSelfEmployement === "Yes") {
        setActiveErrorQualifyTwoo(false);
        hasErrors = false;
      }
    }

    if (activeStep === 4) {
      if (!formData.positive_net_earning) {
        errorsObj.positive_net_earning = "Please select an option";
        hasErrors = true;
      }
      if (
        formData.positive_net_earning === "No" &&
        formData.positive_net_earning !== "Yes"
      ) {
        setActiveErrorQualifyThree(true);
        formDataUpdateWithoutNextStep(activeStep);
        hasErrors = true;
      }
      if (formData.positive_net_earning === "Yes") {
        setActiveErrorQualifyThree(false);
        hasErrors = false;
      }
    }
    if (activeStep === 5) {
      if (!formData.covid_related_issues) {
        errorsObj.covid_related_issues = "Please select an option";
        hasErrors = true;
      }
      if (
        formData.covid_related_issues === "No" &&
        formData.covid_related_issues !== "Yes"
      ) {
        setActiveErrorQualifyFive(true);
        formDataUpdateWithoutNextStep(activeStep);
        hasErrors = true;
      }
      if (formData.covid_related_issues === "Yes") {
        setActiveErrorQualifyFive(false);
        hasErrors = false;
      }
    }

    if (activeStep === 8) {
      if (!formData.did_receive_unemployement20) {
        errorsObj.did_receive_unemployement20 = "Please select an option";
        hasErrors = true;
      }
    }
    if (activeStep === 9) {
      if (!formData.did_receive_unemployement21) {
        errorsObj.did_receive_unemployement21 = "Please select an option";
        hasErrors = true;
      }
      if (
        formData.did_receive_unemployement21 === "Yes" &&
        formData.did_receive_unemployement20 === "Yes" &&
        formData.did_receive_unemployement21 !== "No"
      ) {
        setActiveErrorDidRecieveUnemployement(true);
        formDataUpdateWithoutNextStep(activeStep);
        hasErrors = true;
      }
      if (formData.did_receive_unemployement21 === "No") {
        setActiveErrorDidRecieveUnemployement(false);
        hasErrors = false;
      }
    }

    if (activeStep === 14) {
      // if (!formData.care_for_minor_child) {
      //   errorsObj.care_for_minor_child = "Please select an option";
      //   hasErrors = true;
      // }

      if (!formData.minor_child_tax_20) {
        errorsObj.minor_child_tax_20 = "Please select an option";
        hasErrors = true;
      }

      // if (
      //   formData.employed_as_W2 === "Yes" &&
      //   formData.family_sick === "Yes" &&
      //   formData.amount2020 === ""
      // ) {
      //   errorsObj.amount2020 = "Please select an option";
      //   // errorsObj.amount2021 = "Please select an option";
      //   hasErrors = true;
      // }
      // if (
      //   formData.employed_as_W2 === "Yes" &&
      //   formData.family_sick === "Yes" &&
      //   formData.amount2021 === ""
      // ) {
      //   errorsObj.amount2021 = "Please select an option";
      //   // errorsObj.amount2021 = "Please select an option";
      //   hasErrors = true;
      // }
    }

    if (activeStep === 18) {
      if (!formData.setc_program) {
        errorsObj.setc_program = "Please select an option";
        hasErrors = true;
      }
      if (formData.setc_program === "Yes" && formData.setc_program !== "No") {
        setActiveErrorQualifySix(true);
        formDataUpdateWithoutNextStep(activeStep);
        hasErrors = true;
      }
      if (formData.setc_program === "No") {
        setActiveErrorQualifySix(false);
        hasErrors = false;
      }
    }

    if (activeStep === 20) {
      if (!formData.netIncome2019 || formData.netIncome2019 === "$") {
        errorsObj.netIncome2019 = "Please enter a value";
        hasErrors = true;
      }

      if (Number(formData.netIncome2019.replace(/\D/g, "")) < 10000) {
        largerThan25KCount++;
      }

      if (!formData.netIncome2020 || formData.netIncome2020 === "$") {
        errorsObj.netIncome2020 = "Please enter a value";
        hasErrors = true;
      }

      if (Number(formData.netIncome2020.replace(/\D/g, "")) < 10000) {
        largerThan25KCount++;
      }

      if (!formData.netIncome2021 || formData.netIncome2021 === "$") {
        errorsObj.netIncome2021 = "Please enter a value";
        hasErrors = true;
      }

      if (Number(formData.netIncome2021.replace(/\D/g, "")) < 10000) {
        largerThan25KCount++;
      }

      if (largerThan25KCount >= 2) {
        hasErrors = true;
        setActiveErrorQualify17(true);
      } else {
        hasErrors = false;
        setActiveErrorQualify17(false);
      }
    }

    if (activeStep === 10) {
      if (!formData.personallySick2020) {
        errorsObj.personallySick2020 = "Please select an option";
        hasErrors = true;
      }
    }

    if (activeStep === 11) {
      if (!formData.personallySick2021) {
        errorsObj.personallySick2021 = "Please select an option";
        hasErrors = true;
      }
    }

    if (activeStep === 12) {
      if (!formData.symptoms2020) {
        errorsObj.symptoms2020 = "Please select an option";
        hasErrors = true;
      }
    }

    if (activeStep === 13) {
      if (!formData.symptoms2021) {
        errorsObj.symptoms2021 = "Please select an option";
        hasErrors = true;
      }
    }

    if (activeStep === 15) {
      if (!formData.closure2020) {
        errorsObj.closure2020 = "Please select an option";
        hasErrors = true;
      }
    }

    if (activeStep === 17) {
      if (!formData.closure2021) {
        errorsObj.closure2021 = "Please select an option";
        hasErrors = true;
      }
    }

    if (activeStep === 19) {
      if (!formData.employed_as_W2) {
        errorsObj.employed_as_W2 = "Please select an option";
        hasErrors = true;
      }
      if (!formData.family_sick && formData.employed_as_W2 === "Yes") {
        errorsObj.family_sick = "Please select an option";
        hasErrors = true;
      }

      if (
        formData.employed_as_W2 === "Yes" &&
        formData.family_sick === "Yes" &&
        formData.amount2020 === ""
      ) {
        errorsObj.amount2020 = "Please select an option";
        // errorsObj.amount2021 = "Please select an option";
        hasErrors = true;
      }
      if (
        formData.employed_as_W2 === "Yes" &&
        formData.family_sick === "Yes" &&
        formData.amount2021 === ""
      ) {
        errorsObj.amount2021 = "Please select an option";
        // errorsObj.amount2021 = "Please select an option";
        hasErrors = true;
      }
    }
    // Add more validations for other steps if needed

    setErrors(errorsObj);
    return !hasErrors;
  };

  const getProgressPercentage = () => {
    return ((activeStep + 1) / firstPreQualifier.length) * 100; // Calculate progress percentage
  };

  const getProgressPercentage2 = () => {
    return ((activeStep + 1) / firstPreQualifier2.length) * 100; // Calculate progress percentage
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = formData.email.trim();
    if (!token && email !== "" && email.includes("@")) {
      checkEmailAvailability();
    } else {
      // If email is empty, reset email validation state and clear errors
      setEmailValidated(false);
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
    }
  }, [formData.email]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        //  alert(token, 'useeffect tokeeeeeeeeeeeennnnnnnnnnnnnn')
        try {
          const response = await fetch("https://app.setczone.com/api/user/getUser", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const userData = await response.json();
           setUserData(userData);
          
            // alert(userData.self_employed_from);

            const currentStep = userData.step;
            setActiveStep(currentStep || 0);
          
            // setActiveStep(24);

            // Extract personal start date and end date from userData

            const personallySickSymptoms2020Dates =
              userData?.personally_sick_symptoms_2020_dates;

            // Convert date strings to UTC format
            const utcDates = personallySickSymptoms2020Dates.map(
              (dateString) => {
                const date = new Date(dateString);
                return date.toISOString();
              }
            );

            // Set the UTC dates in the state
            setSelectedDates(utcDates);

            const personallySickSymptoms2021Dates =
              userData?.personally_sick_symptoms_2021_dates;

            // Convert date strings to UTC format
            const utcDates2 = personallySickSymptoms2021Dates.map(
              (dateString) => {
                const date = new Date(dateString);
                return date.toISOString();
              }
            );

            // Set the UTC dates in the state
            setSelectedDatesTwo(utcDates2);

            const covidExperiencedSymptoms2020Dates =
              userData?.covid_experienced_symptoms_2020_dates;

            // Convert date strings to UTC format
            const utcDates3 = covidExperiencedSymptoms2020Dates.map(
              (dateString) => {
                const date = new Date(dateString);
                return date.toISOString();
              }
            );

            // Set the UTC dates in the state
            setSelectedDatesCared2020(utcDates3);

            const covidExperiencedSymptoms2021Dates =
              userData?.covid_experienced_symptoms_2021_dates;

            // Convert date strings to UTC format
            const utcDates4 = covidExperiencedSymptoms2021Dates.map(
              (dateString) => {
                const date = new Date(dateString);
                return date.toISOString();
              }
            );

            // Set the UTC dates in the state
            setSelectedDatesCared2021(utcDates4);

            const childDaycare2020Dates = userData?.childs_daycare_2020_dates;

            // Convert date strings to UTC format
            const utcDates5 = childDaycare2020Dates.map((dateString) => {
              const date = new Date(dateString);
              return date.toISOString();
            });

            // Set the UTC dates in the state
            setSelectedDatesClosure2020(utcDates5);

            const childDaycare2021Dates = userData?.childs_daycare_2021_dates;

            // Convert date strings to UTC format
            const utcDates6 = childDaycare2021Dates.map((dateString) => {
              const date = new Date(dateString);
              return date.toISOString();
            });

            // Set the UTC dates in the state
            setSelectedDatesClosure2021(utcDates6);

            // // Extract personal start date and end date from userData
            // const startdate2020 = userData.personal_startdate2020
            //   ? new Date(userData.personal_startdate2020)
            //   : null;
            // const enddate2020 = userData.personal_enddate2020
            //   ? new Date(userData.personal_enddate2020)
            //   : null;
            // setDateRange([startdate2020, enddate2020]);
            // setNumberOffDays(userData.onedays || 0);

            // const startdate2021 = userData.personal_startdate2021
            //   ? new Date(userData.personal_startdate2021)
            //   : null;
            // const enddate2021 = userData.personal_enddate2021
            //   ? new Date(userData.personal_enddate2021)
            //   : null;
            // setDateRangeTwo([startdate2021, enddate2021]);
            // setNumberOffDaysTwo(userData.twodays || 0);

            // const startdatee2020 = userData.cared_startdate2020
            //   ? new Date(userData.cared_startdate2020)
            //   : null;
            // const enddatee2020 = userData.cared_enddate2020
            //   ? new Date(userData.cared_enddate2020)
            //   : null;
            // setCaredDateRange([startdatee2020, enddatee2020]);
            // setSymptomsDays(userData.threedays || 0);

            // const startdatee2021 = userData.cared_startdate2021
            //   ? new Date(userData.cared_startdate2021)
            //   : null;
            // const enddatee2021 = userData.cared_enddate2021
            //   ? new Date(userData.cared_enddate2021)
            //   : null;
            // setCaredDateRangeTwo([startdatee2021, enddatee2021]);
            // setSymptomsDaysTwo(userData.fourdays || 0);

            // const closure2020 = userData.minor_startdate2020
            //   ? new Date(userData.minor_startdate2020)
            //   : null;
            // const endclosure2020 = userData.minor_enddate2020
            //   ? new Date(userData.minor_enddate2020)
            //   : null;
            // setClosureDateRange([closure2020, endclosure2020]);
            // setMinordays2020(userData.fivedays || 0);

            // const closure2021 = userData.minor_startdate2021
            //   ? new Date(userData.minor_startdate2021)
            //   : null;

            // const endclosure2021 = userData.minor_enddate2021
            //   ? new Date(userData.minor_enddate2021)
            //   : null;
            // setClosureDateRangeTwo([closure2021, endclosure2021]);
            // setMinordays2021(userData.sixdays || 0);

            setTaxYears((prevTaxYears) =>
              prevTaxYears.map((taxYear) => ({
                ...taxYear,
                eFiled: userData[`E_File_My_texes_${taxYear.year}`] === "1",
                mailed: userData[`Mail_My_texes_${taxYear.year}`] === "1",
              }))
            );

            setFormData((prevData) => ({
              ...prevData,
              firstName: userData.first_name || prevData.firstName,
              lastName: userData.last_name || prevData.lastName,
              // Add other fields accordingly

              phone: userData.phone || "",
              email: userData.email || "",
              bussinessName: userData.business_name || "",
              employees: userData.employees,

              tradeName: userData.trade_name || "",
              streetAddressOne: userData.address_line_1 || "",
              city: userData.city || "",
              province: userData.state || "",
              streetAddressTwo: userData.address_line_2 || "",
              zipCode: userData.zip || "",

              accounting_professional: userData.accounting_professional || "",

              accounting_partnership: userData.accounting_partnership || "",

              did_receive_unemployement20:
                userData.did_receive_unemployement20 || "",
              did_receive_unemployement21:
                userData.did_receive_unemployement21 || "",
              care_for_minor_child: userData.care_for_minor_child || "",
              minor_child_tax_20: userData.minor_child_tax_20 || "",
              minor_child_tax_21: userData.minor_child_tax_21 || "",

              isChecked: userData.email ? true : false || false,
              knowAbout: userData.know_about_us || "",
              selfEmployedFrom: userData.self_employed_from || "",
              isCheckedStepThree:
                userData.self_employed_from === "Yes" ? true : false || false,
              netIncome2019: userData.net_income_2019 || "",
              netIncome2020: userData.net_income_2020 || "",
              netIncome2021: userData.net_income_2021 || "",
              bussinessNegatively: userData.business_negatively_impacted || "",

              // personal_startdate2020: userData.personal_startdate2020 || "",

              personallySick2020: userData.personally_sick_symptoms_2020 || "",

              // personal_enddate2020: userData.personal_enddate2020 || "",
              // numberOfDays: userData.onedays || 0,

              // personal_startdate2021: userData.personal_startdate2021 || "",

              personallySick2021: userData.personally_sick_symptoms_2021 || "",

              // personal_enddate2021: userData.personal_enddate2021 || "",
              // numberOfDays2021: userData.twodays || "",

              // cared_startdate2020: userData.cared_startdate2020 || "",
              symptoms2020: userData.covid_experienced_symptoms_2020 || "",
              // cared_enddate2020: userData.cared_enddate2020 || "",
              // symptomsdays2020: userData.threedays || "",

              // cared_startdate2021: userData.cared_startdate2021 || "",

              symptoms2021: userData.covid_experienced_symptoms_2021 || "",

              // cared_enddate2021: userData.cared_enddate2021 || "",
              // symptomsdays2021: userData.fourdays || "",

              // minor_startdate2020: userData.minor_startdate2020 || "",
              closure2020: userData.childs_daycare_2020 || "",
              // minor_enddate2020: userData.minor_enddate2020 || "",
              // minordays2020: userData.fivedays || "",

              // minor_enddate2021: userData.minor_enddate2021 || "",
              closure2021: userData.childs_daycare_2021 || "",
              // minor_enddate2020: userData.minor_enddate2020 || "",
              // minordays2021: userData.sixdays || "",

              employed_as_W2: userData.employed_as_W2 || "",

              family_sick: userData.Family_Sick_Leave || "",

              amount2020: userData.amount2020 || "",

              amount2021: userData.amount2021 || "",

              scheduleSelfEmployement: userData.your_file_schedule || "",
              mandatory_questions: userData.mandatory_questions || "",
              positive_net_earning: userData.if_you_have_positive_earning || "",
              covid_related_issues: userData.did_you_miss_SEWDTC || "",
              setc_program: userData.have_you_filed_already_for_setc || "",
            }));
            setSelectedFiles((prevSelectedFiles) => ({
              ...prevSelectedFiles,
              // driving_licence: userData?.driving_licence,
              schedule_pdf: userData?.schedule_pdf,

              Tax_Return_2020: userData?.Tax_Return_2020,
              Tax_Return_2021: userData?.Tax_Return_2021,
              supplemental_attachment_2020:
                userData?.supplemental_attachment_2020,
              supplemental_attachment_2021:
                userData?.supplemental_attachment_2021,
              FormA1099: userData?.FormA1099,
              FormB1099: userData?.FormB1099,
              ks2020: userData?.ks2020,
              ks22020: userData?.ks22020,
            }));
          } else {
            console.error("Error fetching user data");
          }
        } catch (error) {
          console.error("Network error", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const fetchUserDataa = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await fetch("https://app.setczone.com/api/user/getUser", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json(); // Use await to wait for the JSON parsing
          setUserData(userData);

          // ... (rest of the function remains unchanged)
        } else {
          console.error("Error fetching user data");
        }
      } catch (error) {
        console.error("Network error", error);
      }
    }
  };

  const submitHubspotForm = async () => {
    const apiUrl = "https://app.setczone.com/api/user/dataPosttoHubspot";
    const token = localStorage.getItem("token");

    const data = {
      properties: {
        email: userData?.email,
        firstname: userData?.first_name,
        lastname: userData?.last_name,
        business_name: userData?.business_name,
        address_line_1: userData?.address_line_1,
        country: "",
        phone_number: userData?.phone,
        city: userData?.city,
        state: userData?.state,
        industry: userData?.trade_name,
        files_folder: "files.com",
        final_credit: userData?.final_credit_amount,
      },
    };

    axios
      .post(apiUrl, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Success:", response.data);
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
  };

  //   const callFilesCom = async () => {
  //     const apiUrl = "https://app.setczone.com/api/user/multiupload";

  //     const payload = {
  //         path: [...userData?.driving_licence_name, ...userData?.schedule_pdf_name, ...userData?.Tax_Return_2020_name, ...userData?.Tax_Return_2021_name, ...userData?.supplemental_attachment_2020_name, ...userData?.supplemental_attachment_2021_name, ...userData?.FormA1099_name, ...userData?.FormB1099_name, ...userData?.ks2020_name, ...userData?.ks22020_name],
  //         name: [...userData?.driving_licence, ...userData?.schedule_pdf, ...userData?.Tax_Return_2020, ...userData?.Tax_Return_2021, ...userData?.supplemental_attachment_2020, ...userData?.supplemental_attachment_2021, ...userData?.FormA1099, ...userData?.FormB1099, ...userData?.ks2020, ...userData?.ks22020]
  //     };

  //     const data = {
  //         email: userData?.email,
  //         fileName: payload.name,
  //         filesPath: payload.path,
  //     };

  //     try {
  //         // Set loading state here, if needed
  //         setLoading(true);

  //         const response = await axios.post(apiUrl, data, {
  //             headers: {
  //                 "Content-Type": "application/json",
  //             },
  //         });

  //         console.log("Success Files.com uploaded:", response.data);

  //         // Reset loading state here, if needed
  //         // setLoading(false);
  //     } catch (error) {
  //         console.error(
  //             "Error:",
  //             error.response ? error.response.data : error.message
  //         );

  //         // Handle errors or set error state here, if needed
  //         // setError(true);

  //         // Reset loading state here, if needed
  //         // setLoading(false);
  //     } finally {
  //       setLoading(false); // Hide the loader when the request is completed (either success or failure)
  //     }
  // };
  const callFilesCom = async () => {
    const apiUrl = "https://app.setczone.com/api/user/multiupload";

    const payload = {
      path: [
        ...userData?.schedule_pdf_name,
        ...userData?.Tax_Return_2020_name,
        ...userData?.Tax_Return_2021_name,
        ...userData?.supplemental_attachment_2020_name,
        ...userData?.supplemental_attachment_2021_name,
        ...userData?.FormA1099_name,
        ...userData?.FormB1099_name,
        ...userData?.ks2020_name,
        ...userData?.ks22020_name,
      ],
      name: [
        ...userData?.schedule_pdf,
        ...userData?.Tax_Return_2020,
        ...userData?.Tax_Return_2021,
        ...userData?.supplemental_attachment_2020,
        ...userData?.supplemental_attachment_2021,
        ...userData?.FormA1099,
        ...userData?.FormB1099,
        ...userData?.ks2020,
        ...userData?.ks22020,
      ],
    };

    const data = {
      email: userData?.email,
      fileName: payload.name,
      filesPath: payload.path,
    };

    try {
      // Set loading state here, if needed
      setLoading(true);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Success Files.com uploaded:", responseData);

      // Reset loading state here, if needed
      // setLoading(false);
    } catch (error) {
      console.error("Error:", error.message);

      // Handle errors or set error state here, if needed
      // setError(true);

      // Reset loading state here, if needed
      // setLoading(false);
    } finally {
      setLoading(false); // Hide the loader when the request is completed (either success or failure)
    }
  };

  // const openFileInNewTab = async (fileKey, index, originalFileName) => {

  //   // // Split the original file name using the backslash as the separator
  //   // const parts = originalFileName.split('\\');
     
  //   // // Get the last part of the resulting array, which is the filename
  //   // const filenameView = parts[parts.length - 1];
      
   
   
 
 
  //   // const apiUrl = "https://app.setczone.com/api/user/generateUrlwasabi";
   
  //   //  const data = {
  //   //    email: userData?.email,
  //   //    fileName: filenameView,
  //   //  };
   
  //   //  try {
  //   //    // Set loading state here, if needed
  //   //    setLoading(true);
   
  //   //    const response = await fetch(apiUrl, {
  //   //      method: "POST",
  //   //      headers: {
  //   //        "Content-Type": "application/json",
  //   //      },
  //   //      body: JSON.stringify(data),
  //   //    });
   
  //   //    if (!response.ok) {
  //   //      throw new Error(`HTTP error! Status: ${response.status}`);
  //   //    }
      //  const responseData = await response.json();
      //  const viewUrl = responseData.viewUrl;
      //  window.open(viewUrl, "_blank");
       
  //   //    alert("hello")
  //   //    console.log("View :", responseData);
   
  //   //    // Reset loading state here, if needed
  //   //    // setLoading(false);
  //   //  } catch (error) {
  //   //    console.error("Error:", error.message);
   
  //   //    // Handle errors or set error state here, if needed
  //   //    // setError(true);
   
  //   //    // Reset loading state here, if needed
  //   //    // setLoading(false);
  //   //  } finally {
  //   //    setLoading(false); // Hide the loader when the request is completed (either success or failure)
  //   //  }
  //    if (fileKey && userData && originalFileName) {
  //      window.open(`https://app.setczone.com/api/${originalFileName}`, "_blank");
  //    } else {
  //      console.error("File URL not found for the provided index");
  //    }
  //  };

   const openFileInNewTab = async (fileKey, index, originalFileName) => {
     
    // Split the original file name using the backslash as the separator
    const parts = originalFileName.split('\\');
     
    // Get the last part of the resulting array, which is the filename
    const filenameView = parts[parts.length - 1];
   

  const apiUrl = "https://app.setczone.com/api/user/generateUrlwasabi";

  const data = {
    email: userData?.email,
    fileName: filenameView,
  };

  try {
    // Set loading state here, if needed
    setLoading(true);

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

   
    const responseData = await response.json();
    console.log(responseData)
    const viewUrl = responseData.url;

    window.open(viewUrl, "_blank");

    

    // Reset loading state here, if needed
    // setLoading(false);
  } catch (error) {
    console.error("Error:", error.message);

    // Handle errors or set error state here, if needed
    // setError(true);

    // Reset loading state here, if needed
    // setLoading(false);
  } finally {
    setLoading(false); // Hide the loader when the request is completed (either success or failure)
  }
};


 
 

  const removeFile = async (fileKey, index, originalFileName) => {
    // removeFileVasabi(originalFileName);
    const token = localStorage.getItem("token");

    // // Check if both token and fileKey are present
    if (!token || !fileKey) {
      console.error("Token and fileKey are required.");
      return;
    }
    if (fileKey && userData) {
      const fileUrls = userData[fileKey];
      if (fileUrls && fileUrls[index]) {
        alert("Are you sure to remove file");

        try {
          const url = "https://app.setczone.com/api/user/deleteFile";
          const payload = {
            fieldName: `${fileKey}_name`,
            fileName: originalFileName,
            originalFieldName: fileKey,
            originalName: fileUrls[index],
          };

          const response = await fetch(url, {
            method: "DELETE", // Change the method to DELETE
            headers: {
              Authorization: `Bearer ${token}`, // Add the token to the headers
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (response.ok) {
            // Call fetchData() upon successful response

             removeFileVasabi(originalFileName);

            await fetchUserDataa();

            setSelectedFiles((prevSelectedFiles) => {
              const updatedFiles = { ...prevSelectedFiles };
              // Remove the specific file from the array
              updatedFiles[fileKey] = fileUrls.filter((_, i) => i !== index);
              return updatedFiles;
            });

            console.log("File removed successfully.");
          } else {
            console.error("Failed to remove file.");
          }
        } catch (error) {
          console.error("Error removing file:", error);
        }
      }
    }
  };

  const removeFileVasabi = async (originalFileName) => {


    // Split the original file name using the backslash as the separator
    const parts = originalFileName.split('\\');
    
    // Get the last part of the resulting array, which is the filename
    const filename = parts[parts.length - 1];
      
 

    const apiUrl = "https://app.setczone.com/api/user/deleteFilesawabi";
  
    const data = {
      email: userData?.email,
      fileName: filename,
    };
  
    try {
      // Set loading state here, if needed
      setLoading(true);
  
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log("Remove File from swabi successfully:", responseData);
  
      // Reset loading state here, if needed
      // setLoading(false);
    } catch (error) {
      console.error("Error:", error.message);
  
      // Handle errors or set error state here, if needed
      // setError(true);
  
      // Reset loading state here, if needed
      // setLoading(false);
    } finally {
      setLoading(false); // Hide the loader when the request is completed (either success or failure)
    }
  };

  const uploadFile = async (formData, inputName, fileNames) => {
    const token = localStorage.getItem("token");

    if (formData) {
      try {
        setUploadingFile(inputName);
        formData.append("step", activeStep);

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress((prevProgress) => ({
              ...prevProgress,
              [inputName]: percentCompleted,
            }));
          },
        };

        const response = await axios.put(
          "https://app.setczone.com/api/user/multiple-form-data",
          formData,
          config
        );

        let lastFileName = "";

      
        if (inputName === "schedule_pdf") {
          const lastScheduleIndex =
            response.data.user.schedule_pdf_name.length - 1;
          lastFileName =
            response.data.user.schedule_pdf_name[lastScheduleIndex];

             uploadVasabi(response.data.user.schedule_pdf_name)

        } else if (inputName === "Tax_Return_2020") {
          const lastScheduleIndex =
            response.data.user.Tax_Return_2020_name.length - 1;
          lastFileName =
            response.data.user.Tax_Return_2020_name[lastScheduleIndex];

            uploadVasabi(response.data.user.Tax_Return_2020_name)
        } else if (inputName === "Tax_Return_2021") {
          const lastScheduleIndex =
            response.data.user.Tax_Return_2021_name.length - 1;
          lastFileName =
            response.data.user.Tax_Return_2021_name[lastScheduleIndex];

            uploadVasabi(response.data.user.Tax_Return_2021_name)
        } else if (inputName === "supplemental_attachment_2020") {
          const lastScheduleIndex =
            response.data.user.supplemental_attachment_2020_name.length - 1;
          lastFileName =
            response.data.user.supplemental_attachment_2020_name[
              lastScheduleIndex
            ];
            uploadVasabi(response.data.user.supplemental_attachment_2020_name)
        } else if (inputName === "supplemental_attachment_2021") {
          const lastScheduleIndex =
            response.data.user.supplemental_attachment_2021_name.length - 1;
          lastFileName =
            response.data.user.supplemental_attachment_2021_name[
              lastScheduleIndex
            ];
            uploadVasabi(response.data.user.supplemental_attachment_2021_name)
        } else if (inputName === "FormA1099") {
          const lastScheduleIndex =
            response.data.user.FormA1099_name.length - 1;
          lastFileName = response.data.user.FormA1099_name[lastScheduleIndex];

          uploadVasabi(response.data.user.FormA1099_name)
        } else if (inputName === "FormB1099") {
          const lastScheduleIndex =
            response.data.user.FormB1099_name.length - 1;
          lastFileName = response.data.user.FormB1099_name[lastScheduleIndex];

          uploadVasabi(response.data.user.FormB1099_name)
        } else if (inputName === "ks2020") {
          const lastScheduleIndex = response.data.user.ks2020_name.length - 1;
          lastFileName = response.data.user.ks2020_name[lastScheduleIndex];

          uploadVasabi(response.data.user.ks2020_name)
        } else if (inputName === "ks22020") {
          const lastScheduleIndex = response.data.user.ks22020_name.length - 1;
          lastFileName = response.data.user.ks22020_name[lastScheduleIndex];

          uploadVasabi(response.data.user.ks22020_name)
        }

        await handleSuccessfulUpload(inputName, lastFileName);
        await fetchUserDataa();
        setAddingFileType(null);
      } catch (error) {
        console.error(`Error uploading file:`, error);
      } finally {
        setUploadingFile("");
        setUploadProgress((prevProgress) => ({
          ...prevProgress,
          [inputName]: 0,
        }));
      }
    }
  };


  const uploadVasabi = async (files) => {
   
      const lastIndex = files.length - 1;


      const lastFilename = files[lastIndex];
  

      const parts = lastFilename.split('\\');

      // Get the last part of the resulting array, which is the filename
      const filenameFinal = parts[parts.length - 1];
     
  
    const apiUrl = "https://app.setczone.com/api/user/sendfiletosawabi";
  
    const data = {
      email: userData?.email,
      fileName: filenameFinal,
    };
  
    try {
      // Set loading state here, if needed
      setLoading(true);
  
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log("Success Files.com uploaded:", responseData);
  
      // Reset loading state here, if needed
      // setLoading(false);
    } catch (error) {
      console.error("Error:", error.message);
  
      // Handle errors or set error state here, if needed
      // setError(true);
  
      // Reset loading state here, if needed
      // setLoading(false);
    } finally {
      setLoading(false); // Hide the loader when the request is completed (either success or failure)
    }
  };
  

  const handleSuccessfulUpload = (inputName, fileName) => {
    const currentTime = Date.now(); // Get the current time in milliseconds
    setUploadCompleteTimes((prevUploadTimes) => ({
      ...prevUploadTimes,
      [inputName]: currentTime,
    }));

    // Save upload completion time as a string to localStorage
    localStorage.setItem(fileName, currentTime.toString());
  };

  // Check if 30 seconds have passed since upload completion
  const isThirtySecondsPassed = (fileName) => {
    const storedTime = localStorage.getItem(fileName);
    if (storedTime) {
      const uploadTime = parseInt(storedTime, 10); // Parse stored string to a number
      const currentTime = Date.now();
      return currentTime - uploadTime >= 30000; // Check if 30 seconds have passed
    }
    return false;
  };

  const allDaysApplicable = () => {
    return (
      userData?.onedays == "0" &&
      userData?.twodays == "0" &&
      userData?.threedays == "0" &&
      userData?.fourdays == "0" &&
      userData?.fivedays == "0" &&
      userData?.sixdays == "0"
    );
  };
  // Function to retrieve upload completion times from localStorage on component mount
  useEffect(() => {
    const storedUploadTimes = {
      // driving_licence: localStorage.getItem("driving_licence"),
      schedule_pdf: localStorage.getItem("schedule_pdf"),
      Tax_Return_2020: localStorage.getItem("Tax_Return_2020"),
      Tax_Return_2021: localStorage.getItem("Tax_Return_2021"),
      supplemental_attachment_2020: localStorage.getItem(
        "supplemental_attachment_2020"
      ),
      supplemental_attachment_2021: localStorage.getItem(
        "supplemental_attachment_2021"
      ),
      FormA1099: localStorage.getItem("FormA1099"),
      FormB1099: localStorage.getItem("FormB1099"),
      ks2020: localStorage.getItem("ks2020"),
      ks22020: localStorage.getItem("ks22020"),
    };

    // Convert stored timestamps back to numbers before setting state
    const parsedUploadTimes = Object.keys(storedUploadTimes).reduce(
      (acc, key) => {
        acc[key] = storedUploadTimes[key]
          ? parseInt(storedUploadTimes[key], 10)
          : null;
        return acc;
      },
      {}
    );

    setUploadCompleteTimes(parsedUploadTimes);
  }, []);

  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <div className="row justify-content-center pb-3">
              <div className="col-lg-8 col-md-8 col-sm-12">
                <div
                  className="step step-1 bg-white shadow  pb-5"
                  style={{ borderRadius: "20px" }}
                >
                  {/* <LinearProgress
                      variant="determinate"
                      sx={{
                        height: "14px",
                        borderRadius: "6px",
                        marginBottom: 5,
                        backgroundColor: "#f0f0f0",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "rgb(13, 189, 243);",
                        },
                      }}
                      value={getProgressPercentage()}
                    /> */}

                  <h3
                    className="text-center mb-3 py-3 text-white"
                    style={{
                      backgroundColor: "rgb(13, 189, 243)",
                      borderRadius: "10px",
                    }}
                  >
                    Getting Started
                  </h3>
                  <div className="px-3">
                    <input
                      type="hidden"
                      name="record_id"
                      id="record_id"
                      value=""
                    />

                    <div className="row mt-4">
                      <label
                        for="id_first_name"
                        className="form-label requiredField"
                      >
                        Self-Employed Owner's Name
                      </label>
                      <div className="col-sm-6 mb-3">
                        <input
                          type="text"
                          value={formData.firstName}
                          name="firstName"
                          maxLength="1024"
                          placeholder="First Name"
                          class={`textinput form-control ${
                            errors.firstName ? "border-danger" : ""
                          }`}
                          required=""
                          id="id_first_name"
                          onChange={handleInputChange}
                        />

                        {errors.firstName && (
                          <div
                            className="text-danger"
                            style={{ fontSize: "12px" }}
                          >
                            {errors.firstName}
                          </div>
                        )}
                      </div>
                      <div id="last_name" className="col-sm-6 mb-3">
                        <input
                          type="text"
                          value={formData.lastName}
                          name="lastName"
                          placeholder="Last Name"
                          maxlength="1024"
                          class={`textinput form-control ${
                            errors.lastName ? "border-danger" : ""
                          }`}
                          required=""
                          id="id_last_name"
                          onChange={handleInputChange}
                        />

                        {errors.lastName && (
                          <div
                            className="text-danger"
                            style={{ fontSize: "12px" }}
                          >
                            {errors.lastName}
                          </div>
                        )}
                      </div>
                      <div id="div_id_phone_number" className="col-sm-6 mb-3">
                        <label
                          for="id_phone_number"
                          className="form-label requiredField"
                        >
                          Owners Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          name="phone"
                          maxlength="128"
                          placeholder="(555) 555-5555"
                          class={`textinput form-control ${
                            errors.phone ? "border-danger" : ""
                          }`}
                          required=""
                          id="id_phone_number"
                          onChange={handleInputChange}
                        />

                        {errors.phone && (
                          <div
                            className="text-danger"
                            style={{ fontSize: "12px" }}
                          >
                            {errors.phone}
                          </div>
                        )}
                      </div>
                      <div id="div_id_email" className="col-sm-6 mb-3">
                        <label
                          for="id_email"
                          className="form-label requiredField"
                        >
                          Email
                        </label>
                        <input
                          value={formData.email}
                          type="email"
                          name="email"
                          maxLength="254"
                          placeholder="e.g. example@example.com"
                          // class={`form-control ${
                          //   errors.email === "Email is available"
                          //     ? "border-success text-success"
                          //     : errors.email
                          //     ? "border-danger"
                          //     : ""
                          // }`}
                          class={`form-control ${
                            emailValidated
                              ? "border-success text-success"
                              : errors.email
                              ? "border-danger"
                              : ""
                          }`}
                          required=""
                          id="id_email"
                          onChange={handleInputChange}
                          onBlur={handleEmailBlur}
                        />
                        {errors.email && (
                          <div
                            className={
                              errors.email === "Email is available"
                                ? "text-success"
                                : "text-danger"
                            }
                            style={{ fontSize: "14px" }}
                          >
                            {errors.email}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="row mt-4">
                      <label
                        for="Business-Legal-Name"
                        className="form-label requiredField"
                      >
                        Business Legal Name
                      </label>
                      <div className="col-sm-6 mb-3">
                        <input
                          type="text"
                          value={formData.bussinessName}
                          name="bussinessName"
                          maxLength="1024"
                          placeholder="Business Legal Name"
                          class={`textinput form-control ${
                            errors.bussinessName ? "border-danger" : ""
                          }`}
                          required=""
                          id="Business-Legal-Name"
                          onChange={handleInputChange}
                        />

                        {errors.bussinessName && (
                          <div
                            className="text-danger"
                            style={{ fontSize: "12px" }}
                          >
                            {errors.bussinessName}
                          </div>
                        )}
                      </div>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          value={formData.employees}
                          class={` form-control ${
                            errors.employees ? "border-danger" : ""
                          }`}
                          id="employees"
                          placeholder=" Number of  Employees"
                          name="employees"
                          required=""
                          onChange={handleInputChange}
                        />
                        {errors.employees && (
                          <div
                            className="text-danger"
                            style={{ fontSize: "14px" }}
                          >
                            {errors.employees}
                          </div>
                        )}

                        <div className="invalid-feedback emailError"></div>
                      </div>
                    </div>

                    <div className="mb-2">
                      <div className="col-sm-6">
                        <label for="Trade-Name" className="form-label">
                          Trade Name, if any(indicate none, if none)
                        </label>

                        <input
                          type="text"
                          value={formData.tradeName}
                          class={` form-control ${
                            errors.tradeName ? "border-danger" : ""
                          }`}
                          id="Trade-Name"
                          placeholder=""
                          name="tradeName"
                          required=""
                          onChange={handleInputChange}
                        />
                        {errors.tradeName && (
                          <div
                            className="text-danger"
                            style={{ fontSize: "14px" }}
                          >
                            {errors.tradeName}
                          </div>
                        )}

                        <div className="invalid-feedback emailError"></div>
                      </div>
                    </div>
                    <div className="mb-2">
                      <label for="Self-employed" className="form-label">
                        Self-employed business address. This may likely be your
                        home address unless you use a separate business address
                      </label>
                      <input
                        type="text"
                        value={formData.streetAddressOne}
                        class={`form-control  ${
                          errors.streetAddressOne ? "border-danger" : ""
                        }`}
                        id="Street-Address"
                        placeholder="Street Address"
                        name="streetAddressOne"
                        required=""
                        onChange={handleInputChange}
                      />

                      {errors.streetAddressOne && (
                        <div
                          className="text-danger"
                          style={{ fontSize: "14px" }}
                        >
                          {errors.streetAddressOne}
                        </div>
                      )}

                      <input
                        type="text"
                        value={formData.streetAddressTwo}
                        onChange={handleInputChange}
                        className="form-control mt-3"
                        id="Street-Address-Line-2"
                        placeholder="Street Address Line 2"
                        name="streetAddressTwo"
                      />
                      <div className="invalid-feedback company_nameError"></div>
                    </div>
                    <div className="row">
                      <div id="div_id_first_name" className="col-sm-6 mt-3">
                        <label for="City" className="form-label requiredField">
                          City
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          class={`textinput form-control  ${
                            errors.city ? "border-danger" : ""
                          }`}
                          onChange={handleInputChange}
                          name="city"
                          required=""
                          id="City"
                        />
                        {errors.city && (
                          <div
                            className="text-danger"
                            style={{ fontSize: "14px" }}
                          >
                            {errors.city}
                          </div>
                        )}
                      </div>
                      <div id="div_id_last_name" className="col-sm-6 mt-3 mb-3">
                        <label
                          for="State_Province"
                          className="form-label requiredField"
                        >
                          State/Province
                        </label>
                        <input
                          type="text"
                          value={formData.province}
                          name="province"
                          maxlength="1024"
                          class={`textinput form-control 
                      ${errors.province ? "border-danger" : ""}`}
                          required=""
                          id="State_Province"
                          onChange={handleInputChange}
                        />
                        {errors.province && (
                          <div
                            className="text-danger"
                            style={{ fontSize: "14px" }}
                          >
                            {errors.province}
                          </div>
                        )}
                      </div>
                      <div id="div_id_last_name" className="col-sm-6 ">
                        <label
                          for="zipcode"
                          className="form-label requiredField"
                        >
                          Postal / Zip Code
                        </label>
                        <input
                          type="Number"
                          value={formData.zipCode}
                          name="zipCode"
                          maxlength="1024"
                          placeholder="00000"
                          class={`textinput form-control 
 ${errors.zipCode ? "border-danger" : ""}`}
                          required=""
                          id="zipcode"
                          onChange={handleInputChange}
                        />
                        {errors.zipCode && (
                          <div
                            className="text-danger"
                            style={{ fontSize: "14px" }}
                          >
                            {errors.zipCode}
                          </div>
                        )}
                      </div>
                      <div id="know_about_us" className="col-sm-6  ">
                        <label
                          for="know-about"
                          className="form-label requiredField"
                        >
                          How did you hear about us?
                        </label>
                        <input
                          type="text"
                          value={formData.knowAbout}
                          name="knowAbout"
                          maxlength="1024"
                          class={`textinput form-control 
                    ${errors.knowAbout ? "border-danger" : ""}`}
                          required=""
                          id="know-about"
                          onChange={handleInputChange}
                        />
                        {errors.knowAbout && (
                          <div
                            className="text-danger"
                            style={{ fontSize: "14px" }}
                          >
                            {errors.knowAbout}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-2 mt-3">
                      <label
                        for="accounting_professional"
                        className="form-label requiredField "
                        style={{ fontWeight: "600" }}
                      >
                        Are you an accounting professional? (Bookkeeper, CPA,
                        Accountant, Payroll Specialists)?
                      </label>

                      <div className="optio mb-2">
                        <label for="accounting_professional_yes">
                          <p
                            style={{
                              padding: "7px 10px",
                              border: "1px solid lightgray",
                              backgroundColor:
                                formData.accounting_professional === "Yes"
                                  ? "lightblue"
                                  : "initial",
                            }}
                          >
                            <input
                              className="form-check-input"
                              class={`form-check-input ${
                                errors.accounting_professional
                                  ? "border-danger"
                                  : ""
                              }`}
                              type="radio"
                              name="accounting_professional"
                              checked={
                                formData.accounting_professional === "Yes"
                              }
                              value="Yes"
                              id="accounting_professional_yes"
                              onChange={handleInputChange}
                            />
                            Yes
                          </p>
                        </label>
                      </div>
                      <div className="optio">
                        <label for="accounting_professional_no">
                          <p
                            style={{
                              padding: "7px 10px",
                              border: "1px solid lightgray",
                              backgroundColor:
                                formData.accounting_professional === "No"
                                  ? "lightblue"
                                  : "initial",
                            }}
                          >
                            <input
                              className="form-check-input"
                              class={`form-check-input ${
                                errors.accounting_professional
                                  ? "border-danger"
                                  : ""
                              }`}
                              type="radio"
                              name="accounting_professional"
                              checked={
                                formData.accounting_professional === "No"
                              }
                              value="No"
                              id="accounting_professional_no"
                              onChange={handleInputChange}
                            />
                            No
                          </p>
                        </label>
                      </div>
                      {/* {formData.accounting_professional === "Yes" && (
                        <>
                          <div id="additional">
                            <label
                              for="accounting_partnership"
                              // className="form-label bg-light py-3 px-1 fs-5"
                              className="form-label requiredField"
                            >
                              Are you interested in our accounting partnership
                              that would allow you to purchase the downloadable
                              calculation?
                            </label>
                            <div className="optio mb-2">
                              <label for="accounting_partnership_yes">
                                <p
                                  style={{
                                    padding: "7px 10px",
                                    border: "1px solid lightgray",
                                    backgroundColor:
                                      formData.accounting_partnership === "Yes"
                                        ? "lightblue"
                                        : "initial",
                                  }}
                                >
                                  <input
                                    className="form-check-input"
                                    class={`form-check-input ${
                                      errors.accounting_partnership
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    type="radio"
                                    name="accounting_partnership"
                                    checked={
                                      formData.accounting_partnership === "Yes"
                                    }
                                    value="Yes"
                                    id="accounting_partnership_yes"
                                    onChange={handleInputChange}
                                  />
                                  Yes
                                </p>
                              </label>
                            </div>
                            <div className="optio">
                              <label for="accounting_partnership_no">
                                <p
                                  style={{
                                    padding: "7px 10px",
                                    border: "1px solid lightgray",
                                    backgroundColor:
                                      formData.accounting_partnership === "No"
                                        ? "lightblue"
                                        : "initial",
                                  }}
                                >
                                  <input
                                    className="form-check-input"
                                    class={`form-check-input ${
                                      errors.accounting_partnership
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    type="radio"
                                    name="accounting_partnership"
                                    checked={
                                      formData.accounting_partnership === "No"
                                    }
                                    value="No"
                                    id="accounting_partnership_no"
                                    onChange={handleInputChange}
                                  />
                                  No
                                </p>
                              </label>
                            </div>
                          </div>
                        </>
                      )} */}
                    </div>

                    <div className="impot mt-3">
                      <p>
                        The address you provide above will be used as the
                        mailing address for your SETC refund check. If you meet
                        the eligibility criteria, the IRS generally takes 3 – 5
                        months to process your application. To ensure the check
                        reaches you without any complications, kindly provide an
                        address where you intend to reside for the next 6
                        months. This will help guarantee accurate and timely
                        delivery to the correct address.
                      </p>
                    </div>
                    <div
                      className="d-flex mt-3"
                      style={{ alignItems: "start " }}
                    >
                      <input
                        checked={formData.isChecked}
                        class={`checkBoxStepOne form-check-input me-1 mt-1 ${
                          errors.isChecked ? "border-danger" : ""
                        }`}
                        type="checkbox"
                        id="flexCheckDefault1"
                        name="isChecked"
                        onChange={handleInputChange}
                      />

                      <p class="mb-3 mt-0">
                        By checking the box, you agree to our{" "}
                        <a
                          style={{
                            textDecoration: "underline",
                            cursor: "pointer",
                            color: "blue",
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal_step_1"
                        >
                          terms & conditions
                        </a>{" "}
                        and will allow SETC Zone and its partners to contact you
                        via phone, text, and/or email.
                      </p>
                    </div>
                    {errors.isChecked && (
                      <div
                        className="text-danger"
                        style={{ fontSize: "13px", fontWeight: 600 }}
                      >
                        {errors.isChecked}
                      </div>
                    )}

                    <div
                      className="modal fade"
                      id="exampleModal_step_1"
                      style={{
                        display: "none",
                        // padding: "0px 40px 20px 40px",
                      }}
                      aria-hidden="true"
                    >
                      <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                          <div class="modal-header bg-success text-white">
                            <h4 class="modal-title" style={{ color: "white" }}>
                              <i
                                class="fas fa-check-circle"
                                style={{ color: "white" }}
                              ></i>{" "}
                              Terms and conditions
                            </h4>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <p>
                              <span>Terms of Service</span>
                            </p>
                            <p>
                              <span>Effective: November 1st, 2023</span>
                            </p>
                            <p>
                              Thank you for using our services! These terms of
                              service (“Terms”) cover your use and access to our
                              services, client software, and websites
                              ("Services"). By using our Services, you agree to
                              be bound by these Terms and our Privacy Policy. If
                              you are using our Services for an organization,
                              you are agreeing to these Terms on behalf of that
                              organization.
                            </p>
                            <p>
                              <b>Your Information and Your Permissions</b>
                            </p>
                            <p>
                              When you use our Services, you provide us with
                              things like your files, content, messages,
                              contacts, and so on (your information). Your
                              information is yours. These Terms do not give us
                              any rights to your information except for the
                              limited rights that enable us to offer the
                              Services.
                            </p>
                            <p>
                              Our Services also provide you with features like
                              eSign, file sharing, email newsletters,
                              appointment setting, and more. These and other
                              features may require our systems to access, store,
                              and scan your information. You give us permission
                              to do those things, and this permission extends to
                              our affiliates and trusted third parties we work
                              with.
                            </p>
                            <p>
                              <b>Your Responsibilities</b>
                            </p>
                            <p>
                              You are responsible for your conduct. Your
                              information and you must comply with applicable
                              laws. Content in the Services may be protected by
                              others’ intellectual property rights. Please do
                              not copy, upload, download, or share content
                              unless you have the right to do so. We may review
                              your conduct and content for compliance with these
                              Terms. With that said, we have no obligation to do
                              so. We are not responsible for the content people
                              post and share via the Services.
                            </p>
                            <p>
                              Help us keep you informed and your information
                              protected. Safeguard your password to the
                              Services, and keep your account information
                              current. Do not share your account credentials or
                              give others access to your account.
                            </p>
                            <p>
                              You may use our Services only as permitted by
                              applicable law, including export control laws and
                              regulations.
                            </p>
                            <p>
                              <b>Our Information</b>
                            </p>
                            <p>
                              The Services are protected by copyright,
                              trademark, and other US and foreign laws. These
                              Terms do not grant you any right, title, or
                              interest in the Services, others’ content in the
                              Services, SETC Zone, and our trademarks, logos,
                              and other brand features. We welcome feedback, but
                              note that we may use comments or suggestions
                              without any obligation to you.
                            </p>
                            <p>
                              <b>Copyright</b>
                            </p>
                            <p>
                              We respect the intellectual property of others and
                              ask that you do too. We respond to notices of
                              alleged copyright infringement if they comply with
                              the law, and such notices should be reported to{" "}
                              <a href="mailto:info@setczone.com">
                                info@setczone.com
                              </a>
                              . We reserve the right to delete or disable
                              content alleged to be infringing and terminate
                              accounts of repeat infringers.
                            </p>
                            <p>
                              <b>Termination</b>
                            </p>
                            <p>
                              You are free to stop using our Services at any
                              time. We reserve the right to suspend or terminate
                              your access to the Services with notice to you if:
                            </p>
                            <p>(a) you are in breach of these Terms,</p>
                            <p>
                              (b) you are using the Services in a manner that
                              would cause a real risk of harm or loss to us or
                              other users, or
                            </p>
                            <p>
                              We will provide you with reasonable advance notice
                              via the email address associated with your account
                              to remedy the activity that prompted us to contact
                              you and give you the opportunity to export your
                              information from our Services. If after such
                              notice you fail to take the steps we ask of you,
                              we will terminate or suspend your access to the
                              Services.
                            </p>
                            <p>
                              We will not provide notice before termination
                              where:
                            </p>
                            <p>
                              (a) you are in material breach of these Terms,
                            </p>
                            <p>
                              (b) doing so would cause us legal liability or
                              compromise our ability to provide the Services to
                              our other users, or
                            </p>
                            <p>(c) we are prohibited from doing so by law.</p>
                            <p>
                              <b>Discontinuation of Services</b>
                            </p>
                            <p>
                              We may decide to discontinue the Services in
                              response to unforeseen circumstances beyond SETC
                              Zone’s control or to comply with a legal
                              requirement. If we do so, we will give you
                              reasonable prior notice so that you can export
                              your information from our systems.
                            </p>
                            <p>
                              <b>Services “AS IS”</b>
                            </p>
                            <p>
                              We strive to provide great Services, but there are
                              certain things that we cannot guarantee. TO THE
                              FULLEST EXTENT PERMITTED BY LAW, SETC Zone AND ITS
                              AFFILIATES, SUPPLIERS, AND DISTRIBUTORS MAKE NO
                              WARRANTIES, EITHER EXPRESS OR IMPLIED, ABOUT THE
                              SERVICES. THE SERVICES ARE PROVIDED "AS IS." WE
                              ALSO DISCLAIM ANY WARRANTIES OF MERCHANTABILITY,
                              FITNESS FOR A PARTICULAR PURPOSE, AND
                              NON-INFRINGEMENT. Some places do not allow the
                              disclaimers in this paragraph, so they may not
                              apply to you.
                            </p>
                            <p>
                              <b>Limitation of Liability</b>
                            </p>
                            <p>
                              WE DO NOT EXCLUDE OR LIMIT OUR LIABILITY TO YOU
                              WHERE IT WOULD BE ILLEGAL TO DO SO—THIS INCLUDES
                              ANY LIABILITY FOR SETC Zone OR ITS AFFILIATES’
                              FRAUD OR FRAUDULENT MISREPRESENTATION IN PROVIDING
                              THE SERVICES. IN COUNTRIES WHERE THE FOLLOWING
                              TYPES OF EXCLUSIONS ARE NOT ALLOWED, WE ARE
                              RESPONSIBLE TO YOU ONLY FOR LOSSES AND DAMAGES
                              THAT ARE A REASONABLY FORESEEABLE RESULT OF OUR
                              FAILURE TO USE REASONABLE CARE AND SKILL OR OUR
                              BREACH OF OUR CONTRACT WITH YOU. THIS PARAGRAPH
                              DOES NOT AFFECT CONSUMER RIGHTS THAT CANNOT BE
                              WAIVED OR LIMITED BY ANY CONTRACT OR AGREEMENT.
                            </p>
                            <p>
                              IN COUNTRIES WHERE EXCLUSIONS OR LIMITATIONS OF
                              LIABILITY ARE ALLOWED, SETC Zone, ITS AFFILIATES,
                              SUPPLIERS, OR DISTRIBUTORS WILL NOT BE LIABLE FOR:
                            </p>
                            <ol>
                              <li>
                                ANY INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE,
                                EXEMPLARY, OR CONSEQUENTIAL DAMAGES, OR
                              </li>
                              <li>
                                ANY LOSS OF USE, DATA, BUSINESS, OR PROFITS,
                                REGARDLESS OF LEGAL THEORY.
                              </li>
                            </ol>
                            <p>
                              THESE EXCLUSIONS OR LIMITATIONS WILL APPLY
                              REGARDLESS OF WHETHER OR NOT SETC Zone OR ANY OF
                              ITS AFFILIATES HAS BEEN WARNED OF THE POSSIBILITY
                              OF SUCH DAMAGES.
                            </p>
                            <p>
                              IF YOU USE THE SERVICES FOR ANY COMMERCIAL,
                              BUSINESS, OR RE-SALE PURPOSE, SETC Zone, ITS
                              AFFILIATES, SUPPLIERS, OR DISTRIBUTORS WILL HAVE
                              NO LIABILITY TO YOU FOR ANY LOSS OF PROFIT, LOSS
                              OF BUSINESS, BUSINESS INTERRUPTION, OR LOSS OF
                              BUSINESS OPPORTUNITY. SETC Zones AND ITS
                              AFFILIATES ARE NOT RESPONSIBLE FOR THE CONDUCT,
                              WHETHER ONLINE OR OFFLINE, OF ANY USER OF THE
                              SERVICES.
                            </p>
                            <p>
                              <b>Resolving Disputes</b>
                            </p>
                            <p>
                              Let’s Try To Sort Things Out First. We want to
                              address your concerns without needing a formal
                              legal case. Before filing a claim against SETC
                              Zone or our affiliates, you agree to try to
                              resolve the dispute informally by contacting{" "}
                              <a href="mailto:info@setczone.com">
                                info@setczone.com
                              </a>
                              . We will try to resolve the dispute informally by
                              contacting you via email.
                            </p>
                            <p>
                              Judicial forum for disputes. You and SETC Zone
                              agree that any judicial proceeding to resolve
                              claims relating to these Terms or the Services
                              will be brought in the federal or state courts of
                              Texas, subject to the mandatory arbitration
                              provisions below. Both you and SETC Zone consent
                              to venue and personal jurisdiction in such courts.
                            </p>
                            <p>
                              We Both Agree To Arbitrate. You and SETC Zone
                              agree to resolve any claims relating to these
                              Terms or the Services through final and binding
                              arbitration by a single arbitrator. This includes
                              disputes arising out of or relating to
                              interpretation or application of this “Mandatory
                              Arbitration Provisions” section, including its
                              enforceability, revocability, or validity.
                            </p>
                            <p>
                              Arbitration Procedures. The American Arbitration
                              Association (AAA) will administer the arbitration
                              under its Commercial Arbitration Rules and the
                              Supplementary Procedures for Consumer Related
                              Disputes. The arbitration will be held in the
                              United States county where you live or work,
                              Texas, or any other location we agree to.
                            </p>
                            <p>
                              NO CLASS ACTIONS. You may only resolve disputes
                              with us on an individual basis and may not bring a
                              claim as a plaintiff or a class member in a class,
                              consolidated, or representative action. Class
                              arbitrations, class actions, private attorney
                              general actions, and consolidation with other
                              arbitrations are not allowed. If this specific
                              paragraph is held unenforceable, then the entirety
                              of this “Mandatory Arbitration Provisions” section
                              will be deemed void.
                            </p>
                            <p>
                              <b>Controlling Law</b>
                            </p>
                            <p>
                              These Terms will be governed by California law
                              except for its conflicts of laws principles.
                              However, some countries (including those in the
                              European Union) have laws that require agreements
                              to be governed by the local laws of the consumer's
                              country. This paragraph does not override those
                              laws.
                            </p>
                            <p>
                              <b>Entire Agreement</b>
                            </p>
                            <p>
                              These Terms constitute the entire agreement
                              between you and SETC Zone with respect to the
                              subject matter of these Terms and supersede and
                              replace any other prior or contemporaneous
                              agreements or terms and conditions applicable to
                              the subject matter of these Terms. These Terms
                              create no third-party beneficiary rights.
                            </p>
                            <p>
                              <b>
                                Revised Waiver, Severability &amp; Assignment
                                Terms
                              </b>
                            </p>
                            <p>
                              At SETC Zone, failure to enforce a particular
                              provision does not mean that we waive our right to
                              enforce it later. If a provision is deemed
                              unenforceable, the remaining terms of the
                              agreement will continue to remain in effect, and
                              we will substitute the unenforceable provision
                              with one that reflects our intentions as closely
                              as possible. Please note that you cannot assign
                              any of your rights under these Terms, and any
                              attempt to do so will be considered invalid.
                              However, we reserve the right to assign our rights
                              to any affiliates, subsidiaries, or any successor
                              in interest of any business associated with the
                              Services.
                            </p>
                            <p>
                              <b>Modifications Terms</b>
                            </p>
                            <p>
                              We are committed to providing the best possible
                              services to our users, which may require us to
                              revise these Terms from time to time. Such
                              revisions may be made to reflect changes in the
                              law, new regulatory requirements, or improvements
                              and enhancements made to our Services. If any
                              modification affects your use of the Services or
                              your legal rights, we will notify you before the
                              effective date of the update. We will send you an
                              email to the email address associated with your
                              account or send you an in-product notification.
                              Please note that the updated terms will take
                              effect no less than 30 days from when we notify
                              you.
                            </p>
                            {/* <button type="button" class="btn btn-primary px-4 py-1" id="flexCheckDefault" data-bs-dismiss="modal" aria-label="Close">Done</button> */}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="modal fade"
                      id="exampleModal_step_0"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      style={{
                        display: "none",
                        padding: "0px 40px 20px 40px",
                      }}
                      aria-hidden="true"
                    >
                      <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                          <div class="modal-header bg-success text-white">
                            <h4 class="modal-title">
                              <i class="fas fa-check-circle"></i> Terms and
                              conditions
                            </h4>
                            <i
                              class="fa-solid fa-xmark fs-3 text-white"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></i>
                          </div>
                          <div class="modal-body">
                            <p>
                              <span>Terms of Service</span>
                            </p>
                            <p>
                              <span>Effective: November 1st, 2023</span>
                            </p>
                            <p>
                              Thank you for using our services! These terms of
                              service (“Terms”) cover your use and access to our
                              services, client software, and websites
                              ("Services"). By using our Services, you agree to
                              be bound by these Terms and our Privacy Policy. If
                              you are using our Services for an organization,
                              you are agreeing to these Terms on behalf of that
                              organization.
                            </p>
                            <p>
                              <b>Your Information and Your Permissions</b>
                            </p>
                            <p>
                              When you use our Services, you provide us with
                              things like your files, content, messages,
                              contacts, and so on (your information). Your
                              information is yours. These Terms do not give us
                              any rights to your information except for the
                              limited rights that enable us to offer the
                              Services.
                            </p>
                            <p>
                              Our Services also provide you with features like
                              eSign, file sharing, email newsletters,
                              appointment setting, and more. These and other
                              features may require our systems to access, store,
                              and scan your information. You give us permission
                              to do those things, and this permission extends to
                              our affiliates and trusted third parties we work
                              with.
                            </p>
                            <p>
                              <b>Your Responsibilities</b>
                            </p>
                            <p>
                              You are responsible for your conduct. Your
                              information and you must comply with applicable
                              laws. Content in the Services may be protected by
                              others’ intellectual property rights. Please do
                              not copy, upload, download, or share content
                              unless you have the right to do so. We may review
                              your conduct and content for compliance with these
                              Terms. With that said, we have no obligation to do
                              so. We are not responsible for the content people
                              post and share via the Services.
                            </p>
                            <p>
                              Help us keep you informed and your information
                              protected. Safeguard your password to the
                              Services, and keep your account information
                              current. Do not share your account credentials or
                              give others access to your account.
                            </p>
                            <p>
                              You may use our Services only as permitted by
                              applicable law, including export control laws and
                              regulations.
                            </p>
                            <p>
                              <b>Our Information</b>
                            </p>
                            <p>
                              The Services are protected by copyright,
                              trademark, and other US and foreign laws. These
                              Terms do not grant you any right, title, or
                              interest in the Services, others’ content in the
                              Services, SETC Zone, and our trademarks, logos,
                              and other brand features. We welcome feedback, but
                              note that we may use comments or suggestions
                              without any obligation to you.
                            </p>
                            <p>
                              <b>Copyright</b>
                            </p>
                            <p>
                              We respect the intellectual property of others and
                              ask that you do too. We respond to notices of
                              alleged copyright infringement if they comply with
                              the law, and such notices should be reported to{" "}
                              <a href="mailto:info@setczone.com">
                                info@setczone.com
                              </a>
                              . We reserve the right to delete or disable
                              content alleged to be infringing and terminate
                              accounts of repeat infringers.
                            </p>
                            <p>
                              <b>Termination</b>
                            </p>
                            <p>
                              You are free to stop using our Services at any
                              time. We reserve the right to suspend or terminate
                              your access to the Services with notice to you if:
                            </p>
                            <p>(a) you are in breach of these Terms,</p>
                            <p>
                              (b) you are using the Services in a manner that
                              would cause a real risk of harm or loss to us or
                              other users, or
                            </p>
                            <p>
                              We will provide you with reasonable advance notice
                              via the email address associated with your account
                              to remedy the activity that prompted us to contact
                              you and give you the opportunity to export your
                              information from our Services. If after such
                              notice you fail to take the steps we ask of you,
                              we will terminate or suspend your access to the
                              Services.
                            </p>
                            <p>
                              We will not provide notice before termination
                              where:
                            </p>
                            <p>
                              (a) you are in material breach of these Terms,
                            </p>
                            <p>
                              (b) doing so would cause us legal liability or
                              compromise our ability to provide the Services to
                              our other users, or
                            </p>
                            <p>(c) we are prohibited from doing so by law.</p>
                            <p>
                              <b>Discontinuation of Services</b>
                            </p>
                            <p>
                              We may decide to discontinue the Services in
                              response to unforeseen circumstances beyond SETC
                              Zone’s control or to comply with a legal
                              requirement. If we do so, we will give you
                              reasonable prior notice so that you can export
                              your information from our systems.
                            </p>
                            <p>
                              <b>Services “AS IS”</b>
                            </p>
                            <p>
                              We strive to provide great Services, but there are
                              certain things that we cannot guarantee. TO THE
                              FULLEST EXTENT PERMITTED BY LAW, SETC Zone AND ITS
                              AFFILIATES, SUPPLIERS, AND DISTRIBUTORS MAKE NO
                              WARRANTIES, EITHER EXPRESS OR IMPLIED, ABOUT THE
                              SERVICES. THE SERVICES ARE PROVIDED "AS IS." WE
                              ALSO DISCLAIM ANY WARRANTIES OF MERCHANTABILITY,
                              FITNESS FOR A PARTICULAR PURPOSE, AND
                              NON-INFRINGEMENT. Some places do not allow the
                              disclaimers in this paragraph, so they may not
                              apply to you.
                            </p>
                            <p>
                              <b>Limitation of Liability</b>
                            </p>
                            <p>
                              WE DO NOT EXCLUDE OR LIMIT OUR LIABILITY TO YOU
                              WHERE IT WOULD BE ILLEGAL TO DO SO—THIS INCLUDES
                              ANY LIABILITY FOR SETC Zone OR ITS AFFILIATES’
                              FRAUD OR FRAUDULENT MISREPRESENTATION IN PROVIDING
                              THE SERVICES. IN COUNTRIES WHERE THE FOLLOWING
                              TYPES OF EXCLUSIONS ARE NOT ALLOWED, WE ARE
                              RESPONSIBLE TO YOU ONLY FOR LOSSES AND DAMAGES
                              THAT ARE A REASONABLY FORESEEABLE RESULT OF OUR
                              FAILURE TO USE REASONABLE CARE AND SKILL OR OUR
                              BREACH OF OUR CONTRACT WITH YOU. THIS PARAGRAPH
                              DOES NOT AFFECT CONSUMER RIGHTS THAT CANNOT BE
                              WAIVED OR LIMITED BY ANY CONTRACT OR AGREEMENT.
                            </p>
                            <p>
                              IN COUNTRIES WHERE EXCLUSIONS OR LIMITATIONS OF
                              LIABILITY ARE ALLOWED, SETC Zone, ITS AFFILIATES,
                              SUPPLIERS, OR DISTRIBUTORS WILL NOT BE LIABLE FOR:
                            </p>
                            <ol>
                              <li>
                                ANY INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE,
                                EXEMPLARY, OR CONSEQUENTIAL DAMAGES, OR
                              </li>
                              <li>
                                ANY LOSS OF USE, DATA, BUSINESS, OR PROFITS,
                                REGARDLESS OF LEGAL THEORY.
                              </li>
                            </ol>
                            <p>
                              THESE EXCLUSIONS OR LIMITATIONS WILL APPLY
                              REGARDLESS OF WHETHER OR NOT SETC Zone OR ANY OF
                              ITS AFFILIATES HAS BEEN WARNED OF THE POSSIBILITY
                              OF SUCH DAMAGES.
                            </p>
                            <p>
                              IF YOU USE THE SERVICES FOR ANY COMMERCIAL,
                              BUSINESS, OR RE-SALE PURPOSE, SETC Zone, ITS
                              AFFILIATES, SUPPLIERS, OR DISTRIBUTORS WILL HAVE
                              NO LIABILITY TO YOU FOR ANY LOSS OF PROFIT, LOSS
                              OF BUSINESS, BUSINESS INTERRUPTION, OR LOSS OF
                              BUSINESS OPPORTUNITY. SETC Zones AND ITS
                              AFFILIATES ARE NOT RESPONSIBLE FOR THE CONDUCT,
                              WHETHER ONLINE OR OFFLINE, OF ANY USER OF THE
                              SERVICES.
                            </p>
                            <p>
                              <b>Resolving Disputes</b>
                            </p>
                            <p>
                              Let’s Try To Sort Things Out First. We want to
                              address your concerns without needing a formal
                              legal case. Before filing a claim against SETC
                              Zone or our affiliates, you agree to try to
                              resolve the dispute informally by contacting{" "}
                              <a href="mailto:info@setczone.com">
                                info@setczone.com
                              </a>
                              . We will try to resolve the dispute informally by
                              contacting you via email.
                            </p>
                            <p>
                              Judicial forum for disputes. You and SETC Zone
                              agree that any judicial proceeding to resolve
                              claims relating to these Terms or the Services
                              will be brought in the federal or state courts of
                              Texas, subject to the mandatory arbitration
                              provisions below. Both you and SETC Zone consent
                              to venue and personal jurisdiction in such courts.
                            </p>
                            <p>
                              We Both Agree To Arbitrate. You and SETC Zone
                              agree to resolve any claims relating to these
                              Terms or the Services through final and binding
                              arbitration by a single arbitrator. This includes
                              disputes arising out of or relating to
                              interpretation or application of this “Mandatory
                              Arbitration Provisions” section, including its
                              enforceability, revocability, or validity.
                            </p>
                            <p>
                              Arbitration Procedures. The American Arbitration
                              Association (AAA) will administer the arbitration
                              under its Commercial Arbitration Rules and the
                              Supplementary Procedures for Consumer Related
                              Disputes. The arbitration will be held in the
                              United States county where you live or work,
                              Texas, or any other location we agree to.
                            </p>
                            <p>
                              NO CLASS ACTIONS. You may only resolve disputes
                              with us on an individual basis and may not bring a
                              claim as a plaintiff or a class member in a class,
                              consolidated, or representative action. Class
                              arbitrations, class actions, private attorney
                              general actions, and consolidation with other
                              arbitrations are not allowed. If this specific
                              paragraph is held unenforceable, then the entirety
                              of this “Mandatory Arbitration Provisions” section
                              will be deemed void.
                            </p>
                            <p>
                              <b>Controlling Law</b>
                            </p>
                            <p>
                              These Terms will be governed by California law
                              except for its conflicts of laws principles.
                              However, some countries (including those in the
                              European Union) have laws that require agreements
                              to be governed by the local laws of the consumer's
                              country. This paragraph does not override those
                              laws.
                            </p>
                            <p>
                              <b>Entire Agreement</b>
                            </p>
                            <p>
                              These Terms constitute the entire agreement
                              between you and SETC Zone with respect to the
                              subject matter of these Terms and supersede and
                              replace any other prior or contemporaneous
                              agreements or terms and conditions applicable to
                              the subject matter of these Terms. These Terms
                              create no third-party beneficiary rights.
                            </p>
                            <p>
                              <b>
                                Revised Waiver, Severability &amp; Assignment
                                Terms
                              </b>
                            </p>
                            <p>
                              At SETC Zone, failure to enforce a particular
                              provision does not mean that we waive our right to
                              enforce it later. If a provision is deemed
                              unenforceable, the remaining terms of the
                              agreement will continue to remain in effect, and
                              we will substitute the unenforceable provision
                              with one that reflects our intentions as closely
                              as possible. Please note that you cannot assign
                              any of your rights under these Terms, and any
                              attempt to do so will be considered invalid.
                              However, we reserve the right to assign our rights
                              to any affiliates, subsidiaries, or any successor
                              in interest of any business associated with the
                              Services.
                            </p>
                            <p>
                              <b>Modifications Terms</b>
                            </p>
                            <p>
                              We are committed to providing the best possible
                              services to our users, which may require us to
                              revise these Terms from time to time. Such
                              revisions may be made to reflect changes in the
                              law, new regulatory requirements, or improvements
                              and enhancements made to our Services. If any
                              modification affects your use of the Services or
                              your legal rights, we will notify you before the
                              effective date of the update. We will send you an
                              email to the email address associated with your
                              account or send you an in-product notification.
                              Please note that the updated terms will take
                              effect no less than 30 days from when we notify
                              you.
                            </p>
                            <button
                              type="button"
                              class="btn btn-primary px-4 py-1"
                              id="flexCheckDefault"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            >
                              Done
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        onClick={handleNext}
                        type="button"
                        className="px-3 py-2 next-step"
                      >
                        {activeStep === steps.length - 1
                          ? "Submit"
                          : "Lets Get Started"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <div className="step step-2 ">
            <div className="container ">
              <div className="row  justify-content-center" style={{marginTop: -40}}>
                <div className="col-lg-12">
                  <div className="start-application">
                    <div className="row roww">
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div class="img-applic-content border-0">
                          <div class="step2_content w-100 pb-2">
                            {/* <LinearProgress
                      variant="determinate"
                      sx={{
                        height: "14px",
                        borderRadius: "6px",
                        marginBottom: 5,
                        backgroundColor: "#f0f0f0",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "rgb(13, 189, 243);",
                        },
                      }}
                      value={getProgressPercentage()}
                    /> */}
                            <div class="step_1_de">
                              <h1
                                style={{
                                  color: "#1A2C57",
                                  fontSize: "clamp(22px, 4vw, 42px) !important",
                                  width: "70%",
                                  margin: "auto",
                                }}
                              >
                                How Does The Pre-Qualification Application Work?
                              </h1>
                            </div>
                            <div class="row justify-content-center">
                              <div class="col-lg-12">
                                <div class="row align-items-center eret pb-3">
                                  <div class="col-lg-12 col-md-12 d-flex justify-content-center">
                                    <div class="">
                                      <div class="st_2_we d-flex align-items-start my-2">
                                        <div style={{ marginTop: "18.5px" }}>
                                          <span class="text-white">
                                            <CheckCircle
                                              style={{
                                                color: "#DC3545",
                                                width: "30px",
                                                height: "30px",
                                              }}
                                            />
                                          </span>
                                        </div>
                                        <h5
                                          class="step2_h5"
                                          style={{
                                            color: "#00b6ff",
                                            marginLeft: 2,
                                          }}
                                        >
                                          {" "}
                                          Answer 4 questions to determine
                                          Pre-qualifications for upto:
                                        </h5>
                                      </div>
                                      <div class="d-flex align-items-start justify-content-center">
                                        <h2
                                          class="tep2_h5 text-center"
                                          style={{
                                            color: "#00b6ff",
                                            fontWeight: "bold",
                                            fontSize:
                                              "clamp(30px, 4vw, 42px) !important",
                                          }}
                                        >
                                          {" "}
                                          $32,220.00
                                        </h2>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="step2_content mt-4 w-100">
                            <div class="text-center d-flex justify-content-center">
                              <h1
                                class="mb-3 text-center"
                                style={{
                                  width: "fit-content",
                                  fontSize: "clamp(22px, 4vw, 42px) !important",
                                  color: "#1A2C57",
                                }}
                              >
                                What if I am pre-qualified?
                              </h1>
                            </div>
                            <div class="row justify-content-center mt-md-4 mt-sm-3">
                              <div class="col-lg-12">
                                <div class="row align-items-center">
                                  <div class="col-lg-12 d-flex justify-content-center">
                                    <div class="d-flex flex-column gap-2">
                                      <div class=" st_2_we d-flex align-items-start w-100">
                                        <div style={{ marginTop: "18.5px" }}>
                                          <span class="text-white">
                                            <CheckCircle
                                              style={{
                                                color: "#DC3545",
                                                width: "30px",
                                                height: "30px",
                                              }}
                                            />
                                          </span>
                                        </div>
                                        <h5
                                          class="step2_h5"
                                          style={{ color: "#00b6ff" }}
                                        >
                                          Continue the application by answering
                                          4 additional questions.
                                        </h5>
                                      </div>

                                      <div class="st_2_we d-flex align-items-start w-100">
                                        <div style={{ marginTop: "18.5px" }}>
                                          <span class="text-white">
                                            <CheckCircle
                                              style={{
                                                color: "#DC3545",
                                                width: "30px",
                                                height: "30px",
                                              }}
                                            />
                                          </span>
                                        </div>
                                        <h5
                                          class="step2_h5"
                                          style={{ color: "#00b6ff" }}
                                        >
                                          Upload necessary documents
                                        </h5>
                                      </div>
                                      <div class="st_2_we d-flex align-items-start w-100">
                                        <div style={{ marginTop: "18.5px" }}>
                                          <span class="text-white">
                                            <CheckCircle
                                              style={{
                                                color: "#DC3545",
                                                width: "30px",
                                                height: "30px",
                                              }}
                                            />
                                          </span>
                                        </div>
                                        <h5
                                          class="step2_h5"
                                          style={{ color: "#00b6ff" }}
                                        >
                                          Receive a calculated refund amount
                                        </h5>
                                      </div>
                                      <div class="st_2_we d-flex align-items-start w-100">
                                        <div style={{ marginTop: "18.5px" }}>
                                          <span class="text-white">
                                            <CheckCircle
                                              style={{
                                                color: "#DC3545",
                                                width: "30px",
                                                height: "30px",
                                              }}
                                            />
                                          </span>
                                        </div>
                                        <h5
                                          class="step2_h5"
                                          style={{ color: "#00b6ff" }}
                                        >
                                          Our professinal Team will process and
                                          file your return
                                        </h5>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="d-flex justify-content-center  mt-5 mb-5 w-100">
                            <button
                              onClick={handlePrevious}
                              type="button"
                              className="px-3 py-3 prev-step"
                            >
                              Previous
                            </button>
                            <button
                              onClick={handleNext}
                              type="button"
                              class="btn btn-primary next-step step2_next mx-1"
                            >
                              Let's Get Started!
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step step-3">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <LinearProgress
                    variant="determinate"
                    sx={{
                      height: "14px",
                      borderRadius: "6px",
                      marginBottom: 5,
                      backgroundColor: "#f0f0f0",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "rgb(13, 189, 243);",
                      },
                    }}
                    value={getProgressPercentage()}
                  />
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="img-applic-content">
                          <h1
                            className="text-center"
                            style={{ color: "rgb(13, 189, 243)" }}
                          >
                            Are you eligible?
                          </h1>
                          <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                            }}
                            className="text-center"
                          >
                            Question 1 of 4
                          </h3>
                          <div style={{ marginTop: 40 }}>
                            <label
                              for="self_employed_from"
                              className="form-label headng "
                              style={{ fontWeight: "600" }}
                            >
                              Were you self-employed from 4/1/2020-9/30/2021?
                            </label>
                            <div className="optio mb-2">
                              <label for="self_employed_from_yes">
                                <p
                                  style={{
                                    backgroundColor:
                                      formData.selfEmployedFrom === "Yes"
                                        ? "lightblue"
                                        : "initial",
                                  }}
                                >
                                  <input
                                    className="form-check-input"
                                    class={`form-check-input ${
                                      errors.selfEmployedFrom
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    type="radio"
                                    name="selfEmployedFrom"
                                    checked={
                                      formData.selfEmployedFrom === "Yes"
                                    }
                                    value="Yes"
                                    id="self_employed_from_yes"
                                    onChange={handleInputChange}
                                  />
                                  Yes
                                </p>
                              </label>
                            </div>

                            <div className="optio">
                              <label for="self_employed_from_no">
                                <p
                                  style={{
                                    backgroundColor:
                                      formData.selfEmployedFrom === "No"
                                        ? "lightblue"
                                        : "initial",
                                  }}
                                >
                                  <input
                                    class={`form-check-input ${
                                      errors.selfEmployedFrom
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    type="radio"
                                    name="selfEmployedFrom"
                                    value="No"
                                    checked={formData.selfEmployedFrom === "No"}
                                    id="self_employed_from_no"
                                    onChange={handleInputChange}
                                  />
                                  No
                                </p>
                              </label>
                            </div>

                            {formData.selfEmployedFrom === "No" &&
                              activeErrorQualifyOne && (
                                <div>
                                  <h4 style={{ color: "#e62e2d" }}>
                                    We are sorry. By answering “No” to the above
                                    question, you will not be eligible for the
                                    SETC program.
                                  </h4>
                                </div>
                              )}

                            <div className="d-flex justify-content-end mt-3">
                              <button
                                onClick={handlePrevious}
                                type="button"
                                className="px-3 py-2 prev-step"
                              >
                                Previous
                              </button>
                              <button
                                onClick={handleNext}
                                type="button"
                                className="px-3 py-2 next-step"
                              >
                                {activeStep === steps.length - 1
                                  ? "Submit"
                                  : "Next"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="step step-4">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <LinearProgress
                    variant="determinate"
                    sx={{
                      height: "14px",
                      borderRadius: "6px",
                      marginBottom: 5,
                      backgroundColor: "#f0f0f0",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "rgb(13, 189, 243);",
                      },
                    }}
                    value={getProgressPercentage()}
                  />
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="img-applic-content">
                          <h1
                            className="text-center"
                            style={{ color: "rgb(13, 189, 243)" }}
                          >
                            Are you eligible?
                          </h1>
                          <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                            }}
                            className="text-center"
                          >
                            Question 2 of 4
                          </h3>
                          <div style={{ marginTop: 40 }}>
                            <h1
                              style={{
                                fontSize: "24px",
                                color: "rgb(13, 189, 243)",
                              }}
                            >
                              Did you file your 1040 Schedule SE
                              (Self-Employment Tax) for the years of 2020 or
                              2021?
                            </h1>

                            <div className="optio mb-2">
                              <label for="self_employment_from_yes">
                                <p
                                  style={{
                                    backgroundColor:
                                      formData.scheduleSelfEmployement === "Yes"
                                        ? "lightblue"
                                        : "initial",
                                  }}
                                >
                                  <input
                                    className={`form-check-input ${
                                      errors.scheduleSelfEmployement
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    type="radio"
                                    name="scheduleSelfEmployement"
                                    checked={
                                      formData.scheduleSelfEmployement === "Yes"
                                    }
                                    value="Yes"
                                    id="self_employment_from_yes"
                                    onChange={handleInputChange}
                                  />
                                  Yes
                                </p>
                              </label>
                            </div>

                            <div className="optio">
                              <label for="self_employment_from_no">
                                <p
                                  style={{
                                    backgroundColor:
                                      formData.scheduleSelfEmployement === "No"
                                        ? "lightblue"
                                        : "initial",
                                  }}
                                >
                                  <input
                                    className={`form-check-input ${
                                      errors.scheduleSelfEmployement
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    type="radio"
                                    name="scheduleSelfEmployement"
                                    checked={
                                      formData.scheduleSelfEmployement === "No"
                                    }
                                    value="No"
                                    id="self_employment_from_no"
                                    onChange={handleInputChange}
                                  />
                                  No
                                </p>
                              </label>
                            </div>

                            {formData.scheduleSelfEmployement === "No" &&
                              activeErrorQualifyTwoo && (
                                <div>
                                  <h4 style={{ color: "#e62e2d" }}>
                                    We are sorry. By answering “No” to the above
                                    question, you will not be eligible for the
                                    SETC program.
                                  </h4>
                                </div>
                              )}

                            <div className="d-flex justify-content-end mt-3">
                              <button
                                onClick={handlePrevious}
                                type="button"
                                className="px-3 py-2 prev-step"
                              >
                                Previous
                              </button>
                              <button
                                onClick={handleNext}
                                type="button"
                                className="px-3 py-2 next-step"
                              >
                                {activeStep === steps.length - 1
                                  ? "Submit"
                                  : "Next"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="step step-5">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <LinearProgress
                    variant="determinate"
                    sx={{
                      height: "14px",
                      borderRadius: "6px",
                      marginBottom: 5,
                      backgroundColor: "#f0f0f0",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "rgb(13, 189, 243);",
                      },
                    }}
                    value={getProgressPercentage()}
                  />
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="img-applic-content">
                          <h1
                            className="text-center"
                            style={{ color: "rgb(13, 189, 243)" }}
                          >
                            Are you eligible?
                          </h1>
                          <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                            }}
                            className="text-center"
                          >
                            Question 3 of 4
                          </h3>
                          <div style={{ marginTop: 40 }}>
                            <label
                              for="positive_net_earning"
                              className="form-label headng "
                              style={{ fontWeight: "600" }}
                            >
                              Did you have positive net earnings for the years
                              of 2020 or 2021? This can be found in{" "}
                              <span
                                style={{
                                  color: "red",
                                  cursor: "pointer",
                                  fontSize: 23,
                                  textDecoration: "underline",
                                }}
                                onClick={() =>
                                  window.open(PdfNetEarning, "_blank")
                                }
                              >
                                line 6 of your 1040 Schedule SE.
                              </span>
                              (If this line is blank or negative, select No.)
                            </label>

                            <div className="optio mb-2">
                              <label for="positive_net_earning_yes">
                                <p
                                  style={{
                                    backgroundColor:
                                      formData.positive_net_earning === "Yes"
                                        ? "lightblue"
                                        : "initial",
                                  }}
                                >
                                  <input
                                    className={`form-check-input ${
                                      errors.positive_net_earning
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    type="radio"
                                    name="positive_net_earning"
                                    checked={
                                      formData.positive_net_earning === "Yes"
                                    }
                                    value="Yes"
                                    id="positive_net_earning_yes"
                                    onChange={handleInputChange}
                                  />
                                  Yes
                                </p>
                              </label>
                            </div>
                            <div className="optio">
                              <label for="positive_net_earning_no">
                                <p
                                  style={{
                                    backgroundColor:
                                      formData.positive_net_earning === "No"
                                        ? "lightblue"
                                        : "initial",
                                  }}
                                >
                                  <input
                                    class={`form-check-input ${
                                      errors.positive_net_earning
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    type="radio"
                                    name="positive_net_earning"
                                    checked={
                                      formData.positive_net_earning === "No"
                                    }
                                    value="No"
                                    id="positive_net_earning_no"
                                    onChange={handleInputChange}
                                  />
                                  No
                                </p>
                              </label>
                            </div>
                            {formData.positive_net_earning === "No" &&
                              activeErrorQualifyThree && (
                                <div>
                                  <h4 style={{ color: "#e62e2d" }}>
                                    We are sorry. By answering “No” to the above
                                    question, you will not be eligible for the
                                    SETC program.
                                  </h4>
                                </div>
                              )}

                            <div className="d-flex justify-content-end mt-3">
                              <button
                                onClick={handlePrevious}
                                type="button"
                                className="px-3 py-2 prev-step"
                              >
                                Previous
                              </button>
                              <button
                                onClick={handleNext}
                                type="button"
                                className="px-3 py-2 next-step"
                              >
                                {activeStep === steps.length - 1
                                  ? "Submit"
                                  : "Next"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="step step-6">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <LinearProgress
                    variant="determinate"
                    sx={{
                      height: "14px",
                      borderRadius: "6px",
                      marginBottom: 5,
                      backgroundColor: "#f0f0f0",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "rgb(13, 189, 243);",
                      },
                    }}
                    value={getProgressPercentage()}
                  />
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="img-applic-content">
                          <h1
                            className="text-center"
                            style={{ color: "rgb(13, 189, 243)" }}
                          >
                            Are you eligible?
                          </h1>
                          <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                            }}
                            className="text-center"
                          >
                            Question 4 of 4
                          </h3>
                          <div style={{ marginTop: 40 }}>
                            <label
                              for="covid_related_issues"
                              className="form-label headng "
                              style={{ fontWeight: "600" }}
                            >
                              Did you miss any self employment work in 2020 or
                              2021 due to Covid-19 related issues.{" "}
                              <span>
                                <a
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal_step_6"
                                  className="d-none d-md-inline"
                                  style={{
                                    color: "red",
                                    cursor: "pointer",
                                    fontSize: 23,
                                    textDecoration: "underline",
                                  }}
                                >
                                  Click here for examples
                                </a>
                                <a
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModalS_step_6"
                                  className="d-inline d-md-none"
                                  style={{
                                    color: "red",
                                    cursor: "pointer",
                                    fontSize: 23,
                                    textDecoration: "underline",
                                  }}
                                >
                                  Click here for examples
                                </a>
                              </span>{" "}
                              From 4/1/2020-9/30/2021
                            </label>

                            <div className="optio mb-2">
                              <label for="covid_related_issues_yes">
                                <p
                                  style={{
                                    backgroundColor:
                                      formData.covid_related_issues === "Yes"
                                        ? "lightblue"
                                        : "initial",
                                  }}
                                >
                                  <input
                                    class={`form-check-input ${
                                      errors.covid_related_issues
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    type="radio"
                                    name="covid_related_issues"
                                    checked={
                                      formData.covid_related_issues === "Yes"
                                    }
                                    value="Yes"
                                    id="covid_related_issues_yes"
                                    onChange={handleInputChange}
                                  />
                                  Yes
                                </p>
                              </label>
                            </div>
                            <div className="optio">
                              <label for="covid_related_issues_no">
                                <p
                                  style={{
                                    backgroundColor:
                                      formData.covid_related_issues === "No"
                                        ? "lightblue"
                                        : "initial",
                                  }}
                                >
                                  <input
                                    class={`form-check-input ${
                                      errors.covid_related_issues
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    type="radio"
                                    name="covid_related_issues"
                                    checked={
                                      formData.covid_related_issues === "No"
                                    }
                                    value="No"
                                    id="covid_related_issues_no"
                                    onChange={handleInputChange}
                                  />
                                  No
                                </p>
                              </label>
                            </div>
                            {formData.covid_related_issues === "No" &&
                              activeErrorQualifyFive && (
                                <div>
                                  <h4 style={{ color: "#e62e2d" }}>
                                    We are sorry. By answering “No” to the above
                                    question, you will not be eligible for the
                                    SETC program.
                                  </h4>
                                </div>
                              )}
                            <div className="d-flex justify-content-end mt-3">
                              <button
                                onClick={handlePrevious}
                                type="button"
                                className="px-3 py-2 prev-step"
                              >
                                Previous
                              </button>
                              <button
                                onClick={handleNext}
                                type="button"
                                className="px-3 py-2 next-step"
                              >
                                {activeStep === steps.length - 1
                                  ? "Submit"
                                  : "Next"}
                              </button>
                            </div>

                            <div
                              className="modal fade"
                              id="exampleModal_step_6"
                              tabindex="-1"
                              aria-labelledby="exampleModalLabel"
                              style={{
                                display: "none",
                                padding: "0px 40px 20px 40px",
                              }}
                              aria-hidden="true"
                            >
                              <div
                                className="modal-dialog modal-dialog-centered "
                                style={{ maxWidth: "800px" }}
                              >
                                <div
                                  className="modal-content"
                                  style={{ height: "auto" }}
                                >
                                  <div
                                    className="modal-header"
                                    style={{ borderBottom: "none" }}
                                  >
                                    <h1
                                      className="modal-title fs-5"
                                      id="exampleModalLabel"
                                    ></h1>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div
                                    className="modal-body"
                                    style={{ padding: "0px 40px" }}
                                  >
                                    <div style={{ padding: "20px 30px" }}>
                                      <div className="text-center">
                                        <h2
                                          style={{
                                            color: "#0cc0df",
                                            fontsize: "clamp(16px, 2vw, 24px)",
                                          }}
                                        >
                                          Am I eligible for SETC Tax Credits?
                                        </h2>
                                      </div>

                                      <div>
                                        <p>
                                          During 2020 and 2021 millions of small
                                          businesses were negatively impacted by
                                          covid-19. If you were unable to work
                                          or your business experienced any of
                                          the following issues during 2020 and
                                          2021 due to covid-19 you may be
                                          eligible for the SETC program:
                                        </p>
                                        <ul>
                                          <li>
                                            You took time off of work in 2020 or
                                            2021 due to covid-19 or to care for
                                            someone with covid-19 during the
                                            same period.
                                          </li>
                                          <li>
                                            You took time off of work in 2020 or
                                            2021 to care for a child under 18
                                            years old due to school or daycare
                                            closures.
                                          </li>
                                          <li>
                                            You took time off in 2020 or 2021
                                            due to covid-19 to care for a loved
                                            one such as a spouse, parents, etc.
                                          </li>
                                          <li>
                                            A government order imposed a
                                            quarantine or isolation.
                                          </li>
                                          <li>
                                            You were having symptoms related to
                                            Covid-19 while also waiting for an
                                            appointment with your doctor.
                                          </li>
                                          <li>
                                            You were waiting for test results
                                            related to COVID-19.
                                          </li>
                                          <li>
                                            You were getting a Covid-19
                                            Vaccination
                                          </li>
                                          <li>
                                            You were experiencing side effects
                                            from the COVID-19 vaccine
                                          </li>
                                          <li>
                                            Your doctor recommended you
                                            self-quarantine
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div
                              className="modal fade"
                              id="exampleModalS_step_6"
                              tabIndex="-1"
                              aria-labelledby="exampleModalLabel"
                              style={{ display: "none" }}
                              aria-hidden="true"
                            >
                              <div
                                className="modal-dialog modal-dialog-centered"
                                style={{
                                  maxWidth: "100%",
                                  margin: "0",
                                  width: "100%",
                                }}
                              >
                                <div
                                  className="modal-content"
                                  style={{
                                    minHeight: "100vh",
                                    maxHeight: "100vh",
                                    overflowY: "auto",
                                  }}
                                >
                                  <div
                                    className="modal-header"
                                    style={{ borderBottom: "none" }}
                                  >
                                    <h1
                                      className="modal-title fs-5"
                                      id="exampleModalLabel"
                                    ></h1>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div
                                    className="modal-body"
                                    style={{
                                      padding: "20px",
                                      fontSize: "clamp(16px, 2vw, 24px)",
                                    }}
                                  >
                                    <div style={{ padding: "20px 0" }}>
                                      <div className="text-center">
                                        <h2 style={{ color: "#0cc0df" }}>
                                          Am I eligible for SETC Tax Credits?
                                        </h2>
                                      </div>

                                      <div>
                                        <p>
                                          During 2020 and 2021, millions of
                                          small businesses were negatively
                                          impacted by COVID-19. If you were
                                          unable to work or your business
                                          experienced any of the following
                                          issues during 2020 and 2021 due to
                                          COVID-19, you may be eligible for the
                                          SETC program:
                                        </p>
                                        <ul style={{ paddingLeft: "20px" }}>
                                          <li>
                                            You took time off of work in 2020 or
                                            2021 due to COVID-19 or to care for
                                            someone with COVID-19 during the
                                            same period.
                                          </li>
                                          <li>
                                            You took time off of work in 2020 or
                                            2021 to care for a child under 18
                                            years old due to school or daycare
                                            closures.
                                          </li>
                                          <li>
                                            You took time off in 2020 or 2021
                                            due to COVID-19 to care for a loved
                                            one such as a spouse, parent, etc.
                                          </li>
                                          <li>
                                            A government order imposed a
                                            quarantine or isolation.
                                          </li>
                                          <li>
                                            You were having symptoms related to
                                            COVID-19 while also waiting for an
                                            appointment with your doctor.
                                          </li>
                                          <li>
                                            You were waiting for test results
                                            related to COVID-19.
                                          </li>
                                          <li>
                                            You were getting a COVID-19
                                            vaccination.
                                          </li>
                                          <li>
                                            You were experiencing side effects
                                            from the COVID-19 vaccine.
                                          </li>
                                          <li>
                                            Your doctor recommended you
                                            self-quarantine.
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="step step-7">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <LinearProgress
                    variant="determinate"
                    sx={{
                      height: "14px",
                      borderRadius: "6px",
                      marginBottom: 5,
                      backgroundColor: "#f0f0f0",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "rgb(13, 189, 243);",
                      },
                    }}
                    value={getProgressPercentage()}
                  />
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="img-applic-content-congrts border-0">
                          <div
                            style={boxStyle}
                            className="desktop-box"
                            css={styles[mediaQuery]}
                          >
                            <Confetti
                              width={width}
                              height={height}
                              style={confettiStyle}
                            />
                            <div style={{ textAlign: "center" }}>
                              <h1>Congratulations!</h1>
                              <p
                                style={{
                                  color: "green",
                                  fontSize: 25,
                                  fontWeight: 600,
                                  fontStyle: "Outfitt",
                                }}
                              >
                                Your Pre-Qualified for up to $32,220.00!!!
                              </p>
                              <label
                                htmlFor="congrats"
                                className="form-label headng text-center mt-3"
                                style={{
                                  fontWeight: "500",
                                  textAlign: "center !important",
                                }}
                              >
                                Based on the answers you provided you are
                                prequalified to receive the Self Employed Tax
                                Credit. Click below to continue your
                                application!
                              </label>
                            </div>
                          </div>
                          <div
                            style={{ ...boxStyle, ...mobileBoxStyle }}
                            className="mobile-box"
                            css={styles[mediaQuery]}
                          >
                            <Confetti
                              width={width * 0.6} // Adjusted width for mobile screens
                              height={height * 0.6} // Adjusted height for mobile screens
                              style={confettiStyle}
                            />
                            <div style={{ textAlign: "center" }}>
                              <h1 style={{ fontSize: "22px !important" }}>
                                Congratulations!
                              </h1>
                              <p style={{ fontSize: "14px !important" }}>
                                Your Pre-Qualified for up to $32,220.00!!!
                              </p>
                              <label
                                htmlFor="congrats"
                                className="form-label headng text-center"
                                style={{
                                  fontWeight: "600",
                                  textAlign: "center !important",
                                  fontSize: "13px !important",
                                }}
                              >
                                Based on the answers you provided you are
                                prequalified to receive the Self Employed Tax
                                Credit. Click below to continue your
                                application!
                              </label>
                              <p>Click below to continue your application!</p>
                            </div>
                          </div>
                          <div style={{ marginTop: 40 }}>
                            <div class="d-flex justify-content-center  mt-5 mb-5 w-100">
                              <button
                                onClick={handlePrevious}
                                type="button"
                                className="px-3 py-3 prev-step"
                              >
                                Previous
                              </button>
                              <button
                                onClick={handleNext}
                                type="button"
                                class="btn btn-primary next-step step2_next mx-1"
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="step step-8 ">
            <div className="container ">
              <div className="row  justify-content-center" style={{marginTop: -40}}>
                <div className="col-lg-12">
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-8 col-md-8 col-sm-12 ">
                        <div className="img-applic-content border-0">
                          <div
                            className="step2_content ss"
                            style={{ marginTop: "8px !important" }}
                          >
                            <h2 style={{ color: "#DC3545" }}>
                              Welcome To the SETC Eligibility Application!
                            </h2>
                            <h1 class="wee">How does this work?</h1>

                            <div class="step2_content mt-0 w-100">
                              <div class="row justify-content-center mt-md-4 mt-sm-3">
                                <div
                                  class="col-lg-12"
                                  style={{ marginTop: "-20px" }}
                                >
                                  <div class="row align-items-center">
                                    <div class="col-lg-12 d-flex justify-content-center">
                                      <div class="d-flex flex-column">
                                        <div class=" st_2_we d-flex align-items-start w-100">
                                          <div style={{ marginTop: "18.5px" }}>
                                            <span class="text-white">
                                              <CheckCircle
                                                style={{
                                                  color: "#DC3545",
                                                  width: "30px",
                                                  height: "30px",
                                                }}
                                              />
                                            </span>
                                          </div>
                                          <h5
                                            class="step2_h5"
                                            style={{ color: "#00b6ff" }}
                                          >
                                            Answer 13 questions of the
                                            questionnaire
                                          </h5>
                                        </div>

                                        <div class="st_2_we d-flex align-items-start w-100">
                                          <div style={{ marginTop: "18.5px" }}>
                                            <span class="text-white">
                                              <CheckCircle
                                                style={{
                                                  color: "#DC3545",
                                                  width: "30px",
                                                  height: "30px",
                                                }}
                                              />
                                            </span>
                                          </div>
                                          <h5
                                            class="step2_h5"
                                            style={{ color: "#00b6ff" }}
                                          >
                                            Get a calculated estimate amount
                                          </h5>
                                        </div>
                                        <div class="st_2_we d-flex align-items-start w-100">
                                          <div style={{ marginTop: "18.5px" }}>
                                            <span class="text-white">
                                              <CheckCircle
                                                style={{
                                                  color: "#DC3545",
                                                  width: "30px",
                                                  height: "30px",
                                                }}
                                              />
                                            </span>
                                          </div>
                                          <h5
                                            class="step2_h5"
                                            style={{ color: "#00b6ff" }}
                                          >
                                            Upload your documents
                                          </h5>
                                        </div>
                                        {/* <div class="st_2_we d-flex align-items-start w-100">
                                          <div style={{ marginTop: "18.5px" }}>
                                            <span class="text-white">
                                              <CheckCircle
                                                style={{
                                                  color: "#DC3545",
                                                  width: "30px",
                                                  height: "30px",
                                                }}
                                              />
                                            </span>
                                          </div>
                                          <h5
                                            class="step2_h5"
                                            style={{ color: "#00b6ff" }}
                                          >
                                            Receive your Exact calculation
                                          </h5>
                                        </div> */}

                                        <div class="st_2_we d-flex align-items-start w-100">
                                          <div style={{ marginTop: "18.5px" }}>
                                            <span class="text-white">
                                              <CheckCircle
                                                style={{
                                                  color: "#DC3545",
                                                  width: "30px",
                                                  height: "30px",
                                                }}
                                              />
                                            </span>
                                          </div>
                                          <h5
                                            class="step2_h5"
                                            style={{ color: "#00b6ff" }}
                                          >
                                            Our Tex professinals will process
                                            and file your return
                                          </h5>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="step2_content mt-4 w-100">
                            <div class="text-center d-flex justify-content-center">
                              <h1
                                class="mb-3 text-center"
                                style={{
                                  width: "fit-content",
                                  fontSize: "clamp(22px, 4vw, 42px) !important",
                                  color: "#1A2C57",
                                }}
                              >
                                What if I am pre-qualified?
                              </h1>
                            </div>
                            <div class="row justify-content-center mt-md-4 mt-sm-3">
                              <div class="col-lg-12">
                                <div class="row align-items-center">
                                  <div class="col-lg-12 d-flex justify-content-center">
                                    <div class="d-flex flex-column ">
                                      <div class=" st_2_we d-flex align-items-start w-100">
                                        <div style={{ marginTop: "18.5px" }}>
                                          <span class="text-white">
                                            <CheckCircle
                                              style={{
                                                color: "#DC3545",
                                                width: "30px",
                                                height: "30px",
                                              }}
                                            />
                                          </span>
                                        </div>
                                        <h5
                                          class="step2_h5"
                                          style={{ color: "#00b6ff" }}
                                        >
                                          2019 Schedule C (Form 1040){" "}
                                          <span
                                            style={{
                                              color: "red",
                                              marginTop: 1,
                                              fontWeight: "600",
                                              cursor: "pointer",
                                              textDecoration: "underline",
                                            }}
                                            onClick={() =>
                                              window.open(Pdf2019, "_blank")
                                            }
                                          >
                                            {" "}
                                            Click For Example
                                          </span>
                                        </h5>
                                      </div>

                                      <div class="st_2_we d-flex align-items-start w-100">
                                        <div style={{ marginTop: "18.5px" }}>
                                          <span class="text-white">
                                            <CheckCircle
                                              style={{
                                                color: "#DC3545",
                                                width: "30px",
                                                height: "30px",
                                              }}
                                            />
                                          </span>
                                        </div>
                                        <h5
                                          class="step2_h5"
                                          style={{ color: "#00b6ff" }}
                                        >
                                          2020 Schedule C (Form 1040){" "}
                                          <span
                                            style={{
                                              color: "red",
                                              marginTop: 1,
                                              fontWeight: "600",
                                              cursor: "pointer",
                                              textDecoration: "underline",
                                            }}
                                            onClick={() =>
                                              window.open(Pdf2020, "_blank")
                                            }
                                          >
                                            {" "}
                                            Click For Example
                                          </span>
                                        </h5>
                                      </div>
                                      <div class="st_2_we d-flex align-items-start w-100">
                                        <div style={{ marginTop: "18.5px" }}>
                                          <span class="text-white">
                                            <CheckCircle
                                              style={{
                                                color: "#DC3545",
                                                width: "30px",
                                                height: "30px",
                                              }}
                                            />
                                          </span>
                                        </div>
                                        <h5
                                          class="step2_h5"
                                          style={{ color: "#00b6ff" }}
                                        >
                                          2021 Schedule C (Form 1040){" "}
                                          <span
                                            style={{
                                              color: "red",
                                              marginTop: 1,
                                              fontWeight: "600",
                                              cursor: "pointer",
                                              textDecoration: "underline",
                                            }}
                                            onClick={() =>
                                              window.open(Pdf2021, "_blank")
                                            }
                                          >
                                            {" "}
                                            Click For Example
                                          </span>
                                        </h5>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="d-flex justify-content-center  mt-5 mb-5 w-100">
                            <button
                              onClick={handlePrevious}
                              type="button"
                              className="px-3 py-3 prev-step"
                            >
                              Previous
                            </button>
                            <button
                              onClick={handleNext}
                              type="button"
                              class="btn btn-primary next-step step2_next mx-1"
                            >
                              Let's Get Started
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 8:
        return (
          <div className="step step-4">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <LinearProgress
                    variant="determinate"
                    sx={{
                      height: "14px",
                      borderRadius: "6px",
                      marginBottom: 5,
                      backgroundColor: "#f0f0f0",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "rgb(13, 189, 243);",
                      },
                    }}
                    value={7.69}
                  />
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="img-applic-content">
                          <h1
                            className="text-center"
                            style={{ color: "rgb(13, 189, 243)" }}
                          >
                            Are you eligible?
                          </h1>
                          {/* <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                            }}
                            className="text-center"
                          >
                            Question 1 of 13
                          </h3> */}
                          <div style={{ marginTop: 40 }}>
                            <h1
                              style={{
                                fontSize: "24px",
                                color: "rgb(13, 189, 243)",
                              }}
                            >
                              Did you receive unemployment from April 1st, 2020
                              - December 31st, 2020?
                            </h1>

                            <div className="optio mb-2">
                              <label for="did_receive_unemployement20_yes">
                                <p
                                  style={{
                                    backgroundColor:
                                      formData.did_receive_unemployement20 ===
                                      "Yes"
                                        ? "lightblue"
                                        : "initial",
                                  }}
                                >
                                  <input
                                    className={`form-check-input ${
                                      errors.did_receive_unemployement20
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    type="radio"
                                    name="did_receive_unemployement20"
                                    checked={
                                      formData.did_receive_unemployement20 ===
                                      "Yes"
                                    }
                                    value="Yes"
                                    id="did_receive_unemployement20_yes"
                                    onChange={handleInputChange}
                                  />
                                  Yes
                                </p>
                              </label>
                            </div>

                            <div className="optio">
                              <label for="did_receive_unemployement20_no">
                                <p
                                  style={{
                                    backgroundColor:
                                      formData.did_receive_unemployement20 ===
                                      "No"
                                        ? "lightblue"
                                        : "initial",
                                  }}
                                >
                                  <input
                                    className={`form-check-input ${
                                      errors.did_receive_unemployement20
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    type="radio"
                                    name="did_receive_unemployement20"
                                    checked={
                                      formData.did_receive_unemployement20 ===
                                      "No"
                                    }
                                    value="No"
                                    id="did_receive_unemployement20_no"
                                    onChange={handleInputChange}
                                  />
                                  No
                                </p>
                              </label>
                            </div>

                            {/* {formData.scheduleSelfEmployement === "No" &&
                                activeErrorQualifyTwoo && (
                                  <div>
                                    <h4 style={{ color: "#e62e2d" }}>
                                      We are sorry. By answering “No” to the above
                                      question, you will not be eligible for the
                                      SETC program.
                                    </h4>
                                  </div>
                                )}
   */}
                            <div className="d-flex justify-content-end mt-3">
                              <button
                                onClick={handlePrevious}
                                type="button"
                                className="px-3 py-2 prev-step"
                              >
                                Previous
                              </button>
                              <button
                                onClick={handleNext}
                                type="button"
                                className="px-3 py-2 next-step"
                              >
                                {activeStep === steps.length - 1
                                  ? "Submit"
                                  : "Next"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 9:
        return (
          <div className="step step-4">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <LinearProgress
                    variant="determinate"
                    sx={{
                      height: "14px",
                      borderRadius: "6px",
                      marginBottom: 5,
                      backgroundColor: "#f0f0f0",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "rgb(13, 189, 243);",
                      },
                    }}
                    value={15.38}
                  />
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="img-applic-content">
                          <h1
                            className="text-center"
                            style={{ color: "rgb(13, 189, 243)" }}
                          >
                            Are you eligible?
                          </h1>
                          {/* <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                            }}
                            className="text-center"
                          >
                            Question 2 of 13
                          </h3> */}
                          <div style={{ marginTop: 40 }}>
                            <h1
                              style={{
                                fontSize: "24px",
                                color: "rgb(13, 189, 243)",
                              }}
                            >
                              Did you receive unemployment from January 1st,
                              2021 - September 30th, 2021?
                            </h1>

                            <div className="optio mb-2">
                              <label for="did_receive_unemployement21_yes">
                                <p
                                  style={{
                                    backgroundColor:
                                      formData.did_receive_unemployement21 ===
                                      "Yes"
                                        ? "lightblue"
                                        : "initial",
                                  }}
                                >
                                  <input
                                    className={`form-check-input ${
                                      errors.did_receive_unemployement21
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    type="radio"
                                    name="did_receive_unemployement21"
                                    checked={
                                      formData.did_receive_unemployement21 ===
                                      "Yes"
                                    }
                                    value="Yes"
                                    id="did_receive_unemployement21_yes"
                                    onChange={handleInputChange}
                                  />
                                  Yes
                                </p>
                              </label>
                            </div>

                            <div className="optio">
                              <label for="did_receive_unemployement21_no">
                                <p
                                  style={{
                                    backgroundColor:
                                      formData.did_receive_unemployement21 ===
                                      "No"
                                        ? "lightblue"
                                        : "initial",
                                  }}
                                >
                                  <input
                                    className={`form-check-input ${
                                      errors.did_receive_unemployement21
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    type="radio"
                                    name="did_receive_unemployement21"
                                    checked={
                                      formData.did_receive_unemployement21 ===
                                      "No"
                                    }
                                    value="No"
                                    id="did_receive_unemployement21_no"
                                    onChange={handleInputChange}
                                  />
                                  No
                                </p>
                              </label>
                            </div>

                            {formData.did_receive_unemployement21 === "Yes" &&
                              formData.did_receive_unemployement20 === "Yes" &&
                              activeErrorDidRecieveUnemployement && (
                                <div>
                                  <h4 style={{ color: "#e62e2d" }}>
                                   Based on your answers, we will not be able to help you claim the credit.
                                  </h4>
                                </div>
                              )}

                            <div className="d-flex justify-content-end mt-3">
                              <button
                                onClick={handlePrevious}
                                type="button"
                                className="px-3 py-2 prev-step"
                              >
                                Previous
                              </button>
                              <button
                                onClick={handleNext}
                                type="button"
                                className="px-3 py-2 next-step"
                              >
                                {activeStep === steps.length - 1
                                  ? "Submit"
                                  : "Next"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 10:
        return (
          <div className="step step-9">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <LinearProgress
                    variant="determinate"
                    sx={{
                      height: "14px",
                      borderRadius: "6px",
                      marginBottom: 5,
                      backgroundColor: "#f0f0f0",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "rgb(13, 189, 243);",
                      },
                    }}
                    value={23.07}
                  />
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="img-applic-content">
                          <h1
                            className=""
                            style={{
                              color: "rgb(13, 189, 243)",
                              textAlign: "center ",
                            }}
                          >
                            Are you eligible?
                          </h1>
                          {/* <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                              textAlign: "center ",
                            }}
                            className=" mb-4"
                          >
                            Question 3 of 13
                          </h3> */}
                          {/* </div> */}
                          <label
                            for="self_employed_from"
                            className="form-label headng"
                            style={{ fontWeight: "600" }}
                          >
                            Were you personally sick with Covid, experienced
                            Covid like symptoms, needed to quarantine, underwent
                            testing, and took time off of work in 2020? 4/1/2020-3/31/21 {" "}
                            <span
                              style={{
                                color: "red",
                                cursor: "pointer",
                                fontSize: 21,
                                textDecoration: "underline",
                              }}
                            >
                              (Max 10 days)
                            </span>
                          </label>

                          <div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <div className="optio mb-2">
                                <label for="personallySick2020_yes">
                                  <p
                                    style={{
                                      backgroundColor:
                                        formData.personallySick2020 === "Yes"
                                          ? "lightblue"
                                          : "initial",
                                    }}
                                  >
                                    <input
                                      className="form-check-input"
                                      class={`form-check-input ${
                                        errors.personallySick2020
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      type="radio"
                                      name="personallySick2020"
                                      checked={
                                        formData.personallySick2020 === "Yes"
                                      }
                                      value="Yes"
                                      id="personallySick2020_yes"
                                      onChange={handleInputChange}
                                    />
                                    Yes
                                  </p>
                                </label>
                              </div>
                              <div className="optio">
                                <label for="personallySick2020_no">
                                  <p
                                    style={{
                                      backgroundColor:
                                        formData.personallySick2020 === "No"
                                          ? "lightblue"
                                          : "initial",
                                    }}
                                  >
                                    <input
                                      class={`form-check-input ${
                                        errors.personallySick2020
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      type="radio"
                                      name="personallySick2020"
                                      value="No"
                                      checked={
                                        formData.personallySick2020 === "No"
                                      }
                                      id="personallySick2020_no"
                                      onChange={handleInputChange}
                                    />
                                    No
                                  </p>
                                </label>
                              </div>
                            </div>

                            {formData.personallySick2020 === "Yes" && (
                              <div
                                className="date-picker-container"
                                style={{ marginTop: 20 }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <DatePicker
                                    selectsRange={true}
                                    startDate={personal_startdate2020}
                                    endDate={personal_enddate2020}
                                    onChange={handleDateChange}
                                    isClearable={true}
                                    minDate={minDate}
                                    maxDate={maxDate}
                                    // filterDate={filterWeekends}
                                    filterDate={(date) =>
                                      !isDateDisabledOne(date)
                                    }
                                    placeholderText="Select date range"
                                    openToDate={initialOpenDate}
                                    className="custom-date-picker-input" // Add a custom class name
                                  />

                                  <div className="">
                                    <button
                                      onClick={handleMerge}
                                      type="button"
                                      className="px-3 py-2 next-step"
                                    >
                                      Add Dates
                                    </button>
                                  </div>
                                </div>
                                 <Typography style={{color: 'orangered', fontSize: 16, fontWeight: 600}}>Click to add individual dates below...</Typography>
                               
                                <div style={{ marginTop: 20 }}>
                                  <MultiplePicker
                                    style={{ padding: "20px 6px" }}
                                    multiple
                                    currentDate={specificDate1}
                                    value={selectedDates}
                                    minDate={new Date(2020, 3, 1)} // April 1, 2020
                                    maxDate={new Date(2020, 11, 31)} // December 31, 2020
                                    onChange={(dates) =>
                                      setSelectedDates(dates)
                                    }
                                    mapDays={({ date }) => {
                                      let props = {};

                                      // Check if the day is a weekend (Sunday or Saturday)
                                      if (isWeekend(date)) {
                                        props.disabled = true;
                                      }

                                      // Check if the day is in the selectedDates array and is a weekend
                                      //  if (selectedDated.includes(date.format('YYYY-MM-DD'))){
                                      //   props.disabled = true
                                      //  }
                                      return props;
                                    }}
                                    plugins={[<DatePanel />]}
                                  />
                                </div>
                                {/* <p>Start Date: {personal_startdate2020 ? personal_startdate2020.toLocaleDateString() : 'Not selected'}</p>
                            <p>End Date: {personal_enddate2020 ? personal_enddate2020.toLocaleDateString() : 'Not selected'}</p> */}
                                <div style={{ marginTop: 10, marginLeft: 2 }}>
                                  {/* <input
                              type="number"
                              value={numberOffDays}
                              readOnly={true}
                              className="custom-date-picker-input"
                              placeholder="Number of days"
                            />
                             {' days'} */}
                                  {/* /> */}
                                  You have selected <span style={{color: 'green', fontSize: 16, fontWeight: 600}}>{selectedDates?.length} days</span> 
                                </div>

                                <Modal
                                  open={openModalDate}
                                  onClose={handleCloseModal}
                                  aria-labelledby="modal-title"
                                  aria-describedby="modal-description"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      bgcolor: "background.paper",
                                      boxShadow: 24,
                                      p: 4,
                                      maxWidth: 500,
                                      borderRadius: "12px",
                                      width: "90%",
                                      textAlign: "center",
                                    }}
                                  >
                                    {selectedDates?.length > 10 && (
                                      <>
                                        <Clear
                                          style={{
                                            width: "50px",
                                            height: "50px",
                                            color: "orangered",
                                            marginBottom: 3,
                                          }}
                                        />
                                        <Typography
                                          style={{
                                            fontSize: 20,
                                            color: "black",
                                            fontWeight: "600",
                                            color: "#192c57",
                                          }}
                                        >
                                          Oops...
                                        </Typography>
                                        <p  id="modal-description">
                                          You have selected{" "}
                                          {selectedDates?.length} days. Please
                                          select 10 days or less.
                                        </p>
                                        <button
                                          style={{
                                            padding: "5px 16px",
                                            borderRadius: "5px",
                                            color: "white",
                                            backgroundColor: "#467A8A",
                                            border: "1px solid #467A8A",
                                          }}
                                          className="mt-3"
                                          onClick={handleCloseModal}
                                        >
                                          OK
                                        </button>
                                      </>
                                    )}
                                    {selectedDates?.length == 0 && (
                                      <>
                                        <Clear
                                          style={{
                                            width: "50px",
                                            height: "50px",
                                            color: "orangered",
                                            marginBottom: 3,
                                          }}
                                        />
                                        <Typography
                                          style={{
                                            fontSize: 20,
                                            color: "black",
                                            fontWeight: "600",
                                            color: "#192c57",
                                          }}
                                        >
                                          Oops...
                                        </Typography>
                                        <p id="modal-description">
                                           Please select dates! If you are selecting date range then you should
 press "Add Dates" button
                                        </p>
                                        <button
                                          style={{
                                            padding: "5px 16px",
                                            borderRadius: "5px",
                                            color: "white",
                                            backgroundColor: "#467A8A",
                                            border: "1px solid #467A8A",
                                          }}
                                          className="mt-3"
                                          onClick={handleCloseModal}
                                        >
                                          OK
                                        </button>
                                      </>
                                    )}
                                  </Box>
                                </Modal>
                              </div>
                            )}

                            <div className="d-flex justify-content-end mt-3">
                              <button
                                onClick={handlePrevious}
                                type="button"
                                className="px-3 py-2 prev-step"
                              >
                                Previous
                              </button>
                              <button
                                onClick={handleNext}
                                type="button"
                                className="px-3 py-2 next-step"
                              >
                                {activeStep === steps.length - 1
                                  ? "Submit"
                                  : "Next"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 11:
        return (
          <div className="step step-10">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <LinearProgress
                    variant="determinate"
                    sx={{
                      height: "14px",
                      borderRadius: "6px",
                      marginBottom: 5,
                      backgroundColor: "#f0f0f0",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "rgb(13, 189, 243);",
                      },
                    }}
                    value={30.7}
                  />
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="img-applic-content">
                          <h1
                            className=""
                            style={{
                              color: "rgb(13, 189, 243)",
                              textAlign: "center ",
                            }}
                          >
                            Are you eligible?
                          </h1>
                          {/* <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                              textAlign: "center ",
                            }}
                            className=" mb-4"
                          >
                            Question 4 of 13
                          </h3> */}
                          <label
                            for="self_employed_from"
                            className="form-label headng "
                            style={{ fontWeight: "600" }}
                          >
                            Were you personally sick with Covid, experienced
                            Covid like symptoms, needed to quarantine, underwent
                            testing, and took time off of work in 2021? 4/1/2020-3/31/21{" "}
                            <span
                              style={{
                                color: "red",
                                cursor: "pointer",
                                fontSize: 21,
                                textDecoration: "underline",
                              }}
                            >
                               (Max 10 days)
                            </span>
                          </label>

                          <div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <div className="optio mb-2">
                                <label for="personallySick2021_yes">
                                  <p
                                    style={{
                                      backgroundColor:
                                        formData.personallySick2021 === "Yes"
                                          ? "lightblue"
                                          : "initial",
                                    }}
                                  >
                                    <input
                                      className="form-check-input"
                                      class={`form-check-input ${
                                        errors.personallySick2021
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      type="radio"
                                      name="personallySick2021"
                                      checked={
                                        formData.personallySick2021 === "Yes"
                                      }
                                      value="Yes"
                                      id="personallySick2021_yes"
                                      onChange={handleInputChange}
                                    />
                                    Yes
                                  </p>
                                </label>
                              </div>
                              <div className="optio">
                                <label for="personallySick2021_no">
                                  <p
                                    style={{
                                      backgroundColor:
                                        formData.personallySick2021 === "No"
                                          ? "lightblue"
                                          : "initial",
                                    }}
                                  >
                                    <input
                                      class={`form-check-input ${
                                        errors.personallySick2021
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      type="radio"
                                      name="personallySick2021"
                                      value="No"
                                      checked={
                                        formData.personallySick2021 === "No"
                                      }
                                      id="personallySick2021_no"
                                      onChange={handleInputChange}
                                    />
                                    No
                                  </p>
                                </label>
                              </div>
                            </div>

                            {formData.personallySick2021 === "Yes" && (
                              <div
                                className="date-picker-container"
                                style={{ marginTop: 20 }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <DatePicker
                                    selectsRange={true}
                                    startDate={personal_startdate2021}
                                    endDate={personal_enddate2021}
                                    onChange={handleDateChangeTwo}
                                    isClearable={true}
                                    minDate={minDateTwo}
                                    maxDate={maxDateTwo}
                                    filterDate={(date) =>
                                      !isDateDisabledTwoo(date)
                                    }
                                    placeholderText="Select date range"
                                    openToDate={initialOpenDateTwo}
                                    className="custom-date-picker-input" // Add a custom class name
                                  />
                                  <div className="">
                                    <button
                                      onClick={handleMergeTwo}
                                      type="button"
                                      className="px-3 py-2 next-step"
                                    >
                                      Add Dates
                                    </button>
                                  </div>
                                </div>
                                <Typography style={{color: 'orangered', fontSize: 16, fontWeight: 600}}>Click to add individual dates below...</Typography>
                                <div style={{ marginTop: 20 }}>
                                  <MultiplePicker
                                    multiple
                                    style={{ padding: "20px 6px" }}

                                    value={selectedDatesTwo}
                                    currentDate={specificDate2}
                                    minDate={new Date(2021, 0, 1)} // April 1, 2020
                                    maxDate={new Date(2021, 8, 30)} // December 31, 2020
                                    onChange={(dates) =>
                                      setSelectedDatesTwo(dates)
                                    }
                                    mapDays={({ date }) => {
                                      let props = {};

                                      // Check if the day is a weekend (Sunday or Saturday)
                                      if (isWeekend(date)) {
                                        props.disabled = true;
                                      }

                                      //   // Check if the day is in the selectedDates array and is a weekend
                                      //  if (selectedDatesTwo.includes(date.format('YYYY-MM-DD'))){
                                      //   props.disabled = true
                                      //  }
                                      return props;
                                    }}
                                    plugins={[<DatePanel />]}
                                  />
                                </div>
                                {/* <p>Start Date: {personal_startdate2020 ? personal_startdate2020.toLocaleDateString() : 'Not selected'}</p>
                            <p>End Date: {personal_enddate2020 ? personal_enddate2020.toLocaleDateString() : 'Not selected'}</p> */}
                                <div style={{ marginTop: 10, marginLeft: 2 }}>
                                  {/* <input
                              type="number"
                              value={numberOffDaysTwo}
                              readOnly={true}
                              className="custom-date-picker-input"
                              placeholder="Number of days"
                            /> */}
                                  You have selected {" "}
                                 
                                  <span style={{color: 'green', fontSize: 16, fontWeight: 600}}>{selectedDatesTwo?.length} days</span> 
                                </div>

                                <Modal
                                  open={openModalDateTwo}
                                  onClose={handleCloseModalTwo}
                                  aria-labelledby="modal-title"
                                  aria-describedby="modal-description"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      bgcolor: "background.paper",
                                      boxShadow: 24,
                                      p: 4,
                                      maxWidth: 500,
                                      borderRadius: "12px",
                                      width: "90%",
                                      textAlign: "center",
                                    }}
                                  >
                                    {selectedDatesTwo?.length > 10 && (
                                      <>
                                        <Clear
                                          style={{
                                            width: "50px",
                                            height: "50px",
                                            color: "orangered",
                                            marginBottom: 3,
                                          }}
                                        />
                                        <Typography
                                          style={{
                                            fontSize: 20,
                                            color: "black",
                                            fontWeight: "600",
                                            color: "#192c57",
                                          }}
                                        >
                                          Oops...
                                        </Typography>
                                        <p id="modal-description">
                                          You have selected{" "}
                                          {selectedDatesTwo?.length} days.
                                          Please select 10 days or less.
                                        </p>
                                        <button
                                          style={{
                                            padding: "5px 16px",
                                            borderRadius: "5px",
                                            color: "white",
                                            backgroundColor: "#467A8A",
                                            border: "1px solid #467A8A",
                                          }}
                                          className="mt-3"
                                          onClick={handleCloseModalTwo}
                                        >
                                          OK
                                        </button>
                                      </>
                                    )}
                                    {selectedDatesTwo?.length == 0 && (
                                      <>
                                        <Clear
                                          style={{
                                            width: "50px",
                                            height: "50px",
                                            color: "orangered",
                                            marginBottom: 3,
                                          }}
                                        />
                                        <Typography
                                          style={{
                                            fontSize: 20,
                                            color: "black",
                                            fontWeight: "600",
                                            color: "#192c57",
                                          }}
                                        >
                                          Oops...
                                        </Typography>
                                        <p id="modal-description">
                                          Please select dates! If you are
                                          selecting date range then you should
                                          press "Add Dates" button
                                        </p>
                                        <button
                                          style={{
                                            padding: "5px 16px",
                                            borderRadius: "5px",
                                            color: "white",
                                            backgroundColor: "#467A8A",
                                            border: "1px solid #467A8A",
                                          }}
                                          className="mt-3"
                                          onClick={handleCloseModalTwo}
                                        >
                                          OK
                                        </button>
                                      </>
                                    )}
                                  </Box>
                                </Modal>
                              </div>
                            )}

                            <div className="d-flex justify-content-end mt-3">
                              <button
                                onClick={handlePrevious}
                                type="button"
                                className="px-3 py-2 prev-step"
                              >
                                Previous
                              </button>
                              <button
                                onClick={handleNext}
                                type="button"
                                className="px-3 py-2 next-step"
                              >
                                {activeStep === steps.length - 1
                                  ? "Submit"
                                  : "Next"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 12:
        return (
          <div className="step step-11">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <LinearProgress
                    variant="determinate"
                    sx={{
                      height: "14px",
                      borderRadius: "6px",
                      marginBottom: 5,
                      backgroundColor: "#f0f0f0",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "rgb(13, 189, 243);",
                      },
                    }}
                    value={38.46}
                  />
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="img-applic-content">
                          <h1
                            className=""
                            style={{
                              color: "rgb(13, 189, 243)",
                              textAlign: "center ",
                            }}
                          >
                            Are you eligible?
                          </h1>
                          {/* <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                              textAlign: "center ",
                            }}
                            className=" mb-4"
                          >
                            Question 5 of 13
                          </h3> */}
                          <label
                            for="self_employed_from"
                            className="form-label headng "
                            style={{ fontWeight: "600" }}
                          >
                            Did you care for someone else who was affected by
                            Covid, experienced Covid like symptoms, needed to
                            quarantine, underwent testing, and took time off of
                            work in 2020? 4/1/2020-3/31/21 {" "}
                            <span
                              style={{
                                color: "red",
                                cursor: "pointer",
                                fontSize: 21,
                                textDecoration: "underline",
                              }}
                            >
                              (Max 10 days)
                            </span>
                          </label>

                          <div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <div className="optio mb-2">
                                <label for="symptoms2020_yes">
                                  <p
                                    style={{
                                      backgroundColor:
                                        formData.symptoms2020 === "Yes"
                                          ? "lightblue"
                                          : "initial",
                                    }}
                                  >
                                    <input
                                      className="form-check-input"
                                      class={`form-check-input ${
                                        errors.symptoms2020
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      type="radio"
                                      name="symptoms2020"
                                      checked={formData.symptoms2020 === "Yes"}
                                      value="Yes"
                                      id="symptoms2020_yes"
                                      onChange={handleInputChange}
                                    />
                                    Yes
                                  </p>
                                </label>
                              </div>
                              <div className="optio">
                                <label for="symptoms2020_no">
                                  <p
                                    style={{
                                      backgroundColor:
                                        formData.symptoms2020 === "No"
                                          ? "lightblue"
                                          : "initial",
                                    }}
                                  >
                                    <input
                                      class={`form-check-input ${
                                        errors.symptoms2020
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      type="radio"
                                      name="symptoms2020"
                                      value="No"
                                      checked={formData.symptoms2020 === "No"}
                                      id="symptoms2020_no"
                                      onChange={handleInputChange}
                                    />
                                    No
                                  </p>
                                </label>
                              </div>
                            </div>

                            {formData.symptoms2020 === "Yes" && (
                              <div
                                className="date-picker-container"
                                style={{ marginTop: 20 }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <DatePicker
                                    selectsRange={true}
                                    startDate={cared_startdate2020}
                                    endDate={cared_enddate2020}
                                    onChange={handleCaredDateChange}
                                    isClearable={true}
                                    minDate={minSymptomsDate}
                                    maxDate={maxSymptomsDate}
                                    filterDate={(date) => !isDateDisabled(date)}
                                    placeholderText="Select date range for symptoms"
                                    openToDate={initialOpenSymptomsDate}
                                    className="custom-date-picker-input"
                                  />

                                  <div className="">
                                    <button
                                      onClick={handleMergeCared2020}
                                      type="button"
                                      className="px-3 py-2 next-step"
                                    >
                                      Add Dates
                                    </button>
                                  </div>
                                </div>
                                <Typography style={{color: 'orangered', fontSize: 16, fontWeight: 600}}>Click to add individual dates below...</Typography>
                                <div style={{ marginTop: 20 }}>
                                  <MultiplePicker
                                    multiple
                                    style={{ padding: "20px 6px" }}
                                    value={selectedDatesCared2020}
                                    currentDate={specificDate1}
                                    minDate={new Date(2020, 3, 1)} // April 1, 2020
                                    maxDate={new Date(2020, 11, 31)} // December 31, 2020
                                    onChange={(dates) =>
                                      setSelectedDatesCared2020(dates)
                                    }
                                    mapDays={({ date }) => {
                                      let props = {};

                                      // Check if the day is a weekend (Sunday or Saturday)
                                      if (isWeekend(date)) {
                                        props.disabled = true;
                                      }

                                      // Check if the day is in the selectedDates array and is a weekend
                                      if (
                                        datesFormatCared2020.includes(
                                          date.format("YYYY-MM-DD")
                                        )
                                      ) {
                                        props.disabled = true;
                                      }
                                      return props;
                                    }}
                                    plugins={[<DatePanel />]}
                                  />
                                </div>
                                <div style={{ marginTop: 10, marginLeft: 2 }}>
                                  {/* <input
                                type="number"
                                value={symptomsDays}
                                readOnly={true}
                                className="custom-date-picker-input"
                                placeholder="Number of days"
                              /> */}
                                  You have selected{" "}
                                  <span style={{color: 'green', fontSize: 16, fontWeight: 600}}>{selectedDatesCared2020?.length} days</span> 
                                  
                                </div>

                                <Modal
                                  open={openModalSymptoms}
                                  onClose={handleCloseSymptomsModal}
                                  aria-labelledby="modal-title"
                                  aria-describedby="modal-description"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      bgcolor: "background.paper",
                                      boxShadow: 24,
                                      p: 4,
                                      maxWidth: 500,
                                      borderRadius: "12px",
                                      width: "90%",
                                      textAlign: "center",
                                    }}
                                  >
                                    {selectedDatesCared2020?.length > 10 && (
                                      <>
                                        <Clear
                                          style={{
                                            width: "50px",
                                            height: "50px",
                                            color: "orangered",
                                            marginBottom: 3,
                                          }}
                                        />
                                        <Typography
                                          style={{
                                            fontSize: 20,
                                            color: "black",
                                            fontWeight: "600",
                                            color: "#192c57",
                                          }}
                                        >
                                          Oops...
                                        </Typography>
                                        <p id="modal-description">
                                          You have selected{" "}
                                          {selectedDatesCared2020?.length} days.
                                          Please select 10 days or less.
                                        </p>
                                        <button
                                          style={{
                                            padding: "5px 16px",
                                            borderRadius: "5px",
                                            color: "white",
                                            backgroundColor: "#467A8A",
                                            border: "1px solid #467A8A",
                                          }}
                                          className="mt-3"
                                          onClick={handleCloseSymptomsModal}
                                        >
                                          OK
                                        </button>
                                      </>
                                    )}
                                    {selectedDatesCared2020?.length == 0 && (
                                      <>
                                        <Clear
                                          style={{
                                            width: "50px",
                                            height: "50px",
                                            color: "orangered",
                                            marginBottom: 3,
                                          }}
                                        />
                                        <Typography
                                          style={{
                                            fontSize: 20,
                                            color: "black",
                                            fontWeight: "600",
                                            color: "#192c57",
                                          }}
                                        >
                                          Oops...
                                        </Typography>
                                        <p id="modal-description">
                                          Please select dates! If you are
                                          selecting date range then you should
                                          press "Add Dates" button
                                        </p>
                                        <button
                                          style={{
                                            padding: "5px 16px",
                                            borderRadius: "5px",
                                            color: "white",
                                            backgroundColor: "#467A8A",
                                            border: "1px solid #467A8A",
                                          }}
                                          className="mt-3"
                                          onClick={handleCloseSymptomsModal}
                                        >
                                          OK
                                        </button>
                                      </>
                                    )}
                                  </Box>
                                </Modal>
                              </div>
                            )}

                            <div className="d-flex justify-content-end mt-3">
                              <button
                                onClick={handlePrevious}
                                type="button"
                                className="px-3 py-2 prev-step"
                              >
                                Previous
                              </button>
                              <button
                                onClick={handleNext}
                                type="button"
                                className="px-3 py-2 next-step"
                              >
                                {activeStep === steps.length - 1
                                  ? "Submit"
                                  : "Next"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 13:
        return (
          <div className="step step-12">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <LinearProgress
                    variant="determinate"
                    sx={{
                      height: "14px",
                      borderRadius: "6px",
                      marginBottom: 5,
                      backgroundColor: "#f0f0f0",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "rgb(13, 189, 243);",
                      },
                    }}
                    value={46.15}
                  />
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="img-applic-content">
                          <h1
                            className=""
                            style={{
                              color: "rgb(13, 189, 243)",
                              textAlign: "center ",
                            }}
                          >
                            Are you eligible?
                          </h1>
                          {/* <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                              textAlign: "center ",
                            }}
                            className=" mb-4"
                          >
                            Question 6 of 13
                          </h3> */}
                          <label
                            for="self_employed_from"
                            className="form-label headng "
                            style={{ fontWeight: "600" }}
                          >
                            Did you care for someone else who was affected by
                            Covid, experienced Covid like symptoms, needed to
                            quarantine, underwent testing, and took time off of
                            work in 2021? 4/1/2021-9/30/21{" "}
                            <span
                              style={{
                                color: "red",
                                cursor: "pointer",
                                fontSize: 21,
                                textDecoration: "underline",
                              }}
                            >
                               (Max 10 days)
                            </span>
                          </label>

                          <div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <div className="optio mb-2">
                                <label for="symptoms2021_yes">
                                  <p
                                    style={{
                                      backgroundColor:
                                        formData.symptoms2021 === "Yes"
                                          ? "lightblue"
                                          : "initial",
                                    }}
                                  >
                                    <input
                                      className="form-check-input"
                                      class={`form-check-input ${
                                        errors.symptoms2021
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      type="radio"
                                      name="symptoms2021"
                                      checked={formData.symptoms2021 === "Yes"}
                                      value="Yes"
                                      id="symptoms2021_yes"
                                      onChange={handleInputChange}
                                    />
                                    Yes
                                  </p>
                                </label>
                              </div>
                              <div className="optio">
                                <label for="symptoms2021_no">
                                  <p
                                    style={{
                                      backgroundColor:
                                        formData.symptoms2021 === "No"
                                          ? "lightblue"
                                          : "initial",
                                    }}
                                  >
                                    <input
                                      class={`form-check-input ${
                                        errors.symptoms2021
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      type="radio"
                                      name="symptoms2021"
                                      value="No"
                                      checked={formData.symptoms2021 === "No"}
                                      id="symptoms2021_no"
                                      onChange={handleInputChange}
                                    />
                                    No
                                  </p>
                                </label>
                              </div>
                            </div>

                            {formData.symptoms2021 === "Yes" && (
                              <div
                                className="date-picker-container"
                                style={{ marginTop: 20 }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <DatePicker
                                    selectsRange={true}
                                    startDate={cared_startdate2021}
                                    endDate={cared_enddate2021}
                                    onChange={handleCaredDateChangeTwo}
                                    isClearable={true}
                                    minDate={minSymptomsDateTwo}
                                    maxDate={maxSymptomsDateTwo}
                                    filterDate={(date) =>
                                      !isDateDisabledTwo(date)
                                    }
                                    placeholderText="Select date range for symptoms"
                                    openToDate={initialOpenSymptomsDateTwo}
                                    className="custom-date-picker-input"
                                  />
                   
                                  <div className="">
                                    <button
                                      onClick={handleMergeCared2021}
                                      type="button"
                                      className="px-3 py-2 next-step"
                                    >
                                      Add Dates
                                    </button>
                                  </div>
                                </div>
                                <Typography style={{color: 'orangered', fontSize: 16, fontWeight: 600}}>Click to add individual dates below...</Typography>
                                <div style={{ marginTop: 20 }}>
                                  <MultiplePicker
                                    multiple
                                    style={{ padding: "20px 6px" }}
                                    value={selectedDatesCared2021}
                                    currentDate={specificDate2}
                                    minDate={new Date(2021, 0, 1)} // April 1, 2020
                                    maxDate={new Date(2021, 8, 30)} // December 31, 2020
                                    onChange={(dates) =>
                                      setSelectedDatesCared2021(dates)
                                    }
                                    mapDays={({ date }) => {
                                      let props = {};

                                      // Check if the day is a weekend (Sunday or Saturday)
                                      if (isWeekend(date)) {
                                        props.disabled = true;
                                      }

                                      // Check if the day is in the selectedDates array and is a weekend
                                      if (
                                        datesFormatCared2021.includes(
                                          date.format("YYYY-MM-DD")
                                        )
                                      ) {
                                        props.disabled = true;
                                      }
                                      return props;
                                    }}
                                    plugins={[<DatePanel />]}
                                  />
                                </div>

                                <div style={{ marginTop: 10, marginLeft: 2 }}>
                                  {/* <input
                                                          type="number"
                                                          value={symptomsDaysTwo}
                                                          readOnly={true}
                                                          className="custom-date-picker-input"
                                                          placeholder="Number of days"
                                                        /> */}
                                  You have selected{" "}
                                  <span style={{color: 'green', fontSize: 16, fontWeight: 600}}>{selectedDatesCared2021?.length} days</span> 
                                 
                                </div>

                                <Modal
                                  open={openModalSymptomsTwo}
                                  onClose={handleCloseSymptomsModalTwo}
                                  aria-labelledby="modal-title"
                                  aria-describedby="modal-description"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      bgcolor: "background.paper",
                                      boxShadow: 24,
                                      p: 4,
                                      maxWidth: 500,
                                      borderRadius: "12px",
                                      width: "90%",
                                      textAlign: "center",
                                    }}
                                  >
                                    {selectedDatesCared2021?.length > 10 && (
                                      <>
                                        <Clear
                                          style={{
                                            width: "50px",
                                            height: "50px",
                                            color: "orangered",
                                            marginBottom: 3,
                                          }}
                                        />
                                        <Typography
                                          style={{
                                            fontSize: 20,
                                            color: "black",
                                            fontWeight: "600",
                                            color: "#192c57",
                                          }}
                                        >
                                          Oops...
                                        </Typography>
                                        <p id="modal-description">
                                          You have selected{" "}
                                          {selectedDatesCared2021?.length} days.
                                          Please select 10 days or less.
                                        </p>
                                        <button
                                          style={{
                                            padding: "5px 16px",
                                            borderRadius: "5px",
                                            color: "white",
                                            backgroundColor: "#467A8A",
                                            border: "1px solid #467A8A",
                                          }}
                                          className="mt-3"
                                          onClick={handleCloseSymptomsModalTwo}
                                        >
                                          OK
                                        </button>
                                      </>
                                    )}
                                    {selectedDatesCared2021?.length == 0 && (
                                      <>
                                        <Clear
                                          style={{
                                            width: "50px",
                                            height: "50px",
                                            color: "orangered",
                                            marginBottom: 3,
                                          }}
                                        />
                                        <Typography
                                          style={{
                                            fontSize: 20,
                                            color: "black",
                                            fontWeight: "600",
                                            color: "#192c57",
                                          }}
                                        >
                                          Oops...
                                        </Typography>
                                        <p id="modal-description">
                                          Please select dates! If you are
                                          selecting date range then you should
                                          press "Add Dates" button
                                        </p>
                                        <button
                                          style={{
                                            padding: "5px 16px",
                                            borderRadius: "5px",
                                            color: "white",
                                            backgroundColor: "#467A8A",
                                            border: "1px solid #467A8A",
                                          }}
                                          className="mt-3"
                                          onClick={handleCloseSymptomsModalTwo}
                                        >
                                          OK
                                        </button>
                                      </>
                                    )}
                                  </Box>
                                </Modal>
                              </div>
                            )}

                            <div className="d-flex justify-content-end mt-3">
                              <button
                                onClick={handlePrevious}
                                type="button"
                                className="px-3 py-2 prev-step"
                              >
                                Previous
                              </button>
                              <button
                                onClick={handleNext}
                                type="button"
                                className="px-3 py-2 next-step"
                              >
                                {activeStep === steps.length - 1
                                  ? "Submit"
                                  : "Next"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 14:
        return (
          <div className="step step-16">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <LinearProgress
                    variant="determinate"
                    sx={{
                      height: "14px",
                      borderRadius: "6px",
                      marginBottom: 5,
                      backgroundColor: "#f0f0f0",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "rgb(13, 189, 243);",
                      },
                    }}
                    value={53.84}
                  />
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="img-applic-content">
                          <h1
                            className="text-center"
                            style={{ color: "rgb(13, 189, 243)" }}
                          >
                            Are you eligible?
                          </h1>
                          {/* <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                            }}
                            className="text-center"
                          >
                            Question 7 of 13
                          </h3> */}
                          <div style={{ marginTop: 40 }}>
                            <label
                              for="setc_program"
                              className="form-label headng "
                              style={{ fontWeight: "600" }}
                            >
                              Did you claim your minor child/children in your
                              taxes for 2020?
                            </label>

                            <div className="optio mb-2">
                              <label for=" minor_child_tax_20_yes">
                                <p
                                  style={{
                                    backgroundColor:
                                      formData.minor_child_tax_20 === "Yes"
                                        ? "lightblue"
                                        : "initial",
                                  }}
                                >
                                  <input
                                    className="form-check-input"
                                    class={`form-check-input ${
                                      errors.minor_child_tax_20
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    type="radio"
                                    name="minor_child_tax_20"
                                    checked={
                                      formData.minor_child_tax_20 === "Yes"
                                    }
                                    value="Yes"
                                    id=" minor_child_tax_20_yes"
                                    onChange={handleInputChange}
                                  />
                                  Yes
                                </p>
                              </label>
                            </div>
                            <div className="optio">
                              <label for="minor_child_tax_20_no">
                                <p
                                  style={{
                                    backgroundColor:
                                      formData.minor_child_tax_20 === "No"
                                        ? "lightblue"
                                        : "initial",
                                  }}
                                >
                                  <input
                                    className="form-check-input"
                                    class={`form-check-input ${
                                      errors.minor_child_tax_20
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    type="radio"
                                    name="minor_child_tax_20"
                                    checked={
                                      formData.minor_child_tax_20 === "No"
                                    }
                                    value="No"
                                    id="minor_child_tax_20_no"
                                    onChange={handleInputChange}
                                  />
                                  No
                                </p>
                              </label>
                            </div>
                            {/* {formData.care_for_minor_child === "Yes" && (
                            <>
                              <div id="additional">
                                <label
                                  for="Self-employed"
                                  className="form-label bg-light py-3 px-1 fs-5"
                                >
                                  Did you claim your minor child/children in your taxes for 2020?

                                </label>
                                <div className="optio mb-2">
                                  <label for=" minor_child_tax_20_yes">
                                    <p
                                      style={{
                                        backgroundColor:
                                          formData.minor_child_tax_20 === "Yes"
                                            ? "lightblue"
                                            : "initial",
                                      }}
                                    >
                                      <input
                                        className="form-check-input"
                                        class={`form-check-input ${
                                          errors.minor_child_tax_20
                                            ? "border-danger"
                                            : ""
                                        }`}
                                        type="radio"
                                        name="minor_child_tax_20"
                                        checked={
                                          formData.minor_child_tax_20 === "Yes"
                                        }
                                        value="Yes"
                                        id=" minor_child_tax_20_yes"
                                        onChange={handleInputChange}
                                      />
                                      Yes
                                    </p>
                                  </label>
                                </div>
                                <div className="optio">
                                  <label for="minor_child_tax_20_no">
                                    <p
                                      style={{
                                        backgroundColor:
                                          formData.minor_child_tax_20 === "No"
                                            ? "lightblue"
                                            : "initial",
                                      }}
                                    >
                                      <input
                                        className="form-check-input"
                                        class={`form-check-input ${
                                          errors.minor_child_tax_20
                                            ? "border-danger"
                                            : ""
                                        }`}
                                        type="radio"
                                        name="minor_child_tax_20"
                                        checked={
                                          formData.minor_child_tax_20 === "No"
                                        }
                                        value="No"
                                        id="minor_child_tax_20_no"
                                        onChange={handleInputChange}
                                      />
                                      No
                                    </p>
                                  </label>
                                </div>
                              </div>
                             
                            </>
                          )} */}
                            <div className="d-flex justify-content-end mt-3">
                              <button
                                onClick={handlePrevious}
                                type="button"
                                className="px-3 py-2 prev-step"
                              >
                                Previous
                              </button>
                              <button
                                onClick={handleNext}
                                type="button"
                                className="px-3 py-2 next-step"
                              >
                                {activeStep === steps.length - 1
                                  ? "Submit"
                                  : "Next"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 15:
        return (
          <div className="step step-13">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <LinearProgress
                    variant="determinate"
                    sx={{
                      height: "14px",
                      borderRadius: "6px",
                      marginBottom: 5,
                      backgroundColor: "#f0f0f0",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "rgb(13, 189, 243);",
                      },
                    }}
                    value={61.53}
                  />
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="img-applic-content">
                          <h1
                            className=""
                            style={{
                              color: "rgb(13, 189, 243)",
                              textAlign: "center ",
                            }}
                          >
                            Are you eligible?
                          </h1>
                          {/* <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                              textAlign: "center ",
                            }}
                            className=" mb-4"
                          >
                            Question 8 of 13
                          </h3> */}
                          <label
                            for="self_employed_from"
                            className="form-label headng "
                            style={{ fontWeight: "600" }}
                          >
                            Were you affected by the closure of your child's
                            school/daycare due to COVID restrictions, or how
                            many days did you care for your minor child who was
                            affected by COVID, which impacted your work in
                            2020? 4/1/2020-3/31/21 {" "}
                            <span
                              style={{
                                color: "red",
                                cursor: "pointer",
                                fontSize: 21,
                                textDecoration: "underline",
                              }}
                            >
                               (50 days max)
                            </span>
                          </label>

                          <div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <div className="optio mb-2">
                                <label for="closure2020_yes">
                                  <p
                                    style={{
                                      backgroundColor:
                                        formData.closure2020 === "Yes"
                                          ? "lightblue"
                                          : "initial",
                                    }}
                                  >
                                    <input
                                      className="form-check-input"
                                      class={`form-check-input ${
                                        errors.closure2020
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      type="radio"
                                      name="closure2020"
                                      checked={formData.closure2020 === "Yes"}
                                      value="Yes"
                                      id="closure2020_yes"
                                      onChange={handleInputChange}
                                    />
                                    Yes
                                  </p>
                                </label>
                              </div>
                              <div className="optio">
                                <label for="closure2020_no">
                                  <p
                                    style={{
                                      backgroundColor:
                                        formData.closure2020 === "No"
                                          ? "lightblue"
                                          : "initial",
                                    }}
                                  >
                                    <input
                                      class={`form-check-input ${
                                        errors.closure2020
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      type="radio"
                                      name="closure2020"
                                      value="No"
                                      checked={formData.closure2020 === "No"}
                                      id="closure2020_no"
                                      onChange={handleInputChange}
                                    />
                                    No
                                  </p>
                                </label>
                              </div>
                            </div>

                            {formData.closure2020 === "Yes" && (
                              <div
                                className="date-picker-container"
                                style={{ marginTop: 20 }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  {/* Closure Date Picker */}
                                  <DatePicker
                                    selectsRange={true}
                                    startDate={minor_startdate2020}
                                    endDate={minor_enddate2020}
                                    onChange={handleMinorDateChange}
                                    isClearable={true}
                                    minDate={minClosureDate}
                                    maxDate={maxClosureDate}
                                    filterDate={(date) =>
                                      !isDateDisabledThree(date)
                                    }
                                    placeholderText="Select date range for closure"
                                    openToDate={initialOpenClosureDate}
                                    className="custom-date-picker-input"
                                  />

                                  <div className="">
                                    <button
                                      onClick={handleMergeClosure2020}
                                      type="button"
                                      className="px-3 py-2 next-step"
                                    >
                                      Add Dates
                                    </button>
                                  </div>
                                </div>
                                <Typography style={{color: 'orangered', fontSize: 16, fontWeight: 600}}>Click to add individual dates below...</Typography>
                                <div style={{ marginTop: 20 }}>
                                  <MultiplePicker
                                    multiple
                                    style={{ padding: "20px 6px" }}
                                    currentDate={specificDate1}
                                    value={selectedDatesClosure2020}
                                    minDate={new Date(2020, 3, 1)} // April 1, 2020
                                    maxDate={new Date(2020, 11, 31)} // December 31, 2020
                                    onChange={(dates) =>
                                      setSelectedDatesClosure2020(dates)
                                    }
                                    mapDays={({ date }) => {
                                      let props = {};

                                      // Check if the day is a weekend (Sunday or Saturday)
                                      if (isWeekend(date)) {
                                        props.disabled = true;
                                      }

                                      // Check if the day is in the selectedDates array and is a weekend
                                      if (
                                        datesFormatCared2020.includes(
                                          date.format("YYYY-MM-DD")
                                        )
                                      ) {
                                        props.disabled = true;
                                      }
                                      if (
                                        datesFormatClosure2020.includes(
                                          date.format("YYYY-MM-DD")
                                        )
                                      ) {
                                        props.disabled = true;
                                      }
                                      return props;
                                    }}
                                    plugins={[<DatePanel />]}
                                  />
                                </div>

                                <div style={{ marginTop: 10, marginLeft: 2 }}>
                                  {/* Closure Days Input */}
                                  {/* <input
                        type="number"
                        value={minordays2020}
                        readOnly={true}
                        className="custom-date-picker-input"
                        placeholder="Number of days"
                      /> */}
                                  You have selected{" "}
                                  <span style={{color: 'green', fontSize: 16, fontWeight: 600}}>{selectedDatesClosure2020?.length} days</span> 

                                </div>
                                <Modal
                                  open={openModalClosure}
                                  onClose={handleCloseClosureModal}
                                  aria-labelledby="modal-title"
                                  aria-describedby="modal-description"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      bgcolor: "background.paper",
                                      boxShadow: 24,
                                      p: 4,
                                      maxWidth: 500,
                                      borderRadius: "12px",
                                      width: "90%",
                                      textAlign: "center",
                                    }}
                                  >
                                    {selectedDatesClosure2020?.length > 50 && (
                                      <>
                                        <Clear
                                          style={{
                                            width: "50px",
                                            height: "50px",
                                            color: "orangered",
                                            marginBottom: 3,
                                          }}
                                        />
                                        <Typography
                                          style={{
                                            fontSize: 20,
                                            color: "black",
                                            fontWeight: "600",
                                            color: "#192c57",
                                          }}
                                        >
                                          Oops...
                                        </Typography>
                                        <p id="modal-description">
                                          You have selected{" "}
                                          {selectedDatesClosure2020?.length}{" "}
                                          days. Please select 50 days or less.
                                        </p>
                                        <button
                                          style={{
                                            padding: "5px 16px",
                                            borderRadius: "5px",
                                            color: "white",
                                            backgroundColor: "#467A8A",
                                            border: "1px solid #467A8A",
                                          }}
                                          className="mt-3"
                                          onClick={handleCloseClosureModal}
                                        >
                                          OK
                                        </button>
                                      </>
                                    )}
                                    {selectedDatesClosure2020?.length == 0 && (
                                      <>
                                        <Clear
                                          style={{
                                            width: "50px",
                                            height: "50px",
                                            color: "orangered",
                                            marginBottom: 3,
                                          }}
                                        />
                                        <Typography
                                          style={{
                                            fontSize: 20,
                                            color: "black",
                                            fontWeight: "600",
                                            color: "#192c57",
                                          }}
                                        >
                                          Oops...
                                        </Typography>
                                        <p id="modal-description">
                                          Please select dates! If you are
                                          selecting date range then you should
                                          press "Add Dates" button
                                        </p>
                                        <button
                                          style={{
                                            padding: "5px 16px",
                                            borderRadius: "5px",
                                            color: "white",
                                            backgroundColor: "#467A8A",
                                            border: "1px solid #467A8A",
                                          }}
                                          className="mt-3"
                                          onClick={handleCloseClosureModal}
                                        >
                                          OK
                                        </button>
                                      </>
                                    )}
                                  </Box>
                                </Modal>
                              </div>
                            )}

                            <div className="d-flex justify-content-end mt-3">
                              <button
                                onClick={handlePrevious}
                                type="button"
                                className="px-3 py-2 prev-step"
                              >
                                Previous
                              </button>
                              <button
                                onClick={handleNext}
                                type="button"
                                className="px-3 py-2 next-step"
                              >
                                {activeStep === steps.length - 1
                                  ? "Submit"
                                  : "Next"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 16:
        return (
          <div className="step step-8 ">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-12">
                  <LinearProgress
                    variant="determinate"
                    sx={{
                      height: "14px",
                      borderRadius: "6px",
                      marginBottom: 5,
                      backgroundColor: "#f0f0f0",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "rgb(13, 189, 243);",
                      },
                    }}
                    value={69.23}
                  />
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="img-applic-content">
                          <h1
                            className="text-center"
                            style={{ color: "rgb(13, 189, 243)" }}
                          >
                            Are you eligible?
                          </h1>
                          {/* <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                            }}
                            className="text-center"
                          >
                            Question 9 of 13
                          </h3> */}
                          <div style={{ marginTop: 40 }}>
                            <h1
                              style={{
                                fontSize: "24px",
                                color: "rgb(13, 189, 243)",
                              }}
                            >
                              Did you claim your minor child/children in your
                              taxes for 2021?
                            </h1>

                            <div className="optio mb-2">
                              <label for="minor_child_tax_21_yes">
                                <p
                                  style={{
                                    backgroundColor:
                                      formData.minor_child_tax_21 === "Yes"
                                        ? "lightblue"
                                        : "initial",
                                  }}
                                >
                                  <input
                                    className={`form-check-input ${
                                      errors.minor_child_tax_21
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    type="radio"
                                    name="minor_child_tax_21"
                                    checked={
                                      formData.minor_child_tax_21 === "Yes"
                                    }
                                    value="Yes"
                                    id="minor_child_tax_21_yes"
                                    onChange={handleInputChange}
                                  />
                                  Yes
                                </p>
                              </label>
                            </div>

                            <div className="optio">
                              <label for="minor_child_tax_21_no">
                                <p
                                  style={{
                                    backgroundColor:
                                      formData.minor_child_tax_21 === "No"
                                        ? "lightblue"
                                        : "initial",
                                  }}
                                >
                                  <input
                                    className={`form-check-input ${
                                      errors.minor_child_tax_21
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    type="radio"
                                    name="minor_child_tax_21"
                                    checked={
                                      formData.minor_child_tax_21 === "No"
                                    }
                                    value="No"
                                    id="minor_child_tax_21_no"
                                    onChange={handleInputChange}
                                  />
                                  No
                                </p>
                              </label>
                            </div>

                            {/* {formData.minor_child_tax_20 === "No" &&
                              formData.minor_child_tax_21 === "No" &&
                              activeErrorStep16 && (
                                <div>
                                  <h4 style={{ color: "#e62e2d" }}>
                                    we are sorry, by selecting “No” for both of
                                    the years of 2020 & 2021 you are not
                                    eligible for this particular portion of the
                                    SETC Tax credit. Please select “No “ on
                                    question 6 of 9 and proceed to the next
                                    page.
                                  </h4>
                                </div>
                              )} */}

                            <div className="d-flex justify-content-end mt-3">
                              <button
                                onClick={handlePrevious}
                                type="button"
                                className="px-3 py-2 prev-step"
                              >
                                Previous
                              </button>
                              <button
                                onClick={handleNext}
                                type="button"
                                className="px-3 py-2 next-step"
                              >
                                {activeStep === steps.length - 1
                                  ? "Submit"
                                  : "Next"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 17:
        return (
          <div className="step step-15">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <LinearProgress
                    variant="determinate"
                    sx={{
                      height: "14px",
                      borderRadius: "6px",
                      marginBottom: 5,
                      backgroundColor: "#f0f0f0",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "rgb(13, 189, 243);",
                      },
                    }}
                    value={76.92}
                  />
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="img-applic-content">
                          <h1
                            className=""
                            style={{
                              color: "rgb(13, 189, 243)",
                              textAlign: "center ",
                            }}
                          >
                            Are you eligible?
                          </h1>
                          {/* <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                              textAlign: "center ",
                            }}
                            className=" mb-4"
                          >
                            Question 10 of 13
                          </h3> */}
                          <label
                            for="self_employed_from"
                            className="form-label headng "
                            style={{ fontWeight: "600" }}
                          >
                            Were you affected by the closure of your child's
                            school/daycare due to COVID restrictions, or how
                            many days did you care for your minor child who was
                            affected by COVID, which impacted your work in 2021? 4/1/2021-9/30/21{" "}
                            <span
                              style={{
                                color: "red",
                                cursor: "pointer",
                                fontSize: 21,
                                textDecoration: "underline",
                              }}
                            >
                               (60 days max)
                            </span>
                          </label>

                          <div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <div className="optio mb-2">
                                <label for="closure2021_yes">
                                  <p
                                    style={{
                                      backgroundColor:
                                        formData.closure2021 === "Yes"
                                          ? "lightblue"
                                          : "initial",
                                    }}
                                  >
                                    <input
                                      className="form-check-input"
                                      class={`form-check-input ${
                                        errors.closure2021
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      type="radio"
                                      name="closure2021"
                                      checked={formData.closure2021 === "Yes"}
                                      value="Yes"
                                      id="closure2021_yes"
                                      onChange={handleInputChange}
                                    />
                                    Yes
                                  </p>
                                </label>
                              </div>
                              <div className="optio">
                                <label for="closure2021_no">
                                  <p
                                    style={{
                                      backgroundColor:
                                        formData.closure2021 === "No"
                                          ? "lightblue"
                                          : "initial",
                                    }}
                                  >
                                    <input
                                      class={`form-check-input ${
                                        errors.closure2021
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      type="radio"
                                      name="closure2021"
                                      value="No"
                                      checked={formData.closure2021 === "No"}
                                      id="closure2021_no"
                                      onChange={handleInputChange}
                                    />
                                    No
                                  </p>
                                </label>
                              </div>
                            </div>

                            {formData.closure2021 === "Yes" && (
                              <div
                                className="date-picker-container"
                                style={{ marginTop: 20 }}
                              >
                                {/* Closure Date Picker */}

                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <DatePicker
                                    selectsRange={true}
                                    startDate={minor_startdate2021}
                                    endDate={minor_enddate2021}
                                    onChange={handleMinorDateChangeTwo}
                                    isClearable={true}
                                    minDate={minClosureDateTwo}
                                    maxDate={maxClosureDateTwo}
                                    filterDate={(date) =>
                                      !isDateDisabledFour(date)
                                    }
                                    placeholderText="Select date range for closure"
                                    openToDate={initialOpenClosureDateTwo}
                                    className="custom-date-picker-input"
                                  />

                                  <div className="">
                                    <button
                                      onClick={handleMergeClosure2021}
                                      type="button"
                                      className="px-3 py-2 next-step"
                                    >
                                      Add Dates
                                    </button>
                                  </div>
                                </div>

                                <Typography style={{color: 'orangered', fontSize: 16, fontWeight: 600}}>Click to add individual dates below...</Typography>
                                <div style={{ marginTop: 20 }}>
                                  <MultiplePicker
                                    multiple
                                    style={{ padding: "20px 6px" }}
                                    currentDate={specificDate2}
                                    value={selectedDatesClosure2021}
                                    minDate={new Date(2021, 0, 1)} // April 1, 2020
                                    maxDate={new Date(2021, 8, 30)} // December 31, 2020
                                    onChange={(dates) =>
                                      setSelectedDatesClosure2021(dates)
                                    }
                                    mapDays={({ date }) => {
                                      let props = {};

                                      // Check if the day is a weekend (Sunday or Saturday)
                                      if (isWeekend(date)) {
                                        props.disabled = true;
                                      }

                                      // Check if the day is in the selectedDates array and is a weekend
                                      if (
                                        datesFormatCared2021.includes(
                                          date.format("YYYY-MM-DD")
                                        )
                                      ) {
                                        props.disabled = true;
                                      }
                                      if (
                                        datesFormatClosure2021.includes(
                                          date.format("YYYY-MM-DD")
                                        )
                                      ) {
                                        props.disabled = true;
                                      }
                                      return props;
                                    }}
                                    plugins={[<DatePanel />]}
                                  />
                                </div>
                                <div style={{ marginTop: 10, marginLeft: 2 }}>
                                  {/* Closure Days Input */}
                                  {/* <input
                                type="number"
                                value={minordays2021}
                                readOnly={true}
                                className="custom-date-picker-input"
                                placeholder="Number of days"
                              /> */}
                                  You have selected{" "}
                                  <span style={{color: 'green', fontSize: 16, fontWeight: 600}}>{selectedDatesClosure2021?.length} days</span> 
                                 
                                </div>
                                <Modal
                                  open={openModalClosureTwo}
                                  onClose={handleCloseClosureModalTwo}
                                  aria-labelledby="modal-title"
                                  aria-describedby="modal-description"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      bgcolor: "background.paper",
                                      boxShadow: 24,
                                      p: 4,
                                      maxWidth: 500,
                                      borderRadius: "12px",
                                      width: "90%",
                                      textAlign: "center",
                                    }}
                                  >
                                    {selectedDatesClosure2021?.length > 60 && (
                                      <>
                                        <Clear
                                          style={{
                                            width: "50px",
                                            height: "50px",
                                            color: "orangered",
                                            marginBottom: 3,
                                          }}
                                        />
                                        <Typography
                                          style={{
                                            fontSize: 20,
                                            color: "black",
                                            fontWeight: "600",
                                            color: "#192c57",
                                          }}
                                        >
                                          Oops...
                                        </Typography>
                                        <p id="modal-description">
                                          You have selected{" "}
                                          {selectedDatesClosure2021?.length}{" "}
                                          days. Please select 60 days or less.
                                        </p>
                                        <button
                                          style={{
                                            padding: "5px 16px",
                                            borderRadius: "5px",
                                            color: "white",
                                            backgroundColor: "#467A8A",
                                            border: "1px solid #467A8A",
                                          }}
                                          className="mt-3"
                                          onClick={handleCloseClosureModalTwo}
                                        >
                                          OK
                                        </button>
                                      </>
                                    )}
                                    {selectedDatesClosure2021?.length == 0 && (
                                      <>
                                        <Clear
                                          style={{
                                            width: "50px",
                                            height: "50px",
                                            color: "orangered",
                                            marginBottom: 3,
                                          }}
                                        />
                                        <Typography
                                          style={{
                                            fontSize: 20,
                                            color: "black",
                                            fontWeight: "600",
                                            color: "#192c57",
                                          }}
                                        >
                                          Oops...
                                        </Typography>
                                        <p id="modal-description">
                                          Please select dates! If you are
                                          selecting date range then you should
                                          press "Add Dates" button
                                        </p>
                                        <button
                                          style={{
                                            padding: "5px 16px",
                                            borderRadius: "5px",
                                            color: "white",
                                            backgroundColor: "#467A8A",
                                            border: "1px solid #467A8A",
                                          }}
                                          className="mt-3"
                                          onClick={handleCloseClosureModalTwo}
                                        >
                                          OK
                                        </button>
                                      </>
                                    )}
                                  </Box>
                                </Modal>
                              </div>
                            )}

                            <div className="d-flex justify-content-end mt-3">
                              <button
                                onClick={handlePrevious}
                                type="button"
                                className="px-3 py-2 prev-step"
                              >
                                Previous
                              </button>
                              <button
                                onClick={handleNext}
                                type="button"
                                className="px-3 py-2 next-step"
                              >
                                {activeStep === steps.length - 1
                                  ? "Submit"
                                  : "Next"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 18:
        if (
          (userData?.onedays == "" || userData?.onedays == "0") &&
          (userData?.twodays == "" || userData?.twodays == "0") &&
          (userData?.threedays == "" || userData?.threedays == "0") &&
          (userData?.fourdays == "" || userData?.fourdays == "0") &&
          (userData?.fivedays == "" || userData?.fivedays == "0") &&
          (userData?.sixdays == "" || userData?.sixdays == "0")
        ) {
          // Display error message and prevent progressing further
          return (
            <div className="step step-17">
              <div className="container ">
                <div className="row justify-content-center">
                  <div className="col-lg-10">
                    <LinearProgress
                      variant="determinate"
                      sx={{
                        height: "14px",
                        borderRadius: "6px",
                        marginBottom: 5,
                        backgroundColor: "#f0f0f0",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "rgb(13, 189, 243);",
                        },
                      }}
                      value={100}
                    />
                    <div className="start-application">
                      <div className="row ROWW">
                        <div className="col-lg-8 col-md-8 col-sm-12">
                          <div className="img-applic-content">
                            <label
                              for="net_income_2019"
                              className="form-label fs-5"
                              style={{ color: "red" }}
                            >
                              Oops...!
                            </label>
                            <br />
                            <label
                              for="net_income_2019"
                              className="form-label fs-5"
                              style={{ color: "red" }}
                            >
                              "Based on the previous response, you are not
                              eligible as your value does not meet our
                              criteria."
                            </label>
                            <div className="d-flex justify-content-center mt-3">
                              <button
                                onClick={handlePrevious}
                                type="button"
                                className="px-3 py-2 prev-step"
                              >
                                Previous
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        } else {
          // Regular form content for Step 2
          return (
            <div className="step step-15">
              <div className="container ">
                <div className="row justify-content-center">
                  <div className="col-lg-10">
                    <LinearProgress
                      variant="determinate"
                      sx={{
                        height: "14px",
                        borderRadius: "6px",
                        marginBottom: 5,
                        backgroundColor: "#f0f0f0",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "rgb(13, 189, 243);",
                        },
                      }}
                      value={84.61}
                    />
                    <div className="start-application">
                      <div className="row ROWW">
                        <div className="col-lg-8 col-md-8 col-sm-12">
                          <div className="img-applic-content">
                            <h1
                              className="text-center"
                              style={{ color: "rgb(13, 189, 243)" }}
                            >
                              Are you eligible?
                            </h1>
                            {/* <h3
                              style={{
                                fontWeight: 300,
                                lineHeight: 0.2,
                                color: "rgb(13, 189, 243)",
                              }}
                              className="text-center"
                            >
                              Question 11 of 13
                            </h3> */}
                            <div style={{ marginTop: 40 }}>
                              <label
                                for="setc_program"
                                className="form-label headng "
                                style={{ fontWeight: "600" }}
                              >
                                Have you already filed for the SETC
                                program/FFCRA for the years of 2020 and 2021?
                              </label>

                              <div className="optio mb-2">
                                <label for="setc_program_yes">
                                  <p
                                    style={{
                                      backgroundColor:
                                        formData.setc_program === "Yes"
                                          ? "lightblue"
                                          : "initial",
                                    }}
                                  >
                                    <input
                                      className={`form-check-input ${
                                        errors.setc_program
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      type="radio"
                                      name="setc_program"
                                      checked={formData.setc_program === "Yes"}
                                      value="Yes"
                                      id="setc_program_yes"
                                      onChange={handleInputChange}
                                    />
                                    Yes
                                  </p>
                                </label>
                              </div>
                              <div className="optio">
                                <label for="setc_program_no">
                                  <p
                                    style={{
                                      backgroundColor:
                                        formData.setc_program === "No"
                                          ? "lightblue"
                                          : "initial",
                                    }}
                                  >
                                    <input
                                      className={`form-check-input ${
                                        errors.setc_program
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      type="radio"
                                      name="setc_program"
                                      checked={formData.setc_program === "No"}
                                      value="No"
                                      id="setc_program_no"
                                      onChange={handleInputChange}
                                    />
                                    No
                                  </p>
                                </label>
                              </div>

                              {formData.setc_program === "Yes" &&
                                activeErrorQualifySix && (
                                  <div>
                                    <h4 style={{ color: "#e62e2d" }}>
                                      We are sorry. By answering “YES” to the
                                      above question, you will not be eligible
                                      for the SETC program.
                                    </h4>
                                  </div>
                                )}

                              <div className="d-flex justify-content-end mt-3">
                                <button
                                  onClick={handlePrevious}
                                  type="button"
                                  className="px-3 py-2 prev-step"
                                >
                                  Previous
                                </button>
                                <button
                                  onClick={handleNext}
                                  type="button"
                                  className="px-3 py-2 next-step"
                                >
                                  {activeStep === steps.length - 1
                                    ? "Submit"
                                    : "Next"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }

      case 19:
        return (
          <div className="step step-16">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <LinearProgress
                    variant="determinate"
                    sx={{
                      height: "14px",
                      borderRadius: "6px",
                      marginBottom: 5,
                      backgroundColor: "#f0f0f0",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "rgb(13, 189, 243);",
                      },
                    }}
                    value={92.3}
                  />
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="img-applic-content">
                          <h1
                            className="text-center"
                            style={{ color: "rgb(13, 189, 243)" }}
                          >
                            Are you eligible?
                          </h1>
                          {/* <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                            }}
                            className="text-center"
                          >
                            Question 12 of 13
                          </h3> */}
                          <div style={{ marginTop: 40 }}>
                            <label
                              for="setc_program"
                              className="form-label headng "
                              style={{ fontWeight: "600" }}
                            >
                              Were you self-employed and employed as a W2 during
                              4/1/2020-9/30/2021?*
                            </label>

                            <div className="optio mb-2">
                              <label for="self_employed_from_yes">
                                <p
                                  style={{
                                    backgroundColor:
                                      formData.employed_as_W2 === "Yes"
                                        ? "lightblue"
                                        : "initial",
                                  }}
                                >
                                  <input
                                    className="form-check-input"
                                    class={`form-check-input ${
                                      errors.employed_as_W2
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    type="radio"
                                    name="employed_as_W2"
                                    checked={formData.employed_as_W2 === "Yes"}
                                    value="Yes"
                                    id="self_employed_from_yes"
                                    onChange={handleInputChange}
                                  />
                                  Yes
                                </p>
                              </label>
                            </div>
                            <div className="optio">
                              <label for="self_employed_from_no">
                                <p
                                  style={{
                                    backgroundColor:
                                      formData.employed_as_W2 === "No"
                                        ? "lightblue"
                                        : "initial",
                                  }}
                                >
                                  <input
                                    className="form-check-input"
                                    class={`form-check-input ${
                                      errors.employed_as_W2
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    type="radio"
                                    name="employed_as_W2"
                                    checked={formData.employed_as_W2 === "No"}
                                    value="No"
                                    id="self_employed_from_no"
                                    onChange={handleInputChange}
                                  />
                                  No
                                </p>
                              </label>
                            </div>
                            {formData.employed_as_W2 === "Yes" && (
                              <>
                                <div id="additional">
                                  <label
                                    for="Self-employed"
                                    className="form-label bg-light py-3 px-1 fs-5"
                                  >
                                    If yes, did your employer pay Family Sick
                                    Leave during Covid, and what amount?
                                  </label>
                                  <div className="optio mb-2">
                                    <label for="family_sick_yes">
                                      <p
                                        style={{
                                          backgroundColor:
                                            formData.family_sick === "Yes"
                                              ? "lightblue"
                                              : "initial",
                                        }}
                                      >
                                        <input
                                          className="form-check-input"
                                          class={`form-check-input ${
                                            errors.family_sick
                                              ? "border-danger"
                                              : ""
                                          }`}
                                          type="radio"
                                          name="family_sick"
                                          checked={
                                            formData.family_sick === "Yes"
                                          }
                                          value="Yes"
                                          id="family_sick_yes"
                                          onChange={handleInputChange}
                                        />
                                        Yes
                                      </p>
                                    </label>
                                  </div>
                                  <div className="optio">
                                    <label for="family_sick_no">
                                      <p
                                        style={{
                                          backgroundColor:
                                            formData.family_sick === "No"
                                              ? "lightblue"
                                              : "initial",
                                        }}
                                      >
                                        <input
                                          className="form-check-input"
                                          class={`form-check-input ${
                                            errors.family_sick
                                              ? "border-danger"
                                              : ""
                                          }`}
                                          type="radio"
                                          name="family_sick"
                                          checked={
                                            formData.family_sick === "No"
                                          }
                                          value="No"
                                          id="family_sick_no"
                                          onChange={handleInputChange}
                                        />
                                        No
                                      </p>
                                    </label>
                                  </div>
                                </div>
                                {formData.family_sick === "Yes" && (
                                  <div
                                    id="amount"
                                    style={{ marginTop: "5.5px" }}
                                  >
                                    <div className="optio mb-2">
                                      <input
                                        style={{ width: "100%" }}
                                        type="text"
                                        value={formData.amount2020}
                                        name="amount2020"
                                        class={` for mb-2 ${
                                          errors.amount2020
                                            ? "border-danger"
                                            : ""
                                        }`}
                                        placeholder="2021 Income"
                                        onChange={handleInputChange}
                                        id="amount2020"
                                      />

                                      <input
                                        style={{ width: "100%" }}
                                        type="text"
                                        value={formData.amount2021}
                                        name="amount2021"
                                        class={` for ${
                                          errors.amount2021
                                            ? "border-danger"
                                            : ""
                                        }`}
                                        placeholder="2021 Income"
                                        onChange={handleInputChange}
                                        id="amount2021"
                                      />
                                    </div>
                                  </div>
                                )}
                              </>
                            )}
                            <div className="d-flex justify-content-end mt-3">
                              <button
                                onClick={handlePrevious}
                                type="button"
                                className="px-3 py-2 prev-step"
                              >
                                Previous
                              </button>
                              <button
                                onClick={handleNext}
                                type="button"
                                className="px-3 py-2 next-step"
                              >
                                {activeStep === steps.length - 1
                                  ? "Submit"
                                  : "Next"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 20:
        return (
          //           <>
          //           {
          //             ( userData?.onedays == "0" &&
          //             userData?.twodays == "0" &&
          //             userData?.threedays == "0" &&
          //             userData?.fourdays == "0" &&
          //             userData?.fivedays == "0" &&
          //             userData?.sixdays == "0" )  ?
          //             (

          // <div className="step step-17">
          //         <div className="container ">
          //           <div className="row justify-content-center">
          //             <div className="col-lg-10">

          //               <div className="start-application">
          //                 <div className="row ROWW">
          //                   <div className="col-lg-8 col-md-8 col-sm-12">
          //                     <div className="img-applic-content">
          //                     <label
          //                             for="net_income_2019"
          //                             className="form-label fs-5"
          //                             style={{ color: "red", }}
          //                           >
          //                             Oops...!
          //                           </label>
          //                           <br/>
          //                     <label
          //                             for="net_income_2019"
          //                             className="form-label fs-5"
          //                             style={{ color: "red" }}
          //                           >
          //                             "Based on the previous response, you are not eligible as your value does not meet our criteria."
          //                           </label>
          //                           <div className="d-flex justify-content-center mt-3">
          //                                 <button
          //                                   onClick={handlePrevious}
          //                                   type="button"
          //                                   className="px-3 py-2 prev-step"
          //                                 >
          //                                   Previous
          //                                 </button>

          //                               </div>
          //                     </div>
          //                   </div>
          //                 </div>
          //               </div>
          //             </div>
          //           </div>
          //         </div>
          //       </div>

          //             ) :

          // (

          <div className="step step-17">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <LinearProgress
                    variant="determinate"
                    sx={{
                      height: "14px",
                      borderRadius: "6px",
                      marginBottom: 5,
                      backgroundColor: "#f0f0f0",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "rgb(13, 189, 243);",
                      },
                    }}
                    value={100}
                  />
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="img-applic-content ">
                          <h1
                            className="text-center"
                            style={{ color: "rgb(13, 189, 243)" }}
                          >
                            Are you eligible?
                          </h1>
                          {/* <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                            }}
                            className="text-center"
                          >
                            Question 13 of 13
                          </h3> */}
                          <h4
                            className="text-center "
                            style={{ color: "rgb(13, 189, 243)" }}
                          >
                            What was my the Net Income for the years of
                            2019,2020,2021?
                          </h4>
                          <h5
                            className="text-center mb-3"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal_step_17"
                            style={{
                              color: "red",
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                          >
                            {" "}
                            Located on your Schedule C (Form 1040)
                          </h5>
                          {/* <a class="w-100 text-center fs-3 mb-3"  style={{color:"red"}}
                          href="" 
                          
                          > Located on your Schedule C (Form 1040) </a> */}

                          <div
                            class="modal fade"
                            id="exampleModal_step_17"
                            tabindex="-1"
                            aria-labelledby="exampleModalLabel"
                            style={{ display: "none" }}
                            aria-hidden="true"
                          >
                            <div
                              class="modal-dialog modal-dialog-centered"
                              style={{ maxWidth: "800px" }}
                            >
                              <div class="modal-content">
                                <div class="modal-header border-0">
                                  <h1
                                    class="modal-title fs-5"
                                    id="exampleModalLabel"
                                  ></h1>
                                  <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div class="modal-body text-center">
                                  <img
                                    class="img-fluid mb-2 p-2"
                                    src="https://agree.setczone.comstorage/pdf-2019.png"
                                    style={{ border: "1px solid black" }}
                                  />
                                  <img
                                    class="img-fluid mb-2 p-2"
                                    src="https://agree.setczone.comstorage/pdf-2020.png"
                                    style={{ border: "1px solid black" }}
                                  />
                                  <img
                                    class="img-fluid mb-2 p-2"
                                    src="https://agree.setczone.comstorage/pdf-2021.png"
                                    style={{ border: "1px solid black" }}
                                  />
                                  <div class="row justify-content-end mb-3">
                                    <button
                                      class="next-ste w-auto mx-3"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    >
                                      Ok
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <label
                              for="net_income_2019"
                              className="form-label fs-5"
                              style={{ color: "#00B6FF" }}
                            >
                              Total NET Income For 2019?
                            </label>
                            <div className="optio mb-2">
                              <input
                                type="text"
                                value={formData.netIncome2019}
                                class={` full-width for ${
                                  errors.netIncome2019 ? "border-danger" : ""
                                }`}
                                name="netIncome2019"
                                onChange={handleInputChange}
                                placeholder="$"
                                id="net_income_2019"
                              />
                            </div>
                            <label
                              for="net_income_2020"
                              className="form-label fs-5"
                              style={{ color: "#00B6FF" }}
                            >
                              Total NET Income For 2020?
                            </label>
                            <div className="optio mb-2">
                              <input
                                type="text"
                                value={formData.netIncome2020}
                                name="netIncome2020"
                                class={` full-width for ${
                                  errors.netIncome2020 ? "border-danger" : ""
                                }`}
                                placeholder="$"
                                onChange={handleInputChange}
                                id="net_income_2020"
                              />
                            </div>
                            <label
                              for="net_income_2021"
                              className="form-label fs-5"
                              style={{ color: "#00B6FF" }}
                            >
                              Total NET Income For 2021?
                            </label>
                            <div className="optio mb-2">
                              <input
                                type="text"
                                value={formData.netIncome2021}
                                name="netIncome2021"
                                class={`full-width for ${
                                  errors.netIncome2021 ? "border-danger" : ""
                                }`}
                                placeholder="$"
                                onChange={handleInputChange}
                                id="net_income_2021"
                              />
                            </div>

                            <div class="mt-3 mb-3">
                              <label
                                for="net_income_2021"
                                className="form-label fs-5"
                                style={{ color: "#00B6FF" }}
                              >
                                Did you E-file or mail in your taxes for the
                                following years?{" "}
                                <p
                                  style={{
                                    fontSize: "16px",
                                    fontWeight: 600,
                                    marginLeft: 1,
                                    color: "red",
                                  }}
                                >
                                  (If so, please check & verify the exact year.)
                                </p>
                              </label>
                              <table border="0">
                                <thead>
                                  <tr>
                                    <th>Year</th>
                                    <th className="table-cell">
                                      E-filed my taxes
                                    </th>
                                    <th className="table-cell">
                                      Mailed in my taxes
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {taxYears.map(({ year, eFiled, mailed }) => (
                                    <tr key={year}>
                                      <td style={{ fontWeight: "600" }}>
                                        {year}
                                      </td>
                                      <td
                                        className={` 
               
                table-cell`}
                                        onClick={() => {
                                          toggleBackground(year, "eFiled");
                                          updateDatabase(
                                            year,
                                            "eFiled",
                                            !eFiled
                                          );
                                        }}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            width: "90px",
                                            color: "white",
                                            backgroundColor: eFiled
                                              ? "rgb(0, 182, 255)"
                                              : "gray",
                                            justifyContent: "center",
                                            borderRadius: "3px",
                                          }}
                                        >
                                          {" "}
                                          E-filed
                                        </div>
                                      </td>
                                      <td
                                        className={` 
                
                table-cell`}
                                        onClick={() => {
                                          toggleBackground(year, "mailed");
                                          updateDatabase(
                                            year,
                                            "mailed",
                                            !mailed
                                          );
                                        }}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            width: "90px",
                                            color: "white",
                                            backgroundColor: mailed
                                              ? "rgb(0, 182, 255)"
                                              : "gray",
                                            justifyContent: "center",
                                            borderRadius: "3px",
                                          }}
                                        >
                                          {" "}
                                          Mailed
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>

                            {activeErrorQualify17 && (
                              <div>
                                <h4 style={{ color: "#e62e2d" }}>
                                  We're sorry, but unfortunately you do not meet
                                  the minimum threshold of $10,000.00 for two
                                  out of the three years.
                                </h4>
                              </div>
                            )}

                            <div className="d-flex justify-content-end mt-3">
                              <button
                                onClick={handlePrevious}
                                type="button"
                                className="px-3 py-2 prev-step"
                              >
                                Previous
                              </button>
                              <button
                                onClick={handleNext}
                                type="button"
                                className="px-3 py-2 next-step"
                              >
                                {activeStep === steps.length - 1
                                  ? "Submit"
                                  : "Next"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          // )
          //                                 }
          //                                 </>
        );
      case 21:
        return (
          <div className="step step-18">
            <input type="hidden" name="record_id" id="record_id" value="" />
            <div className="container">
              <div className="row justify-content-center">
                {/* <canvas id="confetti"></canvas> */}
                <div className="col-lg-12">
                  <div className="start-application">
                    <div className="customRow">
                      <div
                        className="col-lg-6 col-md-6 col-sm-12 pe-0 backGround"
                        style={{
                          backgroundImage: "linear-gradient(#dff5fc, #dff5fc)",
                          borderRadius: "12px",
                        }}
                      >
                        <div
                          className="img-applci sd h-100"
                          style={{ backgroundImage: "none " }}
                        >
                          <div className="col-lg-12">
                            <div
                              style={boxSttyle}
                              className="desktop-box"
                              css={styles[mediaQuery]}
                            >
                              <Confetti
                                width={width}
                                height={height}
                                style={confettiStyle}
                              />
                              <div style={{ textAlign: "center" }}>
                                <h1>Congratulations!</h1>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 ">
                        <div
                          className="img-applic-content d-flex align-items-center"
                          style={{ padding: "14px" }}
                        >
                          <div className="row justify-content-center align-items-center">
                            <div className="col-lg-12">
                              <div className="h-100 d-flex align-items-center flex-column">
                                <div className="h-90">
                                  <h3 className="text-success text-center fs-1 mb-3">
                                    Hurray!
                                  </h3>

                                  <h3 className="fs-4">
                                    Based on the information you provided, we’ve
                                    estimated that you might be eligible for up
                                    to
                                    <span
                                      className="text-success text-success text-center h3 fs-1 mb-3"
                                      id="final_amount"
                                    >
                                      {" "}
                                      {finalIncomeValue ||
                                        finalCreditAmountStorage}
                                    </span>
                                    <br />
                                  </h3>

                                  <h3 className="mt-4">
                                    The next step is to upload your documents
                                    for our tax professionals to calculate your exact credit
                                    amount.
                                  </h3>
                                </div>
                                <div className="d-flex justify-content-end mt-3">
                                  <button
                                    onClick={handlePrevious}
                                    type="button"
                                    className="px-3 py-2 prev-step"
                                  >
                                    Previous
                                  </button>
                                  <button
                                    onClick={handleNext}
                                    type="button"
                                    className="px-3 py-2 next-step"
                                  >
                                    {activeStep === steps.length - 1
                                      ? "Submit"
                                      : "Next"}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 22:
        return (
          <div className="step step-19">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="img-applic-content">
                          <div
                            id="survey-content"
                            class="survey-section"
                            data-section="verify_id"
                          >
                            {userData?.approval_status !== "approved" &&
                              userData?.approval_status !== "declined" && (
                                <>
                                  <div class="title d-flex align-items-center justify-content-center mb-4 w-100 text-center">
                                    <h1 className="text-center">
                                      {" "}
                                      Identity Verification
                                    </h1>
                                  </div>

                                  <div class="alert alert-primary ">
                                    Please complete the identity verification
                                    process
                                  </div>

                                  <p class="mb-3">
                                    In order to reduce fraudulant claims we need
                                    to verify your identify. We use a
                                    third-party service called Persona to
                                    achieve this. This service is highly secure
                                    and is used by some of the largest companies
                                    in the world to handle identity
                                    verification.
                                  </p>
                                </>
                              )}

                            {userData?.approval_status === "declined" && (
                              <>
                                <div class="title d-flex align-items-center justify-content-center mb-4 w-100 text-center">
                                  <h1 className="text-center">
                                    {" "}
                                    Oops! Verification Rejected
                                  </h1>
                                </div>

                                <p class="mb-3" style={{ color: "red" }}>
                                  Your verification isn't varified. You have a
                                  one more attempt to verify your License ID
                                  before it's locked. Thank you!
                                </p>

                                <div class="alert alert-primary">
                                  <p class="text-center">
                                    In case of any problem, please reach out to
                                    us at
                                    <br />
                                    <a
                                      href="mailto:support@setczone.com"
                                      target="_blank"
                                    >
                                      support@setczone.com
                                    </a>
                                    <br />
                                    We'll be happy to assit yoy!
                                  </p>
                                </div>
                              </>
                            )}

                            {userData?.approval_status === "approved" && (
                              <div style={{ textAlign: "center" }}>
                                <div className="modal-body d-flex justify-content-center flex-column align-items-center pt-0">
                                  <img
                                    src={gifTick}
                                    style={{ width: "120px" }}
                                  />
                                  <h5 className="text-center pb-4">
                                    <span
                                      className="text-success"
                                      style={{ fontSize: 20 }}
                                    >
                                      Great
                                    </span>{" "}
                                    Your identification process is complete.
                                    <br />
                                    <div class="mt-2">
                                      {userData?.verified_first && (
                                        <>
                                          Your legal first name{" "}
                                          {userData?.verified_first},{" "}
                                        </>
                                      )}
                                      {userData?.verified_middleName && (
                                        <>
                                          middle name{" "}
                                          {userData?.verified_middleName},{" "}
                                        </>
                                      )}
                                      {userData?.verified_last && (
                                        <>
                                          last name {userData?.verified_last}{" "}
                                        </>
                                      )}
                                    </div>
                                    <br />
                                    Please review and verify the provided
                                    information. If you wish to proceed with
                                    your application, click the button below to
                                    move to the next step.
                                  </h5>
                                </div>
                              </div>
                            )}

                            <div class="text-center">
                              <img
                                class="mb-3 img-fluid"
                                src={firstPage}
                                style={{ height: "300px", width: "auto" }}
                              />
                            </div>
                            <div className="d-flex justify-content-center mt-3">
                              {userData?.approval_status !== "approved" && (
                                <button
                                  onClick={handlePrevious}
                                  type="button"
                                  className="px-3 py-2 prev-step"
                                >
                                  Previous
                                </button>
                              )}
                              <button
                                onClick={handleNext}
                                type="button"
                                className="px-3 py-2 next-step"
                              >
                                {userData?.approval_status === "declined"
                                  ? "Retry"
                                  : userData?.approval_status === "approved"
                                  ? "Next"
                                  : "Verify"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 23:
        return (
          <>
            <div className="row justify-content-center pb-3">
              <div className="col-lg-8 col-md-8 col-sm-12">
                <div
                  className="step step-1 bg-white shadow  pb-5"
                  style={{ borderRadius: "20px", marginTop: "25px" }}
                >
                  <h3
                    className="text-center mb-3 py-3 text-white"
                    style={{
                      backgroundColor: "rgb(13, 189, 243)",
                      borderRadius: "10px",
                    }}
                  >
                    Please Confirm Your Legal Information
                  </h3>
                  <div className="px-3">
                    <input
                      type="hidden"
                      name="record_id"
                      id="record_id"
                      value=""
                    />

                    <div className="row mt-4 ">
                      {/* <div className="col-sm-6 mb-3">
                              <input
                                type="text"
                                value={formData.firstName}
                                name="firstName"
                                maxLength="1024"
                                placeholder="First Name"
                                class={`textinput form-control ${
                                  errors.firstName ? "border-danger" : ""
                                }`}
                                required=""
                                id="id_first_name"
                                onChange={handleInputChange}
                              />
      
                              {errors.firstName && (
                                <div
                                  className="text-danger"
                                  style={{ fontSize: "12px" }}
                                >
                                  {errors.firstName}
                                </div>
                              )}
                            </div>
                            <div id="last_name" className="col-sm-6 mb-3">
                              <input
                                type="text"
                                value={formData.lastName}
                                name="lastName"
                                placeholder="Last Name"
                                maxlength="1024"
                                class={`textinput form-control ${
                                  errors.lastName ? "border-danger" : ""
                                }`}
                                required=""
                                id="id_last_name"
                                onChange={handleInputChange}
                              />
      
                              {errors.lastName && (
                                <div
                                  className="text-danger"
                                  style={{ fontSize: "12px" }}
                                >
                                  {errors.lastName}
                                </div>
                              )}
                            </div> */}
                      <div className="col-sm-6 mb-3">
                        <label
                          for="id_first_name"
                          className="form-label requiredField"
                        >
                          Your Legal First Name
                        </label>
                        <div
                          className={`textinput form-control ${
                            userData?.verified_first ? "" : "empty-name"
                          }`}
                        >
                          {userData?.verified_first}
                        </div>
                      </div>
                      <div className="col-sm-6 mb-3">
                        <label
                          for="id_last_name"
                          className="form-label requiredField"
                        >
                          Your Legal Middle Name
                        </label>
                        <div
                          className={`textinput form-control ${
                            userData?.verified_middleName ? "" : "empty-name"
                          }`}
                        >
                          {userData?.verified_middleName || ""}
                        </div>
                      </div>

                      <div className="col-sm-6 mb-3">
                        <label
                          for="id_last_name"
                          className="form-label requiredField"
                        >
                          Your Legal Last Name
                        </label>
                        <div
                          className={`textinput form-control ${
                            userData?.verified_last ? "" : "empty-name"
                          }`}
                        >
                          {userData?.verified_last || ""}
                        </div>
                      </div>

                      <div id="div_id_phone_number" className="col-sm-6 mb-3">
                        <label
                          for="id_phone_number"
                          className="form-label requiredField"
                        >
                          Owners Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          name="phone"
                          maxlength="128"
                          placeholder="(555) 555-5555"
                          class={`textinput form-control ${
                            errors.phone ? "border-danger" : ""
                          }`}
                          required=""
                          id="id_phone_number"
                          onChange={handleInputChange}
                        />

                        {errors.phone && (
                          <div
                            className="text-danger"
                            style={{ fontSize: "12px" }}
                          >
                            {errors.phone}
                          </div>
                        )}
                      </div>
                      <div id="div_id_email" className="col-sm-6 mb-3">
                        <label
                          for="id_email"
                          className="form-label requiredField"
                        >
                          Email
                        </label>
                        <input
                          value={formData.email}
                          type="email"
                          name="email"
                          maxLength="254"
                          placeholder="e.g. example@example.com"
                          class={`form-control ${
                            // errors.email === "Email is available"
                            //   ? "border-success text-success"
                            //   :
                            errors.email ? "border-danger" : ""
                          }`}
                          required=""
                          id="id_email"
                          onChange={handleInputChange}
                          onBlur={handleEmailBlur}
                        />
                        {errors.email && (
                          <div
                            className={
                              errors.email === "Email is available"
                                ? "text-success"
                                : "text-danger"
                            }
                            style={{ fontSize: "14px" }}
                          >
                            {errors.email}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="row mt-4">
                      <label
                        for="Business-Legal-Name"
                        className="form-label requiredField"
                      >
                        Business Legal Name
                      </label>
                      <div className="col-sm-6 mb-3">
                        <input
                          type="text"
                          value={formData.bussinessName}
                          name="bussinessName"
                          maxLength="1024"
                          placeholder="Business Legal Name"
                          class={`textinput form-control ${
                            errors.bussinessName ? "border-danger" : ""
                          }`}
                          required=""
                          id="Business-Legal-Name"
                          onChange={handleInputChange}
                        />

                        {errors.bussinessName && (
                          <div
                            className="text-danger"
                            style={{ fontSize: "12px" }}
                          >
                            {errors.bussinessName}
                          </div>
                        )}
                      </div>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          value={formData.employees}
                          class={` form-control ${
                            errors.employees ? "border-danger" : ""
                          }`}
                          id="employees"
                          placeholder=" Number of  Employees"
                          name="employees"
                          required=""
                          onChange={handleInputChange}
                        />
                        {errors.employees && (
                          <div
                            className="text-danger"
                            style={{ fontSize: "14px" }}
                          >
                            {errors.employees}
                          </div>
                        )}

                        <div className="invalid-feedback emailError"></div>
                      </div>
                    </div>

                    <div className="mb-2">
                      <div className="col-sm-6">
                        <label for="Trade-Name" className="form-label">
                          Trade Name, if any(indicate none, if none)
                        </label>

                        <input
                          type="text"
                          value={formData.tradeName}
                          class={` form-control ${
                            errors.tradeName ? "border-danger" : ""
                          }`}
                          id="Trade-Name"
                          placeholder=""
                          name="tradeName"
                          required=""
                          onChange={handleInputChange}
                        />
                        {errors.tradeName && (
                          <div
                            className="text-danger"
                            style={{ fontSize: "14px" }}
                          >
                            {errors.tradeName}
                          </div>
                        )}

                        <div className="invalid-feedback emailError"></div>
                      </div>
                    </div>
                    <div className="mb-2">
                      <label for="Self-employed" className="form-label">
                        Self-employed business address. This may likely be your
                        home address unless you use a separate business address
                      </label>
                      <input
                        type="text"
                        value={formData.streetAddressOne}
                        class={`form-control  ${
                          errors.streetAddressOne ? "border-danger" : ""
                        }`}
                        id="Street-Address"
                        placeholder="Street Address"
                        name="streetAddressOne"
                        required=""
                        onChange={handleInputChange}
                      />

                      {errors.streetAddressOne && (
                        <div
                          className="text-danger"
                          style={{ fontSize: "14px" }}
                        >
                          {errors.streetAddressOne}
                        </div>
                      )}

                      <input
                        type="text"
                        value={formData.streetAddressTwo}
                        onChange={handleInputChange}
                        className="form-control mt-3"
                        id="Street-Address-Line-2"
                        placeholder="Street Address Line 2"
                        name="streetAddressTwo"
                      />
                      <div className="invalid-feedback company_nameError"></div>
                    </div>
                    <div className="row">
                      <div id="div_id_first_name" className="col-sm-6 mt-3">
                        <label for="City" className="form-label requiredField">
                          City
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          class={`textinput form-control  ${
                            errors.city ? "border-danger" : ""
                          }`}
                          onChange={handleInputChange}
                          name="city"
                          required=""
                          id="City"
                        />
                        {errors.city && (
                          <div
                            className="text-danger"
                            style={{ fontSize: "14px" }}
                          >
                            {errors.city}
                          </div>
                        )}
                      </div>
                      <div id="div_id_last_name" className="col-sm-6 mt-3 mb-3">
                        <label
                          for="State_Province"
                          className="form-label requiredField"
                        >
                          State/Province
                        </label>
                        <input
                          type="text"
                          value={formData.province}
                          name="province"
                          maxlength="1024"
                          class={`textinput form-control 
                            ${errors.province ? "border-danger" : ""}`}
                          required=""
                          id="State_Province"
                          onChange={handleInputChange}
                        />
                        {errors.province && (
                          <div
                            className="text-danger"
                            style={{ fontSize: "14px" }}
                          >
                            {errors.province}
                          </div>
                        )}
                      </div>
                      <div id="div_id_last_name" className="col-sm-6 ">
                        <label
                          for="zipcode"
                          className="form-label requiredField"
                        >
                          Postal / Zip Code
                        </label>
                        <input
                          type="Number"
                          value={formData.zipCode}
                          name="zipCode"
                          maxlength="1024"
                          placeholder="00000"
                          class={`textinput form-control 
       ${errors.zipCode ? "border-danger" : ""}`}
                          required=""
                          id="zipcode"
                          onChange={handleInputChange}
                        />
                        {errors.zipCode && (
                          <div
                            className="text-danger"
                            style={{ fontSize: "14px" }}
                          >
                            {errors.zipCode}
                          </div>
                        )}
                      </div>
                      {/* <div id="know_about_us" className="col-sm-6  ">
                        <label
                          for="know-about"
                          className="form-label requiredField"
                        >
                          How did you hear about us?
                        </label>
                        <input
                          type="text"
                          value={formData.knowAbout}
                          name="knowAbout"
                          maxlength="1024"
                          class={`textinput form-control 
                          ${errors.knowAbout ? "border-danger" : ""}`}
                          required=""
                          id="know-about"
                          onChange={handleInputChange}
                        />
                        {errors.knowAbout && (
                          <div
                            className="text-danger"
                            style={{ fontSize: "14px" }}
                          >
                            {errors.knowAbout}
                          </div>
                        )}
                      </div> */}
                    </div>

                    {/* <div className="mb-2 mt-3">
                            <label
                              for="accounting_professional"
                              className="form-label requiredField "
                              style={{ fontWeight: "600" }}
                            >
                              Are you an accounting professional? (Bookkeeper, CPA,
                              Accountant, Payroll Specialists)?
                            </label>
      
                            <div className="optio mb-2">
                              <label for="accounting_professional_yes">
                                <p
                                  style={{
                                    padding: "7px 10px",
                                    border: "1px solid lightgray",
                                    backgroundColor:
                                      formData.accounting_professional === "Yes"
                                        ? "lightblue"
                                        : "initial",
                                  }}
                                >
                                  <input
                                    className="form-check-input"
                                    class={`form-check-input ${
                                      errors.accounting_professional
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    type="radio"
                                    name="accounting_professional"
                                    checked={
                                      formData.accounting_professional === "Yes"
                                    }
                                    value="Yes"
                                    id="accounting_professional_yes"
                                    onChange={handleInputChange}
                                  />
                                  Yes
                                </p>
                              </label>
                            </div>
                            <div className="optio">
                              <label for="accounting_professional_no">
                                <p
                                  style={{
                                    padding: "7px 10px",
                                    border: "1px solid lightgray",
                                    backgroundColor:
                                      formData.accounting_professional === "No"
                                        ? "lightblue"
                                        : "initial",
                                  }}
                                >
                                  <input
                                    className="form-check-input"
                                    class={`form-check-input ${
                                      errors.accounting_professional
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    type="radio"
                                    name="accounting_professional"
                                    checked={
                                      formData.accounting_professional === "No"
                                    }
                                    value="No"
                                    id="accounting_professional_no"
                                    onChange={handleInputChange}
                                  />
                                  No
                                </p>
                              </label>
                            </div>
                            {formData.accounting_professional === "Yes" && (
                              <>
                                <div id="additional">
                                  <label
                                    for="accounting_partnership"
                                    // className="form-label bg-light py-3 px-1 fs-5"
                                    className="form-label requiredField"
                                  >
                                    Are you interested in our accounting partnership
                                    that would allow you to purchase the downloadable
                                    calculation?
                                  </label>
                                  <div className="optio mb-2">
                                    <label for="accounting_partnership_yes">
                                      <p
                                        style={{
                                          padding: "7px 10px",
                                          border: "1px solid lightgray",
                                          backgroundColor:
                                            formData.accounting_partnership === "Yes"
                                              ? "lightblue"
                                              : "initial",
                                        }}
                                      >
                                        <input
                                          className="form-check-input"
                                          class={`form-check-input ${
                                            errors.accounting_partnership
                                              ? "border-danger"
                                              : ""
                                          }`}
                                          type="radio"
                                          name="accounting_partnership"
                                          checked={
                                            formData.accounting_partnership === "Yes"
                                          }
                                          value="Yes"
                                          id="accounting_partnership_yes"
                                          onChange={handleInputChange}
                                        />
                                        Yes
                                      </p>
                                    </label>
                                  </div>
                                  <div className="optio">
                                    <label for="accounting_partnership_no">
                                      <p
                                        style={{
                                          padding: "7px 10px",
                                          border: "1px solid lightgray",
                                          backgroundColor:
                                            formData.accounting_partnership === "No"
                                              ? "lightblue"
                                              : "initial",
                                        }}
                                      >
                                        <input
                                          className="form-check-input"
                                          class={`form-check-input ${
                                            errors.accounting_partnership
                                              ? "border-danger"
                                              : ""
                                          }`}
                                          type="radio"
                                          name="accounting_partnership"
                                          checked={
                                            formData.accounting_partnership === "No"
                                          }
                                          value="No"
                                          id="accounting_partnership_no"
                                          onChange={handleInputChange}
                                        />
                                        No
                                      </p>
                                    </label>
                                  </div>
                                </div>
                              </>
                            )}
                          </div> */}

                    {/* <div className="impot mt-3">
                      <p>
                        The address you provide above will be used as the
                        mailing address for your SETC refund check. If you meet
                        the eligibility criteria, the IRS generally takes 3 – 5
                        months to process your application. To ensure the check
                        reaches you without any complications, kindly provide an
                        address where you intend to reside for the next 6
                        months. This will help guarantee accurate and timely
                        delivery to the correct address.
                      </p>
                    </div> */}
                    <div
                      className="d-flex mt-3"
                      style={{ alignItems: "start " }}
                    >
                      <input
                        checked={formData.isChecked}
                        class={`checkBoxStepOne form-check-input me-1 mt-1 ${
                          errors.isChecked ? "border-danger" : ""
                        }`}
                        type="checkbox"
                        id="flexCheckDefault1"
                        name="isChecked"
                        onChange={handleInputChange}
                      />

                      <p class="mb-3 mt-0">
                        By checking the box, you agree to our{" "}
                        <a
                          style={{
                            textDecoration: "underline",
                            cursor: "pointer",
                            color: "blue",
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal_step_19"
                        >
                          terms & conditions
                        </a>{" "}
                        and will allow SETC Zone and its partners to contact you
                        via phone, text, and/or email.
                      </p>
                    </div>

                    <div
                      className="modal fade"
                      id="exampleModal_step_19"
                      style={{
                        display: "none",
                        // padding: "0px 40px 20px 40px",
                      }}
                      aria-hidden="true"
                    >
                      <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                          <div class="modal-header bg-success text-white">
                            <h4 class="modal-title" style={{ color: "white" }}>
                              <i
                                class="fas fa-check-circle"
                                style={{ color: "white" }}
                              ></i>{" "}
                              Terms and conditions
                            </h4>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <p>
                              <span>Terms of Service</span>
                            </p>
                            <p>
                              <span>Effective: November 1st, 2023</span>
                            </p>
                            <p>
                              Thank you for using our services! These terms of
                              service (“Terms”) cover your use and access to our
                              services, client software, and websites
                              ("Services"). By using our Services, you agree to
                              be bound by these Terms and our Privacy Policy. If
                              you are using our Services for an organization,
                              you are agreeing to these Terms on behalf of that
                              organization.
                            </p>
                            <p>
                              <b>Your Information and Your Permissions</b>
                            </p>
                            <p>
                              When you use our Services, you provide us with
                              things like your files, content, messages,
                              contacts, and so on (your information). Your
                              information is yours. These Terms do not give us
                              any rights to your information except for the
                              limited rights that enable us to offer the
                              Services.
                            </p>
                            <p>
                              Our Services also provide you with features like
                              eSign, file sharing, email newsletters,
                              appointment setting, and more. These and other
                              features may require our systems to access, store,
                              and scan your information. You give us permission
                              to do those things, and this permission extends to
                              our affiliates and trusted third parties we work
                              with.
                            </p>
                            <p>
                              <b>Your Responsibilities</b>
                            </p>
                            <p>
                              You are responsible for your conduct. Your
                              information and you must comply with applicable
                              laws. Content in the Services may be protected by
                              others’ intellectual property rights. Please do
                              not copy, upload, download, or share content
                              unless you have the right to do so. We may review
                              your conduct and content for compliance with these
                              Terms. With that said, we have no obligation to do
                              so. We are not responsible for the content people
                              post and share via the Services.
                            </p>
                            <p>
                              Help us keep you informed and your information
                              protected. Safeguard your password to the
                              Services, and keep your account information
                              current. Do not share your account credentials or
                              give others access to your account.
                            </p>
                            <p>
                              You may use our Services only as permitted by
                              applicable law, including export control laws and
                              regulations.
                            </p>
                            <p>
                              <b>Our Information</b>
                            </p>
                            <p>
                              The Services are protected by copyright,
                              trademark, and other US and foreign laws. These
                              Terms do not grant you any right, title, or
                              interest in the Services, others’ content in the
                              Services, SETC Zone, and our trademarks, logos,
                              and other brand features. We welcome feedback, but
                              note that we may use comments or suggestions
                              without any obligation to you.
                            </p>
                            <p>
                              <b>Copyright</b>
                            </p>
                            <p>
                              We respect the intellectual property of others and
                              ask that you do too. We respond to notices of
                              alleged copyright infringement if they comply with
                              the law, and such notices should be reported to{" "}
                              <a href="mailto:info@setczone.com">
                                info@setczone.com
                              </a>
                              . We reserve the right to delete or disable
                              content alleged to be infringing and terminate
                              accounts of repeat infringers.
                            </p>
                            <p>
                              <b>Termination</b>
                            </p>
                            <p>
                              You are free to stop using our Services at any
                              time. We reserve the right to suspend or terminate
                              your access to the Services with notice to you if:
                            </p>
                            <p>(a) you are in breach of these Terms,</p>
                            <p>
                              (b) you are using the Services in a manner that
                              would cause a real risk of harm or loss to us or
                              other users, or
                            </p>
                            <p>
                              We will provide you with reasonable advance notice
                              via the email address associated with your account
                              to remedy the activity that prompted us to contact
                              you and give you the opportunity to export your
                              information from our Services. If after such
                              notice you fail to take the steps we ask of you,
                              we will terminate or suspend your access to the
                              Services.
                            </p>
                            <p>
                              We will not provide notice before termination
                              where:
                            </p>
                            <p>
                              (a) you are in material breach of these Terms,
                            </p>
                            <p>
                              (b) doing so would cause us legal liability or
                              compromise our ability to provide the Services to
                              our other users, or
                            </p>
                            <p>(c) we are prohibited from doing so by law.</p>
                            <p>
                              <b>Discontinuation of Services</b>
                            </p>
                            <p>
                              We may decide to discontinue the Services in
                              response to unforeseen circumstances beyond SETC
                              Zone’s control or to comply with a legal
                              requirement. If we do so, we will give you
                              reasonable prior notice so that you can export
                              your information from our systems.
                            </p>
                            <p>
                              <b>Services “AS IS”</b>
                            </p>
                            <p>
                              We strive to provide great Services, but there are
                              certain things that we cannot guarantee. TO THE
                              FULLEST EXTENT PERMITTED BY LAW, SETC Zone AND ITS
                              AFFILIATES, SUPPLIERS, AND DISTRIBUTORS MAKE NO
                              WARRANTIES, EITHER EXPRESS OR IMPLIED, ABOUT THE
                              SERVICES. THE SERVICES ARE PROVIDED "AS IS." WE
                              ALSO DISCLAIM ANY WARRANTIES OF MERCHANTABILITY,
                              FITNESS FOR A PARTICULAR PURPOSE, AND
                              NON-INFRINGEMENT. Some places do not allow the
                              disclaimers in this paragraph, so they may not
                              apply to you.
                            </p>
                            <p>
                              <b>Limitation of Liability</b>
                            </p>
                            <p>
                              WE DO NOT EXCLUDE OR LIMIT OUR LIABILITY TO YOU
                              WHERE IT WOULD BE ILLEGAL TO DO SO—THIS INCLUDES
                              ANY LIABILITY FOR SETC Zone OR ITS AFFILIATES’
                              FRAUD OR FRAUDULENT MISREPRESENTATION IN PROVIDING
                              THE SERVICES. IN COUNTRIES WHERE THE FOLLOWING
                              TYPES OF EXCLUSIONS ARE NOT ALLOWED, WE ARE
                              RESPONSIBLE TO YOU ONLY FOR LOSSES AND DAMAGES
                              THAT ARE A REASONABLY FORESEEABLE RESULT OF OUR
                              FAILURE TO USE REASONABLE CARE AND SKILL OR OUR
                              BREACH OF OUR CONTRACT WITH YOU. THIS PARAGRAPH
                              DOES NOT AFFECT CONSUMER RIGHTS THAT CANNOT BE
                              WAIVED OR LIMITED BY ANY CONTRACT OR AGREEMENT.
                            </p>
                            <p>
                              IN COUNTRIES WHERE EXCLUSIONS OR LIMITATIONS OF
                              LIABILITY ARE ALLOWED, SETC Zone, ITS AFFILIATES,
                              SUPPLIERS, OR DISTRIBUTORS WILL NOT BE LIABLE FOR:
                            </p>
                            <ol>
                              <li>
                                ANY INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE,
                                EXEMPLARY, OR CONSEQUENTIAL DAMAGES, OR
                              </li>
                              <li>
                                ANY LOSS OF USE, DATA, BUSINESS, OR PROFITS,
                                REGARDLESS OF LEGAL THEORY.
                              </li>
                            </ol>
                            <p>
                              THESE EXCLUSIONS OR LIMITATIONS WILL APPLY
                              REGARDLESS OF WHETHER OR NOT SETC Zone OR ANY OF
                              ITS AFFILIATES HAS BEEN WARNED OF THE POSSIBILITY
                              OF SUCH DAMAGES.
                            </p>
                            <p>
                              IF YOU USE THE SERVICES FOR ANY COMMERCIAL,
                              BUSINESS, OR RE-SALE PURPOSE, SETC Zone, ITS
                              AFFILIATES, SUPPLIERS, OR DISTRIBUTORS WILL HAVE
                              NO LIABILITY TO YOU FOR ANY LOSS OF PROFIT, LOSS
                              OF BUSINESS, BUSINESS INTERRUPTION, OR LOSS OF
                              BUSINESS OPPORTUNITY. SETC Zones AND ITS
                              AFFILIATES ARE NOT RESPONSIBLE FOR THE CONDUCT,
                              WHETHER ONLINE OR OFFLINE, OF ANY USER OF THE
                              SERVICES.
                            </p>
                            <p>
                              <b>Resolving Disputes</b>
                            </p>
                            <p>
                              Let’s Try To Sort Things Out First. We want to
                              address your concerns without needing a formal
                              legal case. Before filing a claim against SETC
                              Zone or our affiliates, you agree to try to
                              resolve the dispute informally by contacting{" "}
                              <a href="mailto:info@setczone.com">
                                info@setczone.com
                              </a>
                              . We will try to resolve the dispute informally by
                              contacting you via email.
                            </p>
                            <p>
                              Judicial forum for disputes. You and SETC Zone
                              agree that any judicial proceeding to resolve
                              claims relating to these Terms or the Services
                              will be brought in the federal or state courts of
                              Texas, subject to the mandatory arbitration
                              provisions below. Both you and SETC Zone consent
                              to venue and personal jurisdiction in such courts.
                            </p>
                            <p>
                              We Both Agree To Arbitrate. You and SETC Zone
                              agree to resolve any claims relating to these
                              Terms or the Services through final and binding
                              arbitration by a single arbitrator. This includes
                              disputes arising out of or relating to
                              interpretation or application of this “Mandatory
                              Arbitration Provisions” section, including its
                              enforceability, revocability, or validity.
                            </p>
                            <p>
                              Arbitration Procedures. The American Arbitration
                              Association (AAA) will administer the arbitration
                              under its Commercial Arbitration Rules and the
                              Supplementary Procedures for Consumer Related
                              Disputes. The arbitration will be held in the
                              United States county where you live or work,
                              Texas, or any other location we agree to.
                            </p>
                            <p>
                              NO CLASS ACTIONS. You may only resolve disputes
                              with us on an individual basis and may not bring a
                              claim as a plaintiff or a class member in a class,
                              consolidated, or representative action. Class
                              arbitrations, class actions, private attorney
                              general actions, and consolidation with other
                              arbitrations are not allowed. If this specific
                              paragraph is held unenforceable, then the entirety
                              of this “Mandatory Arbitration Provisions” section
                              will be deemed void.
                            </p>
                            <p>
                              <b>Controlling Law</b>
                            </p>
                            <p>
                              These Terms will be governed by California law
                              except for its conflicts of laws principles.
                              However, some countries (including those in the
                              European Union) have laws that require agreements
                              to be governed by the local laws of the consumer's
                              country. This paragraph does not override those
                              laws.
                            </p>
                            <p>
                              <b>Entire Agreement</b>
                            </p>
                            <p>
                              These Terms constitute the entire agreement
                              between you and SETC Zone with respect to the
                              subject matter of these Terms and supersede and
                              replace any other prior or contemporaneous
                              agreements or terms and conditions applicable to
                              the subject matter of these Terms. These Terms
                              create no third-party beneficiary rights.
                            </p>
                            <p>
                              <b>
                                Revised Waiver, Severability &amp; Assignment
                                Terms
                              </b>
                            </p>
                            <p>
                              At SETC Zone, failure to enforce a particular
                              provision does not mean that we waive our right to
                              enforce it later. If a provision is deemed
                              unenforceable, the remaining terms of the
                              agreement will continue to remain in effect, and
                              we will substitute the unenforceable provision
                              with one that reflects our intentions as closely
                              as possible. Please note that you cannot assign
                              any of your rights under these Terms, and any
                              attempt to do so will be considered invalid.
                              However, we reserve the right to assign our rights
                              to any affiliates, subsidiaries, or any successor
                              in interest of any business associated with the
                              Services.
                            </p>
                            <p>
                              <b>Modifications Terms</b>
                            </p>
                            <p>
                              We are committed to providing the best possible
                              services to our users, which may require us to
                              revise these Terms from time to time. Such
                              revisions may be made to reflect changes in the
                              law, new regulatory requirements, or improvements
                              and enhancements made to our Services. If any
                              modification affects your use of the Services or
                              your legal rights, we will notify you before the
                              effective date of the update. We will send you an
                              email to the email address associated with your
                              account or send you an in-product notification.
                              Please note that the updated terms will take
                              effect no less than 30 days from when we notify
                              you.
                            </p>
                            {/* <button type="button" class="btn btn-primary px-4 py-1" id="flexCheckDefault" data-bs-dismiss="modal" aria-label="Close">Done</button> */}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-end mt-3">
                      <button
                        onClick={handlePrevious}
                        type="button"
                        className="px-3 py-2 prev-step"
                      >
                        Previous
                      </button>
                      <button
                        onClick={handleNext}
                        type="button"
                        className="px-3 py-2 next-step"
                      >
                        {activeStep === steps.length - 1 ? "Submit" : "Next"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case 24:
        return (
          <div className="row justify-content-center step step-19">
            <div className="col-lg-8" style={{ marginTop: "32px" }}>
              <div
                className="step step-10 bg-white shadow px-3 py-5"
                style={{ borderRadius: "20px" }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "13.5px",
                      color: "gray",
                      background:
                        "linear-gradient(45deg, transparent, #c1ebf4, transparent)",
                      fontStyle: "italic",
                    }}
                  >
                    <span style={{ color: "#e62e2d", fontWeight: "bold" }}>
                      Notice:{" "}
                    </span>{" "}
                    Kindly make sure that each document is uploaded before
                    selecting the "submit now" button to prevent any loss of
                    data. If you don't have all the paperwork completed and
                    would like to submit them again at a later time. Please
                    submit any papers that are accessible, then click "Submit
                    Documents Later". We will provide you a link to submit the
                    remaining files after we get the ones you have already
                    uploaded.
                  </p>
                </div>
                <h3 style={{ fontWeight: "bold" }}>Documents</h3>

                {/* <div className="mb-3 file_div">
                  <label for="driving_licence" className="form-label">
                    A PDF Copy of a Current ID or Driver's License
                  </label>
                  {userData?.driving_licence &&
                  userData?.driving_licence.length > 0 ? (
                    userData.driving_licence.map((file, index) => {
                      const fileName = userData.driving_licence_name[index];
                      const shouldHideRemoveButton =
                        isThirtySecondsPassed(fileName);

                      return (
                        <div key={index} className="containerr">
                          <div className="itemm">
                            <TaskAlt />
                            <span className="namee">
                              {userData.driving_licence_name[index]}
                            </span>
                          </div>
                          <div
                            className="itemm"
                            style={{ padding: "0px 20px !important" }}
                          >
                            <div
                              onClick={() =>
                                openFileInNewTab(
                                  "driving_licence",
                                  index,
                                  userData.driving_licence_name[index]
                                )
                              }
                              className="buttonn"
                            >
                              View
                            </div>
                           
                            <div
                              onClick={() =>
                                removeFile("driving_licence", index, fileName)
                              }
                              className="buttonn"
                            >
                              Remove
                            </div>
                           
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <input
                      style={{ marginTop: 20 }}
                      type="file"
                      name="driving_licence"
                      className="form-control file"
                      id="driving_licence"
                      accept=".pdf"
                      required
                      // multiple // Allow multiple file selection
                      onChange={(e) => handleFileChange("driving_licence", e)}
                    />
                  )}

                  {userData?.driving_licence &&
                    userData?.driving_licence.length > 0 && (
                      <button
                        style={{
                          marginTop: "20px",
                          borderRadius: "6px",
                          border: "1px solid transparent",
                          fontWeight: "bold",
                          color: "white",
                          background: "#3c4d77",
                        }}
                        onClick={() => handleAddFileClick("driving_licence")}
                      >
                        Add File
                      </button>
                    )}

                  {addingFileType === "driving_licence" && (
                    <FileInputComponent
                      inputName="driving_licence"
                      onRemove={handleRemoveInput}
                      handleFileChange={handleFileChange} // Pass the file change handler
                    />
                  )}

                  {uploadingFile === "driving_licence" && (
                    <LinearProgressWithLabel
                      value={uploadProgress.driving_licence}
                    />
                  )}
                </div> */}

                <div className="mb-3 file_div">
                  <label for="schedule_pdf" className="form-label">
                    A PDF Copy of your 2019 Form 1040 (Tax Return), including
                    ALL schedules, if the 2019 Self-Employed Income is higher
                    than 2020. We would prefer one PDF file.
                  </label>

                  {userData?.schedule_pdf &&
                  userData?.schedule_pdf.length > 0 ? (
                    userData.schedule_pdf.map((file, index) => {
                      const fileName = userData.schedule_pdf_name[index];
                      const shouldHideRemoveButton =
                        isThirtySecondsPassed(fileName);

                      return (
                        <div key={index} className="containerr">
                          <div className="itemm">
                            <TaskAlt />
                            <span className="namee">
                              {userData.schedule_pdf_name[index]}
                            </span>
                          </div>
                          <div
                            className="itemm"
                            style={{ padding: "0px 20px !important" }}
                          >
                            <div
                              onClick={() =>
                                openFileInNewTab(
                                  "schedule_pdf",
                                  index,
                                  userData.schedule_pdf_name[index]
                                )
                              }
                              className="buttonn"
                            >
                              View
                            </div>

                            <div
                              onClick={() =>
                                removeFile(
                                  "schedule_pdf",
                                  index,
                                  userData.schedule_pdf_name[index]
                                )
                              }
                              className="buttonn"
                            >
                              Remove
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <input
                      style={{ marginTop: 20 }}
                      type="file"
                      name="schedule_pdf"
                      className="form-control file"
                      id="schedule_pdf"
                      accept=".pdf"
                      required
                      // multiple // Allow multiple file selection
                      onChange={(e) => handleFileChange("schedule_pdf", e)}
                    />
                  )}

                  {/* {userData?.driving_licence && userData?.driving_licence.length > 0 && (
            <button >Add File</button>
          )} */}

                  {userData?.schedule_pdf &&
                    userData?.schedule_pdf.length > 0 && (
                      <button
                        style={{
                          marginTop: "20px",
                          borderRadius: "6px",
                          border: "1px solid transparent",
                          fontWeight: "bold",
                          color: "white",
                          background: "#3c4d77",
                          padding: '3px 5px'
                        }}
                        onClick={() => handleAddFileClick("schedule_pdf")}
                      >
                        Add File
                      </button>
                    )}

                  {addingFileType === "schedule_pdf" && (
                    <FileInputComponent
                      inputName="schedule_pdf"
                      onRemove={handleRemoveInput}
                      handleFileChange={handleFileChange} // Pass the file change handler
                    />
                  )}

                  {uploadingFile === "schedule_pdf" && (
                    <LinearProgressWithLabel
                      value={uploadProgress.schedule_pdf}
                    />
                  )}
                </div>

                <div className="mb-3 file_div">
                  <label for="Tax_Return_2020" className="form-label">
                    {" "}
                    A PDF Copy of your 2020 Form 1040 (Tax Return), including
                    ALL schedules.{" "}
                  </label>

                  {userData?.Tax_Return_2020 &&
                  userData?.Tax_Return_2020.length > 0 ? (
                    userData.Tax_Return_2020.map((file, index) => (
                      <div key={index} className="containerr">
                        <div className="itemm">
                          <TaskAlt />
                          <span className="namee">
                            {userData.Tax_Return_2020_name[index]}
                          </span>
                        </div>
                        <div
                          className="itemm"
                          style={{ padding: "0px 20px !important" }}
                        >
                          <div
                            onClick={() =>
                              openFileInNewTab(
                                "Tax_Return_2020",
                                index,
                                userData.Tax_Return_2020_name[index]
                              )
                            }
                            className="buttonn"
                          >
                            View
                          </div>
                          {showRemoveButton && (
                            <div
                              onClick={() =>
                                removeFile(
                                  "Tax_Return_2020",
                                  index,
                                  userData.Tax_Return_2020_name[index]
                                )
                              }
                              className="buttonn"
                            >
                              Remove
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <input
                      style={{ marginTop: 20 }}
                      type="file"
                      name="Tax_Return_2020"
                      className="form-control file"
                      id="Tax_Return_2020"
                      accept=".pdf"
                      required
                      // multiple // Allow multiple file selection
                      onChange={(e) => handleFileChange("Tax_Return_2020", e)}
                    />
                  )}

                  {userData?.Tax_Return_2020 &&
                    userData?.Tax_Return_2020.length > 0 && (
                      <button
                        style={{
                          marginTop: "20px",
                          borderRadius: "6px",
                          border: "1px solid transparent",
                          fontWeight: "bold",
                          color: "white",
                          background: "#3c4d77",
                          padding: '3px 5px'
                        }}
                        onClick={() => handleAddFileClick("Tax_Return_2020")}
                      >
                        Add File
                      </button>
                    )}

                  {addingFileType === "Tax_Return_2020" && (
                    <FileInputComponent
                      inputName="Tax_Return_2020"
                      onRemove={handleRemoveInput}
                      handleFileChange={handleFileChange} // Pass the file change handler
                    />
                  )}

                  {uploadingFile === "Tax_Return_2020" && (
                    <LinearProgressWithLabel
                      value={uploadProgress.Tax_Return_2020}
                    />
                  )}
                </div>
                <div className="mb-3 file_div">
                  <label for="Tax_Return_2021" className="form-label">
                    A PDF Copy of your 2021 Form 1040 (Tax Return), including
                    ALL schedules.{" "}
                  </label>
                  {userData?.Tax_Return_2021 &&
                  userData?.Tax_Return_2021.length > 0 ? (
                    userData.Tax_Return_2021.map((file, index) => (
                      <div key={index} className="containerr">
                        <div className="itemm">
                          <TaskAlt />
                          <span className="namee">
                            {userData.Tax_Return_2021_name[index]}
                          </span>
                        </div>
                        <div
                          className="itemm"
                          style={{ padding: "0px 20px !important" }}
                        >
                          <div
                            onClick={() =>
                              openFileInNewTab(
                                "Tax_Return_2021",
                                index,
                                userData.Tax_Return_2021_name[index]
                              )
                            }
                            className="buttonn"
                          >
                            View
                          </div>
                          {showRemoveButton && (
                            <div
                              onClick={() =>
                                removeFile(
                                  "Tax_Return_2021",
                                  index,
                                  userData.Tax_Return_2021_name[index]
                                )
                              }
                              className="buttonn"
                            >
                              Remove
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <input
                      style={{ marginTop: 20 }}
                      type="file"
                      name="Tax_Return_2021"
                      className="form-control file"
                      id="Tax_Return_2021"
                      accept=".pdf"
                      required
                      // multiple // Allow multiple file selection
                      onChange={(e) => handleFileChange("Tax_Return_2021", e)}
                    />
                  )}

                  {userData?.Tax_Return_2021 &&
                    userData?.Tax_Return_2021.length > 0 && (
                      <button
                        style={{
                          marginTop: "20px",
                          borderRadius: "6px",
                          border: "1px solid transparent",
                          fontWeight: "bold",
                          color: "white",
                          background: "#3c4d77",
                          padding: '3px 5px'
                        }}
                        onClick={() => handleAddFileClick("Tax_Return_2021")}
                      >
                        Add File
                      </button>
                    )}

                  {addingFileType === "Tax_Return_2021" && (
                    <FileInputComponent
                      inputName="Tax_Return_2021"
                      onRemove={handleRemoveInput}
                      handleFileChange={handleFileChange} // Pass the file change handler
                    />
                  )}

                  {uploadingFile === "Tax_Return_2021" && (
                    <LinearProgressWithLabel
                      value={uploadProgress.Tax_Return_2021}
                    />
                  )}
                </div>

                {formData.family_sick === "Yes" &&
                  formData.employed_as_W2 === "Yes" && (
                    <div className="pdf-upload-extra">
                      <div className="mb-3 file_div">
                        <label
                          for="supplemental_attachment_2020"
                          className="form-label"
                        >
                          PDF Copy of All your 2020 Form W-2(s), including ANY
                          Family First Coronavirus Response Act (FFCRA)
                          supplemental attachment(s).*
                        </label>
                        {userData?.supplemental_attachment_2020 &&
                        userData?.supplemental_attachment_2020.length > 0 ? (
                          userData.supplemental_attachment_2020.map(
                            (file, index) => (
                              <div key={index} className="containerr">
                                <div className="itemm">
                                  <TaskAlt />
                                  <span className="namee">
                                    {
                                      userData
                                        .supplemental_attachment_2020_name[
                                        index
                                      ]
                                    }
                                  </span>
                                </div>
                                <div
                                  className="itemm"
                                  style={{ padding: "0px 20px !important" }}
                                >
                                  <div
                                    onClick={() =>
                                      openFileInNewTab(
                                        "supplemental_attachment_2020",
                                        index,
                                        userData
                                          .supplemental_attachment_2020_name[
                                          index
                                        ]
                                      )
                                    }
                                    className="buttonn"
                                  >
                                    View
                                  </div>
                                  {showRemoveButton && (
                                    <div
                                      onClick={() =>
                                        removeFile(
                                          "supplemental_attachment_2020",
                                          index,
                                          userData
                                            .supplemental_attachment_2020_name[
                                            index
                                          ]
                                        )
                                      }
                                      className="buttonn"
                                    >
                                      Remove
                                    </div>
                                  )}
                                </div>
                              </div>
                            )
                          )
                        ) : (
                          <input
                            style={{ marginTop: 20 }}
                            type="file"
                            name="supplemental_attachment_2020"
                            className="form-control file"
                            id="supplemental_attachment_2020"
                            accept=".pdf"
                            required
                            // multiple // Allow multiple file selection
                            onChange={(e) =>
                              handleFileChange(
                                "supplemental_attachment_2020",
                                e
                              )
                            }
                          />
                        )}

                        {userData?.supplemental_attachment_2020 &&
                          userData?.supplemental_attachment_2020.length > 0 && (
                            <button
                              style={{
                                marginTop: "20px",
                                borderRadius: "6px",
                                border: "1px solid transparent",
                                fontWeight: "bold",
                                color: "white",
                                background: "#3c4d77",
                                padding: '3px 5px'
                              }}
                              onClick={() =>
                                handleAddFileClick(
                                  "supplemental_attachment_2020"
                                )
                              }
                            >
                              Add File
                            </button>
                          )}

                        {addingFileType === "supplemental_attachment_2020" && (
                          <FileInputComponent
                            inputName="supplemental_attachment_2020"
                            onRemove={handleRemoveInput}
                            handleFileChange={handleFileChange} // Pass the file change handler
                          />
                        )}

                        {uploadingFile === "supplemental_attachment_2020" && (
                          <LinearProgressWithLabel
                            value={uploadProgress.supplemental_attachment_2020}
                          />
                        )}
                      </div>

                      <div className="mb-3 file_div">
                        <label
                          for="2021_supplemental_attachment_2021"
                          className="form-label"
                        >
                          PDF Copy of All your 2021 Form W-2(s), including ANY
                          Family First Coronavirus Response Act (FFCRA)
                          supplemental attachment(s).
                        </label>
                        {userData?.supplemental_attachment_2021 &&
                        userData?.supplemental_attachment_2021.length > 0 ? (
                          userData.supplemental_attachment_2021.map(
                            (file, index) => (
                              <div key={index} className="containerr">
                                <div className="itemm">
                                  <TaskAlt />
                                  <span className="namee">
                                    {
                                      userData
                                        .supplemental_attachment_2021_name[
                                        index
                                      ]
                                    }
                                  </span>
                                </div>
                                <div
                                  className="itemm"
                                  style={{ padding: "0px 20px !important" }}
                                >
                                  <div
                                    onClick={() =>
                                      openFileInNewTab(
                                        "supplemental_attachment_2021",
                                        index,
                                        userData
                                          .supplemental_attachment_2021_name[
                                          index
                                        ]
                                      )
                                    }
                                    className="buttonn"
                                  >
                                    View
                                  </div>
                                  {showRemoveButton && (
                                    <div
                                      onClick={() =>
                                        removeFile(
                                          "supplemental_attachment_2021",
                                          index,
                                          userData
                                            .supplemental_attachment_2021_name[
                                            index
                                          ]
                                        )
                                      }
                                      className="buttonn"
                                    >
                                      Remove
                                    </div>
                                  )}
                                </div>
                              </div>
                            )
                          )
                        ) : (
                          <input
                            style={{ marginTop: 20 }}
                            type="file"
                            name="supplemental_attachment_2021"
                            className="form-control file"
                            id="supplemental_attachment_2021"
                            accept=".pdf"
                            required
                            // multiple // Allow multiple file selection
                            onChange={(e) =>
                              handleFileChange(
                                "supplemental_attachment_2021",
                                e
                              )
                            }
                          />
                        )}

                        {userData?.supplemental_attachment_2021 &&
                          userData?.supplemental_attachment_2021.length > 0 && (
                            <button
                              style={{
                                marginTop: "20px",
                                borderRadius: "6px",
                                border: "1px solid transparent",
                                fontWeight: "bold",
                                color: "white",
                                background: "#3c4d77",
                                padding: '3px 5px'
                              }}
                              onClick={() =>
                                handleAddFileClick(
                                  "supplemental_attachment_2021"
                                )
                              }
                            >
                              Add File
                            </button>
                          )}

                        {addingFileType === "supplemental_attachment_2021" && (
                          <FileInputComponent
                            inputName="supplemental_attachment_2021"
                            onRemove={handleRemoveInput}
                            handleFileChange={handleFileChange} // Pass the file change handler
                          />
                        )}

                        {uploadingFile === "supplemental_attachment_2021" && (
                          <LinearProgressWithLabel
                            value={uploadProgress.supplemental_attachment_2021}
                          />
                        )}
                      </div>

                      <div className="mb-3 file_div">
                        <label for="FormA1099" className="form-label">
                          PDF Copy of All your 2020 Form 1099-R(s), if any
                        </label>

                        {userData?.FormA1099 &&
                        userData?.FormA1099.length > 0 ? (
                          userData.FormA1099.map((file, index) => (
                            <div key={index} className="containerr">
                              <div className="itemm">
                                <TaskAlt />
                                <span className="namee">
                                  {userData.FormA1099_name[index]}
                                </span>
                              </div>
                              <div
                                className="itemm"
                                style={{ padding: "0px 20px !important" }}
                              >
                                <div
                                  onClick={() =>
                                    openFileInNewTab(
                                      "FormA1099",
                                      index,
                                      userData.FormA1099_name[index]
                                    )
                                  }
                                  className="buttonn"
                                >
                                  View
                                </div>
                                {showRemoveButton && (
                                  <div
                                    onClick={() =>
                                      removeFile(
                                        "FormA1099",
                                        index,
                                        userData.FormA1099_name[index]
                                      )
                                    }
                                    className="buttonn"
                                  >
                                    Remove
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <input
                            style={{ marginTop: 20 }}
                            type="file"
                            name="FormA1099"
                            className="form-control file"
                            id="FormA1099"
                            accept=".pdf"
                            required
                            // multiple // Allow multiple file selection
                            onChange={(e) => handleFileChange("FormA1099", e)}
                          />
                        )}

                        {userData?.FormA1099 &&
                          userData?.FormA1099.length > 0 && (
                            <button
                              style={{
                                marginTop: "20px",
                                borderRadius: "6px",
                                border: "1px solid transparent",
                                fontWeight: "bold",
                                color: "white",
                                background: "#3c4d77",
                                padding: '3px 5px'
                              }}
                              onClick={() => handleAddFileClick("FormA1099")}
                            >
                              Add File
                            </button>
                          )}

                        {addingFileType === "FormA1099" && (
                          <FileInputComponent
                            inputName="FormA1099"
                            onRemove={handleRemoveInput}
                            handleFileChange={handleFileChange} // Pass the file change handler
                          />
                        )}

                        {uploadingFile === "FormA1099" && (
                          <LinearProgressWithLabel
                            value={uploadProgress.FormA1099}
                          />
                        )}
                      </div>

                      <div className="mb-3 file_div">
                        <label for="FormB1099" className="form-label">
                          PDF Copy of All your 2021 Form 1099-R(s), if any
                        </label>

                        {userData?.FormB1099 &&
                        userData?.FormB1099.length > 0 ? (
                          userData.FormB1099.map((file, index) => (
                            <div key={index} className="containerr">
                              <div className="itemm">
                                <TaskAlt />
                                <span className="namee">
                                  {userData.FormB1099_name[index]}
                                </span>
                              </div>
                              <div
                                className="itemm"
                                style={{ padding: "0px 20px !important" }}
                              >
                                <div
                                  onClick={() =>
                                    openFileInNewTab(
                                      "FormB1099",
                                      index,
                                      userData.FormB1099_name[index]
                                    )
                                  }
                                  className="buttonn"
                                >
                                  View
                                </div>
                                {showRemoveButton && (
                                  <div
                                    onClick={() =>
                                      removeFile(
                                        "FormB1099",
                                        index,
                                        userData.FormB1099_name[index]
                                      )
                                    }
                                    className="buttonn"
                                  >
                                    Remove
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <input
                            style={{ marginTop: 20 }}
                            type="file"
                            name="FormB1099"
                            className="form-control file"
                            id="FormB1099"
                            accept=".pdf"
                            required
                            // multiple // Allow multiple file selection
                            onChange={(e) => handleFileChange("FormB1099", e)}
                          />
                        )}

                        {userData?.FormB1099 &&
                          userData?.FormB1099.length > 0 && (
                            <button
                              style={{
                                marginTop: "20px",
                                borderRadius: "6px",
                                border: "1px solid transparent",
                                fontWeight: "bold",
                                color: "white",
                                background: "#3c4d77",
                                padding: '3px 5px'
                              }}
                              onClick={() => handleAddFileClick("FormB1099")}
                            >
                              Add File
                            </button>
                          )}

                        {addingFileType === "FormB1099" && (
                          <FileInputComponent
                            inputName="FormB1099"
                            onRemove={handleRemoveInput}
                            handleFileChange={handleFileChange} // Pass the file change handler
                          />
                        )}

                        {uploadingFile === "FormB1099" && (
                          <LinearProgressWithLabel
                            value={uploadProgress.FormB1099}
                          />
                        )}
                      </div>

                      <div className="mb-3 file_div">
                        <label for="ks2020" className="form-label">
                          PDF Copy of All your 2020 K-1s, if any
                        </label>
                        {userData?.ks2020 && userData?.ks2020.length > 0 ? (
                          userData.ks2020.map((file, index) => (
                            <div key={index} className="containerr">
                              <div className="itemm">
                                <TaskAlt />
                                <span className="namee">
                                  {userData.ks2020_name[index]}
                                </span>
                              </div>
                              <div
                                className="itemm"
                                style={{ padding: "0px 20px !important" }}
                              >
                                <div
                                  onClick={() =>
                                    openFileInNewTab(
                                      "ks2020",
                                      index,
                                      userData.ks2020_name[index]
                                    )
                                  }
                                  className="buttonn"
                                >
                                  View
                                </div>
                                {showRemoveButton && (
                                  <div
                                    onClick={() =>
                                      removeFile(
                                        "ks2020",
                                        index,
                                        userData.ks2020_name[index]
                                      )
                                    }
                                    className="buttonn"
                                  >
                                    Remove
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <input
                            style={{ marginTop: 20 }}
                            type="file"
                            name="ks2020"
                            className="form-control file"
                            id="ks2020"
                            accept=".pdf"
                            required
                            // multiple // Allow multiple file selection
                            onChange={(e) => handleFileChange("ks2020", e)}
                          />
                        )}

                        {userData?.ks2020 && userData?.ks2020.length > 0 && (
                          <button
                            style={{
                              marginTop: "20px",
                              borderRadius: "6px",
                              border: "1px solid transparent",
                              fontWeight: "bold",
                              color: "white",
                              background: "#3c4d77",
                              padding: '3px 5px'
                            }}
                            onClick={() => handleAddFileClick("ks2020")}
                          >
                            Add File
                          </button>
                        )}

                        {addingFileType === "ks2020" && (
                          <FileInputComponent
                            inputName="ks2020"
                            onRemove={handleRemoveInput}
                            handleFileChange={handleFileChange} // Pass the file change handler
                          />
                        )}

                        {uploadingFile === "ks2020" && (
                          <LinearProgressWithLabel
                            value={uploadProgress.ks2020}
                          />
                        )}
                      </div>

                      <div className="mb-3 file_div">
                        <label for="ks22020" className="form-label">
                          PDF Copy of All your 2020 K-1s, if any
                        </label>
                        {userData?.ks22020 && userData?.ks22020.length > 0 ? (
                          userData.ks22020.map((file, index) => (
                            <div key={index} className="containerr">
                              <div className="itemm">
                                <TaskAlt />
                                <span className="namee">
                                  {userData.ks22020_name[index]}
                                </span>
                              </div>
                              <div
                                className="itemm"
                                style={{ padding: "0px 20px !important" }}
                              >
                                <div
                                  onClick={() =>
                                    openFileInNewTab(
                                      "ks22020",
                                      index,
                                      userData.ks22020_name[index]
                                    )
                                  }
                                  className="buttonn"
                                >
                                  View
                                </div>
                                {showRemoveButton && (
                                  <div
                                    onClick={() =>
                                      removeFile(
                                        "ks22020",
                                        index,
                                        userData.ks22020_name[index]
                                      )
                                    }
                                    className="buttonn"
                                  >
                                    Remove
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <input
                            style={{ marginTop: 20 }}
                            type="file"
                            name="ks22020"
                            className="form-control file"
                            id="ks22020"
                            accept=".pdf"
                            required
                            // multiple // Allow multiple file selection
                            onChange={(e) => handleFileChange("ks22020", e)}
                          />
                        )}

                        {userData?.ks22020 && userData?.ks22020.length > 0 && (
                          <button
                            style={{
                              marginTop: "20px",
                              borderRadius: "6px",
                              border: "1px solid transparent",
                              fontWeight: "bold",
                              color: "white",
                              background: "#3c4d77",
                              padding: '3px 5px'
                            }}
                            onClick={() => handleAddFileClick("ks22020")}
                          >
                            Add File
                          </button>
                        )}

                        {addingFileType === "ks22020" && (
                          <FileInputComponent
                            inputName="ks22020"
                            onRemove={handleRemoveInput}
                            handleFileChange={handleFileChange} // Pass the file change handler
                          />
                        )}

                        {uploadingFile === "ks22020" && (
                          <LinearProgressWithLabel
                            value={uploadProgress.ks22020}
                          />
                        )}
                      </div>
                    </div>
                  )}

                <div className="data-p py-2 mb-2">
                  <p>
                    <input
                      className="form-check-input me-1"
                      type="checkbox"
                      value=""
                      id="flexCheckD"
                      onChange={handleCheckboxChange}
                    />
                    By checking this box you attest that the answers and
                    information provided are true and accurate to the best of
                    your knowledge, and understand that once submitted your
                    responses cannot be changed. You agree to our{" "}
                    <a
                      style={{
                        textDecoration: "underline",
                        cursor: "pointer",
                        color: "blue",
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal_step_20"
                    >
                      terms & conditions
                    </a>
                    , and also agree to keep documentation on file that
                    substantiates claims made in this application.
                  </p>
                </div>

                <div
                  className="modal fade"
                  id="exampleModal_step_20"
                  style={{
                    display: "none",
                    // padding: "0px 40px 20px 40px",
                  }}
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header bg-success text-white">
                        <h4 class="modal-title" style={{ color: "white" }}>
                          <i
                            class="fas fa-check-circle"
                            style={{ color: "white" }}
                          ></i>{" "}
                          Terms and conditions
                        </h4>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <p>
                          <span>Terms of Service</span>
                        </p>
                        <p>
                          <span>Effective: November 1st, 2023</span>
                        </p>
                        <p>
                          Thank you for using our services! These terms of
                          service (“Terms”) cover your use and access to our
                          services, client software, and websites ("Services").
                          By using our Services, you agree to be bound by these
                          Terms and our Privacy Policy. If you are using our
                          Services for an organization, you are agreeing to
                          these Terms on behalf of that organization.
                        </p>
                        <p>
                          <b>Your Information and Your Permissions</b>
                        </p>
                        <p>
                          When you use our Services, you provide us with things
                          like your files, content, messages, contacts, and so
                          on (your information). Your information is yours.
                          These Terms do not give us any rights to your
                          information except for the limited rights that enable
                          us to offer the Services.
                        </p>
                        <p>
                          Our Services also provide you with features like
                          eSign, file sharing, email newsletters, appointment
                          setting, and more. These and other features may
                          require our systems to access, store, and scan your
                          information. You give us permission to do those
                          things, and this permission extends to our affiliates
                          and trusted third parties we work with.
                        </p>
                        <p>
                          <b>Your Responsibilities</b>
                        </p>
                        <p>
                          You are responsible for your conduct. Your information
                          and you must comply with applicable laws. Content in
                          the Services may be protected by others’ intellectual
                          property rights. Please do not copy, upload, download,
                          or share content unless you have the right to do so.
                          We may review your conduct and content for compliance
                          with these Terms. With that said, we have no
                          obligation to do so. We are not responsible for the
                          content people post and share via the Services.
                        </p>
                        <p>
                          Help us keep you informed and your information
                          protected. Safeguard your password to the Services,
                          and keep your account information current. Do not
                          share your account credentials or give others access
                          to your account.
                        </p>
                        <p>
                          You may use our Services only as permitted by
                          applicable law, including export control laws and
                          regulations.
                        </p>
                        <p>
                          <b>Our Information</b>
                        </p>
                        <p>
                          The Services are protected by copyright, trademark,
                          and other US and foreign laws. These Terms do not
                          grant you any right, title, or interest in the
                          Services, others’ content in the Services, SETC Zone,
                          and our trademarks, logos, and other brand features.
                          We welcome feedback, but note that we may use comments
                          or suggestions without any obligation to you.
                        </p>
                        <p>
                          <b>Copyright</b>
                        </p>
                        <p>
                          We respect the intellectual property of others and ask
                          that you do too. We respond to notices of alleged
                          copyright infringement if they comply with the law,
                          and such notices should be reported to{" "}
                          <a href="mailto:info@setczone.com">
                            info@setczone.com
                          </a>
                          . We reserve the right to delete or disable content
                          alleged to be infringing and terminate accounts of
                          repeat infringers.
                        </p>
                        <p>
                          <b>Termination</b>
                        </p>
                        <p>
                          You are free to stop using our Services at any time.
                          We reserve the right to suspend or terminate your
                          access to the Services with notice to you if:
                        </p>
                        <p>(a) you are in breach of these Terms,</p>
                        <p>
                          (b) you are using the Services in a manner that would
                          cause a real risk of harm or loss to us or other
                          users, or
                        </p>
                        <p>
                          We will provide you with reasonable advance notice via
                          the email address associated with your account to
                          remedy the activity that prompted us to contact you
                          and give you the opportunity to export your
                          information from our Services. If after such notice
                          you fail to take the steps we ask of you, we will
                          terminate or suspend your access to the Services.
                        </p>
                        <p>
                          We will not provide notice before termination where:
                        </p>
                        <p>(a) you are in material breach of these Terms,</p>
                        <p>
                          (b) doing so would cause us legal liability or
                          compromise our ability to provide the Services to our
                          other users, or
                        </p>
                        <p>(c) we are prohibited from doing so by law.</p>
                        <p>
                          <b>Discontinuation of Services</b>
                        </p>
                        <p>
                          We may decide to discontinue the Services in response
                          to unforeseen circumstances beyond SETC Zone’s control
                          or to comply with a legal requirement. If we do so, we
                          will give you reasonable prior notice so that you can
                          export your information from our systems.
                        </p>
                        <p>
                          <b>Services “AS IS”</b>
                        </p>
                        <p>
                          We strive to provide great Services, but there are
                          certain things that we cannot guarantee. TO THE
                          FULLEST EXTENT PERMITTED BY LAW, SETC Zone AND ITS
                          AFFILIATES, SUPPLIERS, AND DISTRIBUTORS MAKE NO
                          WARRANTIES, EITHER EXPRESS OR IMPLIED, ABOUT THE
                          SERVICES. THE SERVICES ARE PROVIDED "AS IS." WE ALSO
                          DISCLAIM ANY WARRANTIES OF MERCHANTABILITY, FITNESS
                          FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. Some
                          places do not allow the disclaimers in this paragraph,
                          so they may not apply to you.
                        </p>
                        <p>
                          <b>Limitation of Liability</b>
                        </p>
                        <p>
                          WE DO NOT EXCLUDE OR LIMIT OUR LIABILITY TO YOU WHERE
                          IT WOULD BE ILLEGAL TO DO SO—THIS INCLUDES ANY
                          LIABILITY FOR SETC Zone OR ITS AFFILIATES’ FRAUD OR
                          FRAUDULENT MISREPRESENTATION IN PROVIDING THE
                          SERVICES. IN COUNTRIES WHERE THE FOLLOWING TYPES OF
                          EXCLUSIONS ARE NOT ALLOWED, WE ARE RESPONSIBLE TO YOU
                          ONLY FOR LOSSES AND DAMAGES THAT ARE A REASONABLY
                          FORESEEABLE RESULT OF OUR FAILURE TO USE REASONABLE
                          CARE AND SKILL OR OUR BREACH OF OUR CONTRACT WITH YOU.
                          THIS PARAGRAPH DOES NOT AFFECT CONSUMER RIGHTS THAT
                          CANNOT BE WAIVED OR LIMITED BY ANY CONTRACT OR
                          AGREEMENT.
                        </p>
                        <p>
                          IN COUNTRIES WHERE EXCLUSIONS OR LIMITATIONS OF
                          LIABILITY ARE ALLOWED, SETC Zone, ITS AFFILIATES,
                          SUPPLIERS, OR DISTRIBUTORS WILL NOT BE LIABLE FOR:
                        </p>
                        <ol>
                          <li>
                            ANY INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE,
                            EXEMPLARY, OR CONSEQUENTIAL DAMAGES, OR
                          </li>
                          <li>
                            ANY LOSS OF USE, DATA, BUSINESS, OR PROFITS,
                            REGARDLESS OF LEGAL THEORY.
                          </li>
                        </ol>
                        <p>
                          THESE EXCLUSIONS OR LIMITATIONS WILL APPLY REGARDLESS
                          OF WHETHER OR NOT SETC Zone OR ANY OF ITS AFFILIATES
                          HAS BEEN WARNED OF THE POSSIBILITY OF SUCH DAMAGES.
                        </p>
                        <p>
                          IF YOU USE THE SERVICES FOR ANY COMMERCIAL, BUSINESS,
                          OR RE-SALE PURPOSE, SETC Zone, ITS AFFILIATES,
                          SUPPLIERS, OR DISTRIBUTORS WILL HAVE NO LIABILITY TO
                          YOU FOR ANY LOSS OF PROFIT, LOSS OF BUSINESS, BUSINESS
                          INTERRUPTION, OR LOSS OF BUSINESS OPPORTUNITY. SETC
                          Zones AND ITS AFFILIATES ARE NOT RESPONSIBLE FOR THE
                          CONDUCT, WHETHER ONLINE OR OFFLINE, OF ANY USER OF THE
                          SERVICES.
                        </p>
                        <p>
                          <b>Resolving Disputes</b>
                        </p>
                        <p>
                          Let’s Try To Sort Things Out First. We want to address
                          your concerns without needing a formal legal case.
                          Before filing a claim against SETC Zone or our
                          affiliates, you agree to try to resolve the dispute
                          informally by contacting{" "}
                          <a href="mailto:info@setczone.com">
                            info@setczone.com
                          </a>
                          . We will try to resolve the dispute informally by
                          contacting you via email.
                        </p>
                        <p>
                          Judicial forum for disputes. You and SETC Zone agree
                          that any judicial proceeding to resolve claims
                          relating to these Terms or the Services will be
                          brought in the federal or state courts of Texas,
                          subject to the mandatory arbitration provisions below.
                          Both you and SETC Zone consent to venue and personal
                          jurisdiction in such courts.
                        </p>
                        <p>
                          We Both Agree To Arbitrate. You and SETC Zone agree to
                          resolve any claims relating to these Terms or the
                          Services through final and binding arbitration by a
                          single arbitrator. This includes disputes arising out
                          of or relating to interpretation or application of
                          this “Mandatory Arbitration Provisions” section,
                          including its enforceability, revocability, or
                          validity.
                        </p>
                        <p>
                          Arbitration Procedures. The American Arbitration
                          Association (AAA) will administer the arbitration
                          under its Commercial Arbitration Rules and the
                          Supplementary Procedures for Consumer Related
                          Disputes. The arbitration will be held in the United
                          States county where you live or work, Texas, or any
                          other location we agree to.
                        </p>
                        <p>
                          NO CLASS ACTIONS. You may only resolve disputes with
                          us on an individual basis and may not bring a claim as
                          a plaintiff or a class member in a class,
                          consolidated, or representative action. Class
                          arbitrations, class actions, private attorney general
                          actions, and consolidation with other arbitrations are
                          not allowed. If this specific paragraph is held
                          unenforceable, then the entirety of this “Mandatory
                          Arbitration Provisions” section will be deemed void.
                        </p>
                        <p>
                          <b>Controlling Law</b>
                        </p>
                        <p>
                          These Terms will be governed by California law except
                          for its conflicts of laws principles. However, some
                          countries (including those in the European Union) have
                          laws that require agreements to be governed by the
                          local laws of the consumer's country. This paragraph
                          does not override those laws.
                        </p>
                        <p>
                          <b>Entire Agreement</b>
                        </p>
                        <p>
                          These Terms constitute the entire agreement between
                          you and SETC Zone with respect to the subject matter
                          of these Terms and supersede and replace any other
                          prior or contemporaneous agreements or terms and
                          conditions applicable to the subject matter of these
                          Terms. These Terms create no third-party beneficiary
                          rights.
                        </p>
                        <p>
                          <b>
                            Revised Waiver, Severability &amp; Assignment Terms
                          </b>
                        </p>
                        <p>
                          At SETC Zone, failure to enforce a particular
                          provision does not mean that we waive our right to
                          enforce it later. If a provision is deemed
                          unenforceable, the remaining terms of the agreement
                          will continue to remain in effect, and we will
                          substitute the unenforceable provision with one that
                          reflects our intentions as closely as possible. Please
                          note that you cannot assign any of your rights under
                          these Terms, and any attempt to do so will be
                          considered invalid. However, we reserve the right to
                          assign our rights to any affiliates, subsidiaries, or
                          any successor in interest of any business associated
                          with the Services.
                        </p>
                        <p>
                          <b>Modifications Terms</b>
                        </p>
                        <p>
                          We are committed to providing the best possible
                          services to our users, which may require us to revise
                          these Terms from time to time. Such revisions may be
                          made to reflect changes in the law, new regulatory
                          requirements, or improvements and enhancements made to
                          our Services. If any modification affects your use of
                          the Services or your legal rights, we will notify you
                          before the effective date of the update. We will send
                          you an email to the email address associated with your
                          account or send you an in-product notification. Please
                          note that the updated terms will take effect no less
                          than 30 days from when we notify you.
                        </p>
                        {/* <button type="button" class="btn btn-primary px-4 py-1" id="flexCheckDefault" data-bs-dismiss="modal" aria-label="Close">Done</button> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center flex-wrap">
                  <button
                    onClick={handlePrevious}
                    type="button"
                    className=" prev-step mb-2"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    id="confirmSubmitModalLaterBtn"
                    data-bs-target="#confirmSubmitModalwithout"
                    className="btn btn-primary px-5 py-2 me-2 mb-2 next-step"
                    disabled={shouldDisableButtonLater()}
                    onClick={handleSubmitLater}
                  >
                    Submit Documents Later
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary px-5 py-2 mb-2 next-step"
                    style={{ backgroundColor: "#29abe2" }}
                    data-bs-target="#confirmSubmitModalLater"
                    disabled={
                      formData.family_sick === "Yes" &&
                      formData.employed_as_W2 === "Yes"
                        ? shouldDisableButtonsAdditional()
                        : shouldDisableButtons()
                    }
                    onClick={handleSubmiDocuments}
                  >
                    Submit Now
                  </button>

                  <div
                    className="modal fade"
                    id="confirmSubmitModalLater"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabindex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content confirm-modal">
                        <div
                          className="modal-header py-2"
                          style={{ borderBottom: "none" }}
                        >
                          <h5
                            className="modal-title"
                            id="exampleModalLabel"
                          ></h5>

                          <a href="#">
                            <i
                              className="fa-solid fa-xmark fs-3"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></i>
                          </a>
                        </div>

                        <div className="modal-body d-flex justify-content-center flex-column align-items-center pt-0">
                          <img
                            src="./images/gif-submit.gif"
                            style={{ width: "120px" }}
                          />
                          <h5 className="text-center pb-4">
                            <span className="text-success">Congratultion</span>{" "}
                            Your application has been submitted!{" "}
                          </h5>
                          <h5 className="text-center">
                            Our team will get back to you in 24-72 hours. Thank
                            you.
                          </h5>

                          <a
                            href="#"
                            className="btn btn-primary px-5 go-on-btn"
                          >
                            Go on
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="modal fade"
                    id="confirmSubmitModalwithout"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabindex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content confirm-modal2">
                        <div
                          className="modal-header py-2"
                          style={{ borderBottom: "none" }}
                        >
                          <h5
                            className="modal-title"
                            id="exampleModalLabel"
                          ></h5>

                          <a href="">
                            <i
                              className="fa-solid fa-xmark fs-3"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></i>
                          </a>
                        </div>

                        <div className="modal-body d-flex justify-content-center flex-column align-items-center pt-0">
                          <img
                            src="./images/gif-submit.gif"
                            style={{ width: "120px" }}
                          />
                          <h5 className="text-center pb-4">
                            <span className="text-success">Great</span>, your
                            application has been submittd.We will send you a
                            personalupload link for your documents.
                          </h5>
                          <a
                            href="#"
                            className="btn btn-primary px-5 go-on-btn2"
                          >
                            Go on
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return "File is here";
    }
  };
  const ColorlibConnector = (props) => (
    <StepConnector
      {...props}
      style={{
        marginLeft: "12px", // Adjust the space between the labels and the connector
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "2px", // Width of the vertical line
          backgroundColor: props.active ? "green" : "gray", // Color of the line
          flex: "1", // Expand the line to fill available space
        }}
      />
    </StepConnector>
  );
  const QontoStepIconRoot = styled("div")({
    display: "flex",
    height: 22,
    alignItems: "center",
    color: "#eaeaf0",
    "&.active": {
      color: "#784af4",
    },
    "&.completed": {
      color: "#784af4",
    },
  });
  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: "calc(-50% + 16px)",
      right: "calc(50% + 16px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#00b6ff",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#00b6ff",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor:
        theme.palette.mode === "dark" ? theme.palette.grey[900] : "#eaeaf0",
      borderTopWidth: 7,
      borderRadius: 1,
    },
  }));
  function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
      <>
        <QontoStepIconRoot
          className={`${className} ${active ? "active" : ""} ${
            completed ? "completed" : ""
          }`}
        >
          {completed ? (
            <Avatar
              style={{
                backgroundColor: "#00b6ff",
                width: "30px", // Adjust size as needed
                height: "30px", // Adjust size as needed
              }}
            >
              <Check
                sx={{
                  fontSize: { sm: 12, xs: 12, md: 20, lg: 20 },
                  fontWeight: "bold",
                }}
              />
            </Avatar>
          ) : (
            <Avatar
              style={{
                backgroundColor: "#00b6ff",
                width: "30px", // Adjust size as needed
                height: "30px", // Adjust size as needed
              }}
            >
              <Check style={{ color: "#00b6ff" }} />
            </Avatar>
          )}
        </QontoStepIconRoot>
      </>
    );
  }

  const CustomConnector = styled(StepConnector)(({ theme }) => ({
    // Your connector styles here
    "& .MuiStepConnector-line": {
      borderColor: "green", // Change the connector color
      borderColor: "#00b6ff",
      borderTopWidth: 7,
      borderRadius: 1,
    },
  }));

  // Customized StepIcon with Check icon
  const CustomStepIcon = styled("div")(
    ({ theme, active, completed, isIndex7 }) => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "30px",
      height: "30px",
      color: "green", // Change icon color for completed and active steps
      backgroundColor: "#00b6ff",
      borderRadius: "50%",

      borderColor: "#e0e0e0", // Change border color for completed and active steps
      zIndex: 1,
      fontSize: 14,
      // "& span": {
      //   color: isIndex7 ? "#00b6ff" : "white", // Change color of step number
      // },
    })
  );

  return (
    <Box
      sx={{
        width: "100%",
        marginTop: 15,
        backgroundImage:
          " linear-gradient(direction, color-stop1, color-stop2)",
      }}
    >
      {loading && <LoadingScreen />}
      {activeStep > 20 &&
        finalIncomeValue != null &&
        finalIncomeValue !== "$0" &&
        activeStep !== 24 &&
        userData?.applicationWithDocument !== true &&
        userData?.applicationStatus !== true && (
          <Stepper
            className="container secondStepper"
            style={{ width: "40px !important" }}
            activeStep={activeStep - 21}
            alternativeLabel
            connector={<QontoConnector />}
          >
            {stepss.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  sx={{
                    "& .MuiStepLabel-label.Mui-completed": {
                      color: "#00b6ff", // Change label color based on active step
                      fontWeight: "300",
                      fontSize: 16,
                    },
                    "& .MuiStepLabel-label.Mui-active": {
                      color: "#00b6ff", // Change label color based on active step
                      fontWeight: "300",
                      fontSize: 16,
                    },
                    "& .MuiStepLabel-label": {
                      color: "gray", // Change label color based on active step
                      fontWeight: "300",
                      fontSize: 16,
                    },
                  }}
                  StepIconComponent={QontoStepIcon}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        )}

      {activeStep === 24 &&
        userData?.applicationWithDocument !== true &&
        userData?.applicationStatus !== true && (
          <Stepper
            className="nineteenStepper container"
            activeStep={1}
            alternativeLabel
            connector={<CustomConnector />}
          >
            {steps18.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  sx={{
                    "& .MuiStepLabel-alternativeLabel": {
                      color:
                        index === 2
                          ? "gray !important"
                          : index === 1
                          ? "red !important"
                          : "#00b6ff !important",
                      fontWeight: "500",
                      fontSize: 17,
                    },
                  }}
                  StepIconComponent={(props) => (
                    <CustomStepIcon
                      {...props}
                      completed={index < 1}
                      active={index === 1}
                      // isIndex7={index === 7} // Change based on the current active step
                    >
                      {index === 2 ? (
                        <Check style={{ color: "#00b6ff" }} />
                      ) : (
                        <Check style={{ color: "white" }} />
                      )}
                    </CustomStepIcon>
                  )}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        )}

      {userData?.applicationStatus !== true &&
        userData?.applicationWithDocument !== true && <>{getStepContent()}</>}

      {userData?.applicationStatus === true && (
        <>
          <div className="myClas2" style={{ marginBottom: 100 }}>
            <div className="modal-body d-flex justify-content-center flex-column align-items-center pt-0">
              <img src={gifTick} style={{ width: "120px" }} />
              <h5 className="text-center pb-4">
                <span className="text-success">Great</span>, your application
                has been submitted. We will send you a personal upload link for
                your documents.
              </h5>

              <button
                type="button"
                onClick={handleGo}
                className="btn btn-primary"
              >
                Check your application Status
              </button>
            </div>
          </div>
        </>
      )}

      {userData?.applicationWithDocument === true && (
        <>
          <div className="myClas2" style={{ marginBottom: 100 }}>
            <div className="modal-body d-flex justify-content-center flex-column align-items-center pt-0">
              <img src={gifTick} style={{ width: "120px" }} />
              <h5 className="text-center">
                <span className="text-success">Congratulations!</span> Your
                application has been submitted!{" "}
              </h5>
              <h5 className="text-center">
                {" "}
                Our team will get back to you in 24-72 hours. Thank you.
              </h5>

              <button
                style={{ marginTop: 33 }}
                onClick={handleGo}
                type="button"
                className="btn btn-primary"
              >
                Check you application status
              </button>
            </div>
          </div>
        </>
      )}
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Box sx={{ flex: "1 1 auto" }} />
      </Box>
    </Box>
  );
};

export default MultiStepForm;
