import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import frameFluid from "./GlobalImages/Frame1.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./GlobalStyles/globalStyles.css";
import Pdf2019 from '../../src/Pdf/2019Step2.pdf';
import Pdf2020 from '../../src/Pdf/2020Step2.pdf';
import Pdf2021 from '../../src/Pdf/2021Step2.pdf';
import PdfNetEarning from '../../src/Pdf/netEarn.pdf';
import { setToken } from "../Redux/Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import gifTick from "./GlobalImages/gif-submit.gif";
import taxSet from "./GlobalImages/Tax_set.png";
import newImage from "./GlobalImages/Group 940.png";
import framepng from "./GlobalImages/Frame.png";
import qustMark from "./GlobalImages/Qust_mark.png";
import {
  CheckCircle,
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
import { Avatar } from "@mui/material";
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
];

const steps1 = [
  "Contact Form",
  "Eligibility",
  "1 of 6",
  "2 of 6",
  "3 of 6",
  "4 of 6",
  "5 of 6",
  "6 of 6",
  "Pre-Qualification Complete",
];

const steps2 = [
  "Begin Application",
  "1 of 8",
  "2 of 8",
  "3 of 8",
  "4 of 8",
  "5 of 8",
  "6 of 8",
  "7 of 8",
  "8 of 8",
  "Estimate Calculator",
];

const steps19 = [
  "Portal",
  "",
  "",
  "",
  "",
  "",
 
  "Calculation",
  "Upload Documents",
];

const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [finalCreditAmountStorage, setFinalCreditAmountStorage] =
    useState(null);

  const [finalIncomeValue, setFinalIncomeValue] = useState(null);

  const [activeErrorQualifyOne, setActiveErrorQualifyOne] = useState(false);
  
  const [activeErrorQualifyTwoo, setActiveErrorQualifyTwoo] = useState(false);
  const [activeErrorQualifyTen, setActiveErrorQualifyTen] = useState(false);
  
  const [activeErrorQualifyThree, setActiveErrorQualifyThree] = useState(false);
  const [activeErrorQualifyFive, setActiveErrorQualifyFive] = useState(false);
  const [activeErrorQualifySix, setActiveErrorQualifySix] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [userData, setUserData] = useState();
  const [selectedFiles, setSelectedFiles] = useState({
    driving_licence: [],
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
    driving_licence: 0,
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

  const [isAddingFile, setIsAddingFile] = useState(false);

  const [showRemoveButton, setShowRemoveButton] = useState(true);

  const handleAddFileClick = () => {
    setIsAddingFile(true); // Set the state to allow adding more files
  };

  const handleRemoveInput = () => {
    setIsAddingFile(false);
  };
  const handleFileChange = (inputName, event) => {
    const selectedFiles = event.target.files;
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
    uploadFile(formData, inputName);
  };

  // Function to upload the file

  const handleCheckboxChange = (event) => {
    setCheckboxChecked(event.target.checked);
  };

  const allFilesSelected = () => {
    return (
      selectedFiles?.driving_licence?.length > 0,
      selectedFiles?.schedule_pdf?.length > 0,
      selectedFiles?.Tax_Return_2020?.length > 0,
      selectedFiles?.Tax_Return_2021?.length > 0
    );
  };

  const allFilesSelectedAdditional = () => {
    return (
      selectedFiles?.driving_licence?.length > 0,
      selectedFiles?.schedule_pdf?.length > 0,
      selectedFiles?.Tax_Return_2020?.length > 0,
      selectedFiles?.Tax_Return_2021?.length > 0,
      selectedFiles?.supplemental_attachment_2020?.length > 0,
      selectedFiles?.supplemental_attachment_2021?.length > 0,
      selectedFiles?.FormA1099?.length > 0,
      selectedFiles?.FormB1099?.length > 0,
      selectedFiles?.ks2020?.length > 0,
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
      const response = await axios.put(
        "http://localhost:5000/user/updateApplication",
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
      await fetchUserDataa();
      // Handle success response
    } catch (error) {
      console.error(`Error uploading files:`, error);
      // Handle error
    }
  };

  const handleSubmiDocuments = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        "http://localhost:5000/user/updateDocumentStatus",
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
      alert("Complete Application");
      console.log(`Files uploaded successfully`, response.data);
      await fetchUserDataa();

      await submitHubspotForm();
      // Handle success response
    } catch (error) {
      console.error(`Error uploading files:`, error);
      // Handle error
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

    // Add other form fields here
  };

  const [formData, setFormData] = useState(initialFormData);
  const [emailValidated, setEmailValidated] = useState(false);

  console.log(formData.symptomsdays2020, "dayssssssssssss");

  const [errors, setErrors] = useState({});

  const handleToken = (token) => {
    localStorage.setItem("token", token);
    // const existingToken = localStorage.getItem('token');
    // if (!existingToken) {
    //   localStorage.setItem('token', token);
    // }
    dispatch(setToken(token));
  };

  const formDataPreparing = async (step) => {
    try {
      const response = await fetch("http://localhost:5000/user/create", {
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
          trade_name: formData.tradeName,
          address_line_1: formData.streetAddressOne,
          city: formData.city, // Add more fields as needed
          state: formData.province,
          address_line_2: formData.streetAddressTwo,
          zip: formData.zipCode,
          know_about_us: formData.knowAbout,
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
    }
  };

  const formDataUpdate = async (step) => {
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
        `http://localhost:5000/user/${step}/updateuser`,
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
            net_income_2019: formData.netIncome2019,
            net_income_2020: formData.netIncome2020,
            net_income_2021: formData.netIncome2021,
            business_negatively_impacted: formData.bussinessNegatively,

            personal_startdate2020: formData.personal_startdate2020,
            personal_enddate2020: formData.personal_enddate2020,
            onedays: formData.numberOfDays,

            personal_startdate2021: formData.personal_startdate2021,
            personal_enddate2021: formData.personal_enddate2021,
            twodays: formData.numberOfDays2021,

            cared_startdate2020: formData.cared_startdate2020,
            cared_enddate2020: formData.cared_enddate2020,
            threedays: formData.symptomsdays2020,

            cared_startdate2021: formData.cared_startdate2021,
            cared_enddate2021: formData.cared_enddate2021,
            fourdays: formData.symptomsdays2021,

            minor_startdate2020: formData.minor_startdate2020,
            minor_enddate2020: formData.minor_enddate2020,
            fivedays: formData.minordays2020,

            minor_startdate2021: formData.minor_startdate2021,
            minor_enddate2021: formData.minor_enddate2021,
            sixdays: formData.minordays2021,

            employed_as_W2: formData.employed_as_W2,
            Family_Sick_Leave: formData.family_sick,

            amount2020: formData.amount2020,
            amount2021: formData.amount2021,



            your_file_schedule: formData.scheduleSelfEmployement,
            mandatory_questions: formData.mandatory_questions,
            if_you_have_positive_earning: formData.positive_net_earning,
            did_you_miss_SEWDTC: formData.covid_related_issues,
            have_you_filed_already_for_setc: formData.setc_program
          }),
        }
      );

      if (response.ok) {
        // alert(`success ${step}`);
        const data = await response.json();

        console.log(data);

        setActiveStep((prevActiveStep) => prevActiveStep + 1);

        // Call the separate function for calculation API

        // await callSetcformData(token, formData);

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
  const formDataUpdateCalculation = async (step) => {
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
        `http://localhost:5000/user/${step}/updateuser`,
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
            net_income_2019: formData.netIncome2019,
            net_income_2020: formData.netIncome2020,
            net_income_2021: formData.netIncome2021,
            business_negatively_impacted: formData.bussinessNegatively,

            

            personal_startdate2020: formData.personal_startdate2020,
            personal_enddate2020: formData.personal_enddate2020,
            onedays: formData.numberOfDays,

            personal_startdate2021: formData.personal_startdate2021,
            personal_enddate2021: formData.personal_enddate2021,
            twodays: formData.numberOfDays2021,

            cared_startdate2020: formData.cared_startdate2020,
            cared_enddate2020: formData.cared_enddate2020,
            threedays: formData.symptomsdays2020,

            cared_startdate2021: formData.cared_startdate2021,
            cared_enddate2021: formData.cared_enddate2021,
            fourdays: formData.symptomsdays2021,

            minor_startdate2020: formData.minor_startdate2020,
            minor_enddate2020: formData.minor_enddate2020,
            fivedays: formData.minordays2020,

            minor_startdate2021: formData.minor_startdate2021,
            minor_enddate2021: formData.minor_enddate2021,
            sixdays: formData.minordays2021,

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
    }
  };

  const callSetcformData = async (token, formData) => {
    try {
      const response = await fetch("http://localhost:5000/user/setcformData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          net_income_2019: formData.netIncome2019,
          net_income_2020: formData.netIncome2020,
          net_income_2021: formData.netIncome2021,
          "1days": formData.numberOfDays,
          "2days": formData.numberOfDays2021,
          "3days": formData.symptomsdays2020,
          "4days": formData.symptomsdays2021,
          "5days": formData.minordays2020,
          "6days": formData.minordays2021,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setActiveStep((prevActiveStep) => prevActiveStep + 1);

        // Check if final_credit_amount is not null and store it in local storage
        if (data.user && data.user.final_roundedValue !== null) {
          setFinalIncomeValue(data.user.final_roundedValue);

          localStorage.setItem(
            "final_roundedValue",
            data.user.final_roundedValue
          );
        }
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
        `http://localhost:5000/user/${step}/updateuser`,
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
        `http://localhost:5000/user/${step}/updateuser`,
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
            net_income_2019: formData.netIncome2019,
            net_income_2020: formData.netIncome2020,
            net_income_2021: formData.netIncome2021,
            business_negatively_impacted: formData.bussinessNegatively,

            personal_startdate2020: formData.personal_startdate2020,
            personal_enddate2020: formData.personal_enddate2020,
            onedays: formData.numberOfDays,

            personal_startdate2021: formData.personal_startdate2021,
            personal_enddate2021: formData.personal_enddate2021,
            twodays: formData.numberOfDays2021,

            cared_startdate2020: formData.cared_startdate2020,
            cared_enddate2020: formData.cared_enddate2020,
            threedays: formData.symptomsdays2020,

            cared_startdate2021: formData.cared_startdate2021,
            cared_enddate2021: formData.cared_enddate2021,
            fourdays: formData.symptomsdays2021,

            minor_startdate2020: formData.minor_startdate2020,
            minor_enddate2020: formData.minor_enddate2020,
            fivedays: formData.minordays2020,

            minor_startdate2021: formData.minor_startdate2021,
            minor_enddate2021: formData.minor_enddate2021,
            sixdays: formData.minordays2021,

            employed_as_W2: formData.employed_as_W2,
            Family_Sick_Leave: formData.family_sick,

            amount2020: formData.amount2020,
            amount2021: formData.amount2021,

            your_file_schedule: formData.scheduleSelfEmployement,
            mandatory_questions: formData.mandatory_questions,

            if_you_have_positive_earning: formData.positive_net_earning,
            did_you_miss_SEWDTC: formData.covid_related_issues,
            have_you_filed_already_for_setc: formData.setc_program
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
        `http://localhost:5000/user/${step}/updateuser`,
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
        "http://localhost:5000/user/checkMail",
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
    }
  };

  const handleNext = async () => {
    console.log(activeStep, "here is my active step");
    const isValid = validateInputs();
    if (!isValid) {
      return;
    }
    if(activeStep === 10){
      alert("hello")
    }
      // if (!emailValidated) {
      //   // Validate email before proceeding to the next step
      //   await checkEmailAvailability();
      const token = localStorage.getItem('token');

      // }

      if (token) {
        if (activeStep === 0) {
          formDataUpdate(activeStep);

        }
      }
      else {

        if (activeStep === 0) {
          formDataPreparing(activeStep);
        }

      }

      if (activeStep === 1) {
        // await submitHubspotForm();
        // setActiveStep((prevActiveStep) => prevActiveStep + 1);
        formDataUpdate(activeStep);
      }

      if (activeStep === 2) {
        formDataUpdate(activeStep);
        // formDataUpdateStepTwo(activeStep);
      }

      // if (activeStep === 3) {

      //   alert(formData.netIncome2019);

      //   formDataUpdateCalculation(activeStep);

      // }
      if (activeStep === 3) {
        formDataUpdate(activeStep);
      }

      // if (activeStep === 4) {
      //   formDataUpdate(activeStep);
      // }
      if(activeStep === 4){
        formDataUpdate(activeStep);

      }

      // if (activeStep === 5) {
      //   formDataUpdateCalculation(activeStep);
      // }
      if(activeStep === 5){
        formDataUpdate(activeStep);

      }

      // if (activeStep === 6) {
      //   formDataUpdateCalculation(activeStep);
      // }
      if (activeStep === 6) {
        formDataUpdate(activeStep);
      }

      // if (activeStep === 7) {
      //   formDataUpdateCalculation(activeStep);
      // }
       if (activeStep === 7) {
        formDataUpdate(activeStep);
      }

      // if (activeStep === 8) {
      //   formDataUpdate(activeStep);
      // }
    if (activeStep === 8) {
      formDataUpdate(activeStep);
    }
      if (activeStep === 9) {
        formDataUpdate(activeStep);
      }

      // if (activeStep === 9) {
      //   formDataUpdate(activeStep);
      // }
      if (activeStep === 10) {
        formDataUpdate(activeStep);
      }
       if (activeStep === 11) {
       
         formDataUpdateCalculation(activeStep);
      }
      if (activeStep === 12) {
        formDataUpdateCalculation(activeStep);
      }
      if (activeStep === 13) {
        formDataUpdateCalculation(activeStep);
      }

      if (activeStep === 14) {
        formDataUpdateCalculation(activeStep);
      }
      if (activeStep === 15) {
        formDataUpdateCalculation(activeStep);
      }
      if (activeStep === 16) {
        formDataUpdateCalculation(activeStep);
      }
      if (activeStep === 17) {
        formDataUpdateCalculation(activeStep);
      }

      if (activeStep === 18) {
        alert(activeStep)
        // formDataUpdate(activeStep);

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }

    window.scrollTo(0, 0);
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handlePrevious = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    window.scrollTo(0, 0);
  };

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   let formattedValue = value.replace(/\D/g, ''); // Remove non-digit characters
  //   formattedValue = formattedValue ? `$${Number(formattedValue).toLocaleString()}` : '$'; // Format as currency with dollar sign

  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: formattedValue,
  //   }));
  // };

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    let inputValue = value;

    if (name.startsWith("netIncome")) {
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
      // Clear values for 2020 if "No" is selected
      setFormData((prevFormData) => ({
        ...prevFormData,
        personal_startdate2020: "",
        personal_enddate2020: "",
        numberOfDays: "",
        [name]: inputValue,
      }));
    } else if (name === "personallySick2021" && inputValue === "No") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        personal_startdate2021: "",
        personal_enddate2021: "",
        numberOfDays: "",
        [name]: inputValue,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: inputValue,
      }));
    }

    if (name === "symptoms2020" && inputValue === "No") {
      // Clear values for 2020 if "No" is selected
      setFormData((prevFormData) => ({
        ...prevFormData,
        cared_startdate2020: "",
        cared_enddate2020: "",
        symptomsdays2020: "",
        [name]: inputValue,
      }));
    } else if (name === "symptoms2021" && inputValue === "No") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        cared_startdate2021: "",
        cared_enddate2021: "",
        symptomsdays2021: "",
        [name]: inputValue,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: inputValue,
      }));
    }

    if (name === "closure2020" && inputValue === "No") {
      // Clear values for 2020 if "No" is selected
      setFormData((prevFormData) => ({
        ...prevFormData,
        minor_startdate2020: "",
        minor_enddate2020: "",
        minordays2020: "",
        [name]: inputValue,
      }));
    } else if (name === "closure2021" && inputValue === "No") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        minor_startdate2021: "",
        minor_enddate2021: "",
        minordays2021: "",
        [name]: inputValue,
      }));
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

    if (name === "numberOfDays" && inputValue === "0") {
      // Reset date values to empty strings if numberOfDays becomes zero
      setFormData((prevFormData) => ({
        ...prevFormData,
        personal_startdate2020: "",
        personal_enddate2020: "",
        [name]: value,
      }));
    } else if (name === "numberOfDays2021" && inputValue === "0") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        personal_startdate2021: "",
        personal_enddate2021: "",
        [name]: value,
      }));
    } else if (name === "symptomsdays2020" && inputValue === "0") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        cared_startdate2020: "",
        cared_enddate2020: "",
        [name]: inputValue,
      }));
    } else if (name === "symptomsdays2021" && inputValue === "0") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        cared_startdate2021: "",
        cared_enddate2021: "",
        [name]: inputValue,
      }));
    } else if (name === "minordays2020" && inputValue === "0") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        minor_startdate2020: "",
        minor_enddate2020: "",
        [name]: inputValue,
      }));
    } else if (name === "minordays2021" && inputValue === "0") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        minor_startdate2021: "",
        minor_enddate2021: "",
        [name]: inputValue,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: inputValue,
      }));
    }
  };
  const handleEmailBlur = async () => {
    const token = localStorage.getItem("token");
    if (!token && formData.email.trim() !== "") {
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

    // if (activeStep === 0) {
    //   if (formData.firstName.trim() === "") {
    //     errorsObj.firstName = "First name cannot be empty";
    //     hasErrors = true;
    //   }

    //   if (formData.lastName.trim() === "") {
    //     errorsObj.lastName = "Last name cannot be empty";
    //     hasErrors = true;
    //   }

    //   if (formData.phone.trim() === "") {
    //     errorsObj.phone = "Phone number cannot be empty";
    //     hasErrors = true;
    //   }

    //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //   if (formData.email.trim() === "" || !emailRegex.test(formData.email)) {
    //     errorsObj.email = "Invalid email format";
    //     hasErrors = true;
    //   }

    //   if (!emailValidated && !token) {
    //     errorsObj.email = "Email already in use!";
    //     hasErrors = true;
    //     window.scrollTo(0, 0);
    //   }

    //   if (formData.bussinessName.trim() === "") {
    //     errorsObj.bussinessName = "Bussiness name cannot be empty";
    //     hasErrors = true;
    //   }

    //   if (formData.tradeName.trim() === "") {
    //     errorsObj.tradeName = "Trade name cannot be empty";
    //     hasErrors = true;
    //   }

    //   if (formData.streetAddressOne.trim() === "") {
    //     errorsObj.streetAddressOne = "Street address cannot be empty";
    //     hasErrors = true;
    //   }

    //   if (formData.city.trim() === "") {
    //     errorsObj.city = "City name cannot be empty";
    //     hasErrors = true;
    //   }

    //   if (formData.province.trim() === "") {
    //     errorsObj.province = "Province name cannot be empty";
    //     hasErrors = true;
    //   }

    //   if (formData.zipCode.trim() === "") {
    //     errorsObj.zipCode = "Zip code cannot be null";
    //     hasErrors = true;
    //   }

    //   if (formData?.knowAbout?.trim() === "") {
    //     errorsObj.knowAbout = "Required field";
    //     hasErrors = true;
    //   }

    //   if (!formData.isChecked) {
    //     errorsObj.isChecked = "Please check the box";
    //     hasErrors = true;
    //   }
    // }

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
        // formDataUpdateWithoutNextStepTwo(activeStep);
        hasErrors = true;
      }
      if (formData.selfEmployedFrom === "Yes"
   
       ) {
        setActiveErrorQualifyOne(false);
        hasErrors = false;
      }

      // if (!formData.isCheckedStepThree) {
      //   errorsObj.isCheckedStepThree = "Please check the box";
      //   hasErrors = true;
      // }

      // if (hasErrors) {
      //   formDataUpdate(activeStep); // Call formDataUpdate here
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
        // formDataUpdateWithoutNextStepTwo(activeStep);
        hasErrors = true;
      }
      if (formData.scheduleSelfEmployement === "Yes" ) {
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
        // formDataUpdateWithoutNextStepTwo(activeStep);
        hasErrors = true;
      }
      if (formData.positive_net_earning === "Yes" ) {
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
        // formDataUpdateWithoutNextStepTwo(activeStep);
        hasErrors = true;
      }
      if (formData.covid_related_issues === "Yes" ) {
        setActiveErrorQualifyFive(false);
        hasErrors = false;
      }
    }
    if (activeStep === 6) {
      if (!formData.setc_program) {
        errorsObj.setc_program = "Please select an option";
        hasErrors = true;
      }
      if (
        formData.setc_program === "Yes" &&
        formData.setc_program !== "No"
      ) {
        setActiveErrorQualifySix(true);
        // formDataUpdateWithoutNextStepTwo(activeStep);
        hasErrors = true;
      }
      if (formData.setc_program === "No" ) {
        setActiveErrorQualifySix(false);
        hasErrors = false;
      }
    }

      if (activeStep === 10) {
      if (formData.mandatory_questions === "") {
        alert("error")
        errorsObj.mandatory_questions = 'Please select an option';
        hasErrors = true;
      }

 if (
        formData.mandatory_questions === "C-CorpandS-Corp" || formData.mandatory_questions === "W2" || formData.mandatory_questions === "None"
        
      ) {
        setActiveErrorQualifyTen(true);
        formDataUpdateWithoutNextStepTwo(activeStep);
        hasErrors = true;
      }
      if (formData.mandatory_questions === "SoleProprietorship" || formData.mandatory_questions === "contractor" || formData.mandatory_questions === "partnership" || formData.mandatory_questions === "LimitedLiability" ) {
        setActiveErrorQualifyTen(false);
        hasErrors = false;
      }


    
     
    }
          if(activeStep === 9){
            if (!formData.isCheckedStepNine) {
              errorsObj.isCheckedStepNine = "Please check the box";
              hasErrors = true;
            }
          }
    if (activeStep === 17) {
      if (!formData.netIncome2019 || formData.netIncome2019 === "$") {
        errorsObj.netIncome2019 = "Please enter a value";
        hasErrors = true;
      }

      if (Number(formData.netIncome2019.replace(/\D/g, "")) < 25000) {
        largerThan25KCount++;
      }

      if (!formData.netIncome2020 || formData.netIncome2020 === "$") {
        errorsObj.netIncome2020 = "Please enter a value";
        hasErrors = true;
      }

      if (Number(formData.netIncome2020.replace(/\D/g, "")) < 25000) {
        largerThan25KCount++;
      }

      if (!formData.netIncome2021 || formData.netIncome2021 === "$") {
        errorsObj.netIncome2021 = "Please enter a value";
        hasErrors = true;
      }

      if (Number(formData.netIncome2021.replace(/\D/g, "")) < 25000) {
        largerThan25KCount++;
      }

      if (largerThan25KCount >= 2) {
        hasErrors = true;
      }
    }

    // if(activeStep === 4) {
    //   if (!formData.bussinessNegatively) {
    //     errorsObj.bussinessNegatively = "Please select an option";
    //     hasErrors = true;
    //   }

    //   if (
    //     formData.bussinessNegatively === "No" &&
    //     formData.bussinessNegatively !== "Yes"
    //   ) {
    //     setActiveErrorQualifyTwo(true);
    //     hasErrors = true;
    //     formDataUpdateWithoutNextStep(activeStep);
    //   }
    //   if (formData.bussinessNegatively === "Yes" ) {
    //     setActiveErrorQualifyTwo(false);
    //     hasErrors = false;
    //   }

    // }
    if (activeStep === 11) {
      if (!formData.personallySick2020) {
        errorsObj.personallySick2020 = "Please select an option";
        hasErrors = true;
      }

      if (
        !formData.personal_startdate2020 &&
        formData.numberOfDays !== "0" &&
        formData.personallySick2020 === "Yes"
      ) {
        errorsObj.personal_startdate2020 = "Please select date";
        hasErrors = true;
      }

      if (
        !formData.personal_enddate2020 &&
        formData.numberOfDays !== "0" &&
        formData.personallySick2020 === "Yes"
      ) {
        errorsObj.personal_enddate2020 = "Please select date";
        hasErrors = true;
      }

      if (!formData.numberOfDays && formData.personallySick2020 === "Yes") {
        errorsObj.numberOfDays = "Please select number";
        hasErrors = true;
      }
    }

    if (activeStep === 12) {
      if (!formData.personallySick2021) {
        errorsObj.personallySick2021 = "Please select an option";
        hasErrors = true;
      }

      if (
        !formData.personal_startdate2021 &&
        formData.numberOfDays2021 !== "0" &&
        formData.personallySick2021 === "Yes"
      ) {
        errorsObj.personal_startdate2021 = "Please select date";
        hasErrors = true;
      }

      if (
        !formData.personal_enddate2021 &&
        formData.numberOfDays2021 !== "0" &&
        formData.personallySick2021 === "Yes"
      ) {
        errorsObj.personal_enddate2021 = "Please select date";
        hasErrors = true;
      }
      if (!formData.numberOfDays2021 && formData.personallySick2021 === "Yes") {
        errorsObj.numberOfDays2021 = "Please select number";
        hasErrors = true;
      }
    }

    if (activeStep === 13) {
      if (!formData.symptoms2020) {
        errorsObj.symptoms2020 = "Please select an option";
        hasErrors = true;
      }

      if (
        !formData.cared_startdate2020 &&
        formData.symptomsdays2020 !== "0" &&
        formData.symptoms2020 === "Yes"
      ) {
        errorsObj.cared_startdate2020 = "Please select date";
        hasErrors = true;
      }

      if (
        !formData.cared_enddate2020 &&
        formData.symptomsdays2020 !== "0" &&
        formData.symptoms2020 === "Yes"
      ) {
        errorsObj.cared_enddate2020 = "Please select date";
        hasErrors = true;
      }

      if (!formData.symptomsdays2020 && formData.symptoms2020 === "Yes") {
        errorsObj.symptomsdays2020 = "Please select number";
        hasErrors = true;
      }
    }

    if (activeStep === 14) {
      if (!formData.symptoms2021) {
        errorsObj.symptoms2021 = "Please select an option";
        hasErrors = true;
      }

      if (
        !formData.cared_startdate2021 &&
        formData.symptomsdays2021 !== "0" &&
        formData.symptoms2021 === "Yes"
      ) {
        errorsObj.cared_startdate2021 = "Please select date";
        hasErrors = true;
      }

      if (
        !formData.cared_enddate2021 &&
        formData.symptomsdays2021 !== "0" &&
        formData.symptoms2021 === "Yes"
      ) {
        errorsObj.cared_enddate2021 = "Please select date";
        hasErrors = true;
      }

      if (!formData.symptomsdays2021 && formData.symptoms2021 === "Yes") {
        errorsObj.symptomsdays2021 = "Please select number";
        hasErrors = true;
      }
    }

    if (activeStep === 15) {
      if (!formData.closure2020) {
        errorsObj.closure2020 = "Please select an option";
        hasErrors = true;
      }

      if (
        !formData.minor_startdate2020 &&
        formData.minordays2020 !== "0" &&
        formData.closure2020 === "Yes"
      ) {
        errorsObj.minor_startdate2020 = "Please select date";
        hasErrors = true;
      }

      if (
        !formData.minor_enddate2020 &&
        formData.minordays2020 !== "0" &&
        formData.closure2020 === "Yes"
      ) {
        errorsObj.minor_enddate2020 = "Please select date";
        hasErrors = true;
      }

      if (!formData.minordays2020 && formData.closure2020 === "Yes") {
        errorsObj.minordays2020 = "Please select number";
        hasErrors = true;
      }
    }

    if (activeStep === 16) {
      if (!formData.closure2021) {
        errorsObj.closure2021 = "Please select an option";
        hasErrors = true;
      }

      if (
        !formData.minor_startdate2021 &&
        formData.minordays2021 !== "0" &&
        formData.closure2021 === "Yes"
      ) {
        errorsObj.minor_startdate2021 = "Please select date";
        hasErrors = true;
      }

      if (
        !formData.minor_enddate2021 &&
        formData.minordays2021 !== "0" &&
        formData.closure2021 === "Yes"
      ) {
        errorsObj.minor_enddate2021 = "Please select date";
        hasErrors = true;
      }

      if (!formData.minordays2021 && formData.closure2021 === "Yes") {
        errorsObj.minordays2021 = "Please select number";
        hasErrors = true;
      }
    }

    // if (activeStep === 5) {

    //   if (!formData.personallySick2020) {
    //     errorsObj.personallySick2020 = "Please select an option";
    //     hasErrors = true;
    //   }

    //     if (!formData.personal_startdate2020 && formData.numberOfDays !== "0" && formData.personallySick2020 === 'Yes') {
    //       errorsObj.personal_startdate2020 = "Please select date";
    //       hasErrors = true;
    //     }

    //     if (!formData.personal_enddate2020 && formData.numberOfDays !== "0" && formData.personallySick2020 === 'Yes') {
    //       errorsObj.personal_enddate2020 = "Please select date";
    //       hasErrors = true;
    //     }

    //     if (!formData.numberOfDays && formData.personallySick2020 === 'Yes') {
    //       errorsObj.numberOfDays = "Please select number";
    //       hasErrors = true;
    //     }

    //     if (!formData.personallySick2021) {
    //       errorsObj.personallySick2021 = "Please select an option";
    //       hasErrors = true;
    //     }

    //   if (!formData.personal_startdate2021 && formData.numberOfDays2021 !== "0" && formData.personallySick2021 === 'Yes') {
    //     errorsObj.personal_startdate2021 = "Please select date";
    //     hasErrors = true;
    //   }

    //   if (!formData.personal_enddate2021 && formData.numberOfDays2021 !== "0" && formData.personallySick2021 === 'Yes') {
    //     errorsObj.personal_enddate2021 = "Please select date";
    //     hasErrors = true;
    //   }
    //   if (!formData.numberOfDays2021 && formData.personallySick2021 === 'Yes') {
    //     errorsObj.numberOfDays2021 = "Please select number";
    //     hasErrors = true;
    //   }
    // }

    // if (activeStep === 6) {

    //   if (!formData.symptoms2020) {
    //     errorsObj.symptoms2020 = "Please select an option";
    //     hasErrors = true;
    //   }

    //     if (!formData.cared_startdate2020 && formData.symptomsdays2020 !== "0" && formData.symptoms2020 === 'Yes') {
    //       errorsObj.cared_startdate2020 = "Please select date";
    //       hasErrors = true;
    //     }

    //     if (!formData.cared_enddate2020 && formData.symptomsdays2020 !== "0" && formData.symptoms2020 === 'Yes') {
    //       errorsObj.cared_enddate2020 = "Please select date";
    //       hasErrors = true;
    //     }

    //     if (!formData.symptomsdays2020 && formData.symptoms2020 === 'Yes') {
    //       errorsObj.symptomsdays2020 = "Please select number";
    //       hasErrors = true;
    //     }

    //     if (!formData.symptoms2021) {
    //       errorsObj.symptoms2021 = "Please select an option";
    //       hasErrors = true;
    //     }

    //       if (!formData.cared_startdate2021 && formData.symptomsdays2021 !== "0" && formData.symptoms2021 === 'Yes') {
    //         errorsObj.cared_startdate2021 = "Please select date";
    //         hasErrors = true;
    //       }

    //       if (!formData.cared_enddate2021 && formData.symptomsdays2021 !== "0" && formData.symptoms2021 === 'Yes') {
    //         errorsObj.cared_enddate2021 = "Please select date";
    //         hasErrors = true;
    //       }

    //       if (!formData.symptomsdays2021 && formData.symptoms2021 === 'Yes') {
    //         errorsObj.symptomsdays2021 = "Please select number";
    //         hasErrors = true;
    //       }
    //   }

    // if (activeStep === 7) {

    //   if (!formData.closure2020) {
    //     errorsObj.closure2020 = "Please select an option";
    //     hasErrors = true;
    //   }

    //     if (!formData.minor_startdate2020 && formData.minordays2020 !== "0" && formData.closure2020 === 'Yes') {
    //       errorsObj.minor_startdate2020 = "Please select date";
    //       hasErrors = true;
    //     }

    //     if (!formData.minor_enddate2020 && formData.minordays2020 !== "0" && formData.closure2020 === 'Yes') {
    //       errorsObj.minor_enddate2020 = "Please select date";
    //       hasErrors = true;
    //     }

    //     if (!formData.minordays2020 && formData.closure2020 === 'Yes') {
    //       errorsObj.minordays2020 = "Please select number";
    //       hasErrors = true;
    //     }

    //     if (!formData.closure2021) {
    //       errorsObj.closure2021 = "Please select an option";
    //       hasErrors = true;
    //     }

    //       if (!formData.minor_startdate2021 && formData.minordays2021 !== "0" && formData.closure2021 === 'Yes') {
    //         errorsObj.minor_startdate2021 = "Please select date";
    //         hasErrors = true;
    //       }

    //       if (!formData.minor_enddate2021 && formData.minordays2021 !== "0" && formData.closure2021 === 'Yes') {
    //         errorsObj.minor_enddate2021 = "Please select date";
    //         hasErrors = true;
    //       }

    //       if (!formData.minordays2021 && formData.closure2021 === 'Yes') {
    //         errorsObj.minordays2021 = "Please select number";
    //         hasErrors = true;
    //       }
    //   }

    if (activeStep === 7) {
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

      // if (formData.employed_as_W2 === "Yes" &&  formData.employed_as_W2 !== 'No' ) {

      //   hasErrors = true;
      // }

      // if (!formData.family_sick && formData.employed_as_W2 === "Yes") {
      //   errorsObj.family_sick = "Please select an option";
      //   hasErrors = true;
      // }

      // if (!formData.minor_startdate2020 && formData.minordays2020 !== "0" && formData.closure2020 === 'Yes') {
      //   errorsObj.minor_startdate2020 = "Please select date";
      //   hasErrors = true;
      // }

      // if (!formData.minor_enddate2020 && formData.minordays2020 !== "0" && formData.closure2020 === 'Yes') {
      //   errorsObj.minor_enddate2020 = "Please select date";
      //   hasErrors = true;
      // }

      // if (!formData.minordays2020 && formData.closure2020 === 'Yes') {
      //   errorsObj.minordays2020 = "Please select number";
      //   hasErrors = true;
      // }
    }
    // Add more validations for other steps if needed

    setErrors(errorsObj);
    return !hasErrors;
  };

  const getProgressPercentage = () => {
    return ((activeStep + 1) / steps.length) * 100; // Calculate progress percentage
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && formData.email !== "") {
      checkEmailAvailability();
    }
  }, [formData.email]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        //  alert(token, 'useeffect tokeeeeeeeeeeeennnnnnnnnnnnnn')
        try {
          const response = await fetch("http://localhost:5000/user/getUser", {
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

            setFormData((prevData) => ({
              ...prevData,
              firstName: userData.first_name || prevData.firstName,
              lastName: userData.last_name || prevData.lastName,
              // Add other fields accordingly

              phone: userData.last_name || "",
              email: userData.email || "",
              bussinessName: userData.business_name || "",
              tradeName: userData.trade_name || "",
              streetAddressOne: userData.address_line_1 || "",
              city: userData.city || "",
              province: userData.state || "",
              streetAddressTwo: userData.address_line_2 || "",
              zipCode: userData.zip || "",

              isChecked: userData.email ? true : false || false,
              knowAbout: userData.know_about_us || "",
              selfEmployedFrom: userData.self_employed_from || "",
              isCheckedStepThree:
                userData.self_employed_from === "Yes" ? true : false || false,
              netIncome2019: userData.net_income_2019 || "",
              netIncome2020: userData.net_income_2020 || "",
              netIncome2021: userData.net_income_2021 || "",
              bussinessNegatively: userData.business_negatively_impacted || "",

              personal_startdate2020: userData.personal_startdate2020 || "",
              personallySick2020:
                userData.personal_startdate2020 || userData.onedays === "0"
                  ? "Yes"
                  : "" || "",
              personal_enddate2020: userData.personal_enddate2020 || "",
              numberOfDays: userData.onedays || "",

              personal_startdate2021: userData.personal_startdate2021 || "",

              personallySick2021:
                userData.personal_enddate2021 || userData.twodays === "0"
                  ? "Yes"
                  : "" || "",

              personal_enddate2021: userData.personal_enddate2021 || "",
              numberOfDays2021: userData.twodays || "",

              cared_startdate2020: userData.cared_startdate2020 || "",
              symptoms2020:
                userData.cared_startdate2020 || userData.threedays === "0"
                  ? "Yes"
                  : "" || "",
              cared_enddate2020: userData.cared_enddate2020 || "",
              symptomsdays2020: userData.threedays || "",

              cared_startdate2021: userData.cared_startdate2021 || "",

              symptoms2021:
                userData.cared_enddate2021 || userData.fourdays
                  ? "Yes"
                  : "" || "",

              cared_enddate2021: userData.cared_enddate2021 || "",
              symptomsdays2021: userData.fourdays || "",

              minor_startdate2020: userData.minor_startdate2020 || "",
              closure2020:
                userData.minor_startdate2020 || userData.fivedays === "0"
                  ? "Yes"
                  : "" || "",
              minor_enddate2020: userData.minor_enddate2020 || "",
              minordays2020: userData.fivedays || "",

              minor_enddate2021: userData.minor_enddate2021 || "",
              closure2021:
                userData.minor_enddate2021 || userData.sixdays === "0"
                  ? "Yes"
                  : "" || "",
              minor_enddate2020: userData.minor_enddate2020 || "",
              minordays2021: userData.sixdays || "",

              employed_as_W2: userData.employed_as_W2 || "",

              family_sick: userData.Family_Sick_Leave || "",

              amount2020: userData.amount2020 || "",

              amount2021: userData.amount2021 || "",

              scheduleSelfEmployement: userData.your_file_schedule || "",
              mandatory_questions: userData.mandatory_questions || "",
              positive_net_earning: userData.if_you_have_positive_earning || "",
              covid_related_issues: userData. did_you_miss_SEWDTC || "",
              setc_program: userData.have_you_filed_already_for_setc || ""

              // your_file_schedule: formData.scheduleSelfEmployement,
              // if_you_have_positive_earning: formData.positive_net_earning,
              // did_you_miss_SEWDTC: formData.covid_related_issues,
              // have_you_filed_already_for_setc: formData.setc_program,




            }));
            setSelectedFiles((prevSelectedFiles) => ({
              ...prevSelectedFiles,
              driving_licence: userData?.driving_licence,
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
        const response = await fetch("http://localhost:5000/user/getUser", {
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
    const apiUrl = "http://localhost:5000/user/dataPosttoHubspot";
    const token = localStorage.getItem("token");

    const data = {
      properties: {
        email: "rizwwtsddnsir@hubspot.com",
        firstname: "weddddqi",
        lastname: "ahmmdeddd",
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

  const openFileInNewTab = (fileKey, index) => {
    // alert(selectedFiles?.driving_licence.length)
    if (fileKey && userData) {
      const fileUrls = userData[fileKey]; // Array of file URLs
      if (fileUrls && fileUrls[index]) {
        window.open(`http://localhost:5000/${fileUrls[index]}`, "_blank");
      } else {
        console.error("File URL not found for the provided index");
      }
    } else {
      console.error("Invalid fileKey or userData is missing");
    }
  };

  const removeFile = async (fileKey, index, originalFileName) => {
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

        // alert(fileKey)
        // alert(fileUrls[index])
        // alert(`${fileKey}_name`)
        // alert(originalFileName)

        // window.open(`http://localhost:5000/${fileUrls[index]}`, '_blank');

        try {
          const url = "http://localhost:5000/user/deleteFile";
          const payload = {
            fieldName: fileKey,
            fileName: fileUrls[index],
            originalFieldName: `${fileKey}_name`,
            originalName: originalFileName,
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
            await fetchUserDataa();

            setSelectedFiles((prevSelectedFiles) => ({
              ...prevSelectedFiles,
              [fileKey]: null,
            }));

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

  const uploadFile = async (formData, inputName) => {
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
          "http://localhost:5000/user/multiple-form-data",
          formData,
          config
        );

        console.log(`File uploaded successfully`, response.data.user);
        await fetchUserDataa();

        setIsAddingFile(false);
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

  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            {/* <TextField
            label="Campaign Settings"
            value={firstName}
            onChange={handleInputChange}
            name="firstName"
            fullWidth
            error={!!errors.firstName}
            helperText={errors.firstName}
          /> */}
            <div className="row justify-content-center pb-3">
              <div className="col-lg-8">
                <div
                  className="step step-1 bg-white shadow  pb-5"
                  style={{ borderRadius: "20px" }}
                >
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
                    {/* <div className="progress mb-4" style={{height: "15px"}}>
                  <div className="progress-bar" role="progressbar" style={{width: "0%"}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                </div> */}
                    {/* <LinearProgress
                      variant="determinate"
                      sx={{
                        height: "8px",
                        borderRadius: "4px",
                        backgroundColor: "#f0f0f0",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "rgb(13, 189, 243);",
                        },
                      }}
                      value={getProgressPercentage()}
                    /> */}
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
                        <label for="id_email" className="form-label requiredField">
                          Email
                        </label>
                        <input
                          value={formData.email}
                          type="email"
                          name="email"
                          maxLength="254"
                          placeholder="e.g. example@example.com"
                          class={`form-control ${
                            errors.email === "Email is available"
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
                    {/* <div className="mb-2">
                      <div className="col-sm-6">
                        <label for="Business-Legal-Name" className="form-label">
                          Business Legal Name
                        </label>

                        <input
                          type="text"
                          value={formData.bussinessName}
                          class={` form-control ${
                            errors.bussinessName ? "border-danger" : ""
                          }`}
                          id="Business-Legal-Name"
                          placeholder=""
                          name="bussinessName"
                          onChange={handleInputChange}
                          required
                        />
                        {errors.bussinessName && (
                          <div
                            className="text-danger"
                            style={{ fontSize: "14px" }}
                          >
                            {errors.bussinessName}
                          </div>
                        )}
                        <div className="invalid-feedback phoneError"></div>
                      </div>
                    </div> */}
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
                        <label for="zipcode" className="form-label requiredField">
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
                    <div className="d-flex" style={{ alignItems: "center " }}>
                      <input
                        checked={formData.isChecked}
                        class={`checkBoxStepOne form-check-input me-1 ${
                          errors.isChecked ? "border-danger" : ""
                        }`}
                        type="checkbox"
                        id="flexCheckDefault1"
                        name="isChecked"
                        onChange={handleInputChange}
                      />
                      {/* {errors.isChecked && (
                <div className="text-danger" 
                 style={{ fontSize: '14px' }}>
                  {errors.isChecked}
                 </div>
                )} */}

                      <p>
                        By checking the box, you agree to our{" "}
                        <a
                          href=""
                          data-bs-toggle="modal"
                          data-bs-target="#term_condition"
                        >
                          {" "}
                          terms & conditions
                        </a>{" "}
                        and will allow SETC Zone and its partners to contact you
                        via phone, text, and/or email.
                      </p>
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
          // <TextField
          //   label="Ad Group Details"
          //   value={adGroupDetails}
          //   onChange={handleInputChange}
          //   name="adGroupDetails"
          //   fullWidth
          // />
          <div className="step step-2 ">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-12">
                  <div className="start-application">
                    <div className="row roww">
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="img-applic-content">
                          <div
                            className="step2_content w-100 pb-5"
                            style={{
                              background: "#e8faff",
                              borderTopLeftRadius: "20px",
                              borderTopRightRadius: "20px",
                            }}
                          >
                            <div className="step_1_de">
                              <h1 style={{ color: "white" }}>
                                How does this application work?
                              </h1>
                            </div>
                            <div className="row justify-content-center">
                              <div className="col-lg-10">
                                <div className="row align-items-center">
                                  <div className="col-lg-7 col-md-12">
                                    <div className="">
                                      <div className="d-flex align-items-center">
                                        {/* <div className="rect"></div> */}
                                        <CheckCircle
                                          style={{ color: "#021b58" }}
                                        />
                                        <h5 className="step2_h5">
                                          Answer 6 questions to determine
                                          eligibility
                                        </h5>
                                      </div>
                                      <div className="d-flex align-items-center">
                                        {/* <div className="rect"></div> */}
                                        <CheckCircle
                                          style={{ color: "#021b58" }}
                                        />
                                        <h5 className="step2_h5">
                                          See if you are pre-qualified for up to{" "}
                                          <span
                                            style={{
                                              color: "rgba(229, 3, 0, 1)",
                                            }}
                                          >
                                            $32,220.00
                                          </span>
                                        </h5>
                                      </div>
                                    </div>
                                  </div>
                                  {/* <div className="col-lg-5">
                                    <div className="step_immg">
                                      <img src={framepng} alt="Frame" />
                                    </div>
                                  </div> */}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="step2_content mt-5 w-100">
                          <div className="step_1_de">
                              <h1 style={{ color: "white" }}>
                              What if I am pre-qualified?

                              </h1>
                            </div>
                            <div className="row justify-content-center mt-md-5 mt-sm-3">
                              <div className="col-lg-10">
                                <div className="row align-items-center">
                                  <div className="col-lg-7" style={{display: 'flex', justifyContent: 'center'}}>
                                    <div className="">
                                      <div className="d-flex align-items-center w-100">
                                        {/* <div className="rect" style={{color: 'rgba(229, 3, 0, 1)', borderColor: "rgba(229, 3, 0, 1)"}}></div> */}
                                        <CheckCircle
                                          style={{
                                            color: "#021b58",
                                          }}
                                        />
                                        <h5 className="step2_h5">
                                          Continue the application by answering
                                          7 additional questions.
                                        </h5>
                                      </div>
                                      <div className="d-flex align-items-center w-100">
                                        {/* <div className="rect" style={{
  color: "rgba(229, 3, 0, 1)",
  borderColor: "rgba(229, 3, 0, 1)"
}}
></div> */}
                                        <CheckCircle
                                          style={{
                                            color: "#021b58",
                                          }}
                                        />
                                        <h5 className="step2_h5">
                                          Upload necesary documents
                                        </h5>
                                      </div>
                                      <div className="d-flex align-items-center w-100">
                                        {/* <div className="rect" style={{
  color: "rgba(229, 3, 0, 1)",
  borderColor: "rgba(229, 3, 0, 1)"
}}
></div> */}
                                        <CheckCircle
                                          style={{
                                            color: "#021b58",
                                          }}
                                        />
                                        <h5 className="step2_h5">
                                          receive a calculated refund amount
                                        </h5>
                                      </div>
                                      <div className="d-flex align-items-center w-100">
                                        {/* <div className="rect" style={{
  color: "rgba(229, 3, 0, 1)",
  borderColor: "rgba(229, 3, 0, 1)"
}}
></div> */}
                                        <CheckCircle
                                          style={{
                                            color: "#021b58",
                                          }}
                                        />
                                        <h5 className="step2_h5">
                                          Our professinal Team will process and
                                          file your return
                                        </h5>
                                      </div>
                                    </div>
                                  </div>
                                  {/* <div className="col-lg-5">
                                    <div className="step_immg">
                                      <img src={qustMark} alt="Qust_mark" />
                                    </div>
                                  </div> */}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="step2_content my-5 pb-5"
                            style={{
                              background: "#e8faff",
                              borderTopLeftRadius: "20px",
                              borderTopRightRadius: "20px",
                            }}
                          >
                           <div className="step_1_de">
                              <h1 style={{ color: "white" }}>
What documents will be needed?

                              </h1>
                            </div>
                            <div className="row justify-content-center">
                              <div className="col-lg-10">
                                <div>
                                  <p
                                    className="mb-3 pp3"
                                    style={{ width: "100%", margin: "auto" }}
                                  >
                                    No Documents will be needed for the
                                    pre-qualification questionaire. If you are
                                    pre-qualified and decide to move forward to
                                    determine calculation, you will need the
                                    following documents:
                                  </p>
                                </div>
                                <div className="row align-items-center">
                                  <div className="col-lg-7">
                                    <div className="d-flex align-items-center w-100 mt-3">
                                      {/* <div className="rect"></div> */}
                                      <CheckCircle
                                        style={{ color: "#021b58" }}
                                      />
                                      <p className="p2">
                                        2019 Schedule C (Form 1040){" "}
                                        {/* <span style={{ color: "red" }} onClick={handlePdfStepTwo}>
                                          Click For Example
                                        </span> */}
                                     
                                     <span style={{ color: 'red', cursor: 'pointer', textDecoration: 'underline' }} onClick={()=>window.open(Pdf2019, '_blank')}>
                                     Click For Example
    </span>


                                      </p>
                                    </div>
                                    <div className="d-flex align-items-center w-100 mt-3">
                                      {/* <div className="rect"></div> */}
                                      <CheckCircle
                                        style={{ color: "#021b58" }}
                                      />
                                      <p className="p2">
                                        2020 Schedule C (Form 1040){" "}
                                        <span style={{ color: 'red', cursor: 'pointer', textDecoration: 'underline' }} onClick={()=>window.open(Pdf2020, '_blank')}>

                                          Click For Example
                                        </span>
                                      </p>
                                    </div>
                                    <div className="d-flex align-items-center w-100 mt-3">
                                      {/* <div className="rect"></div> */}
                                      <CheckCircle
                                        style={{ color: "#021b58" }}
                                      />
                                      <p className="p2">
                                        2021 Schedule C (Form 1040){" "}
                                        <span style={{ color: 'red', cursor: 'pointer', textDecoration: 'underline' }} onClick={()=>window.open(Pdf2021, '_blank')}>
                                        Click For Example
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                  {/* <div className="col-lg-5">
                                    <div className="step_immg">
                                      <img src={taxSet} alt="Tax_set" />
                                    </div>
                                  </div> */}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex justify-content-center mt-3 w-100">
                            <button
                              onClick={handlePrevious}
                              type="button"
                              className="btn btn-primary prev-step"
                            >
                              Previous
                            </button>
                            <button
                              onClick={handleNext}
                              type="button"
                              className="btn btn-primary next-step step2_next"
                            >
                              Pre-Qualification Questionaire
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
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-12 col-md-12 col-sm-12">
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
                            Question 1 of 6
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

                            {/* <div className="data-p py-2 mb-2">
                              <p>
                                <input
                                  checked={formData.isCheckedStepThree}
                                  class={` form-check-input me-1 ${
                                    errors.isCheckedStepThree
                                      ? "border-danger"
                                      : ""
                                  }`}
                                  type="checkbox"
                                  id="flexCheckDefault1"
                                  name="isCheckedStepThree"
                                  onChange={handleInputChange}
                                />{" "}
                                evaluate and answer the questions as they relate
                                to my self-employed business qualifications for
                                the Self-Employed Tax Credit (SETC) Program.
                              </p>
                            </div> */}

                            {formData.selfEmployedFrom === "No" &&
                              activeErrorQualifyOne && (
                                <div>
                                  <h4 style={{ color: "#e62e2d" }}>
                                  Were Sorry. By answering “No” to the above question, you will
                                  not be eligible for the SETC program.
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
                  <div className="start-application">
                    <div className="row ROWW">
                      {/* <div className="col-lg-6 col-md-6 col-sm-12 pe-0">
                      <div className="img-applci h-100 align-items-start">
                        <input
                          type="hidden"
                          name="record_id"
                          id="record_id"
                          value=""
                        />
                        <p className="mb-0">
                          If you were self-employed in 2020 and/or 2021, you
                          could be eligible for the SETC. This includes sole
                          proprietors who run businesses with employees, 1099
                          subcontractors, and single-member LLCs. This unique
                          tax credit is exclusively available to business
                          owners who filed a “Schedule C” or a Partnership
                          (1065) on their federal tax returns for 2020 and/or
                          2021.
                        </p>
                        <h6 className="mt-3 warn">Important Note:</h6>
                        <p>
                          Sub S or True S Corps/C Corps are not eligible for
                          the SETC.
                        </p>
                        <h6 className="warn">Required Documents:</h6>
                        <p>-Driver’s License</p>
                        <p>-1040 with schedule C for 2019, 2020, and 2021</p>
                      </div>
                    </div> */}
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="img-applic-content">
                          {/* <LinearProgress
                          variant="determinate"
                          sx={{
                            height: "8px",
                            marginBottom: 4,
                            borderRadius: "4px",
                            backgroundColor: "#f0f0f0",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "rgb(13, 189, 243);",
                            },
                          }}
                          value={getProgressPercentage()}
                        /> */}
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
                            Question 2 of 6
                          </h3>
                          <div style={{ marginTop: 40 }}>
                            <h1
                              style={{
                                fontSize: "24px",
                                color: "black",
                              }}
                            >
                              Did you file your schedule SE (Self-Employment
                              Tax) for the years of 2020 or 2021?
                            </h1>
                            {/* <label for="self_employed_from"
                                                                      className="form-label headng " style={{ fontWeight: '600'}}>
                                                               Were you self-employed from
                                                                        4/1/2020-9/30/2021?
                                                                  </label> */}
                            {/* <p
                              className="text-center"
                              style={{ fontWeight: "600", color: "red" }}
                            >
                              Click here on how to find it
                            </p> */}
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
                                  Were Sorry. By answering “No” to the above question, you will
                                  not be eligible for the SETC program.
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
                  <div className="start-application">
                    <div className="row ROWW">
                      {/* <div className="col-lg-6 col-md-6 col-sm-12 pe-0">
                      <div className="img-applci h-100 align-items-start">
                        <input
                          type="hidden"
                          name="record_id"
                          id="record_id"
                          value=""
                        />
                        <p className="mb-0">
                          If you were self-employed in 2020 and/or 2021, you
                          could be eligible for the SETC. This includes sole
                          proprietors who run businesses with employees, 1099
                          subcontractors, and single-member LLCs. This unique
                          tax credit is exclusively available to business
                          owners who filed a “Schedule C” or a Partnership
                          (1065) on their federal tax returns for 2020 and/or
                          2021.
                        </p>
                        <h6 className="mt-3 warn">Important Note:</h6>
                        <p>
                          Sub S or True S Corps/C Corps are not eligible for
                          the SETC.
                        </p>
                        <h6 className="warn">Required Documents:</h6>
                        <p>-Driver’s License</p>
                        <p>-1040 with schedule C for 2019, 2020, and 2021</p>
                      </div>
                    </div> */}
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="img-applic-content">
                          {/* <LinearProgress
                          variant="determinate"
                          sx={{
                            height: "8px",
                            marginBottom: 4,
                            borderRadius: "4px",
                            backgroundColor: "#f0f0f0",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "rgb(13, 189, 243);",
                            },
                          }}
                          value={getProgressPercentage()}
                        /> */}
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
                            Question 3 of 6
                          </h3>
                          <div style={{ marginTop: 40 }}>
                            {/* <h1 style={{  color: 'rgb(13, 189, 243)'}} >Did you file your schedule SE
                                                                        (Self-Employment
                                                                        Tax) for the years of 2020 or 2021?</h1> */}
                            <label
                              for="positive_net_earning"
                              className="form-label headng "
                              style={{ fontWeight: "600" }}
                            >
                              Did you have positive net earnings for the years
                              of 2020 or 2021? This can be found in{" "}
                              
                              <span  style={{
                                  color: "red",
                                  cursor: 'pointer',
                                  fontSize: 23,
                                  textDecoration: "underline",
                                }}  onClick={()=>window.open(PdfNetEarning, '_blank')}>
                              line 6 of your schedule SE
    </span>


                              . (If this line is blank or negative, select No.)
                            </label>

                            <div className="optio mb-2">
                            
                              <label for="positive_net_earning_yes">
    <p  style={{
        backgroundColor: formData.positive_net_earning === 'Yes' ? 'lightblue' : 'initial',
      }}>
      <input
      
      className={`form-check-input ${
          errors.positive_net_earning ? "border-danger" : ""
        }`}
        type="radio"
        name="positive_net_earning"
        checked={formData.positive_net_earning === "Yes"}
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
    <p  style={{
        backgroundColor: formData.positive_net_earning === 'No' ? 'lightblue' : 'initial',
      }}>
      <input
      
        class={`form-check-input ${
          errors.positive_net_earning ? "border-danger" : ""
        }`}
        type="radio"
        name="positive_net_earning"
        checked={formData.positive_net_earning === "No"}
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
                                  Were Sorry. By answering “No” to the above question, you will
                                  not be eligible for the SETC program.
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
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-12 col-md-12 col-sm-12">
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
                            Question 4 of 6
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
                              
                                {/* <a
                                  href=""
                                  style={{
                                    color: "red",
                                    fontSize: 23,
                                    textDecoration: "underline",
                                  }}
                                >
                                  Click here for examples
                                </a> */}
 <a
        data-bs-toggle="modal"
        data-bs-target="#exampleModal_step_6"
        className="d-none d-md-inline"
        style={{ color: 'red' }}
      >
        Click here for examples
      </a>                                
      <a
        data-bs-toggle="modal"
        data-bs-target="#exampleModalS_step_6"
        className="d-inline d-md-none"
        style={{ color: 'red' }}
      >
        Click here for examples
      </a>
                              </span>
                            </label>

                            <div className="optio mb-2">
                              {/* <p>
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="covid_related_issues"
                                  value="Yes"
                                />
                                Yes
                              </p> */}
                               <label for="covid_related_issues_yes">
    <p  style={{
        backgroundColor: formData.covid_related_issues === 'Yes' ? 'lightblue' : 'initial',
      }}>
      <input
      
        class={`form-check-input ${
          errors.covid_related_issues ? "border-danger" : ""
        }`}
        type="radio"
        name="covid_related_issues"
        checked={formData.covid_related_issues === "Yes"}
        value="Yes"
        id="covid_related_issues_yes"
        onChange={handleInputChange}
      />
         Yes
    </p>
  </label>
                            </div>
                            <div className="optio">
                              {/* <p>
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="covid_related_issues"
                                  value="No"
                                />
                                No
                              </p> */}
                             
                             <label for="covid_related_issues_no">
    <p  style={{
        backgroundColor: formData.covid_related_issues === 'No' ? 'lightblue' : 'initial',
      }}>
      <input
      
        class={`form-check-input ${
          errors.covid_related_issues ? "border-danger" : ""
        }`}
        type="radio"
        name="covid_related_issues"
        checked={formData.covid_related_issues === "No"}
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
                                  Were Sorry. By answering “No” to the above question, you will
                                not be eligible for the SETC program.
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
                            
                            <div className="modal fade" id="exampleModal_step_6" tabindex="-1" aria-labelledby="exampleModalLabel" style={{display: "none", padding: "0px 40px 20px 40px"}} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered " style={{maxWidth: "800px"}}>
          <div className="modal-content" style={{height: "auto"}}>
            <div className="modal-header" style={{borderBottom: "none"}}>
              <h1 className="modal-title fs-5" id="exampleModalLabel"></h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body" style={{padding: "0px 40px"}}>
            <div style={{padding: "20px 30px"}}>
               <div className="text-center">
                   <h2 style={{color: "#0cc0df", fontsize: "clamp(16px, 2vw, 24px)"}}>Am I eligible for SETC Tax Credits?</h2>
               </div>
              
               <div>
                    <p>During 2020 and 2021 millions of small businesses were negatively impacted by
                    covid-19. If you were unable to work or your business experienced any of the
                    following issues during 2020 and 2021 due to covid-19 you may be eligible for
                    the SETC program:</p>
                    <ul>
                        <li>You took time off of work in 2020 or 2021 due to covid-19 or to care for
                    someone with covid-19 during the same period.</li>
                        <li>You took time off of work in 2020 or 2021 to care for a child under 18 years
                    old due to school or daycare closures.</li>
                        <li>You took time off in 2020 or 2021 due to covid-19 to care for a loved one
                    such as a spouse, parents, etc.</li>
                        <li>A government order imposed a quarantine or isolation.</li>
                        <li>You were having symptoms related to Covid-19 while also waiting for an
                    appointment with your doctor.</li>
                    <li>You were waiting for test results related to COVID-19.</li>
                    <li>You were getting a Covid-19 Vaccination</li>
                    <li>You were experiencing side effects from the COVID-19 vaccine</li>
                    <li>Your doctor recommended you self-quarantine</li>
                    </ul>
               </div>
            </div>
              
            </div>

          </div>
        </div>
       
      </div>
    

      
                            <div className="modal fade" id="exampleModalS_step_6" tabIndex="-1" aria-labelledby="exampleModalLabel" style={{ display: "none" }} aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "100%", margin: "0", width: "100%" }}>
    <div className="modal-content" style={{ minHeight: "100vh", maxHeight: "100vh", overflowY: "auto" }}>
      <div className="modal-header" style={{ borderBottom: "none" }}>
        <h1 className="modal-title fs-5" id="exampleModalLabel"></h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body" style={{ padding: "20px", fontSize: "clamp(16px, 2vw, 24px)" }}>
        <div style={{ padding: "20px 0" }}>
          <div className="text-center">
            <h2 style={{ color: "#0cc0df" }}>Am I eligible for SETC Tax Credits?</h2>
          </div>
          
          <div>
            <p>During 2020 and 2021, millions of small businesses were negatively impacted by COVID-19. If you were unable to work or your business experienced any of the following issues during 2020 and 2021 due to COVID-19, you may be eligible for the SETC program:</p>
            <ul style={{ paddingLeft: "20px" }}>
              <li>You took time off of work in 2020 or 2021 due to COVID-19 or to care for someone with COVID-19 during the same period.</li>
              <li>You took time off of work in 2020 or 2021 to care for a child under 18 years old due to school or daycare closures.</li>
              <li>You took time off in 2020 or 2021 due to COVID-19 to care for a loved one such as a spouse, parent, etc.</li>
              <li>A government order imposed a quarantine or isolation.</li>
              <li>You were having symptoms related to COVID-19 while also waiting for an appointment with your doctor.</li>
              <li>You were waiting for test results related to COVID-19.</li>
              <li>You were getting a COVID-19 vaccination.</li>
              <li>You were experiencing side effects from the COVID-19 vaccine.</li>
              <li>Your doctor recommended you self-quarantine.</li>
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
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-12 col-md-12 col-sm-12">
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
                            Question 5 of 6
                          </h3>
                          <div style={{ marginTop: 40 }}>
                            <label
                              for="setc_program"
                              className="form-label headng "
                              style={{ fontWeight: "600" }}
                            >
                              Have you already filed for the SETC program/FFCRA
                              for the years of 2020 and 2021?
                            </label>

                            <div className="optio mb-2">
                              {/* <p>
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="setc_program"
                                  value="Yes"
                                />
                                Yes
                              </p> */}
                              <label for="setc_program_yes">
    <p  style={{
        backgroundColor: formData.setc_program === 'Yes' ? 'lightblue' : 'initial',
      }}>
      <input
      
        class={`form-check-input ${
          errors.setc_program ? "border-danger" : ""
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
                              {/* <p>
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="setc_program"
                                  value="No"
                                />
                                No
                              </p> */}
                               <label for="setc_program_no">
    <p  style={{
        backgroundColor: formData.setc_program === 'No' ? 'lightblue' : 'initial',
      }}>
      <input
      
        class={`form-check-input ${
          errors.setc_program ? "border-danger" : ""
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
                                  Were Sorry. By answering “YES” to the above question, you will
not be eligible for the SETC program.
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
      case 7:
        return (
          <div className="step step-8">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-12 col-md-12 col-sm-12">
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
                            Question 6 of 6
                          </h3>
                          <div style={{ marginTop: 40 }}>
                            <label
                              for="setc_program"
                              className="form-label headng "
                              style={{ fontWeight: "600" }}
                            >
                              Were you self-employed and also a W2 employee in
                              2020 or 2021?
                            </label>

                            <div className="optio mb-2">
                              <p>
                                <input
                                  className="form-check-input"
                                  class={`form-check-input ${
                                    errors.employed_as_W2 ? "border-danger" : ""
                                  }`}
                                  type="radio"
                                  name="employed_as_W2"
                                  checked={formData.employed_as_W2 === "Yes"}
                                  value="Yes"
                                  // id="self_employed_from_yes"
                                  onChange={handleInputChange}
                                />
                                Yes
                              </p>
                            </div>
                            <div className="optio">
                              <p>
                                <input
                                  className="form-check-input"
                                  class={`form-check-input ${
                                    errors.employed_as_W2 ? "border-danger" : ""
                                  }`}
                                  type="radio"
                                  name="employed_as_W2"
                                  checked={formData.employed_as_W2 === "No"}
                                  value="No"
                                  // id="self_employed_from_yes"
                                  onChange={handleInputChange}
                                />
                                No
                              </p>
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
                                    <p>
                                      <input
                                        className="form-check-input"
                                        class={`form-check-input ${
                                          errors.family_sick
                                            ? "border-danger"
                                            : ""
                                        }`}
                                        type="radio"
                                        name="family_sick"
                                        checked={formData.family_sick === "Yes"}
                                        value="Yes"
                                        // id="self_employed_from_yes"
                                        onChange={handleInputChange}
                                      />
                                      Yes
                                    </p>
                                  </div>
                                  <div className="optio">
                                    <p>
                                      <input
                                        className="form-check-input"
                                        class={`form-check-input ${
                                          errors.family_sick
                                            ? "border-danger"
                                            : ""
                                        }`}
                                        type="radio"
                                        name="family_sick"
                                        checked={formData.family_sick === "No"}
                                        value="No"
                                        // id="self_employed_from_yes"
                                        onChange={handleInputChange}
                                      />
                                      No
                                    </p>
                                  </div>
                                </div>
                                {formData.family_sick === "Yes" && (
                                  <div
                                    id="amount"
                                    style={{ marginTop: "5.5px" }}
                                  >
                                    <div className="optio mb-2">
                                      <input
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
      case 8:
        return (
          <div className="step step-9">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="start-application">
                    <div className="row ROWW">
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="img-applic-content-congrts" >
                          <h1
                            className="text-center"
                            style={{ color: "rgb(13, 189, 243)" }}
                          >
                            Congratulations!
                          </h1>
                          <h1
                            style={{
                              fontWeight: 300,
                              color: "rgb(13, 189, 243)",
                            }}
                            className="text-center"
                          >
                            Your Pre-Qualified for up to $32,220.00!!!
                          </h1>
                          <div style={{ marginTop: 40 }}>
                            {/* <h1 style={{  color: 'rgb(13, 189, 243)'}} >Did you file your schedule SE
                                                                        (Self-Employment
                                                                        Tax) for the years of 2020 or 2021?</h1> */}
                            <label
                              for="congrats"
                              className="form-label headng "
                              style={{ fontWeight: "500", textAlign: 'center !important' }}
                            >
                              Based on the information you submitted you are
                              prequalified to receive the Self Employed Tax
                              Credit. Click below to continue your application!
                            </label>

                            <div className="d-flex justify-content-center mt-3">
                              <button
                                type="button"
                                onClick={handleNext}
                                className="btn btn-primary next-step step2_next"
                              >
                                Continue Application
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
          <div className="step step-10 ">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-12">
                  <div className="start-application">
                    <div className="row roww">
                      <div className="col-lg-12 col-md-12 col-sm-12 ">
                        <div className="img-applic-content">
                          <div className="step2_content">
                            <h1>Welcome To Your SETC Application!</h1>
                            <h1>How does this work?</h1>
                            <div className="d-flex justify-content-center align-items-center gap-3" style={{marginTop: 3}}>
                              <ul>
                                <li>Answer 8 questions of the questionaire</li>
                                <li>Get a calculated estimate amount</li>
                                <li>Upload your documents</li>
                                <li>
                                  Receive your exact calculation from our CPA
                                  firm
                                </li>
                                <li>
                                  Our CPA firm will process and file your return
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div className="step2_content my-5">
                            <h1>What documents will be needed?</h1>

                            <div className="d-flex align-items-center justify-content-center" style={{marginTop: 3}}>
                              <DomainVerification
                                style={{
                                  color: "blueviolet",
                                  width: "25px",
                                  height: "25px",
                                  marginTop: 2,
                                }}
                              />

                              <p className="p2">
                                2019 Schedule C (Form 1040)
                                <span style={{ color: 'red', cursor: 'pointer', textDecoration: 'underline' }} onClick={()=>window.open(Pdf2019, '_blank')}>
                                     Click For Example
    </span>
                              </p>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                              <DomainVerification
                                style={{
                                  color: "blueviolet",
                                  width: "25px",
                                  height: "25px",
                                  marginTop: 2,
                                }}
                              />{" "}
                              {/* </div> */}
                              <p className="p2">
                                2020 Schedule C (Form 1040)
                                <span style={{ color: 'red', cursor: 'pointer', textDecoration: 'underline' }} onClick={()=>window.open(Pdf2020, '_blank')}>
                                     Click For Example
    </span>
                              </p>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                              <DomainVerification
                                style={{
                                  color: "blueviolet",
                                  width: "25px",
                                  height: "25px",
                                  marginTop: 2,
                                }}
                              />{" "}
                              {/* </div> */}
                              <p className="p2">
                                2019 Schedule C (Form 1040)
                               
                                <span style={{ color: 'red', cursor: 'pointer', textDecoration: 'underline' }} onClick={()=>window.open(Pdf2021, '_blank')}>
                                     Click For Example
    </span>
                              </p>
                            </div>
                          </div>
                          <div
                            className="d-flex"
                            style={{
                              alignItems: "center ",
                              padding: "20px 30px",
                              background: "#cceffa",
                              borderRadius: "10px",
                            }}
                          >
                           
                              <label for="flexCheckDefault9">
                              <p>
                              {/* <input
                                className="form-check-input me-1"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              /> */}
                              <input
                                  checked={formData.isCheckedStepNine}
                                  class={` form-check-input me-1 ${
                                    errors.isCheckedStepNine
                                      ? "border-danger"
                                      : ""
                                  }`}
                                  type="checkbox"
                                  id="flexCheckDefault9"
                                  name="isCheckedStepNine"
                                  onChange={handleInputChange}
                                />{" "}
                              I certify that I am in a position to properly
                              evaluate and answer the questions as they relate
                              to my self-employed business qualifications for
                              the Self-Employed Tax Credit (SETC) Program.
                            </p>
                            </label>
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
        );
      case 10:
        return (
          //           <div className="row justify-content-center step step-10">
          //             <div className="col-lg-8">
          //               <div
          //                 className="step step-10 bg-white shadow px-3 py-5"
          //                 style={{ borderRadius: "20px" }}
          //               >
          //                 {/* <div className="progress mb-4" style={{height: "15px"}}>
          //                       <input type="hidden" name="record_id" id="record_id" value=""/>
          //                       <div className="progress-bar" role="progressbar" style={{width: "0%"}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
          //                     </div> */}
          //                 <LinearProgress
          //                   variant="determinate"
          //                   sx={{
          //                     height: "8px",
          //                     marginBottom: 4,
          //                     borderRadius: "4px",
          //                     backgroundColor: "#f0f0f0",
          //                     "& .MuiLinearProgress-bar": {
          //                       backgroundColor: "rgb(13, 189, 243);",
          //                     },
          //                   }}
          //                   value={getProgressPercentage()}
          //                 />

          //                 <h3>Documents</h3>

          //                 <div className="mb-3 file_div">
          //                   <label for="driving_licence" className="form-label">
          //                     A PDF Copy of a Current ID or Driver's License
          //                   </label>
          //                   {userData?.driving_licence && userData?.driving_licence.length > 0 ? (
          //   userData.driving_licence.map((file, index) => (
          //     <div key={index} className="containerr">
          //       <div className="itemm">
          //         <TaskAlt />
          //         <span className="namee">{userData.driving_licence_name[index]}</span>
          //       </div>
          //       <div className="itemm" style={{ padding: '0px 20px !important' }}>
          //         <div onClick={() => openFileInNewTab('driving_licence', index)} className="buttonn">
          //           View
          //         </div>
          //         { showRemoveButton && (
          //         <div onClick={() => removeFile('driving_licence', index, userData.driving_licence_name[index])} className="buttonn">
          //           Remove
          //         </div>
          //         ) }
          //       </div>
          //     </div>
          //   ))
          // ) : (
          //   <input
          //     style={{ marginTop: 20 }}
          //     type="file"
          //     name="driving_licence"
          //     className="form-control file"
          //     id="driving_licence"
          //     accept=".pdf"
          //     required
          //     multiple  // Allow multiple file selection
          //     onChange={(e) => handleFileChange('driving_licence', e)}
          //   />
          // )}

          //               {/* {userData?.driving_licence && userData?.driving_licence.length > 0 && (
          //   <button >Add File</button>
          // )} */}

          //     {userData?.driving_licence && userData?.driving_licence.length > 0 && (

          //      <button style={{    marginTop: '20px',
          //       borderRadius: '6px',
          //       border: '1px solid transparent',
          //       fontWeight: 'bold',
          //       color: 'white',
          //       background: '#3c4d77'}}
          //       onClick={handleAddFileClick}>Add File</button>

          //       )}

          //           {isAddingFile && (
          //             <FileInputComponent
          //               inputName="driving_licence"
          //               onRemove={handleRemoveInput}
          //               handleFileChange={handleFileChange} // Pass the file change handler
          //             />
          //           )}

          //                             {uploadingFile === 'driving_licence' && (
          //                 <LinearProgressWithLabel value={uploadProgress.driving_licence} />
          //                             )
          //                             }

          //                 </div>
          //                 <div className="mb-3 file_div">
          //                   <label for="schedule_pdf" className="form-label">
          //                     A PDF Copy of your 2019 Form 1040 (Tax Return), including
          //                     ALL schedules, if the 2019 Self-Employed Income is higher
          //                     than 2020. We would prefer one PDF file.
          //                   </label>

          //                   {userData?.schedule_pdf && userData?.schedule_pdf.length > 0 ? (
          //   userData.schedule_pdf.map((file, index) => (
          //     <div key={index} className="containerr">
          //       <div className="itemm">
          //         <TaskAlt />
          //         <span className="namee">{userData.schedule_pdf_name[index]}</span>
          //       </div>
          //       <div className="itemm" style={{ padding: '0px 20px !important' }}>
          //         <div onClick={() => openFileInNewTab('schedule_pdf', index)} className="buttonn">
          //           View
          //         </div>
          //         { showRemoveButton && (
          //         <div onClick={() => removeFile('schedule_pdf', index, userData.schedule_pdf_name[index])} className="buttonn">
          //           Remove
          //         </div>
          //         ) }
          //       </div>
          //     </div>
          //   ))
          // ) : (
          //   <input
          //     style={{ marginTop: 20 }}
          //     type="file"
          //     name="schedule_pdf"
          //     className="form-control file"
          //     id="schedule_pdf"
          //     accept=".pdf"
          //     required
          //     multiple  // Allow multiple file selection
          //     onChange={(e) => handleFileChange('schedule_pdf', e)}
          //   />
          // )}

          //               {/* {userData?.driving_licence && userData?.driving_licence.length > 0 && (
          //   <button >Add File</button>
          // )} */}

          //     {userData?.schedule_pdf && userData?.schedule_pdf.length > 0 && (

          //      <button style={{    marginTop: '20px',
          //       borderRadius: '6px',
          //       border: '1px solid transparent',
          //       fontWeight: 'bold',
          //       color: 'white',
          //       background: '#3c4d77'}}
          //       onClick={handleAddFileClick}>Add File</button>

          //       )}

          //           {isAddingFile && (
          //             <FileInputComponent
          //               inputName="schedule_pdf"
          //               onRemove={handleRemoveInput}
          //               handleFileChange={handleFileChange} // Pass the file change handler
          //             />
          //           )}

          //                             {uploadingFile === 'schedule_pdf' && (
          //                 <LinearProgressWithLabel value={uploadProgress.schedule_pdf} />
          //                             )}
          //                 </div>
          //                 <div className="mb-3 file_div">
          //                   <label for="Tax_Return_2020" className="form-label">
          //                     {" "}
          //                     A PDF Copy of your 2020 Form 1040 (Tax Return), including
          //                     ALL schedules.{" "}
          //                   </label>

          //                   {userData?.Tax_Return_2020 && userData?.Tax_Return_2020.length > 0 ? (
          //   userData.Tax_Return_2020.map((file, index) => (
          //     <div key={index} className="containerr">
          //       <div className="itemm">
          //         <TaskAlt />
          //         <span className="namee">{userData.Tax_Return_2020_name[index]}</span>
          //       </div>
          //       <div className="itemm" style={{ padding: '0px 20px !important' }}>
          //         <div onClick={() => openFileInNewTab('Tax_Return_2020', index)} className="buttonn">
          //           View
          //         </div>
          //         { showRemoveButton && (
          //         <div onClick={() => removeFile('Tax_Return_2020', index, userData.Tax_Return_2020_name[index])} className="buttonn">
          //           Remove
          //         </div>
          //         ) }
          //       </div>
          //     </div>
          //   ))
          // ) : (
          //   <input
          //     style={{ marginTop: 20 }}
          //     type="file"
          //     name="Tax_Return_2020"
          //     className="form-control file"
          //     id="Tax_Return_2020"
          //     accept=".pdf"
          //     required
          //     multiple  // Allow multiple file selection
          //     onChange={(e) => handleFileChange('Tax_Return_2020', e)}
          //   />
          // )}

          //               {/* {userData?.driving_licence && userData?.driving_licence.length > 0 && (
          //   <button >Add File</button>
          // )} */}

          //     {userData?.Tax_Return_2020 && userData?.Tax_Return_2020.length > 0 && (

          //      <button style={{    marginTop: '20px',
          //       borderRadius: '6px',
          //       border: '1px solid transparent',
          //       fontWeight: 'bold',
          //       color: 'white',
          //       background: '#3c4d77'}}
          //       onClick={handleAddFileClick}>Add File</button>

          //       )}

          //           {isAddingFile && (

          //             <FileInputComponent
          //               inputName="Tax_Return_2020"
          //               onRemove={handleRemoveInput}
          //               handleFileChange={handleFileChange} // Pass the file change handler
          //             />

          //           )}

          //                             {uploadingFile === 'Tax_Return_2020' && (
          //                 <LinearProgressWithLabel value={uploadProgress.Tax_Return_2020} />
          //                             )}
          //                 </div>
          //                 <div className="mb-3 file_div">
          //                   <label for="Tax_Return_2021" className="form-label">
          //                     A PDF Copy of your 2021 Form 1040 (Tax Return), including
          //                     ALL schedules.{" "}
          //                   </label>
          //                   {userData?.Tax_Return_2021 && userData?.Tax_Return_2021.length > 0 ? (
          //   userData.Tax_Return_2021.map((file, index) => (
          //     <div key={index} className="containerr">
          //       <div className="itemm">
          //         <TaskAlt />
          //         <span className="namee">{userData.Tax_Return_2021_name[index]}</span>
          //       </div>
          //       <div className="itemm" style={{ padding: '0px 20px !important' }}>
          //         <div onClick={() => openFileInNewTab('Tax_Return_2021', index)} className="buttonn">
          //           View
          //         </div>
          //         { showRemoveButton && (
          //         <div onClick={() => removeFile('Tax_Return_2021', index, userData.Tax_Return_2021_name[index])} className="buttonn">
          //           Remove
          //         </div>
          //         ) }
          //       </div>
          //     </div>
          //   ))
          // ) : (
          //   <input
          //     style={{ marginTop: 20 }}
          //     type="file"
          //     name="Tax_Return_2021"
          //     className="form-control file"
          //     id="Tax_Return_2021"
          //     accept=".pdf"
          //     required
          //     multiple  // Allow multiple file selection
          //     onChange={(e) => handleFileChange('Tax_Return_2021', e)}
          //   />
          // )}

          //               {/* {userData?.driving_licence && userData?.driving_licence.length > 0 && (
          //   <button >Add File</button>
          // )} */}

          //     {userData?.Tax_Return_2021 && userData?.Tax_Return_2021.length > 0 && (

          //      <button style={{    marginTop: '20px',
          //       borderRadius: '6px',
          //       border: '1px solid transparent',
          //       fontWeight: 'bold',
          //       color: 'white',
          //       background: '#3c4d77'}}
          //       onClick={handleAddFileClick}>Add File</button>

          //       )}

          //           {isAddingFile && (

          //             <FileInputComponent
          //               inputName="Tax_Return_2021"
          //               onRemove={handleRemoveInput}
          //               handleFileChange={handleFileChange} // Pass the file change handler
          //             />

          //           )}

          //                             {uploadingFile === 'Tax_Return_2021' && (
          //                 <LinearProgressWithLabel value={uploadProgress.Tax_Return_2021} />
          //                             )}
          //                 </div>

          //                {formData.family_sick === "Yes" && formData.employed_as_W2 === "Yes"  && (

          //                 <div className="pdf-upload-extra">

          //                   <div className="mb-3 file_div">
          //                     <label
          //                       for="supplemental_attachment_2020"
          //                       className="form-label"
          //                     >
          //                       PDF Copy of All your 2020 Form W-2(s), including ANY
          //                       Family First Coronavirus Response Act (FFCRA) supplemental
          //                       attachment(s).*
          //                     </label>
          //                     {userData?.supplemental_attachment_2020 && userData?.supplemental_attachment_2020.length > 0 ? (
          //   userData.supplemental_attachment_2020.map((file, index) => (
          //     <div key={index} className="containerr">
          //       <div className="itemm">
          //         <TaskAlt />
          //         <span className="namee">{userData.supplemental_attachment_2020_name[index]}</span>
          //       </div>
          //       <div className="itemm" style={{ padding: '0px 20px !important' }}>
          //         <div onClick={() => openFileInNewTab('supplemental_attachment_2020', index)} className="buttonn">
          //           View
          //         </div>
          //         { showRemoveButton && (
          //         <div onClick={() => removeFile('supplemental_attachment_2020', index, userData.supplemental_attachment_2020_name[index])} className="buttonn">
          //           Remove
          //         </div>
          //         ) }
          //       </div>
          //     </div>
          //   ))
          // ) : (
          //   <input
          //     style={{ marginTop: 20 }}
          //     type="file"
          //     name="supplemental_attachment_2020"
          //     className="form-control file"
          //     id="supplemental_attachment_2020"
          //     accept=".pdf"
          //     required
          //     multiple  // Allow multiple file selection
          //     onChange={(e) => handleFileChange('supplemental_attachment_2020', e)}
          //   />
          // )}

          //               {/* {userData?.driving_licence && userData?.driving_licence.length > 0 && (
          //   <button >Add File</button>
          // )} */}

          //     {userData?.supplemental_attachment_2020 && userData?.supplemental_attachment_2020.length > 0 && (

          //      <button style={{    marginTop: '20px',
          //       borderRadius: '6px',
          //       border: '1px solid transparent',
          //       fontWeight: 'bold',
          //       color: 'white',
          //       background: '#3c4d77'}}
          //       onClick={handleAddFileClick}>Add File</button>

          //       )}

          //           {isAddingFile && (

          //             <FileInputComponent
          //               inputName="supplemental_attachment_2020"
          //               onRemove={handleRemoveInput}
          //               handleFileChange={handleFileChange} // Pass the file change handler
          //             />

          //           )}

          //                             {uploadingFile === 'supplemental_attachment_2020' && (
          //                 <LinearProgressWithLabel value={uploadProgress.supplemental_attachment_2020} />
          //                             )}
          //                   </div>

          //                   <div className="mb-3 file_div">
          //                     <label
          //                       for="2021_supplemental_attachment_2021"
          //                       className="form-label"
          //                     >
          //                       PDF Copy of All your 2021 Form W-2(s), including ANY
          //                       Family First Coronavirus Response Act (FFCRA) supplemental
          //                       attachment(s).
          //                     </label>
          //                     {userData?.supplemental_attachment_2021 && userData?.supplemental_attachment_2021.length > 0 ? (
          //   userData.supplemental_attachment_2021.map((file, index) => (
          //     <div key={index} className="containerr">
          //       <div className="itemm">
          //         <TaskAlt />
          //         <span className="namee">{userData.supplemental_attachment_2021_name[index]}</span>
          //       </div>
          //       <div className="itemm" style={{ padding: '0px 20px !important' }}>
          //         <div onClick={() => openFileInNewTab('supplemental_attachment_2021', index)} className="buttonn">
          //           View
          //         </div>
          //         { showRemoveButton && (
          //         <div onClick={() => removeFile('supplemental_attachment_2021', index, userData.supplemental_attachment_2021_name[index])} className="buttonn">
          //           Remove
          //         </div>
          //         ) }
          //       </div>
          //     </div>
          //   ))
          // ) : (
          //   <input
          //     style={{ marginTop: 20 }}
          //     type="file"
          //     name="supplemental_attachment_2021"
          //     className="form-control file"
          //     id="supplemental_attachment_2021"
          //     accept=".pdf"
          //     required
          //     multiple  // Allow multiple file selection
          //     onChange={(e) => handleFileChange('supplemental_attachment_2021', e)}
          //   />
          // )}

          //               {/* {userData?.driving_licence && userData?.driving_licence.length > 0 && (
          //   <button >Add File</button>
          // )} */}

          //     {userData?.supplemental_attachment_2021 && userData?.supplemental_attachment_2021.length > 0 && (

          //      <button style={{    marginTop: '20px',
          //       borderRadius: '6px',
          //       border: '1px solid transparent',
          //       fontWeight: 'bold',
          //       color: 'white',
          //       background: '#3c4d77'}}
          //       onClick={handleAddFileClick}>Add File</button>

          //       )}

          //           {isAddingFile && (

          //             <FileInputComponent
          //               inputName="supplemental_attachment_2021"
          //               onRemove={handleRemoveInput}
          //               handleFileChange={handleFileChange} // Pass the file change handler
          //             />

          //           )}

          //                             {uploadingFile === 'supplemental_attachment_2021' && (
          //                 <LinearProgressWithLabel value={uploadProgress.supplemental_attachment_2021} />
          //                             )}
          //                   </div>

          //                   <div className="mb-3 file_div">
          //                     <label for="FormA1099" className="form-label">
          //                       PDF Copy of All your 2020 Form 1099-R(s), if any
          //                     </label>

          //                     {userData?.FormA1099 && userData?.FormA1099.length > 0 ? (
          //   userData.FormA1099.map((file, index) => (
          //     <div key={index} className="containerr">
          //       <div className="itemm">
          //         <TaskAlt />
          //         <span className="namee">{userData.FormA1099_name[index]}</span>
          //       </div>
          //       <div className="itemm" style={{ padding: '0px 20px !important' }}>
          //         <div onClick={() => openFileInNewTab('FormA1099', index)} className="buttonn">
          //           View
          //         </div>
          //         { showRemoveButton && (
          //         <div onClick={() => removeFile('FormA1099', index, userData.FormA1099_name[index])} className="buttonn">
          //           Remove
          //         </div>
          //         ) }
          //       </div>
          //     </div>
          //   ))
          // ) : (
          //   <input
          //     style={{ marginTop: 20 }}
          //     type="file"
          //     name="FormA1099"
          //     className="form-control file"
          //     id="FormA1099"
          //     accept=".pdf"
          //     required
          //     multiple  // Allow multiple file selection
          //     onChange={(e) => handleFileChange('FormA1099', e)}
          //   />
          // )}

          //               {/* {userData?.driving_licence && userData?.driving_licence.length > 0 && (
          //   <button >Add File</button>
          // )} */}

          //     {userData?.FormA1099 && userData?.FormA1099.length > 0 && (

          //      <button style={{    marginTop: '20px',
          //       borderRadius: '6px',
          //       border: '1px solid transparent',
          //       fontWeight: 'bold',
          //       color: 'white',
          //       background: '#3c4d77'}}
          //       onClick={handleAddFileClick}>Add File</button>

          //       )}

          //           {isAddingFile && (

          //             <FileInputComponent
          //               inputName="FormA1099"
          //               onRemove={handleRemoveInput}
          //               handleFileChange={handleFileChange} // Pass the file change handler
          //             />

          //           )}

          //                             {uploadingFile === 'FormA1099' && (
          //                 <LinearProgressWithLabel value={uploadProgress.FormA1099} />
          //                             )}
          //                   </div>

          //                   <div className="mb-3 file_div">
          //                     <label for="FormB1099" className="form-label">
          //                       PDF Copy of All your 2021 Form 1099-R(s), if any
          //                     </label>

          //                     {userData?.FormB1099 && userData?.FormB1099.length > 0 ? (
          //   userData.FormB1099.map((file, index) => (
          //     <div key={index} className="containerr">
          //       <div className="itemm">
          //         <TaskAlt />
          //         <span className="namee">{userData.FormB1099_name[index]}</span>
          //       </div>
          //       <div className="itemm" style={{ padding: '0px 20px !important' }}>
          //         <div onClick={() => openFileInNewTab('FormB1099', index)} className="buttonn">
          //           View
          //         </div>
          //         { showRemoveButton && (
          //         <div onClick={() => removeFile('FormB1099', index, userData.FormB1099_name[index])} className="buttonn">
          //           Remove
          //         </div>
          //         ) }
          //       </div>
          //     </div>
          //   ))
          // ) : (
          //   <input
          //     style={{ marginTop: 20 }}
          //     type="file"
          //     name="FormB1099"
          //     className="form-control file"
          //     id="FormB1099"
          //     accept=".pdf"
          //     required
          //     multiple  // Allow multiple file selection
          //     onChange={(e) => handleFileChange('FormB1099', e)}
          //   />
          // )}

          //               {/* {userData?.driving_licence && userData?.driving_licence.length > 0 && (
          //   <button >Add File</button>
          // )} */}

          //     {userData?.FormB1099 && userData?.FormB1099.length > 0 && (

          //      <button style={{    marginTop: '20px',
          //       borderRadius: '6px',
          //       border: '1px solid transparent',
          //       fontWeight: 'bold',
          //       color: 'white',
          //       background: '#3c4d77'}}
          //       onClick={handleAddFileClick}>Add File</button>

          //       )}

          //           {isAddingFile && (

          //             <FileInputComponent
          //               inputName="FormB1099"
          //               onRemove={handleRemoveInput}
          //               handleFileChange={handleFileChange} // Pass the file change handler
          //             />

          //           )}

          //                             {uploadingFile === 'FormB1099' && (
          //                 <LinearProgressWithLabel value={uploadProgress.FormB1099} />
          //                             )}
          //                   </div>

          //                   <div className="mb-3 file_div">
          //                     <label for="ks2020" className="form-label">
          //                       PDF Copy of All your 2020 K-1s, if any
          //                     </label>
          //                     {userData?.ks2020 && userData?.ks2020.length > 0 ? (
          //   userData.ks2020.map((file, index) => (
          //     <div key={index} className="containerr">
          //       <div className="itemm">
          //         <TaskAlt />
          //         <span className="namee">{userData.ks2020_name[index]}</span>
          //       </div>
          //       <div className="itemm" style={{ padding: '0px 20px !important' }}>
          //         <div onClick={() => openFileInNewTab('ks2020', index)} className="buttonn">
          //           View
          //         </div>
          //         { showRemoveButton && (
          //         <div onClick={() => removeFile('ks2020', index, userData.ks2020_name[index])} className="buttonn">
          //           Remove
          //         </div>
          //         ) }
          //       </div>
          //     </div>
          //   ))
          // ) : (
          //   <input
          //     style={{ marginTop: 20 }}
          //     type="file"
          //     name="ks2020"
          //     className="form-control file"
          //     id="ks2020"
          //     accept=".pdf"
          //     required
          //     multiple  // Allow multiple file selection
          //     onChange={(e) => handleFileChange('ks2020', e)}
          //   />
          // )}

          //               {/* {userData?.driving_licence && userData?.driving_licence.length > 0 && (
          //   <button >Add File</button>
          // )} */}

          //     {userData?.ks2020 && userData?.ks2020.length > 0 && (

          //      <button style={{    marginTop: '20px',
          //       borderRadius: '6px',
          //       border: '1px solid transparent',
          //       fontWeight: 'bold',
          //       color: 'white',
          //       background: '#3c4d77'}}
          //       onClick={handleAddFileClick}>Add File</button>

          //       )}

          //           {isAddingFile && (

          //             <FileInputComponent
          //               inputName="ks2020"
          //               onRemove={handleRemoveInput}
          //               handleFileChange={handleFileChange} // Pass the file change handler
          //             />

          //           )}

          //                             {uploadingFile === 'ks2020' && (
          //                 <LinearProgressWithLabel value={uploadProgress.ks2020} />
          //                             )}
          //                   </div>

          //                   <div className="mb-3 file_div">
          //                     <label for="ks22020" className="form-label">
          //                       PDF Copy of All your 2020 K-1s, if any
          //                     </label>
          //                     {userData?.ks22020 && userData?.ks22020.length > 0 ? (
          //   userData.ks22020.map((file, index) => (
          //     <div key={index} className="containerr">
          //       <div className="itemm">
          //         <TaskAlt />
          //         <span className="namee">{userData.ks22020_name[index]}</span>
          //       </div>
          //       <div className="itemm" style={{ padding: '0px 20px !important' }}>
          //         <div onClick={() => openFileInNewTab('ks22020', index)} className="buttonn">
          //           View
          //         </div>
          //         { showRemoveButton && (
          //         <div onClick={() => removeFile('ks22020', index, userData.ks22020_name[index])} className="buttonn">
          //           Remove
          //         </div>
          //         ) }
          //       </div>
          //     </div>
          //   ))
          // ) : (
          //   <input
          //     style={{ marginTop: 20 }}
          //     type="file"
          //     name="ks22020"
          //     className="form-control file"
          //     id="ks22020"
          //     accept=".pdf"
          //     required
          //     multiple  // Allow multiple file selection
          //     onChange={(e) => handleFileChange('ks22020', e)}
          //   />
          // )}

          //               {/* {userData?.driving_licence && userData?.driving_licence.length > 0 && (
          //   <button >Add File</button>
          // )} */}

          //     {userData?.ks22020 && userData?.ks22020.length > 0 && (

          //      <button style={{    marginTop: '20px',
          //       borderRadius: '6px',
          //       border: '1px solid transparent',
          //       fontWeight: 'bold',
          //       color: 'white',
          //       background: '#3c4d77'}}
          //       onClick={handleAddFileClick}>Add File</button>

          //       )}

          //           {isAddingFile && (

          //             <FileInputComponent
          //               inputName="ks22020"
          //               onRemove={handleRemoveInput}
          //               handleFileChange={handleFileChange} // Pass the file change handler
          //             />

          //           )}

          //                             {uploadingFile === 'ks22020' && (
          //                 <LinearProgressWithLabel value={uploadProgress.ks22020} />
          //                             )}
          //                   </div>

          //                 </div>

          //                 )}

          //                 <div className="data-p py-2 mb-2">
          //                   <p>
          //                    <input
          //             className="form-check-input me-1"
          //             type="checkbox"
          //             value=""
          //             id="flexCheckD"
          //             onChange={handleCheckboxChange}
          //           />
          //                     By checking this box you attest that the answers and
          //                     information provided are true and accurate to the best of
          //                     your knowledge, and understand that once submitted your
          //                     responses cannot be changed. You agree to our{" "}
          //                     <a
          //                       href=""
          //                       data-bs-toggle="modal"
          //                       data-bs-target="#term_condition"
          //                     >
          //                       {" "}
          //                       terms & conditions
          //                     </a>
          //                     , and also agree to keep documentation on file that
          //                     substantiates claims made in this application.
          //                   </p>
          //                 </div>
          //                 <div className="d-flex justify-content-center flex-wrap">
          //                   <button  onClick={handlePrevious} type="button" className=" prev-step mb-2">
          //                     Previous
          //                   </button>
          //                   <button
          //         type="button"
          //         id="confirmSubmitModalLaterBtn"
          //         data-bs-target="#confirmSubmitModalwithout"
          //         className="btn btn-primary px-5 py-2 me-2 mb-2 next-step"
          //         disabled={shouldDisableButtonLater()}
          //         onClick={handleSubmitLater}
          //       >
          //         Submit Documents Later
          //       </button>

          //       <button
          //         type="button"
          //         className="btn btn-primary px-5 py-2 mb-2 next-step"
          //         style={{ backgroundColor: '#29abe2' }}
          //         data-bs-target="#confirmSubmitModalLater"
          //         disabled={formData.family_sick === "Yes" && formData.employed_as_W2 === "Yes" ? shouldDisableButtonsAdditional() : shouldDisableButtons()}
          //         onClick={handleSubmiDocuments}
          //       >
          //         Submit Now
          //       </button>

          //                   <div
          //                     className="modal fade"
          //                     id="confirmSubmitModalLater"
          //                     data-bs-backdrop="static"
          //                     data-bs-keyboard="false"
          //                     tabindex="-1"
          //                     aria-labelledby="staticBackdropLabel"
          //                     aria-hidden="true"
          //                   >
          //                     <div className="modal-dialog">
          //                       <div className="modal-content confirm-modal">
          //                         <div
          //                           className="modal-header py-2"
          //                           style={{ borderBottom: "none" }}
          //                         >
          //                           <h5 className="modal-title" id="exampleModalLabel"></h5>

          //                           <a href="#">
          //                             <i
          //                               className="fa-solid fa-xmark fs-3"
          //                               data-bs-dismiss="modal"
          //                               aria-label="Close"
          //                             ></i>
          //                           </a>
          //                         </div>

          //                         <div className="modal-body d-flex justify-content-center flex-column align-items-center pt-0">
          //                           <img
          //                             src="./images/gif-submit.gif"
          //                             style={{ width: "120px" }}
          //                           />
          //                           <h5 className="text-center pb-4">
          //                             <span className="text-success">Congratultion</span> Your
          //                             application has been submitted!{" "}
          //                           </h5>
          //                           <h5 className="text-center">
          //                             Our team will get back to you in 24-72 hours. Thank
          //                             you.
          //                           </h5>

          //                           <a href="#" className="btn btn-primary px-5 go-on-btn">
          //                             Go on
          //                           </a>
          //                         </div>
          //                       </div>
          //                     </div>
          //                   </div>
          //                   <div
          //                     className="modal fade"
          //                     id="confirmSubmitModalwithout"
          //                     data-bs-backdrop="static"
          //                     data-bs-keyboard="false"
          //                     tabindex="-1"
          //                     aria-labelledby="staticBackdropLabel"
          //                     aria-hidden="true"
          //                   >
          //                     <div className="modal-dialog">
          //                       <div className="modal-content confirm-modal2">
          //                         <div
          //                           className="modal-header py-2"
          //                           style={{ borderBottom: "none" }}
          //                         >
          //                           <h5 className="modal-title" id="exampleModalLabel"></h5>

          //                           <a href="">
          //                             <i
          //                               className="fa-solid fa-xmark fs-3"
          //                               data-bs-dismiss="modal"
          //                               aria-label="Close"
          //                             ></i>
          //                           </a>
          //                         </div>

          //                         <div className="modal-body d-flex justify-content-center flex-column align-items-center pt-0">
          //                           <img
          //                             src="./images/gif-submit.gif"
          //                             style={{ width: "120px" }}
          //                           />
          //                           <h5 className="text-center pb-4">
          //                             <span className="text-success">Great</span>, your
          //                             application has been submittd.We will send you a
          //                             personalupload link for your documents.
          //                           </h5>
          //                           <a href="#" className="btn btn-primary px-5 go-on-btn2">
          //                             Go on
          //                           </a>
          //                         </div>
          //                       </div>
          //                     </div>
          //                   </div>
          //                 </div>
          //               </div>
          //             </div>
          //           </div>
          <div className="step step-11">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="start-application">
                    <div className="row ROWW">
                      {/* <div className="col-lg-6 col-md-6 col-sm-12 pe-0">
            <div className="img-applci h-100 align-items-start">
              <input
                type="hidden"
                name="record_id"
                id="record_id"
                value=""
              />
              <p className="mb-0">
                If you were self-employed in 2020 and/or 2021, you
                could be eligible for the SETC. This includes sole
                proprietors who run businesses with employees, 1099
                subcontractors, and single-member LLCs. This unique
                tax credit is exclusively available to business
                owners who filed a “Schedule C” or a Partnership
                (1065) on their federal tax returns for 2020 and/or
                2021.
              </p>
              <h6 className="mt-3 warn">Important Note:</h6>
              <p>
                Sub S or True S Corps/C Corps are not eligible for
                the SETC.
              </p>
              <h6 className="warn">Required Documents:</h6>
              <p>-Driver’s License</p>
              <p>-1040 with schedule C for 2019, 2020, and 2021</p>
            </div>
          </div> */}
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="img-applic-content">
                          {/* <LinearProgress
                variant="determinate"
                sx={{
                  height: "8px",
                  marginBottom: 4,
                  borderRadius: "4px",
                  backgroundColor: "#f0f0f0",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "rgb(13, 189, 243);",
                  },
                }}
                value={getProgressPercentage()}
              /> */}
                          <label
                            for="self_employed_from"
                            className="form-label headng "
                            style={{ fontWeight: "600" }}
                          >
                            What type of business entity did you have in 2020
                            and 2021?
                          </label>

                          <h1
                            className="text-center"
                            style={{ color: "rgb(13, 189, 243)" }}
                          >
                            Question
                          </h1>
                          <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                            }}
                            className="text-center"
                          >
                            1 of 8
                          </h3>
                          <div style={{ marginTop: 40 }}>
                            {/* <Sole Proprie */}
                            <div className="row col-xs-12">
                              <div className="col-md-12">
                                <div className="optio">
                                  {/* <p className="w-100">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="mandatory_questions"
                                      value="SoleProprietorship"
                                      id="sole_partnership"
                                    />
                                    Sole Proprietorship
                                  </p> */}

                   <label for="sole_partnership">
                          <p className="w-100"
                          style={{
                            backgroundColor: formData.mandatory_questions === 'SoleProprietorship' ? 'lightblue' : 'initial',
                          }}
                          >
                         <input
                         class={`form-check-input ${
                          errors.mandatory_questions ? "border-danger" : ""
                        }`}
                 
                  type="radio"
                  name="mandatory_questions"
                  value="SoleProprietorship"
                  id="sole_partnership"
                  checked={formData.mandatory_questions === 'SoleProprietorship'}
                  onChange={handleInputChange}
                />
                Sole Proprietorship
              </p>
            </label>
                                </div>
                                 <div className="optio">
                                 {/* <p className="w-100">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="mandatory_questions"
                                      value="contractor"
                                      id="contractor"
                                    />
                                    1099 Contractor
                                  </p> */}
                               
                                 <label for="contractor">
                          <p className="w-100"
                          style={{
                            backgroundColor: formData.mandatory_questions === 'contractor' ? 'lightblue' : 'initial',
                          }}
                          >
                         <input
                         class={`form-check-input ${
                          errors.mandatory_questions ? "border-danger" : ""
                        }`}
                 
                  type="radio"
                  name="mandatory_questions"
                  value="contractor"
                  id="contractor"
                  checked={formData.mandatory_questions === 'contractor'}
                  onChange={handleInputChange}
                />
                 1099 Contractor
              </p>
            </label>
            </div> 
                                <div className="optio">
                                  {/* <p className="w-100">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="mandatory_questions"
                                      value="partnership"
                                      id="partnership"
                                    />
                                    Partnership
                                  </p> */}
                                  <label for="partnership">
                          <p className="w-100"
                          style={{
                            backgroundColor: formData.mandatory_questions === 'partnership' ? 'lightblue' : 'initial',
                          }}
                          >
                         <input
                         class={`form-check-input ${
                          errors.mandatory_questions ? "border-danger" : ""
                        }`}
                 
                  type="radio"
                  name="mandatory_questions"
                  value="partnership"
                  id="partnership"
                  checked={formData.mandatory_questions === 'partnership'}
                  onChange={handleInputChange}
                />
                 Partnership
              </p>
            </label>
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="optio">
                                  {/* <p className="w-100">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="mandatory_questions"
                                      value="LimitedLiability"
                                      id="limited_liability"
                                    />
                                    Limited Liability(LLC)
                                  </p> */}
                                    <label for="LimitedLiability">
                          <p className="w-100"
                          style={{
                            backgroundColor: formData.mandatory_questions === 'LimitedLiability' ? 'lightblue' : 'initial',
                          }}
                          >
                         <input
                         class={`form-check-input ${
                          errors.mandatory_questions ? "border-danger" : ""
                        }`}
                 
                  type="radio"
                  name="mandatory_questions"
                  value="LimitedLiability"
                  id="LimitedLiability"
                  checked={formData.mandatory_questions === 'LimitedLiability'}
                  onChange={handleInputChange}
                />
               Limited Liability(LLC)
              </p>
            </label>
                                </div>
                                <div className="optio">
                                  {/* <p className="w-100">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="mandatory_questions"
                                      value="C-CorpandS-Corp"
                                      id="c_corp"
                                    />
                                    Corporation (C-Corp and S-Corp)
                                  </p> */}
                                     <label for="C-CorpandS-Corp">
                          <p className="w-100"
                          style={{
                            backgroundColor: formData.mandatory_questions === 'C-CorpandS-Corp' ? 'lightblue' : 'initial',
                          }}
                          >
                         <input
                         class={`form-check-input ${
                          errors.mandatory_questions ? "border-danger" : ""
                        }`}
                 
                  type="radio"
                  name="mandatory_questions"
                  value="C-CorpandS-Corp"
                  id="C-CorpandS-Corp"
                  checked={formData.mandatory_questions === 'C-CorpandS-Corp'}
                  onChange={handleInputChange}
                />
              Corporation (C-Corp and S-Corp)
              </p>
            </label>
                                </div>
                                <div className="optio">
                                  {/* <p className="w-100">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="mandatory_questions"
                                      value="W2"
                                      id="w2"
                                    />
                                    W2
                                  </p> */}
                                  <label for="W2">
                          <p className="w-100"
                          style={{
                            backgroundColor: formData.mandatory_questions === 'W2' ? 'lightblue' : 'initial',
                          }}
                          >
                         <input
                         class={`form-check-input ${
                          errors.mandatory_questions ? "border-danger" : ""
                        }`}
                 
                  type="radio"
                  name="mandatory_questions"
                  value="W2"
                  id="W2"
                  checked={formData.mandatory_questions === 'W2'}
                  onChange={handleInputChange}
                />
              W2
              </p>
            </label>
                                </div>
                                <div className="optio">
                                  {/* <p className="w-100">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="mandatory_questions"
                                      value="None"
                                      id="none_above"
                                    />
                                    None of the above
                                  </p> */}
                                     <label for="none_above">
                          <p className="w-100"
                          style={{
                            backgroundColor: formData.mandatory_questions === 'None' ? 'lightblue' : 'initial',
                          }}
                          >
                         <input
                         class={`form-check-input ${
                          errors.mandatory_questions ? "border-danger" : ""
                        }`}
                 
                  type="radio"
                  name="mandatory_questions"
                  value="None"
                  id="none_above"
                  checked={formData.mandatory_questions === 'None'}
                  onChange={handleInputChange}
                />
             None of the above
              </p>
            </label>
                                </div>
                              </div>
                            </div>

                            {(formData.mandatory_questions === "C-CorpandS-Corp" || formData.mandatory_questions === "W2" || formData.mandatory_questions === "None") &&
                              activeErrorQualifyTen && (
                                <div>
                                  <h4 style={{ color: "#e62e2d" }}>
                                    You are ineligible! Plz select another option ..
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
      case 11:
        return (
          <div className="step step-12">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="start-application">
                    <div className="row ROWW">
                      {/* <div className="col-lg-6 col-md-6 col-sm-12 pe-0">
                      <div className="img-applci h-100 align-items-start">
                        <input
                          type="hidden"
                          name="record_id"
                          id="record_id"
                          value=""
                        />
                        <p className="mb-0">
                          If you were self-employed in 2020 and/or 2021, you
                          could be eligible for the SETC. This includes sole
                          proprietors who run businesses with employees, 1099
                          subcontractors, and single-member LLCs. This unique
                          tax credit is exclusively available to business
                          owners who filed a “Schedule C” or a Partnership
                          (1065) on their federal tax returns for 2020 and/or
                          2021.
                        </p>
                        <h6 className="mt-3 warn">Important Note:</h6>
                        <p>
                          Sub S or True S Corps/C Corps are not eligible for
                          the SETC.
                        </p>
                        <h6 className="warn">Required Documents:</h6>
                        <p>-Driver’s License</p>
                        <p>-1040 with schedule C for 2019, 2020, and 2021</p>
                      </div>
                    </div> */}
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="img-applic-content">
                          {/* <LinearProgress
                          variant="determinate"
                          sx={{
                            height: "8px",
                            marginBottom: 4,
                            borderRadius: "4px",
                            backgroundColor: "#f0f0f0",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "rgb(13, 189, 243);",
                            },
                          }}
                          value={getProgressPercentage()}
                        /> */}

                          <label
                            for="self_employed_from"
                            className="form-label headng text-center"
                            style={{ fontWeight: "600" }}
                          >
                            Were you personally sick with Covid, experienced
                            Covid like symptoms, needed to quarantine, underwent
                            testing, were unable to perform services including
                            tele-work and took time off in 2020?
                          </label>
                          <h1
                            className="text-center"
                            style={{ color: "rgb(13, 189, 243)" }}
                          >
                            Question
                          </h1>
                          <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                            }}
                            className="text-center"
                          >
                            2 of 8
                          </h3>

                          <div style={{ marginTop: 40 }}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <div className="optio mb-2">
                                <p>
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
                                    // id="self_employed_from_yes"
                                    onChange={handleInputChange}
                                  />
                                  Yes
                                </p>
                              </div>
                              <div className="optio">
                                <p>
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
                                    // id="self_employed_from_no"
                                    onChange={handleInputChange}
                                  />
                                  No
                                </p>
                              </div>
                            </div>

                            {formData.personallySick2020 === "Yes" && (
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label
                                      for="personal_startdate2020"
                                      className="form-label fs-6"
                                    >
                                      Start
                                    </label>
                                    <input
                                      type="date"
                                      min="2020-04-01"
                                      max="2020-12-31"
                                      // className="date-picker"
                                      className={` date-picker ${
                                        errors.personal_startdate2020
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="personal_startdate2020"
                                      name="personal_startdate2020"
                                      value={formData.personal_startdate2020}
                                      onChange={handleInputChange}
                                      disabled={formData.numberOfDays === "0"}
                                    />{" "}
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label
                                      for="personal_enddate2020"
                                      className="form-label fs-6"
                                    >
                                      End
                                    </label>
                                    <input
                                      type="date"
                                      min="2020-04-01"
                                      max="2020-12-31"
                                      className={` date-picker ${
                                        errors.personal_enddate2020
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="personal_enddate2020"
                                      name="personal_enddate2020"
                                      value={formData.personal_enddate2020}
                                      onChange={handleInputChange}
                                      disabled={formData.numberOfDays === "0"}
                                    />
                                  </div>
                                </div>
                                {formData.numberOfDays === "0" && (
                                  <p
                                    style={{
                                      color: "rgb(255, 149, 0)",
                                      fontFamily: "sans-serif",
                                      fontSize: 15,
                                    }}
                                  >
                                    Start and end date is not significant for
                                    days zero.
                                  </p>
                                )}
                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label for="1days" className="form-label fs-6">
                                      Number of days:
                                    </label>
                                    <input
                                      type="number"
                                      className={` date-picker ${
                                        errors.numberOfDays
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="1days"
                                      name="numberOfDays"
                                      value={formData.numberOfDays}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                </div>
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
          <div className="step step-13">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="start-application">
                    <div className="row ROWW">
                      {/* <div className="col-lg-6 col-md-6 col-sm-12 pe-0">
                      <div className="img-applci h-100 align-items-start">
                        <input
                          type="hidden"
                          name="record_id"
                          id="record_id"
                          value=""
                        />
                        <p className="mb-0">
                          If you were self-employed in 2020 and/or 2021, you
                          could be eligible for the SETC. This includes sole
                          proprietors who run businesses with employees, 1099
                          subcontractors, and single-member LLCs. This unique
                          tax credit is exclusively available to business
                          owners who filed a “Schedule C” or a Partnership
                          (1065) on their federal tax returns for 2020 and/or
                          2021.
                        </p>
                        <h6 className="mt-3 warn">Important Note:</h6>
                        <p>
                          Sub S or True S Corps/C Corps are not eligible for
                          the SETC.
                        </p>
                        <h6 className="warn">Required Documents:</h6>
                        <p>-Driver’s License</p>
                        <p>-1040 with schedule C for 2019, 2020, and 2021</p>
                      </div>
                    </div> */}
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="img-applic-content">
                          {/* <LinearProgress
                          variant="determinate"
                          sx={{
                            height: "8px",
                            marginBottom: 4,
                            borderRadius: "4px",
                            backgroundColor: "#f0f0f0",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "rgb(13, 189, 243);",
                            },
                          }}
                          value={getProgressPercentage()}
                        /> */}

                          <label
                            for="self_employed_from"
                            className="form-label headng text-center"
                            style={{ fontWeight: "600" }}
                          >
                            Were you personally sick with Covid, experienced
                            Covid like symptoms, needed to quarantine, underwent
                            testing, were unable to perform services including
                            tele-work and took time off in 2021?
                          </label>
                          <h1
                            className="text-center"
                            style={{ color: "rgb(13, 189, 243)" }}
                          >
                            Question
                          </h1>
                          <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                            }}
                            className="text-center"
                          >
                            3 of 8
                          </h3>

                          <div style={{ marginTop: 40 }}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <div className="optio mb-2">
                                <p>
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
                                    // id="self_employed_from_yes"
                                    onChange={handleInputChange}
                                  />
                                  Yes
                                </p>
                              </div>
                              <div className="optio">
                                <p>
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
                                    // id="self_employed_from_no"
                                    onChange={handleInputChange}
                                  />
                                  No
                                </p>
                              </div>
                            </div>

                            {formData.personallySick2021 === "Yes" && (
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label
                                      for="personal_startdate2021"
                                      className="form-label fs-6"
                                    >
                                      Start
                                    </label>
                                    <input
                                      type="date"
                                      min="2021-01-01"
                                      max="2021-09-30"
                                      className={` date-picker ${
                                        errors.personal_startdate2021
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="personal_startdate2021"
                                      name="personal_startdate2021"
                                      value={formData.personal_startdate2021}
                                      onChange={handleInputChange}
                                      disabled={
                                        formData.numberOfDays2021 === "0"
                                      }
                                    />{" "}
                                  </div>
                                </div>

                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label
                                      for="personal_enddate2021"
                                      className="form-label fs-6"
                                    >
                                      End
                                    </label>

                                    <input
                                      type="date"
                                      min="2021-01-01"
                                      max="2021-09-30"
                                      className={` date-picker ${
                                        errors.personal_enddate2021
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="personal_enddate2021"
                                      name="personal_enddate2021"
                                      value={formData.personal_enddate2021}
                                      onChange={handleInputChange}
                                      disabled={
                                        formData.numberOfDays2021 === "0"
                                      }
                                    />
                                  </div>
                                </div>
                                {formData.numberOfDays2021 === "0" && (
                                  <p
                                    style={{
                                      color: "rgb(255, 149, 0)",
                                      fontFamily: "sans-serif",
                                      fontSize: 15,
                                    }}
                                  >
                                    Start and end date is not significant for
                                    days zero.
                                  </p>
                                )}
                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label for="2days" className="form-label fs-6">
                                      Number of days:
                                    </label>

                                    <input
                                      type="number"
                                      class={` date-picker ${
                                        errors.numberOfDays2021
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="2days"
                                      name="numberOfDays2021"
                                      value={formData.numberOfDays2021}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                </div>
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
          <div className="step step-14">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="start-application">
                    <div className="row ROWW">
                      {/* <div className="col-lg-6 col-md-6 col-sm-12 pe-0">
                        <div className="img-applci h-100 align-items-start">
                          <input
                            type="hidden"
                            name="record_id"
                            id="record_id"
                            value=""
                          />
                          <p className="mb-0">
                            If you were self-employed in 2020 and/or 2021, you
                            could be eligible for the SETC. This includes sole
                            proprietors who run businesses with employees, 1099
                            subcontractors, and single-member LLCs. This unique
                            tax credit is exclusively available to business
                            owners who filed a “Schedule C” or a Partnership
                            (1065) on their federal tax returns for 2020 and/or
                            2021.
                          </p>
                          <h6 className="mt-3 warn">Important Note:</h6>
                          <p>
                            Sub S or True S Corps/C Corps are not eligible for
                            the SETC.
                          </p>
                          <h6 className="warn">Required Documents:</h6>
                          <p>-Driver’s License</p>
                          <p>-1040 with schedule C for 2019, 2020, and 2021</p>
                        </div>
                      </div> */}
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="img-applic-content">
                          {/* <LinearProgress
                            variant="determinate"
                            sx={{
                              height: "8px",
                              marginBottom: 4,
                              borderRadius: "4px",
                              backgroundColor: "#f0f0f0",
                              "& .MuiLinearProgress-bar": {
                                backgroundColor: "rgb(13, 189, 243);",
                              },
                            }}
                            value={getProgressPercentage()}
                          /> */}

                          <label
                            for="self_employed_from"
                            className="form-label headng text-center"
                            style={{ fontWeight: "600" }}
                          >
                            Did you care for someone else who was affected by
                            Covid, experienced Covid like symptoms, needed to
                            quarantine, underwent testing, and took time off in
                            2020?
                          </label>
                          <h1
                            className="text-center"
                            style={{ color: "rgb(13, 189, 243)" }}
                          >
                            Question
                          </h1>
                          <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                            }}
                            className="text-center"
                          >
                            4 of 8
                          </h3>

                          <div style={{ marginTop: 40 }}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <div className="optio mb-2">
                                <p>
                                  <input
                                    className="form-check-input"
                                    class={`form-check-input ${
                                      errors.symptoms2020 ? "border-danger" : ""
                                    }`}
                                    type="radio"
                                    name="symptoms2020"
                                    checked={formData.symptoms2020 === "Yes"}
                                    value="Yes"
                                    // id="self_employed_from_yes"
                                    onChange={handleInputChange}
                                  />
                                  Yes
                                </p>
                              </div>
                              <div className="optio">
                                <p>
                                  <input
                                    class={`form-check-input ${
                                      errors.symptoms2020 ? "border-danger" : ""
                                    }`}
                                    type="radio"
                                    name="symptoms2020"
                                    value="No"
                                    checked={formData.symptoms2020 === "No"}
                                    // id="self_employed_from_no"
                                    onChange={handleInputChange}
                                  />
                                  No
                                </p>
                              </div>
                            </div>

                            {formData.symptoms2020 === "Yes" && (
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label
                                      for="cared_startdate2020"
                                      className="form-label fs-6"
                                    >
                                      Start
                                    </label>
                                    {/* <input
                                  type="date"
                                  min="2020-04-01"
                                  max="2020-12-31"
                                  className="date-picker"
                                  id="cared_startdate2020"
                                  name="cared_startdate2020"
                                />
                              </div> */}
                                    <input
                                      type="date"
                                      min="2020-04-01"
                                      max="2020-12-31"
                                      // className="date-picker"
                                      className={` date-picker ${
                                        errors.cared_startdate2020
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="cared_startdate2020"
                                      name="cared_startdate2020"
                                      value={formData.cared_startdate2020}
                                      onChange={handleInputChange}
                                      disabled={
                                        formData.symptomsdays2020 === "0"
                                      }
                                    />{" "}
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label
                                      for="cared_enddate2020"
                                      className="form-label fs-6"
                                    >
                                      End
                                    </label>
                                    <input
                                      type="date"
                                      min="2020-04-01"
                                      max="2020-12-31"
                                      // className="date-picker"
                                      className={` date-picker ${
                                        errors.cared_enddate2020
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="cared_enddate2020"
                                      name="cared_enddate2020"
                                      value={formData.cared_enddate2020}
                                      onChange={handleInputChange}
                                      disabled={
                                        formData.symptomsdays2020 === "0"
                                      }
                                    />{" "}
                                  </div>
                                </div>
                                {formData.symptomsdays2020 === "0" && (
                                  <p
                                    style={{
                                      color: "rgb(255, 149, 0)",
                                      fontFamily: "sans-serif",
                                      fontSize: 15,
                                    }}
                                  >
                                    Start and end date is not significant for
                                    days zero.
                                  </p>
                                )}
                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label for="3days" className="form-label fs-6">
                                      Number of days:
                                    </label>

                                    <input
                                      type="number"
                                      className={` date-picker ${
                                        errors.symptomsdays2020
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="3days"
                                      name="symptomsdays2020"
                                      value={formData.symptomsdays2020}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                </div>
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
          <div className="step step-15">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="start-application">
                    <div className="row ROWW">
                      {/* <div className="col-lg-6 col-md-6 col-sm-12 pe-0">
                          <div className="img-applci h-100 align-items-start">
                            <input
                              type="hidden"
                              name="record_id"
                              id="record_id"
                              value=""
                            />
                            <p className="mb-0">
                              If you were self-employed in 2020 and/or 2021, you
                              could be eligible for the SETC. This includes sole
                              proprietors who run businesses with employees, 1099
                              subcontractors, and single-member LLCs. This unique
                              tax credit is exclusively available to business
                              owners who filed a “Schedule C” or a Partnership
                              (1065) on their federal tax returns for 2020 and/or
                              2021.
                            </p>
                            <h6 className="mt-3 warn">Important Note:</h6>
                            <p>
                              Sub S or True S Corps/C Corps are not eligible for
                              the SETC.
                            </p>
                            <h6 className="warn">Required Documents:</h6>
                            <p>-Driver’s License</p>
                            <p>-1040 with schedule C for 2019, 2020, and 2021</p>
                          </div>
                        </div> */}
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="img-applic-content">
                          {/* <LinearProgress
                              variant="determinate"
                              sx={{
                                height: "8px",
                                marginBottom: 4,
                                borderRadius: "4px",
                                backgroundColor: "#f0f0f0",
                                "& .MuiLinearProgress-bar": {
                                  backgroundColor: "rgb(13, 189, 243);",
                                },
                              }}
                              value={getProgressPercentage()}
                            /> */}

                          <label
                            for="self_employed_from"
                            className="form-label headng text-center"
                            style={{ fontWeight: "600" }}
                          >
                            Did you care for someone else who was affected by
                            Covid, experienced Covid like symptoms, needed to
                            quarantine, underwent testing, and took time off in
                            2021?
                          </label>
                          <h1
                            className="text-center"
                            style={{ color: "rgb(13, 189, 243)" }}
                          >
                            Question
                          </h1>
                          <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                            }}
                            className="text-center"
                          >
                            5 of 8
                          </h3>

                          <div style={{ marginTop: 40 }}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <div className="optio mb-2">
                                <p>
                                  <input
                                    className="form-check-input"
                                    class={`form-check-input ${
                                      errors.symptoms2021 ? "border-danger" : ""
                                    }`}
                                    type="radio"
                                    name="symptoms2021"
                                    checked={formData.symptoms2021 === "Yes"}
                                    value="Yes"
                                    // id="self_employed_from_yes"
                                    onChange={handleInputChange}
                                  />
                                  Yes
                                </p>
                              </div>
                              <div className="optio">
                                <p>
                                  <input
                                    class={`form-check-input ${
                                      errors.symptoms2021 ? "border-danger" : ""
                                    }`}
                                    type="radio"
                                    name="symptoms2021"
                                    value="No"
                                    checked={formData.symptoms2021 === "No"}
                                    // id="self_employed_from_no"
                                    onChange={handleInputChange}
                                  />
                                  No
                                </p>
                              </div>
                            </div>

                            {formData.symptoms2021 === "Yes" && (
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label
                                      for="cared_startdate2021"
                                      className="form-label fs-6"
                                    >
                                      Start
                                    </label>
                                    {/* <input
                                  type="date"
                                  min="2021-01-01"
                                  max="2021-09-30"
                                  className="date-picker"
                                  id="cared_startdate2021"
                                  name="cared_startdate2021"
                                /> */}
                                    <input
                                      type="date"
                                      min="2021-01-01"
                                      max="2021-09-30"
                                      // className="date-picker"
                                      className={` date-picker ${
                                        errors.cared_startdate2021 &&
                                        formData.symptomsdays2021 !== "0"
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="cared_startdate2021"
                                      name="cared_startdate2021"
                                      value={formData.cared_startdate2021}
                                      onChange={handleInputChange}
                                      disabled={
                                        formData.symptomsdays2021 === "0"
                                      }
                                    />{" "}
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label
                                      for="cared_enddate2021"
                                      className="form-label fs-6"
                                    >
                                      End
                                    </label>
                                    {/* <input
                                  type="date"
                                  min="2021-01-01"
                                  max="2021-09-30"
                                  className="date-picker"
                                  id="cared_enddate2021"
                                  name="cared_enddate2021"
                                /> */}
                                    <input
                                      type="date"
                                      min="2021-01-01"
                                      max="2021-09-30"
                                      // className="date-picker"
                                      className={` date-picker ${
                                        errors.cared_enddate2021 &&
                                        formData.symptomsdays2021 !== "0"
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="cared_enddate2021"
                                      name="cared_enddate2021"
                                      value={formData.cared_enddate2021}
                                      onChange={handleInputChange}
                                      disabled={
                                        formData.symptomsdays2021 === "0"
                                      }
                                    />{" "}
                                  </div>
                                </div>

                                {formData.symptomsdays2021 === "0" && (
                                  <p
                                    style={{
                                      color: "rgb(255, 149, 0)",
                                      fontFamily: "sans-serif",
                                      fontSize: 15,
                                    }}
                                  >
                                    Start and end date is not significant for
                                    days zero.
                                  </p>
                                )}

                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label for="4days" className="form-label fs-6">
                                      Number of days:
                                    </label>
                                    {/* <input
                                  type="number"
                                  className="date-picker"
                                  id="4days"
                                  name="4days"
                                /> */}
                                    <input
                                      type="number"
                                      className={` date-picker ${
                                        errors.symptomsdays2021
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="4days"
                                      name="symptomsdays2021"
                                      value={formData.symptomsdays2021}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                </div>
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
      case 15:
        return (
          <div className="step step-16">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="start-application">
                    <div className="row ROWW">
                      {/* <div className="col-lg-6 col-md-6 col-sm-12 pe-0">
                            <div className="img-applci h-100 align-items-start">
                              <input
                                type="hidden"
                                name="record_id"
                                id="record_id"
                                value=""
                              />
                              <p className="mb-0">
                                If you were self-employed in 2020 and/or 2021, you
                                could be eligible for the SETC. This includes sole
                                proprietors who run businesses with employees, 1099
                                subcontractors, and single-member LLCs. This unique
                                tax credit is exclusively available to business
                                owners who filed a “Schedule C” or a Partnership
                                (1065) on their federal tax returns for 2020 and/or
                                2021.
                              </p>
                              <h6 className="mt-3 warn">Important Note:</h6>
                              <p>
                                Sub S or True S Corps/C Corps are not eligible for
                                the SETC.
                              </p>
                              <h6 className="warn">Required Documents:</h6>
                              <p>-Driver’s License</p>
                              <p>-1040 with schedule C for 2019, 2020, and 2021</p>
                            </div>
                          </div> */}
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="img-applic-content">
                          {/* <LinearProgress
                                variant="determinate"
                                sx={{
                                  height: "8px",
                                  marginBottom: 4,
                                  borderRadius: "4px",
                                  backgroundColor: "#f0f0f0",
                                  "& .MuiLinearProgress-bar": {
                                    backgroundColor: "rgb(13, 189, 243);",
                                  },
                                }}
                                value={getProgressPercentage()}
                              /> */}

                          <label
                            for="self_employed_from"
                            className="form-label headng text-center"
                            style={{ fontWeight: "600" }}
                          >
                            Were you affected by the closure of your child's
                            school/daycare due to COVID restrictions, or how
                            many days did you care for your minor child who was
                            affected by COVID, which impacted your work in 2020?
                          </label>
                          <h1
                            className="text-center"
                            style={{ color: "rgb(13, 189, 243)" }}
                          >
                            Question
                          </h1>
                          <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                            }}
                            className="text-center"
                          >
                            6 of 8
                          </h3>

                          <div style={{ marginTop: 40 }}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <div className="optio mb-2">
                                <p>
                                  <input
                                    className="form-check-input"
                                    class={`form-check-input ${
                                      errors.closure2020 ? "border-danger" : ""
                                    }`}
                                    type="radio"
                                    name="closure2020"
                                    checked={formData.closure2020 === "Yes"}
                                    value="Yes"
                                    // id="self_employed_from_yes"
                                    onChange={handleInputChange}
                                  />
                                  Yes
                                </p>
                              </div>
                              <div className="optio">
                                <p>
                                  <input
                                    class={`form-check-input ${
                                      errors.closure2020 ? "border-danger" : ""
                                    }`}
                                    type="radio"
                                    name="closure2020"
                                    value="No"
                                    checked={formData.closure2020 === "No"}
                                    // id="self_employed_from_no"
                                    onChange={handleInputChange}
                                  />
                                  No
                                </p>
                              </div>
                            </div>

                            {formData.closure2020 === "Yes" && (
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label
                                      for="minor_startdate2020"
                                      className="form-label fs-6"
                                    >
                                      Start
                                    </label>
                                    {/* <input
                                  type="date"
                                  min="2020-04-01"
                                  max="2020-12-31"
                                  className="date-picker"
                                  id="minor_startdate2020"
                                  name="minor_startdate2020"
                                /> */}
                                    <input
                                      type="date"
                                      min="2020-04-01"
                                      max="2020-12-31"
                                      // className="date-picker"
                                      className={` date-picker ${
                                        errors.minor_startdate2020
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="minor_startdate2020"
                                      name="minor_startdate2020"
                                      value={formData.minor_startdate2020}
                                      onChange={handleInputChange}
                                      disabled={formData.minordays2020 === "0"}
                                    />{" "}
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label
                                      for="minor_enddate2020"
                                      className="form-label fs-6"
                                    >
                                      End
                                    </label>
                                    {/* <input
                                  type="date"
                                  min="2020-04-01"
                                  max="2020-12-31"
                                  className="date-picker"
                                  id="minor_enddate2020"
                                  name="minor_enddate2020"
                                />
                                 */}
                                    <input
                                      type="date"
                                      min="2020-04-01"
                                      max="2020-12-31"
                                      // className="date-picker"
                                      className={` date-picker ${
                                        errors.minor_enddate2020
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="minor_enddate2020"
                                      name="minor_enddate2020"
                                      value={formData.minor_enddate2020}
                                      onChange={handleInputChange}
                                      disabled={formData.minordays2020 === "0"}
                                    />{" "}
                                  </div>
                                </div>

                                {formData.minordays2020 === "0" && (
                                  <p
                                    style={{
                                      color: "rgb(255, 149, 0)",
                                      fontFamily: "sans-serif",
                                      fontSize: 15,
                                    }}
                                  >
                                    Start and end date is not significant for
                                    days zero.
                                  </p>
                                )}

                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label for="5days" className="form-label fs-6">
                                      Number of days:
                                    </label>
                                    {/* <input
                                  type="number"
                                  placeholder="(50 days max)"
                                  className="date-picker"
                                  id="5days"
                                  name="5days"
                                /> */}
                                    <input
                                      type="number"
                                      placeholder="(50 days max)"
                                      className={` date-picker ${
                                        errors.minordays2020
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="5days"
                                      name="minordays2020"
                                      value={formData.minordays2020}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                </div>
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
          <div className="step step-16">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="start-application">
                    <div className="row ROWW">
                      {/* <div className="col-lg-6 col-md-6 col-sm-12 pe-0">
                              <div className="img-applci h-100 align-items-start">
                                <input
                                  type="hidden"
                                  name="record_id"
                                  id="record_id"
                                  value=""
                                />
                                <p className="mb-0">
                                  If you were self-employed in 2020 and/or 2021, you
                                  could be eligible for the SETC. This includes sole
                                  proprietors who run businesses with employees, 1099
                                  subcontractors, and single-member LLCs. This unique
                                  tax credit is exclusively available to business
                                  owners who filed a “Schedule C” or a Partnership
                                  (1065) on their federal tax returns for 2020 and/or
                                  2021.
                                </p>
                                <h6 className="mt-3 warn">Important Note:</h6>
                                <p>
                                  Sub S or True S Corps/C Corps are not eligible for
                                  the SETC.
                                </p>
                                <h6 className="warn">Required Documents:</h6>
                                <p>-Driver’s License</p>
                                <p>-1040 with schedule C for 2019, 2020, and 2021</p>
                              </div>
                            </div> */}
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="img-applic-content">
                          {/* <LinearProgress
                                  variant="determinate"
                                  sx={{
                                    height: "8px",
                                    marginBottom: 4,
                                    borderRadius: "4px",
                                    backgroundColor: "#f0f0f0",
                                    "& .MuiLinearProgress-bar": {
                                      backgroundColor: "rgb(13, 189, 243);",
                                    },
                                  }}
                                  value={getProgressPercentage()}
                                /> */}

                          <label
                            for="self_employed_from"
                            className="form-label headng text-center"
                            style={{ fontWeight: "600" }}
                          >
                            Were you affected by the closure of your child's
                            school/daycare due to COVID restrictions, or how
                            many days did you care for your minor child who was
                            affected by COVID, which impacted your work in 2021?
                          </label>
                          <h1
                            className="text-center"
                            style={{ color: "rgb(13, 189, 243)" }}
                          >
                            Question
                          </h1>
                          <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                            }}
                            className="text-center"
                          >
                            7 of 8
                          </h3>

                          <div style={{ marginTop: 40 }}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <div className="optio mb-2">
                                <p>
                                  <input
                                    className="form-check-input"
                                    class={`form-check-input ${
                                      errors.closure2021 ? "border-danger" : ""
                                    }`}
                                    type="radio"
                                    name="closure2021"
                                    checked={formData.closure2021 === "Yes"}
                                    value="Yes"
                                    // id="self_employed_from_yes"
                                    onChange={handleInputChange}
                                  />
                                  Yes
                                </p>
                              </div>
                              <div className="optio">
                                <p>
                                  <input
                                    class={`form-check-input ${
                                      errors.closure2021 ? "border-danger" : ""
                                    }`}
                                    type="radio"
                                    name="closure2021"
                                    value="No"
                                    checked={formData.closure2021 === "No"}
                                    // id="self_employed_from_no"
                                    onChange={handleInputChange}
                                  />
                                  No
                                </p>
                              </div>
                            </div>

                            {formData.closure2021 === "Yes" && (
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label
                                      for="minor_startdate2021"
                                      className="form-label fs-6"
                                    >
                                      Start
                                    </label>
                                    <input
                                      type="date"
                                      min="2021-01-01"
                                      max="2021-09-30"
                                      // className="date-picker"
                                      className={` date-picker ${
                                        errors.minor_startdate2021
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="minor_startdate2021"
                                      name="minor_startdate2021"
                                      value={formData.minor_startdate2021}
                                      onChange={handleInputChange}
                                      disabled={formData.minordays2021 === "0"}
                                    />{" "}
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label
                                      for="minor_enddate2021"
                                      className="form-label fs-6"
                                    >
                                      End
                                    </label>
                                    <input
                                      type="date"
                                      min="2021-01-01"
                                      max="2021-09-30"
                                      // className="date-picker"
                                      className={` date-picker ${
                                        errors.minor_enddate2021
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="minor_enddate2021"
                                      name="minor_enddate2021"
                                      value={formData.minor_enddate2021}
                                      onChange={handleInputChange}
                                      disabled={formData.minordays2021 === "0"}
                                    />{" "}
                                  </div>
                                </div>

                                {formData.minordays2021 === "0" && (
                                  <p
                                    style={{
                                      color: "rgb(255, 149, 0)",
                                      fontFamily: "sans-serif",
                                      fontSize: 15,
                                    }}
                                  >
                                    Start and end date is not significant for
                                    days zero.
                                  </p>
                                )}

                                <div className="col-lg-6">
                                  <div className="optio mb-2">
                                    <label for="6days" className="form-label fs-6">
                                      Number of days:
                                    </label>

                                    <input
                                      type="number"
                                      placeholder="(60 days max)"
                                      className={` date-picker ${
                                        errors.minordays2021
                                          ? "border-danger"
                                          : ""
                                      }`}
                                      id="6days"
                                      name="minordays2021"
                                      value={formData.minordays2021}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                </div>
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
      case 17:
        return (
          // <div className="step step-18">
          // <div className="container ">
          //   <div className="row justify-content-center">
          //     <div className="col-lg-10">
          //       <div className="start-application">
          //         <div className="row ROWW">
          //           {/* <div className="col-lg-6 col-md-6 col-sm-12 pe-0">
          //             <div className="img-applci h-100 align-items-start">
          //               <input
          //                 type="hidden"
          //                 name="record_id"
          //                 id="record_id"
          //                 value=""
          //               />
          //               <p className="mb-0">
          //                 If you were self-employed in 2020 and/or 2021, you
          //                 could be eligible for the SETC. This includes sole
          //                 proprietors who run businesses with employees, 1099
          //                 subcontractors, and single-member LLCs. This unique
          //                 tax credit is exclusively available to business
          //                 owners who filed a “Schedule C” or a Partnership
          //                 (1065) on their federal tax returns for 2020 and/or
          //                 2021.
          //               </p>
          //               <h6 className="mt-3 warn">Important Note:</h6>
          //               <p>
          //                 Sub S or True S Corps/C Corps are not eligible for
          //                 the SETC.
          //               </p>
          //               <h6 className="warn">Required Documents:</h6>
          //               <p>-Driver’s License</p>
          //               <p>-1040 with schedule C for 2019, 2020, and 2021</p>
          //             </div>
          //           </div> */}
          //           <div className="col-lg-12 col-md-12 col-sm-12">
          //             <div className="img-applic-content">
          //               {/* <LinearProgress
          //                 variant="determinate"
          //                 sx={{
          //                   height: "8px",
          //                   marginBottom: 4,
          //                   borderRadius: "4px",
          //                   backgroundColor: "#f0f0f0",
          //                   "& .MuiLinearProgress-bar": {
          //                     backgroundColor: "rgb(13, 189, 243);",
          //                   },
          //                 }}
          //                 value={getProgressPercentage()}
          //               /> */}
          //             <h1 className="text-center">What was my Net Income for
          //                                                     the years 2019,2020 and 2021?</h1>
          //                                                     <h2 style="color: red;">Located on line 6 of your Schedule C (Form 1040)</h2>
          //                                                 <h5 className="text-center">8 of 8</h5>
          //                                                 <p><span style="color: red;">Note:</span>Must be greater than $25,000.00
          //                                                     for 2 of the three years</p>
          //                                                         {/* <label for="self_employed_from"
          //                                                             className="form-label headng " style={{ fontWeight: '600'}}>
          //                                                      Were you self-employed from
          //                                                               4/1/2020-9/30/2021?
          //                                                         </label> */}

          //                                                         <label for="net_income_2019" className="form-label fs-5">
          //         Total NET Income For 2019?
          //       </label>
          //       <div className="optio mb-2">
          //         <input
          //           type="text"
          //           value={formData.netIncome2019}
          //           class={` for ${
          //             errors.netIncome2019 ? "border-danger" : ""
          //           }`}
          //           name="netIncome2019"
          //           onChange={handleInputChange}
          //           placeholder="$"
          //           id="net_income_2019"
          //         />
          //       </div>
          //       <label for="net_income_2020" className="form-label fs-5">
          //         Total NET Income For 2020?
          //       </label>
          //       <div className="optio mb-2">
          //         <input
          //           type="text"
          //           value={formData.netIncome2020}
          //           name="netIncome2020"
          //           class={` for ${
          //             errors.netIncome2020 ? "border-danger" : ""
          //           }`}
          //           placeholder="$"
          //           onChange={handleInputChange}
          //           id="net_income_2020"
          //         />
          //       </div>
          //       <label for="net_income_2021" className="form-label fs-5">
          //         Total NET Income For 2021?
          //       </label>
          //       <div className="optio mb-2">
          //         <input
          //           type="text"
          //           value={formData.netIncome2021}
          //           name="netIncome2021"
          //           class={` for ${
          //             errors.netIncome2021 ? "border-danger" : ""
          //           }`}
          //           placeholder="$"
          //           onChange={handleInputChange}
          //           id="net_income_2021"
          //         />
          //       </div>

          //               <div className="d-flex justify-content-end mt-3">
          //                 <button
          //                   onClick={handlePrevious}
          //                   type="button"
          //                   className="px-3 py-2 prev-step"
          //                 >
          //                   Previous
          //                 </button>
          //                 <button
          //                   onClick={handleNext}
          //                   type="button"
          //                   className="px-3 py-2 next-step"
          //                 >
          //                   {activeStep === steps.length - 1
          //                     ? "Submit"
          //                     : "Next"}
          //                 </button>
          //               </div>
          //               </div>

          //             </div>
          //           </div>
          //         </div>
          //       </div>
          //     </div>
          //   </div>
          // </div>
          <div className="step step-18">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="start-application">
                    <div className="row ROWW">
                      {/* <div className="col-lg-6 col-md-6 col-sm-12 pe-0">
                                <div className="img-applci h-100 align-items-start">
                                  <input
                                    type="hidden"
                                    name="record_id"
                                    id="record_id"
                                    value=""
                                  />
                                  <p className="mb-0">
                                    If you were self-employed in 2020 and/or 2021, you
                                    could be eligible for the SETC. This includes sole
                                    proprietors who run businesses with employees, 1099
                                    subcontractors, and single-member LLCs. This unique
                                    tax credit is exclusively available to business
                                    owners who filed a “Schedule C” or a Partnership
                                    (1065) on their federal tax returns for 2020 and/or
                                    2021.
                                  </p>
                                  <h6 className="mt-3 warn">Important Note:</h6>
                                  <p>
                                    Sub S or True S Corps/C Corps are not eligible for
                                    the SETC.
                                  </p>
                                  <h6 className="warn">Required Documents:</h6>
                                  <p>-Driver’s License</p>
                                  <p>-1040 with schedule C for 2019, 2020, and 2021</p>
                                </div>
                              </div> */}
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="img-applic-content">
                          {/* <LinearProgress
                                    variant="determinate"
                                    sx={{
                                      height: "8px",
                                      marginBottom: 4,
                                      borderRadius: "4px",
                                      backgroundColor: "#f0f0f0",
                                      "& .MuiLinearProgress-bar": {
                                        backgroundColor: "rgb(13, 189, 243);",
                                      },
                                    }}
                                    value={getProgressPercentage()}
                                  /> */}

                          <h1
                            style={{
                              textAlign: "center",
                              fontSize: "26px",
                              fontWeight: 600,
                              color: "rgb(13, 189, 243)",
                            }}
                          >
                            What was my Net Income for the years 2019,2020 and
                            2021?
                          </h1>
                          <p
                            style={{
                              color: "red",
                              lineHeight: 0.9,
                              fontWeight: "600",
                              textAlign: "center",
                            }}
                          >
                            Located on line 6 of your Schedule C (Form 1040)
                          </p>
                          <p style={{ textAlign: "center" }}>
                            <span style={{ color: "red", fontWeight: "700" }}>
                              Note:
                            </span>
                            Must be greater than $25,000.00 for 2 of the three
                            years
                          </p>
                          <h3
                            style={{
                              fontWeight: 300,
                              lineHeight: 0.2,
                              color: "rgb(13, 189, 243)",
                            }}
                            className="text-center"
                          >
                            Question 8 of 8
                          </h3>
                          <div style={{ marginTop: 43 }}>
                            {/* <h1 style={{  color: 'rgb(13, 189, 243)'}} >Did you file your schedule SE
                                                                                  (Self-Employment
                                                                                  Tax) for the years of 2020 or 2021?</h1> */}

                            <label
                              for="net_income_2019"
                              className="form-label fs-5"
                            >
                              Total NET Income For 2019?
                            </label>
                            <div className="optio mb-2">
                              <input
                                type="text"
                                value={formData.netIncome2019}
                                class={` for ${
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
                            >
                              Total NET Income For 2020?
                            </label>
                            <div className="optio mb-2">
                              <input
                                type="text"
                                value={formData.netIncome2020}
                                name="netIncome2020"
                                class={` for ${
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
                            >
                              Total NET Income For 2021?
                            </label>
                            <div className="optio mb-2">
                              <input
                                type="text"
                                value={formData.netIncome2021}
                                name="netIncome2021"
                                class={` for ${
                                  errors.netIncome2021 ? "border-danger" : ""
                                }`}
                                placeholder="$"
                                onChange={handleInputChange}
                                id="net_income_2021"
                              />
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
        );
      case 18:
        return (
          <div className="step step-19">
            <input type="hidden" name="record_id" id="record_id" value="" />
            <div className="container">
              <div className="row justify-content-center">
                {/* <canvas id="confetti"></canvas> */}
                <div className="col-lg-12">
                  <div className="start-application">
                    <div className="row">
                      <div
                        className="col-lg-6 col-md-6 col-sm-12 pe-0"
                        style={{
                          backgroundImage:
                            "linear-gradient(#dff5fc, #dff5fc), b",
                        }}
                      >
                        <div
                          className="img-applci sd h-100"
                          style={{ backgroundImage: "none !important" }}
                        >
                          <div className="col-lg-12">
                            <div className="step-9-congrats">
                              <div className="step_9_con border-0 d-flex justify-content-center">
                                <h3 className="text-success text-center fs-1 mb-3">
                                  Congratulations!
                                </h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 ">
                        <div className="img-applic-content d-flex align-items-center">
                          <div className="row justify-content-center align-items-center">
                            <div className="col-lg-12">
                              <div className="h-100 d-flex align-items-center flex-column">
                                <div className="h-90">
                                  <h3 className="text-success text-center fs-1 mb-3">
                                    Hurray!
                                  </h3>
                                  {/* <h6 className="fs-4">
                                    You may be eligible for
                                    <span className="text-success">{finalIncomeValue || finalCreditAmountStorage}</span>. We
                                    encourage you to complete the application
                                    and get paid. 🤩
                                  </h6> */}
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
                                    for our CPAs to calculate your exact credit
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
      case 19:
        return (
          <div className="row justify-content-center step step-20">
            <div className="col-lg-8">
              <div
                className="step step-10 bg-white shadow px-3 py-5"
                style={{ borderRadius: "20px" }}
              >
                {/* <div className="progress mb-4" style={{height: "15px"}}>
                                <input type="hidden" name="record_id" id="record_id" value=""/>
                                <div className="progress-bar" role="progressbar" style={{width: "0%"}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                              </div> */}
                {/* <LinearProgress
                  variant="determinate"
                  sx={{
                    height: "8px",
                    marginBottom: 4,
                    borderRadius: "4px",
                    backgroundColor: "#f0f0f0",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "rgb(13, 189, 243);",
                    },
                  }}
                  value={getProgressPercentage()}
                /> */}

                <h3>Documents</h3>

                <div className="mb-3 file_div">
                  <label for="driving_licence" className="form-label">
                    A PDF Copy of a Current ID or Driver's License
                  </label>
                  {userData?.driving_licence &&
                  userData?.driving_licence.length > 0 ? (
                    userData.driving_licence.map((file, index) => (
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
                              openFileInNewTab("driving_licence", index)
                            }
                            className="buttonn"
                          >
                            View
                          </div>
                          {showRemoveButton && (
                            <div
                              onClick={() =>
                                removeFile(
                                  "driving_licence",
                                  index,
                                  userData.driving_licence_name[index]
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
                      name="driving_licence"
                      className="form-control file"
                      id="driving_licence"
                      accept=".pdf"
                      required
                      multiple // Allow multiple file selection
                      onChange={(e) => handleFileChange("driving_licence", e)}
                    />
                  )}

                  {/* {userData?.driving_licence && userData?.driving_licence.length > 0 && (
            <button >Add File</button>
          )} */}

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
                        onClick={handleAddFileClick}
                      >
                        Add File
                      </button>
                    )}

                  {isAddingFile && (
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
                </div>
                <div className="mb-3 file_div">
                  <label for="schedule_pdf" className="form-label">
                    A PDF Copy of your 2019 Form 1040 (Tax Return), including
                    ALL schedules, if the 2019 Self-Employed Income is higher
                    than 2020. We would prefer one PDF file.
                  </label>

                  {userData?.schedule_pdf &&
                  userData?.schedule_pdf.length > 0 ? (
                    userData.schedule_pdf.map((file, index) => (
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
                              openFileInNewTab("schedule_pdf", index)
                            }
                            className="buttonn"
                          >
                            View
                          </div>
                          {showRemoveButton && (
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
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <input
                      style={{ marginTop: 20 }}
                      type="file"
                      name="schedule_pdf"
                      className="form-control file"
                      id="schedule_pdf"
                      accept=".pdf"
                      required
                      multiple // Allow multiple file selection
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
                        }}
                        onClick={handleAddFileClick}
                      >
                        Add File
                      </button>
                    )}

                  {isAddingFile && (
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
                              openFileInNewTab("Tax_Return_2020", index)
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
                      multiple // Allow multiple file selection
                      onChange={(e) => handleFileChange("Tax_Return_2020", e)}
                    />
                  )}

                  {/* {userData?.driving_licence && userData?.driving_licence.length > 0 && (
            <button >Add File</button>
          )} */}

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
                        }}
                        onClick={handleAddFileClick}
                      >
                        Add File
                      </button>
                    )}

                  {isAddingFile && (
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
                              openFileInNewTab("Tax_Return_2021", index)
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
                      multiple // Allow multiple file selection
                      onChange={(e) => handleFileChange("Tax_Return_2021", e)}
                    />
                  )}

                  {/* {userData?.driving_licence && userData?.driving_licence.length > 0 && (
            <button >Add File</button>
          )} */}

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
                        }}
                        onClick={handleAddFileClick}
                      >
                        Add File
                      </button>
                    )}

                  {isAddingFile && (
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
                                        index
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
                            multiple // Allow multiple file selection
                            onChange={(e) =>
                              handleFileChange(
                                "supplemental_attachment_2020",
                                e
                              )
                            }
                          />
                        )}

                        {/* {userData?.driving_licence && userData?.driving_licence.length > 0 && (
            <button >Add File</button>
          )} */}

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
                              }}
                              onClick={handleAddFileClick}
                            >
                              Add File
                            </button>
                          )}

                        {isAddingFile && (
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
                                        index
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
                            multiple // Allow multiple file selection
                            onChange={(e) =>
                              handleFileChange(
                                "supplemental_attachment_2021",
                                e
                              )
                            }
                          />
                        )}

                        {/* {userData?.driving_licence && userData?.driving_licence.length > 0 && (
            <button >Add File</button>
          )} */}

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
                              }}
                              onClick={handleAddFileClick}
                            >
                              Add File
                            </button>
                          )}

                        {isAddingFile && (
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
                                    openFileInNewTab("FormA1099", index)
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
                            multiple // Allow multiple file selection
                            onChange={(e) => handleFileChange("FormA1099", e)}
                          />
                        )}

                        {/* {userData?.driving_licence && userData?.driving_licence.length > 0 && (
            <button >Add File</button>
          )} */}

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
                              }}
                              onClick={handleAddFileClick}
                            >
                              Add File
                            </button>
                          )}

                        {isAddingFile && (
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
                                    openFileInNewTab("FormB1099", index)
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
                            multiple // Allow multiple file selection
                            onChange={(e) => handleFileChange("FormB1099", e)}
                          />
                        )}

                        {/* {userData?.driving_licence && userData?.driving_licence.length > 0 && (
            <button >Add File</button>
          )} */}

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
                              }}
                              onClick={handleAddFileClick}
                            >
                              Add File
                            </button>
                          )}

                        {isAddingFile && (
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
                                    openFileInNewTab("ks2020", index)
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
                            multiple // Allow multiple file selection
                            onChange={(e) => handleFileChange("ks2020", e)}
                          />
                        )}

                        {/* {userData?.driving_licence && userData?.driving_licence.length > 0 && (
            <button >Add File</button>
          )} */}

                        {userData?.ks2020 && userData?.ks2020.length > 0 && (
                          <button
                            style={{
                              marginTop: "20px",
                              borderRadius: "6px",
                              border: "1px solid transparent",
                              fontWeight: "bold",
                              color: "white",
                              background: "#3c4d77",
                            }}
                            onClick={handleAddFileClick}
                          >
                            Add File
                          </button>
                        )}

                        {isAddingFile && (
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
                                    openFileInNewTab("ks22020", index)
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
                            multiple // Allow multiple file selection
                            onChange={(e) => handleFileChange("ks22020", e)}
                          />
                        )}

                        {/* {userData?.driving_licence && userData?.driving_licence.length > 0 && (
            <button >Add File</button>
          )} */}

                        {userData?.ks22020 && userData?.ks22020.length > 0 && (
                          <button
                            style={{
                              marginTop: "20px",
                              borderRadius: "6px",
                              border: "1px solid transparent",
                              fontWeight: "bold",
                              color: "white",
                              background: "#3c4d77",
                            }}
                            onClick={handleAddFileClick}
                          >
                            Add File
                          </button>
                        )}

                        {isAddingFile && (
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
                      href=""
                      data-bs-toggle="modal"
                      data-bs-target="#term_condition"
                    >
                      {" "}
                      terms & conditions
                    </a>
                    , and also agree to keep documentation on file that
                    substantiates claims made in this application.
                  </p>
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
                          <h5 className="modal-title" id="exampleModalLabel"></h5>

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
                            <span className="text-success">Congratultion</span> Your
                            application has been submitted!{" "}
                          </h5>
                          <h5 className="text-center">
                            Our team will get back to you in 24-72 hours. Thank
                            you.
                          </h5>

                          <a href="#" className="btn btn-primary px-5 go-on-btn">
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
                          <h5 className="modal-title" id="exampleModalLabel"></h5>

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
                          <a href="#" className="btn btn-primary px-5 go-on-btn2">
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
      borderTopWidth: 5,
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
              <Check style={{ fontWeight: "bold" }} />
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
      borderTopWidth: 5,
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
      "& span": {
        color: isIndex7 ? "#00b6ff" : "white", // Change color of step number
      },
    })
  );

  return (
    <Box
      sx={{
        width: "100%",
        marginTop: 10,
        backgroundImage:
          " linear-gradient(direction, color-stop1, color-stop2)",
      }}
    >
      {activeStep !== 0 && activeStep !== 1 && (
        <>
          {activeStep <= 8 && (
            <Stepper
              className="first-stepper container"
              activeStep={activeStep}
              alternativeLabel
              connector={<QontoConnector />}
            >
              {activeStep <= 8 &&
                steps1.map((label) => (
                  <Step key={label}>
                    {/* <StepLabel
              sx={{
                '& .MuiStepLabel-label': {
                  color: activeStep === index ? 'green' : 'gray', // Change label color based on active step
                },
              }}
            >
              {label}
            </StepLabel> */}
                    <StepLabel
                      sx={{
                        "& .MuiStepLabel-label.Mui-completed": {
                          color: "#00b6ff", // Change label color based on active step
                          fontWeight: "300",
                        },
                        "& .MuiStepLabel-label.Mui-active": {
                          color: "#00b6ff", // Change label color based on active step
                          fontWeight: "300",
                        },
                        "& .MuiStepLabel-label": {
                          color: "gray", // Change label color based on active step
                          fontWeight: "300",
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
        </>
      )}
      {activeStep > 8 && activeStep !== 19 && (
        <Stepper
          className="container secondStepper" style={{width: '40px !important'}}
          activeStep={activeStep - 9}
          alternativeLabel
          connector={<QontoConnector />}
        >
          {steps2.map((label, index) => (
            <Step key={label}>
              {/* <StepLabel
             sx={{
               '& .MuiStepLabel-label': {
                 color: activeStep === index ? 'green' : 'gray', // Change label color based on active step
               },
             }}
           >
             {label}
           </StepLabel> */}
              <StepLabel
                sx={{
                  "& .MuiStepLabel-label.Mui-completed": {
                    color: "#00b6ff", // Change label color based on active step
                    fontWeight: "300",
                  },
                  "& .MuiStepLabel-label.Mui-active": {
                    color: "#00b6ff", // Change label color based on active step
                    fontWeight: "300",
                  },
                  "& .MuiStepLabel-label": {
                    color: "gray", // Change label color based on active step
                    fontWeight: "300",
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
      {activeStep === 19 && (
        <Stepper
          className="nineteenStepper container"
          activeStep={1}
          alternativeLabel
          connector={<CustomConnector />}
        >
          {steps19.map((label, index) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  // '& .MuiStepLabel-label': {
                  //   color: index === 7 ? 'gray' : '#00b6ff', // Change label color based on active step
                  //   fontWeight: '300'
                  // },
                  "& .MuiStepLabel-alternativeLabel": {
                    color:
                      index === 7 ? "gray !important" : "#00b6ff !important", // Change label color based on active step
                    fontWeight: "300",
                  },
                }}
                StepIconComponent={(props) => (
                  <CustomStepIcon
                    {...props}
                    completed={index < 1}
                    active={index === 1}
                    isIndex7={index === 7} // Change based on the current active step
                  >
                    {index < 1 ? (
                      <Check style={{ color: "white" }} />
                    ) : (
                      <span>{index + 1}</span>
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
                <span className="text-success">Great</span>, your application has
                been submitted. We will send you a personal upload link for your
                documents.
              </h5>

              <button
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-primary"
                id="confirmSubmitButton1"
              >
                Go on
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
                style={{ marginTop: 8 }}
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-primary"
                id="confirmSubmitButton1"
              >
                Go on
              </button>
            </div>
          </div>
        </>
      )}
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        {/* <Button
          color="inherit"
          disabled={activeStep === 0} 
          onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}
          
          
          
          
          sx={{ mr: 1 }}
        >
          Back
        </Button> */}
        <Box sx={{ flex: "1 1 auto" }} />
        {/* <Button onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button> */}
      </Box>
    </Box>
  );
};

export default MultiStepForm;
