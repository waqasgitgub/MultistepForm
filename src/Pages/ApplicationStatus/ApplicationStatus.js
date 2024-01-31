import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import LinearProgress from "@mui/material/LinearProgress";
import "./ApplicationStatus.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { useState, useEffect } from "react";
import {
  Check,
  CheckCircle,
  Clear,
  DoneOutline,
  PictureAsPdfSharp,
  TaskAlt,
} from "@mui/icons-material";
import axios from "axios";
import FileInputComponent from "../../Components/FileInputComponent";
import LoadingScreen from "../../Components/LoadingScreen";
import { Modal } from "@mui/material";
import { setUserDetails } from "../../Redux/Slices/userSlice";
import { useDispatch } from "react-redux";

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
export default function ApplicationStatus({}) {

  const dispatch = useDispatch();
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);


  const [openModalDate, setOpenModalDate] = useState(false);

  const [userData, setUserData] = useState();
  const [uploadingFile, setUploadingFile] = useState("");
  const [activeTab, setActiveTab] = useState("status_tab"); // Default to 'status_tab' or last selected tab
  const [addingFileType, setAddingFileType] = useState(null);
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

  const handleAddFileClick = (type) => {
    setAddingFileType(type);
  };

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


  //for close payment modal
  const handleCloseModal = () => {
  
    setActiveTab("final_calculation");
    setOpenModalDate(false);
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

  const handleRemoveInput = () => {
    setAddingFileType(null); // Reset the addingFileType state
  };

  const fetchUserDataa = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        setLoading(true); // Hide the loader when the request is completed (either success or failure)

        const response = await fetch("http://localhost:5000/user/getUser", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const userData = await response.json(); // Use await to wait for the JSON parsing
          setUserData(userData);
        } else {
          console.error("Error fetching user data");
        }
      } catch (error) {
        console.error("Network error", error);
      } finally {
        setLoading(false); // Hide the loader when the request is completed (either success or failure)
      }
    }
  };

  const uploadFile = async (formData, inputName) => {
    const token = localStorage.getItem("token");
    if (formData) {
      // alert("Verify that the delete button disappears after 30 seconds of uploading the file.");

      try {
        setUploadingFile(inputName);
        formData.append("step", 10);
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
        let lastFileName = "";

        // if (inputName === "driving_licence") {
        //   const lastDrivingLicenceIndex =
        //     response.data.user.driving_licence_name.length - 1;
        //   lastFileName =
        //     response.data.user.driving_licence_name[lastDrivingLicenceIndex];
        // } else
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
   

  const apiUrl = "http://localhost:5000/user/sendfiletosawabi";

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

  // const shareFileOnFileDotCom = (inputName, fileName) => {
  //   console.log(`Input Name: ${inputName}, File Name: ${fileName}`);
  //   // Call your API function here
  //   // Example: apiFunction(inputName, fileName);
  // };
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

  const checkAndUpdateRemoveButtonVisibility = () => {
    const updatedUploadTimes = { ...uploadCompleteTimes };

    Object.keys(uploadCompleteTimes).forEach((inputName) => {
      const fileName = uploadCompleteTimes[inputName];
      if (fileName && isThirtySecondsPassed(fileName)) {
        updatedUploadTimes[inputName] = null; // Reset the upload time
      }
    });
    setUploadCompleteTimes(updatedUploadTimes);
  };

  // Use useEffect to periodically check and update the remove button visibility
  useEffect(() => {
    const intervalId = setInterval(checkAndUpdateRemoveButtonVisibility, 1000); // Check every second

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [uploadCompleteTimes]);

  const getProgressPercentage = () => {
    return ((activeStep + 1) / steps.length) * 100; // Calculate progress percentage
  };

  // const openFileInNewTab = (fileKey, index, originalFileName) => {
  //   // if (fileKey && userData) {
  //   //   const fileUrls = userData[fileKey]; // Array of file URLs
  //   //   if (fileUrls && fileUrls[index]) {
  //   //     window.open(`https://agree.setczone.com${fileUrls[index]}`, "_blank");
  //   //   } else {
  //   //     console.error("File URL not found for the provided index");
  //   //   }
  //   // } else {
  //   //   console.error("Invalid fileKey or userData is missing");
  //   // }
  //   if (fileKey && userData && originalFileName) {
  //     window.open(`http://localhost:5000/${originalFileName}`, "_blank");
  //   } else {
  //     console.error("File URL not found for the provided index");
  //   }
  // };

  const openFileInNewTab = async (fileKey, index, originalFileName) => {
     
    // Split the original file name using the backslash as the separator
    const parts = originalFileName.split('\\');
     
    // Get the last part of the resulting array, which is the filename
    const filenameView = parts[parts.length - 1];


    if (filenameView.includes("pdf_file_changeable")) {
      const directUrl = `https://beta.ccalerc.com/storage/app/pdfs/${filenameView}`;
      window.open(directUrl, "_blank");
      return;
  }

  const apiUrl = "http://localhost:5000/user/generateUrlwasabi";

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
    const token = localStorage.getItem("token");

    if (!token || !fileKey) {
      console.error("Token and fileKey are required.");
      return;
    }

    if (fileKey && userData) {
      const fileUrls = userData[fileKey];

      if (fileUrls && fileUrls[index]) {
        alert("Are you sure to remove file");

        try {
          const url = "http://localhost:5000/user/deleteFile";
          const payload = {
            // fieldName: fileKey,
            // fileName: fileUrls[index],
            // originalFieldName: `${fileKey}_name`,
            // originalName: originalFileName,
            fieldName: `${fileKey}_name`,
            fileName: originalFileName,
            originalFieldName: fileKey,
            originalName: fileUrls[index],
          };

          const response = await fetch(url, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (response.ok) {
            removeFileVasabi(originalFileName);
            // await deleteFilesComFile(fileKey);
            await fetchUserDataa();

            setSelectedFiles((prevSelectedFiles) => {
              const updatedFiles = { ...prevSelectedFiles };
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
      
    

    const apiUrl = "http://localhost:5000/user/deleteFilesawabi";
  
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

  const downloadLink = async (index) => {

    try {
        // setLoading(true);

        const apiUrl = "http://localhost:5000/user/downloadfile";
        let fileNamee = index;

        if (Array.isArray(fileNamee)) {
            fileNamee = fileNamee[0];
        }

        const paylaod = {
            email: userData?.email,
            fileName: fileNamee
        };

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(paylaod),
        });

        if (!response.ok) {
            throw new Error("API request failed");
        }

        const data = await response.json();
        console.log("API response downlaod file:", data);

        // Create a link element
        const downloadLink = document.createElement("a");
        downloadLink.href = data.download_uri;
        downloadLink.target = "_blank"; // Open in a new tab/window
        downloadLink.download = data.display_name; // Specify the filename for download

        // Append the link to the body
        document.body.appendChild(downloadLink);

        // Trigger a click event on the link to initiate the download
        downloadLink.click();

        // Remove the link from the DOM
        document.body.removeChild(downloadLink);
    } catch (error) {
        alert("Something went wrong...");
        console.error("Error calling API:", error.message);
    } 
    // finally {
    //     // setLoading(false);
    // }
};


const deleteFilesComFile = async (fileKey) => {
  try {
    setLoading(true);

    const apiUrl = "http://localhost:5000/user/deletefilecom";
    // let fileNamee = index;

    // if (Array.isArray(fileNamee)) {
    //     fileNamee = fileNamee[0];
    // }

    const paylaod = {
        email: userData?.email,
        fileName: fileKey
    };

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(paylaod),
    });

    if (!response.ok) {
        throw new Error("API request failed");
    }

    const data = await response.json();
    console.log("API response downlaod file:", data);

   
} catch (error) {
    alert("Something went wrong...");
    console.error("Error calling API:", error.message);
} finally {
    setLoading(false);
}
}

  const [steps, setSteps] = useState([
    {
      title: "Application Started",
      description: "",
      isCompleted: true,
    },
    {
      title: "Documents Uploaded",
      isCompleted: false,
    },
    {
      title: "Application in Process",
      description: "",
      isCompleted: false,
    },
    {
      title: "Calculation Completed, Review Agreement & Payment Option",
      isCompleted: false,
    },
    // {
    //   title: "Sign Agreement and Remit Payment",
    //   isCompleted: false,
    // },
    // {
    //   title: "Filed SETC with the IRS",
    //   isCompleted: false,
    // },
    {
      title: "Awaiting SETC Payment (12-20 weeks)",
      description: "",
      isCompleted: false,
    },
  ]);

  // useEffect(() => {
  //   const storedTab = localStorage.getItem('activeTab');
  //   if (storedTab) {
  //     setActiveTab(storedTab);
  //   }
  // }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    localStorage.setItem("activeTab", tabId);
  };

  const handleStrip = async (e) => {
    e.preventDefault();

    // // Check if 'docuSign' status is completed in local storage
    // const docuSignStatus = localStorage.getItem('docuSign');

    if (userData?.strip_inprocess == "true") {
      // If 'docuSign' is completed, navigate to /strip
      // window.location.href = "/strip";
      history.push("/strip");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      setLoading(true);

      const apiUrl = "http://localhost:5000/user/digisign";

      const formData = {
        name: userData?.first_name,
        email: userData?.email,
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      console.log("API response:", data);
      const url = data.result.url;

      // // Store success status in local storage
      // localStorage.setItem('docuSign', 'completed');

      // Redirect to the received URL
      window.location.href = url;
      // history.push("/strip");


      // You can perform further actions with the API response here
    } catch (error) {
      alert("Something went wrong...");
      console.error("Error calling API:", error.message);
    }finally {
      setLoading(false); // Hide the loader when the request is completed (either success or failure)
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
  
        const token = localStorage.getItem("token");
  
        if (token) {
          const response = await fetch("http://localhost:5000/user/getUser", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (response.ok) {


            const isModalAlreadyOpened = localStorage.getItem("isModalOpened");
            const userData = await response.json();
            // dispatch(setUserDetails({ firstName: userData?.first_name, lastName: userData?.last_name }));

            if (userData?.strip_payment !== null && !isModalAlreadyOpened) {
              setOpenModalDate(true);
              localStorage.setItem("isModalOpened", "true");
            } else {
              setOpenModalDate(false);
              // localStorage.removeItem("isModalOpened")
            }
  
            setUserData(userData);
  
            const currentStep = userData.step || 0;
            setActiveStep(currentStep);
  
            setSelectedFiles((prevSelectedFiles) => ({
              ...prevSelectedFiles,
              schedule_pdf: userData?.schedule_pdf,
              Tax_Return_2020: userData?.Tax_Return_2020,
              Tax_Return_2021: userData?.Tax_Return_2021,
              supplemental_attachment_2020: userData?.supplemental_attachment_2020,
              supplemental_attachment_2021: userData?.supplemental_attachment_2021,
              FormA1099: userData?.FormA1099,
              FormB1099: userData?.FormB1099,
              ks2020: userData?.ks2020,
              ks22020: userData?.ks22020,
            }));
          } else {
            console.error("Error fetching user data:", response.status, response.statusText);
          }
        } else {
          console.error("Token not found");
        }
      } catch (error) {
        console.error("Network error:", error);
      } finally {
        setLoading(false); // Hide the loader when the request is completed (either success or failure)
      }
    };
  
    fetchUserData();
  }, []);  // Empty dependency array means this effect runs once after the initial render
  

  const updateDocumentUploadedStatus = () => {
    let isCompleted = false;
    // let title = userData?.is_docs_verify !== 'not verified' ? "Documents Uploaded" : "Documents Uploading";
     let title = "Documents Uploaded";
    if (userData?.Family_Sick_Leave === "Yes") {
      if (allFilesSelectedAdditional()) {
        isCompleted = true;
      }
    } else {
      if (allFilesSelected()) {
        isCompleted = true;
      }
    }
  
    // Update 'isCompleted' status and dynamic 'title'
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.title === "Documents Uploaded" ? { ...step, isCompleted, title } : step
      )
    );

    // Alert lengths
    console.log("All Files Selected Length:", {
      allFilesSelected: {
        // driving_licence: selectedFiles?.driving_licence?.length,
        schedule_pdf: selectedFiles?.schedule_pdf?.length,
        Tax_Return_2020: selectedFiles?.Tax_Return_2020?.length,
        Tax_Return_2021: selectedFiles?.Tax_Return_2021?.length,
      },
      allFilesSelectedAdditional: {
        // Add other file lengths here...
      },
    });
  };

  useEffect(() => {
    updateDocumentUploadedStatus();
    // Alert lengths after updateDocumentUploadedStatus
  }, [userData, selectedFiles]);


//   useEffect(() => {
//     // Check if userData.payment is not empty 

    // // if (userData?.strip_payment && userData?.strip_payment !== null) {
    //   if (userData?.first_name && userData?.first_name !== null) {
    //     alert("hi waqas")
    //     console.log("hi waqas")
    //   setOpenModalDate(true);
    // } else {
    //   setOpenModalDate(false);
    // }
//   // }, [userData.payment]); 
// }, [userData?.first_name]); 
  return (
    <div>

      <Navbar />
      {loading && <LoadingScreen />}

      <div class="status-page">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-7 px-0">
              <div class="contain">
                <div class="row justify-content-center">
                  <div class="col-lg-9 col-md-12">
                    <div class="row justify-content-center">
                      <div class="col-lg-12 col-md-12">
                       
                        <ul class="nav nav-tab tabs-heading mb-4" role="tab">
                          <li class="tab-item me-4">
                            <a
                              className={`status-heading nav-link ${
                                activeTab === "status_tab" ? "active" : ""
                              }`}
                              data-bs-toggle="tab"
                              href="#status_tab"
                              style={{
                                marginTop: 5,
                                fontSize: 18,
                                textDecoration: "underline",
                              }}
                              onClick={() => handleTabChange("status_tab")}
                            >
                              Status
                            </a>
                          </li>

                          {/* <li class="tab-item me-3">
                            <a
                              className={`status-heading nav-link ${
                                activeTab === "document_tab" ? "active" : ""
                              }`}
                              data-bs-toggle="tab"
                              href="#document_tab"
                              style={{
                                fontSize: 18,
                                textDecoration: "underline",
                              }}
                              onClick={() => handleTabChange("document_tab")}
                            >
                              Documents
                            </a>
                          </li> */}
                          {userData && userData?.pre_signature_document !== null && (
                          <li class="tab-item me-3">
                            <a
                              className={`status-heading nav-link ${
                                activeTab === "esignature_tab" ? "active" : ""
                              }`}
                              data-bs-toggle="tab"
                              href="#esignature_tab"
                              style={{
                                fontSize: 18,
                                textDecoration: "underline",
                              }}
                              onClick={() => handleTabChange("esignature_tab")}
                            >
                              E-Signature
                            </a>
                          </li>
                                  )}

                    {userData && userData?.strip_payment !== null && (
                          <li class="tab-item me-3">
                            <a
                              className={`status-heading nav-link ${
                                activeTab === "final_calculation" ? "active" : ""
                              }`}
                              data-bs-toggle="tab"
                              href="#final_calculation"
                              style={{
                                fontSize: 18,
                                textDecoration: "underline",
                              }}
                              onClick={() => handleTabChange("final_calculation")}
                            >
                              Final Calculation
                            </a>
                          </li>

                          )}
                       
                        </ul>

                        <div class="tab-content mt-2">
                          <div
                            className={`tab-pane fade ${
                              activeTab === "esignature_tab"
                                ? "show active"
                                : ""
                            }`}
                            id="esignature_tab"
                          >
                            {/* <h2 class="mb-3 comp-info">E-Signature</h2> */}
                            <Typography
                              style={{
                                marginLeft: "18px",
                                color: "#98a4ae",
                                fontStyle: "italic",
                                fontSize: "14px",
                              }}
                            >
                              {" "}
                              Your Name: {userData?.first_name}{" "}
                              {userData?.last_name}
                            </Typography>
                            <Typography
                              style={{
                                marginLeft: "18px",
                                color: "#98a4ae",
                                fontStyle: "italic",
                                fontSize: "14px",
                                marginTop: 10,
                              }}
                            >
                              Your Email: {userData?.email}
                            </Typography>

                        

                            {userData?.strip_payment === null && (
                              <button
                                onClick={handleStrip}
                                className="esigbutton"
                                disabled={
                                  userData?.pre_signature_document === null
                                }
                              >
                                E-Signature
                              </button>
                            )}

                            {/* {userData?.strip_payment !== null && (
                              <div style={{ marginTop: 16 }}>
                                <a
                                  href="https://beta.ccalerc.com//public/pdfs/pdf_file_changeable_1704734452_31c95b170ba977d5bb26d7f6159d9ed0_orignal_aptly.pdf"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <PictureAsPdfSharp
                                    sx={{
                                      width: "30px",
                                      height: "30px",
                                      marginRight: "5px",
                                    }}
                                  />
                                  Download/View PDF (John's File)
                                </a>
                              </div>
                            )} */}

                          </div>
                          <div
                            className={`tab-pane fade ${
                              activeTab === "final_calculation"
                                ? "show active"
                                : ""
                            }`}
                            id="final_calculation"
                          >
                           
                            {userData?.strip_payment !== null && (
                              <div style={{ marginTop: 16 }}>
                                <a
                                  href="https://beta.ccalerc.com//public/pdfs/pdf_file_changeable_1704734452_31c95b170ba977d5bb26d7f6159d9ed0_orignal_aptly.pdf"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <PictureAsPdfSharp
                                    sx={{
                                      width: "30px",
                                      height: "30px",
                                      marginRight: "5px",
                                    }}
                                  />
                                  Download/View PDF (John's File)
                                </a>
                              </div>
                            )}

                          </div>
                          <div
                            className={`tab-pane fade ${
                              activeTab === "status_tab" ? "show active" : ""
                            }`}
                            id="status_tab"
                          >
                            <h2 class="mb-3 comp-info">Company Info</h2>

                            <div class="row justify-content-center">
                              <div class="col-lg-6">
                                <div class="mb-3">
                                  <div
                                    class="form-label-status styleTitle"
                                    style={{
                                      color: "dimgray",
                                      fontWeight: "500",
                                    }}
                                  >
                                    Name
                                  </div>
                              
                              {/* {verified_middleName !== null && ( */}
                                <div class="status-inform">
                                    {userData?.first_name} {userData?.verified_middleName} {userData?.last_name}
                                  </div>
                              {/* )} */}
                                  

                                </div>
                                <div class="mb-3">
                                  <div
                                    class="form-label-status styleTitle"
                                    style={{
                                      color: "dimgray",
                                      fontWeight: "500",
                                    }}
                                  >
                                    Phone
                                  </div>
                                  <div class="status-inform">
                                    {userData?.phone}
                                  </div>
                                </div>
                                <div class="mb-3">
                                  <div
                                    class="form-label-status styleTitle"
                                    style={{
                                      color: "dimgray",
                                      fontWeight: "500",
                                    }}
                                  >
                                    Email
                                  </div>
                                  <div class="status-inform">
                                    {userData?.email}
                                  </div>
                                </div>
                                <div class="mb-3">
                                  <div
                                    class="form-label-status styleTitle"
                                    style={{
                                      color: "dimgray",
                                      fontWeight: "500",
                                    }}
                                  >
                                    Business Legal Name
                                  </div>
                                  <div class="status-inform">
                                    {userData?.business_name}
                                  </div>
                                </div>
                                <div class="mb-3">
                                  <div
                                    class="form-label-status styleTitle"
                                    style={{
                                      color: "dimgray",
                                      fontWeight: "500",
                                    }}
                                  >
                                    Trade Name
                                  </div>
                                  <div class="status-inform">
                                    {userData?.trade_name}
                                  </div>
                                </div>
                              </div>

                              <div class="col-lg-6">
                                <div class="mb-3">
                                  <div
                                    class="form-label-status styleTitle"
                                    style={{
                                      color: "dimgray",
                                      fontWeight: "500",
                                    }}
                                  >
                                    Business Address
                                  </div>
                                  <div class="status-inform">
                                    {userData?.address_line_1}
                                  </div>
                                </div>
                                <div class="mb-3">
                                  <div
                                    class="form-label-status styleTitle"
                                    style={{
                                      color: "dimgray",
                                      fontWeight: "500",
                                    }}
                                  >
                                    City
                                  </div>
                                  <div class="status-inform">
                                    {userData?.city}
                                  </div>
                                </div>
                                <div class="mb-3">
                                  <div
                                    class="form-label-status styleTitle"
                                    style={{
                                      color: "dimgray",
                                      fontWeight: "500",
                                    }}
                                  >
                                    State
                                  </div>
                                  <div class="status-inform">
                                    {userData?.state}
                                  </div>
                                </div>
                                <div class="mb-3">
                                  <div
                                    class="form-label-status styleTitle"
                                    style={{
                                      color: "dimgray",
                                      fontWeight: "500",
                                    }}
                                  >
                                    Postel Code
                                  </div>
                                  <div class="status-inform">
                                    {userData?.zip}
                                  </div>
                                </div>
                                <div class="mb-3">
                                  <div
                                    class="form-label-status"
                                    style={{
                                      color: "dimgray",
                                      fontWeight: "500",
                                    }}
                                  >
                                    How did you hear about us?
                                  </div>
                                  <div class="status-inform">
                                    {userData?.know_about_us}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="tab-pane fade" id="activity_tab">
                            <div
                              class="table-responsive mt-3"
                              id="results-list"
                            >
                              <table class="table table-hover">
                                <thead>
                                  <tr class="table-secondary">
                                    <th>User</th>
                                    <th></th>
                                    <th></th>
                                    <th>Activity</th>
                                    <th
                                      data-sort="last_modified_at"
                                      class="datte"
                                    >
                                      <div>Date</div>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    class="cursor-pointer searchable-row align-middle activity-row text-black-90"
                                    data-modal-title="Activity"
                                    data-modal-url="/application/294083/activities/5851538"
                                  >
                                    <td>System</td>
                                    <td class="text-nowrap"></td>
                                    <td></td>
                                    <td>
                                      <div>
                                        <div>Test Mode</div>
                                        <div class="metadata">
                                          <span class="d-none">
                                            &lt;p&gt;Test Mode&lt;/p&gt;
                                            status_change Status Change public
                                          </span>
                                        </div>
                                      </div>
                                    </td>
                                    <td>14 Nov 2023 | 12:47 AM MST</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
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
                                  
                                 
                                        <>
                                          <DoneOutline
                                            style={{
                                              width: "50px",
                                              height: "50px",
                                              color: "green",
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
                                           Congratulations...
                                          </Typography>
                                          <p id="modal-description">
                                          Your payment has been submitted successfully. Now, you can download the file.
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
                                     
                                  </Box>
                                </Modal>

                          {(userData?.applicationStatus === true ||
                            userData?.applicationWithDocument === true) && (
                            <div
                              className={`tab-pane fade ${
                                activeTab === "document_tab"
                                  ? "show active"
                                  : ""
                              }`}
                              id="document_tab"
                            >
                              {/* <div class="file_div">
                                <h4>
                                  A PDF Copy of a Current ID or Driver's License
                                </h4>

                                {userData?.driving_licence &&
                                userData?.driving_licence.length > 0 ? (
                                  userData.driving_licence.map(
                                    (file, index) => {
                                      const fileName =
                                        userData.driving_licence_name[index];
                                      const shouldHideRemoveButton =
                                        isThirtySecondsPassed(fileName);
                                      return (
                                        <div key={index} className="containerr">
                                          <div className="itemm">
                                            <TaskAlt />
                                            <span className="namee">
                                              {
                                                userData.driving_licence_name[
                                                  index
                                                ]
                                              }
                                            </span>
                                          </div>
                                          <div
                                            className="itemm"
                                            style={{
                                              padding: "0px 20px !important",
                                            }}
                                          >
                                            <div
                                              onClick={() =>
                                                openFileInNewTab(
                                                  "driving_licence",
                                                  index,
                                                  userData.driving_licence_name[
                                                    index
                                                  ]
                                                )
                                              }
                                              className="buttonn"
                                            >
                                              View
                                            </div>
                                            {!shouldHideRemoveButton && (
                                              <div
                                                onClick={() =>
                                                  removeFile(
                                                    "driving_licence",
                                                    index,
                                                    userData
                                                      .driving_licence_name[
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
                                      );
                                    }
                                  )
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
                                    onChange={(e) =>
                                      handleFileChange("driving_licence", e)
                                    }
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
                                      onClick={() =>
                                        handleAddFileClick("driving_licence")
                                      }
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

                              <div class="file_div">
                                <h4>
                                  A PDF Copy of your 2019 Form 1040 (Tax
                                  Return), including ALL schedules, if the 2019
                                  Self-Employed Income is higher than 2020. We
                                  would prefer one PDF file.
                                </h4>

                                {userData?.schedule_pdf &&
                                userData?.schedule_pdf.length > 0 ? (
                                  userData.schedule_pdf.map((file, index) => {
                                    const fileName =
                                      userData.schedule_pdf_name[index];
                                    const shouldHideRemoveButton =
                                      isThirtySecondsPassed(fileName);
                                    return (
                                      <div key={index} className="containerr">
                                        <div className="itemm">
                                          <TaskAlt />
                                          <span className="namee">
                                            {userData.schedule_pdf[index]}
                                          </span>
                                        </div>
                                        <div
                                          className="itemm"
                                          style={{
                                            padding: "0px 20px !important",
                                          }}
                                        >
                                          <div
                                            onClick={() =>
                                              openFileInNewTab(
                                                "schedule_pdf",
                                                index,
                                                userData.schedule_pdf_name[
                                                  index
                                                ]
                                              )
                                            }
                                            className="buttonn"
                                          >
                                            View
                                          </div>
                                         {!shouldHideRemoveButton && ( 
                                            <div
                                              onClick={() =>
                                                removeFile(
                                                  "schedule_pdf",
                                                  index,
                                                  userData.schedule_pdf_name[
                                                    index
                                                  ]
                                                )
                                              }
                                              className="buttonn"
                                            >
                                              Remove
                                            </div>
                                           )} 
                                                {/* <div
                                               onClick={() => downloadLink(userData.schedule_pdf)}
                                              className="buttonn"
                                            >
                                              Download
                                            </div> */}
                                          
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
                                    onChange={(e) =>
                                      handleFileChange("schedule_pdf", e)
                                    }
                                  />
                                )}

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
                                      onClick={() =>
                                        handleAddFileClick("schedule_pdf")
                                      }
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

                              <div class="file_div">
                                <h4>
                                  A PDF Copy of your 2020 Form 1040 (Tax
                                  Return), including ALL schedules.
                                </h4>

                                {userData?.Tax_Return_2020 &&
                                userData?.Tax_Return_2020.length > 0 ? (
                                  userData.Tax_Return_2020.map(
                                    (file, index) => {
                                      const fileName =
                                        userData.Tax_Return_2020_name[index];
                                      const shouldHideRemoveButton =
                                        isThirtySecondsPassed(fileName);
                                      return (
                                        <div key={index} className="containerr">
                                          <div className="itemm">
                                            <TaskAlt />
                                            <span className="namee">
                                              {
                                                userData.Tax_Return_2020[
                                                  index
                                                ]
                                              }
                                            </span>
                                          </div>
                                          <div
                                            className="itemm"
                                            style={{
                                              padding: "0px 20px !important",
                                            }}
                                          >
                                            <div
                                              onClick={() =>
                                                openFileInNewTab(
                                                  "Tax_Return_2020",
                                                  index,
                                                  userData.Tax_Return_2020_name[
                                                    index
                                                  ]
                                                )
                                              }
                                              className="buttonn"
                                            >
                                              View
                                            </div>
                                            {!shouldHideRemoveButton && (
                                              <div
                                                onClick={() =>
                                                  removeFile(
                                                    "Tax_Return_2020",
                                                    index,
                                                    userData
                                                      .Tax_Return_2020_name[
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
                                      );
                                    }
                                  )
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
                                    onChange={(e) =>
                                      handleFileChange("Tax_Return_2020", e)
                                    }
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
                                      onClick={() =>
                                        handleAddFileClick("Tax_Return_2020")
                                      }
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

                              <div class="file_div">
                                <h4>
                                  A PDF Copy of your 2021 Form 1040 (Tax
                                  Return), including ALL schedules.
                                </h4>

                                {userData?.Tax_Return_2021 &&
                                userData?.Tax_Return_2021.length > 0 ? (
                                  userData.Tax_Return_2021.map(
                                    (file, index) => {
                                      const fileName =
                                        userData.Tax_Return_2021_name[index];
                                      const shouldHideRemoveButton =
                                        isThirtySecondsPassed(fileName);

                                      return (
                                        <div key={index} className="containerr">
                                          <div className="itemm">
                                            <TaskAlt />
                                            <span className="namee">
                                              {
                                                userData.Tax_Return_2021[
                                                  index
                                                ]
                                              }
                                            </span>
                                          </div>
                                          <div
                                            className="itemm"
                                            style={{
                                              padding: "0px 20px !important",
                                            }}
                                          >
                                            <div
                                              onClick={() =>
                                                openFileInNewTab(
                                                  "Tax_Return_2021",
                                                  index,
                                                  userData.Tax_Return_2021_name[
                                                    index
                                                  ]
                                                )
                                              }
                                              className="buttonn"
                                            >
                                              View
                                            </div>
                                            {!shouldHideRemoveButton && (
                                              <div
                                                onClick={() =>
                                                  removeFile(
                                                    "Tax_Return_2021",
                                                    index,
                                                    userData
                                                      .Tax_Return_2021_name[
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
                                      );
                                    }
                                  )
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
                                    onChange={(e) =>
                                      handleFileChange("Tax_Return_2021", e)
                                    }
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
                                      onClick={() =>
                                        handleAddFileClick("Tax_Return_2021")
                                      }
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

                              {userData.Family_Sick_Leave === "Yes" &&
                                userData.employed_as_W2 === "Yes" && (
                                  <>
                                    <div class="file_div">
                                      <h4>
                                        PDF Copy of All your 2020 Form W-2(s),
                                        including ANY Family First Coronavirus
                                        Response Act (FFCRA) supplemental
                                        attachment(s).*
                                      </h4>

                                      {userData?.supplemental_attachment_2020 &&
                                      userData?.supplemental_attachment_2020
                                        .length > 0 ? (
                                        userData.supplemental_attachment_2020.map(
                                          (file, index) => {
                                            const fileName =
                                              userData
                                                .supplemental_attachment_2020_name[
                                                index
                                              ];
                                            const shouldHideRemoveButton =
                                              isThirtySecondsPassed(fileName);
                                              return (
                                            <div
                                              key={index}
                                              className="containerr"
                                            >
                                              <div className="itemm">
                                                <TaskAlt />
                                                <span className="namee">
                                                  {
                                                    userData
                                                      .supplemental_attachment_2020[
                                                      index
                                                    ]
                                                  }
                                                  
                                                </span>
                                              </div>
                                              <div
                                                className="itemm"
                                                style={{
                                                  padding:
                                                    "0px 20px !important",
                                                }}
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
                                                {!shouldHideRemoveButton && (
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
                                              ) ;
                                          }
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
                                        userData?.supplemental_attachment_2020
                                          .length > 0 && (
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

                                      {addingFileType ===
                                        "supplemental_attachment_2020" && (
                                        <FileInputComponent
                                          inputName="supplemental_attachment_2020"
                                          onRemove={handleRemoveInput}
                                          handleFileChange={handleFileChange} // Pass the file change handler
                                        />
                                      )}

                                      {uploadingFile ===
                                        "supplemental_attachment_2020" && (
                                        <LinearProgressWithLabel
                                          value={
                                            uploadProgress.supplemental_attachment_2020
                                          }
                                        />
                                      )}
                                    </div>

                                    <div class="file_div">
                                      <h4>
                                        PDF Copy of All your 2021 Form W-2(s),
                                        including ANY Family First Coronavirus
                                        Response Act (FFCRA) supplemental
                                        attachment(s).
                                      </h4>

                                      {userData?.supplemental_attachment_2021 &&
                                      userData?.supplemental_attachment_2021
                                        .length > 0 ? (
                                        userData.supplemental_attachment_2021.map(
                                          (file, index) => {
                                            const fileName =
                                              userData
                                                .supplemental_attachment_2021_name[
                                                index
                                              ];
                                            const shouldHideRemoveButton =
                                              isThirtySecondsPassed(fileName);
                                            return (
                                              <div
                                                key={index}
                                                className="containerr"
                                              >
                                                <div className="itemm">
                                                  <TaskAlt />
                                                  <span className="namee">
                                                    {
                                                      userData
                                                        .supplemental_attachment_2021[
                                                        index
                                                      ]
                                                    }
                                                  </span>
                                                </div>
                                                <div
                                                  className="itemm"
                                                  style={{
                                                    padding:
                                                      "0px 20px !important",
                                                  }}
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
                                                  {!shouldHideRemoveButton && (
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
                                            );
                                          }
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
                                        userData?.supplemental_attachment_2021
                                          .length > 0 && (
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

                                      {addingFileType ===
                                        "supplemental_attachment_2021" && (
                                        <FileInputComponent
                                          inputName="supplemental_attachment_2021"
                                          onRemove={handleRemoveInput}
                                          handleFileChange={handleFileChange} // Pass the file change handler
                                        />
                                      )}

                                      {uploadingFile ===
                                        "supplemental_attachment_2021" && (
                                        <LinearProgressWithLabel
                                          value={
                                            uploadProgress.supplemental_attachment_2021
                                          }
                                        />
                                      )}
                                    </div>

                                    <div class="file_div">
                                      <h4>
                                        PDF Copy of All your 2020 Form
                                        1099-R(s), if any
                                      </h4>

                                      {userData?.FormA1099 &&
                                      userData?.FormA1099.length > 0 ? (
                                        userData.FormA1099.map(
                                          (file, index) => {
                                            const fileName =
                                              userData.FormA1099_name[index];
                                            const shouldHideRemoveButton =
                                              isThirtySecondsPassed(fileName);
                                            return (
                                              <div
                                                key={index}
                                                className="containerr"
                                              >
                                                <div className="itemm">
                                                  <TaskAlt />
                                                  <span className="namee">
                                                    {
                                                      userData.FormA1099[
                                                        index
                                                      ]
                                                    }
                                                  </span>
                                                </div>
                                                <div
                                                  className="itemm"
                                                  style={{
                                                    padding:
                                                      "0px 20px !important",
                                                  }}
                                                >
                                                  <div
                                                    onClick={() =>
                                                      openFileInNewTab(
                                                        "FormA1099",
                                                        index,
                                                        userData.FormA1099_name[
                                                          index
                                                        ]
                                                      )
                                                    }
                                                    className="buttonn"
                                                  >
                                                    View
                                                  </div>
                                                  {!shouldHideRemoveButton && (
                                                    <div
                                                      onClick={() =>
                                                        removeFile(
                                                          "FormA1099",
                                                          index,
                                                          userData
                                                            .FormA1099_name[
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
                                            );
                                          }
                                        )
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
                                          onChange={(e) =>
                                            handleFileChange("FormA1099", e)
                                          }
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
                                            onClick={() =>
                                              handleAddFileClick("FormA1099")
                                            }
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

                                    <div class="file_div">
                                      <h4>
                                        PDF Copy of All your 2020 K-1s, if any
                                      </h4>

                                      {userData?.FormB1099 &&
                                      userData?.FormB1099.length > 0 ? (
                                        userData.FormB1099.map(
                                          (file, index) => {
                                            const fileName =
                                              userData.FormB1099_name[index];
                                            const shouldHideRemoveButton =
                                              isThirtySecondsPassed(fileName);
                                            return (
                                              <div
                                                key={index}
                                                className="containerr"
                                              >
                                                <div className="itemm">
                                                  <TaskAlt />
                                                  <span className="namee">
                                                    {
                                                      userData.FormB1099[
                                                        index
                                                      ]
                                                    }
                                                  </span>
                                                </div>
                                                <div
                                                  className="itemm"
                                                  style={{
                                                    padding:
                                                      "0px 20px !important",
                                                  }}
                                                >
                                                  <div
                                                    onClick={() =>
                                                      openFileInNewTab(
                                                        "FormB1099",
                                                        index,
                                                        userData.FormB1099_name[
                                                          index
                                                        ]
                                                      )
                                                    }
                                                    className="buttonn"
                                                  >
                                                    View
                                                  </div>
                                                  {!shouldHideRemoveButton && (
                                                    <div
                                                      onClick={() =>
                                                        removeFile(
                                                          "FormB1099",
                                                          index,
                                                          userData
                                                            .FormB1099_name[
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
                                            );
                                          }
                                        )
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
                                          onChange={(e) =>
                                            handleFileChange("FormB1099", e)
                                          }
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
                                            onClick={() =>
                                              handleAddFileClick("FormB1099")
                                            }
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

                                    <div class="file_div">
                                      <h4>
                                        PDF Copy of All your 2020 K-1s, if any
                                      </h4>

                                      {userData?.ks2020 &&
                                      userData?.ks2020.length > 0 ? (
                                        userData.ks2020.map((file, index) => {
                                          const fileName =
                                            userData.ks2020_name[index];
                                          const shouldHideRemoveButton =
                                            isThirtySecondsPassed(fileName);
                                          return (
                                            <div
                                              key={index}
                                              className="containerr"
                                            >
                                              <div className="itemm">
                                                <TaskAlt />
                                                <span className="namee">
                                                  {userData.ks2020[index]}
                                                </span>
                                              </div>
                                              <div
                                                className="itemm"
                                                style={{
                                                  padding:
                                                    "0px 20px !important",
                                                }}
                                              >
                                                <div
                                                  onClick={() =>
                                                    openFileInNewTab(
                                                      "ks2020",
                                                      index,
                                                      userData.ks2020_name[
                                                        index
                                                      ]
                                                    )
                                                  }
                                                  className="buttonn"
                                                >
                                                  View
                                                </div>
                                                {!shouldHideRemoveButton && (
                                                  <div
                                                    onClick={() =>
                                                      removeFile(
                                                        "ks2020",
                                                        index,
                                                        userData.ks2020_name[
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
                                          );
                                        })
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
                                          onChange={(e) =>
                                            handleFileChange("ks2020", e)
                                          }
                                        />
                                      )}

                                      {userData?.ks2020 &&
                                        userData?.ks2020.length > 0 && (
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
                                              handleAddFileClick("ks2020")
                                            }
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

                                    <div class="file_div">
                                      <h4>
                                        PDF Copy of All your 2020 K-1s, if any
                                      </h4>

                                      {userData?.ks22020 &&
                                      userData?.ks22020.length > 0 ? (
                                        userData.ks22020.map((file, index) => {
                                          const fileName =
                                            userData.ks22020_name[index];
                                          const shouldHideRemoveButton =
                                            isThirtySecondsPassed(fileName);
                                          return (
                                            <div
                                              key={index}
                                              className="containerr"
                                            >
                                              <div className="itemm">
                                                <TaskAlt />
                                                <span className="namee">
                                                  {userData.ks22020[index]}
                                                </span>
                                              </div>
                                              <div
                                                className="itemm"
                                                style={{
                                                  padding:
                                                    "0px 20px !important",
                                                }}
                                              >
                                                <div
                                                  onClick={() =>
                                                    openFileInNewTab(
                                                      "ks22020",
                                                      index,
                                                      userData.ks22020_name[
                                                        index
                                                      ]
                                                    )
                                                  }
                                                  className="buttonn"
                                                >
                                                  View
                                                </div>
                                                {!shouldHideRemoveButton && (
                                                  <div
                                                    onClick={() =>
                                                      removeFile(
                                                        "ks22020",
                                                        index,
                                                        userData.ks22020_name[
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
                                          );
                                        })
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
                                          onChange={(e) =>
                                            handleFileChange("ks22020", e)
                                          }
                                        />
                                      )}

                                      {userData?.ks22020 &&
                                        userData?.ks22020.length > 0 && (
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
                                              handleAddFileClick("ks22020")
                                            }
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
                                  </>
                                )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="col-lg-5 px-0"
              style={{ backgroundColor: "#1a2c57", paddingBottom: "1.5rem" }}
            >
              <div
                class="status-progress"
                style={{ margin: 0, marginTop: "28px" }}
              >
                {steps.map((step, index) => (
                  <Timeline>
                    <TimelineItem key={index}>
                      <TimelineSeparator>

                        <Check
                          style={{
                            width: "35px",
                            height: "35px",
                            padding: 5,
                            backgroundColor:
                            step.isCompleted  ||
                            (userData && userData?.is_docs_verify !== 'not verified' && step.title === "Documents Uploaded") ||
                              (userData && userData?.strip_payment !== null &&
                                step.title === "Calculation Completed, Review Agreement & Payment Option") ||
                              (userData && userData?.isProcess === true &&
                                step.title === "Application in Process")
                                ? "rgb(1, 179, 228)"
                                : "white",
                            borderRadius: "35px",
                            color: "white",
                          }}
                        />

                        {index !== steps.length - 1 && (
                          <TimelineConnector
                            style={{
                              minHeight: "80px",
                              minWidth: "6px",
                              background:
                              step.isCompleted  ||
                              (userData && userData?.is_docs_verify !== 'not verified' && step.title === "Documents Uploaded") ||
                                (userData && userData?.strip_payment !== null &&
                                  step.title === "Calculation Completed, Review Agreement & Payment Option") ||
                                (userData && userData?.isProcess === true &&
                                  step.title === "Application in Process")
                                  ? "rgb(1, 179, 228)"
                                  : "white",
                            }}
                          />
                        )}
                      </TimelineSeparator>
                      <TimelineContent>
                        <h4
                          style={{
                            color:
                              step.isCompleted  || 
                              (userData && userData?.is_docs_verify !== 'not verified' && step.title === "Documents Uploaded") ||
                             
                              (userData && userData?.strip_payment !== null &&
                                step.title === "Calculation Completed, Review Agreement & Payment Option") ||
                              (userData && userData?.isProcess === true &&
                                step.title === "Application in Process")
                                ? "rgb(1, 179, 228)"
                                : "white",
                          }}
                        >
                          {/* {step.title === "Documents Uploaded" ? 
            (userData && userData?.is_docs_verify !== 'not verified' ? "Documents Uploaded" : "Documents Uploading") :
            step.title
          }         */}
                            {
                              step.title
                            }
                        </h4>
                        {step.description && <p>{step.description}</p>}
                      </TimelineContent>
                    </TimelineItem>
                  </Timeline>
                ))}

            {/* {steps.map((step, index) => (
              <Timeline key={index}>
                <TimelineItem>
                  <TimelineSeparator>
                    <Check
                      style={{
                        width: "35px",
                        height: "35px",
                        padding: 5,
                        backgroundColor: step.isCompleted ? "rgb(1, 179, 228)" : "white",
                        borderRadius: "35px",
                        color: "white",
                      }}
                    />
                    {index !== steps.length - 1 && (
                      <TimelineConnector
                        style={{
                          minHeight: "80px",
                          minWidth: "6px",
                          background: step.isCompleted ? "rgb(1, 179, 228)" : "white",
                        }}
                      />
                    )}
                  </TimelineSeparator>
                  <TimelineContent>
                  <h4
          style={{
            color: step.isCompleted ? "rgb(1, 179, 228)" : "white",
          }}
        >
          {step.title === "Documents Uploaded" ? 
            (userData?.is_docs_verify !== 'not verified' ? "Documents Uploaded" : "Documents Uploading") :
            step.title
          }
        </h4>
                    {step.description && <p>{step.description}</p>}
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
            ))} */}

              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
