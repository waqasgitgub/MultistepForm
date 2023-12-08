// // import React from 'react';
// // import Navbar from '../../Components/Navbar/Navbar';
// // import Footer from '../../Components/Footer/Footer';

// // const ApplicationStatus = () => {
// //   return (
// //     <div>
// //        <Navbar/>
// //      <h1 style={{textAlign: 'center', marginTop: 200}}>Status ...</h1>
// //      {/* <Footer/> */}
// //     </div>
// //   )
// // }

// // export default ApplicationStatus

import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import LinearProgress from "@mui/material/LinearProgress";
import './ApplicationStatus.css';

import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { useState, useEffect } from 'react';
import { TaskAlt } from '@mui/icons-material';
import axios from 'axios';
import FileInputComponent from '../../Components/FileInputComponent';


function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 5,
   }}>
      <Box sx={{ width: '100%',  
    }}>
        <LinearProgress sx={{height: '10px', borderRadius: "6px"}} variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography style={{fontWeight: 600}} variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
export default function ApplicationStatus({  }) {

  const [activeStep, setActiveStep] = useState(0);
  const [userData, setUserData] = useState();
  const [uploadingFile, setUploadingFile] = useState('');

  const [activeTab, setActiveTab] = useState('status_tab'); // Default to 'status_tab' or last selected tab
  
  const [isAddingFile, setIsAddingFile] = useState(false);
  
  const [showRemoveButton, setShowRemoveButton] = useState(true);


  
  const handleAddFileClick = () => {
    setIsAddingFile(true); // Set the state to allow adding more files
  };


  const [selectedFiles, setSelectedFiles] = useState({
    driving_licence: [],
    schedule_pdf: [],
    // Tax_Return_2020: [],
    // Tax_Return_2021: [],
    // supplemental_attachment_2020: [],
    // supplemental_attachment_2021: [],
    // FormA1099: [],
    // FormB1099: [],
    // ks2020: [],
    // ks22020: []
     
  });

  const allFilesSelected = () => {
    return (
      selectedFiles?.driving_licence.length > 0
    );
  };

  const allFilesSelectedAdditional = () => {
    return (
      selectedFiles?.driving_licence.length > 0
    );
  };

  const [uploadProgress, setUploadProgress] = useState({
    driving_licence: 0,
    // schedule_pdf: 0,
    // Tax_Return_2020: 0,
    // Tax_Return_2021: 0,
    // supplemental_attachment_2020: 0,
    // supplemental_attachment_2021: 0,
    // FormA1099: 0,
    // FormB1099: 0,
    // ks2020: 0,
    // ks22020: 0
  });


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
    setIsAddingFile(false);
  };
  

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

  const uploadFile = async (formData, inputName) => {
    const token = localStorage.getItem("token");
    
    if (formData) {
      try {
        setUploadingFile(inputName);
        formData.append('step', 10);
  
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress((prevProgress) => ({
              ...prevProgress,
              [inputName]: percentCompleted,
            }));
          },
        };
  
        const response = await axios.put('http://localhost:5000/user/multiple-form-data', formData, config);
  
        console.log(`File uploaded successfully`, response.data.user);
        await fetchUserDataa();

   
        setIsAddingFile(false)
       


      } catch (error) {
        console.error(`Error uploading file:`, error);
      } finally {
        setUploadingFile('');
        setUploadProgress((prevProgress) => ({
          ...prevProgress,
          [inputName]: 0,
        }));
      }
    }
  };
  
 

  const getProgressPercentage = () => {
    return ((activeStep + 1) / steps.length) * 100; // Calculate progress percentage
  };

  
  const openFileInNewTab = (fileKey, index) => {
    // alert(selectedFiles?.driving_licence.length)
    if (fileKey && userData) {
      const fileUrls = userData[fileKey]; // Array of file URLs
      if (fileUrls && fileUrls[index]) {
        window.open(`http://localhost:5000/${fileUrls[index]}`, '_blank');
      } else {
        console.error('File URL not found for the provided index');
      }
    } else {
      console.error('Invalid fileKey or userData is missing');
    }
  };
  

  const removeFile = async (fileKey) => {
   

    // const token = localStorage.getItem("token");

    // // Check if both token and fileKey are present
    // if (!token || !fileKey) {
    //     console.error('Token and fileKey are required.');
    //     return;
    // }

    // try {
    //     const url = 'http://localhost:5000/user/remove-file';
    //     const payload = {
    //         fieldToDelete: fileKey
    //     };

    //     const response = await fetch(url, {
    //         method: 'DELETE', // Change the method to DELETE
    //         headers: { 
    //             Authorization: `Bearer ${token}`, // Add the token to the headers
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(payload)
    //     });

    //     if (response.ok) {
    //         // Call fetchData() upon successful response
    //         await fetchUserDataa();

    //         setSelectedFiles((prevSelectedFiles) => ({
    //           ...prevSelectedFiles,
    //           [fileKey]: null, 
    //         }));
           
    //         console.log('File removed successfully.');
    //     } else {
    //         console.error('Failed to remove file.');
    //     }
    // } catch (error) {
    //     console.error('Error removing file:', error);
    // }
};
  
  const [steps, setSteps] = useState([
    {
      title: 'Application Started',
      description: 'Started 30 Nov.',
      isCompleted: true
    },
    {
      title: 'Documents Uploaded',
      isCompleted: false,
    },
    {
      title: 'Application in Process',
      description: '2-3 Days',
      isCompleted: false
    },
    {
      title: 'Review Calculation',
      isCompleted: false
    },
    {
      title: 'Sign Agreement and Remit Payment',
      isCompleted: false
    },
    {
      title: 'Filed SETC with the IRS',
      isCompleted: false
    },
    {
      title: 'Awaiting SETC Payment (12-20 weeks)',
      description: '6-9 weeks',
      isCompleted: false
    },
  ])

  useEffect(() => {
    const storedTab = localStorage.getItem('activeTab');
    if (storedTab) {
      setActiveTab(storedTab);
    }
  }, []);
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    localStorage.setItem('activeTab', tabId);
  };


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

       
            const currentStep = userData.step;
            setActiveStep(currentStep || 0);
            

           


           
            setSelectedFiles((prevSelectedFiles) => ({
              ...prevSelectedFiles,
              driving_licence: userData?.driving_licence,
              schedule_pdf: userData?.schedule_pdf,

           
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
  

  useEffect(() => {
    let timer;
    if ((userData?.applicationStatus === false || userData?.applicationWithDocument === false) && showRemoveButton) {
      timer = setTimeout(() => {
        setShowRemoveButton(false);
      }, 1800000); 
    // }, 3000); 
    }
  
    return () => {
      clearTimeout(timer);
    };
  }, [userData, showRemoveButton]);
  






  const updateDocumentUploadedStatus = () => {
    
    let isCompleted = false;

    if (
      userData?.Family_Sick_Leave === 'Yes' 
    ) {
     
      if (allFilesSelectedAdditional()) {
    
        isCompleted = true;
      }
    } else {
     
      if (allFilesSelected()) {
       
        isCompleted = true;
      }
    }

    // Update 'isCompleted' status for 'Documents Uploaded' step
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.title === 'Documents Uploaded' ? { ...step, isCompleted } : step
      )
    );
  };

  useEffect(() => {
    updateDocumentUploadedStatus();
    // Add dependencies if needed
  }, [userData, selectedFiles]); 


  return (
    <div>
    <Navbar/>

    <div class="status-page">
    
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-7 px-0">
            <div class="contain">
              <div class="row justify-content-center">
                <div class="col-lg-9 col-md-12">
                  <div class="row justify-content-center">
                    <div class="col-lg-12 col-md-12">
                      <ul class="nav nav-tab tabs-heading mb-4" role="tab" > 
                        <li class="tab-item me-4">
                          <a
                       className={`status-heading nav-link ${activeTab === 'status_tab' ? 'active' : ''}`}

                            data-bs-toggle="tab"
                            href="#status_tab"
                            style={{marginTop: 5, fontSize: 18, textDecoration: 'underline'}}
                             onClick={() => handleTabChange('status_tab')}
                            >Status</a>
                        </li>
                        {/* <li class="tab-item me-4">
                          <a
                            class="status-heading nav-link"
                            data-bs-toggle="tab"
                            href="#activity_tab"
                            >Activity log</a
                          >
                        </li> */}
                        <li class="tab-item me-3">
                          <a
                              className={`status-heading nav-link ${activeTab === 'document_tab' ? 'active' : ''}`}
                            data-bs-toggle="tab"
                            href="#document_tab"
                            style={{ fontSize: 18, textDecoration: 'underline'}}
                            onClick={() => handleTabChange('document_tab')}
                            >Documents</a>
                        </li>
                      </ul>

                      <div class="tab-content mt-2">
                        <div className={`tab-pane fade ${activeTab === 'status_tab' ? 'show active' : ''}`} id="status_tab">
                          <h2 class="mb-3 comp-info">Company Info</h2>
                          
                        
                          <div class="row justify-content-center">
                <div class="col-lg-6">
                    <div class="mb-3">
                        <div class="form-label-status styleTitle"  style={{ color: 'dimgray', fontWeight: '500'}}>
                        Name
                        </div>
                        <div class="status-inform">
                        {userData?.first_name} {userData?.last_name} 
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="form-label-status styleTitle" style={{ color: 'dimgray', fontWeight: '500'}}>
                        Phone
                        </div>
                        <div class="status-inform">
                        {userData?.phone}
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="form-label-status styleTitle" style={{ color: 'dimgray', fontWeight: '500'}}>
                        Email
                        </div>
                        <div class="status-inform">
                        {userData?.email}
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="form-label-status styleTitle" style={{ color: 'dimgray', fontWeight: '500'}}>
                        Business Legal Name
                        </div>
                        <div class="status-inform">
                        {userData?.business_name} 
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="form-label-status styleTitle" style={{ color: 'dimgray', fontWeight: '500'}}>
                        Trade Name
                        </div>
                        <div class="status-inform">
                        {userData?.trade_name}   
                        </div>
                    </div>
              </div>
        
              <div class="col-lg-6">
                <div class="mb-3">
                <div class="form-label-status styleTitle" style={{ color: 'dimgray', fontWeight: '500'}}>
                  Business Address
                </div>
                <div class="status-inform">
                {userData?.address_line_1}   
                </div>
              </div>
              <div class="mb-3">
                <div class="form-label-status styleTitle" style={{ color: 'dimgray', fontWeight: '500'}}>
                  City
                </div>
                <div class="status-inform">
                {userData?.city}    
                </div>
              </div>
              <div class="mb-3">
                <div class="form-label-status styleTitle" style={{ color: 'dimgray', fontWeight: '500'}}>
                  Provice
                </div>
                <div class="status-inform">
                {userData?.state}   
                </div>
              </div>
              <div class="mb-3">
                <div class="form-label-status styleTitle" style={{ color: 'dimgray', fontWeight: '500'}}>
                  Postel Code
                </div>
                <div class="status-inform">
                 {userData?.zip}
                </div>
              </div>
              <div class="mb-3">
                <div class="form-label-status" style={{ color: 'dimgray', fontWeight: '500'}}>
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
                        

                          <div class="table-responsive mt-3" id="results-list">
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
                                        <span class="d-none"
                                          >&lt;p&gt;Test Mode&lt;/p&gt;
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

              {(userData?.applicationStatus === false || userData?.applicationWithDocument === false)  && ( 

                        <div className={`tab-pane fade ${activeTab === 'document_tab' ? 'show active' : ''}`} id="document_tab">
                          <div class="file_div">
                            <h4>
                              A PDF Copy of a Current ID or Driver's License
                             
                            </h4>
                            
                            {userData?.driving_licence && userData?.driving_licence.length > 0 ? (
  userData.driving_licence.map((file, index) => (
    <div key={index} className="containerr">
      <div className="itemm">
        <TaskAlt />
        <span className="namee">{userData.driving_licence_name[index]}</span>
      </div>
      <div className="itemm" style={{ padding: '0px 20px !important' }}>
        <div onClick={() => openFileInNewTab('driving_licence', index)} className="buttonn">
          View
        </div>
        { showRemoveButton && (
        <div onClick={() => removeFile('driving_licence', index)} className="buttonn">
          Remove
        </div>
        ) }
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
    multiple  // Allow multiple file selection
    onChange={(e) => handleFileChange('driving_licence', e)}
  />
)}

              {/* {userData?.driving_licence && userData?.driving_licence.length > 0 && (
  <button >Add File</button>
)} */}

    {userData?.driving_licence && userData?.driving_licence.length > 0 && (
    
     <button style={{    marginTop: '20px',
      borderRadius: '6px',
      border: '1px solid transparent',
      fontWeight: 'bold',
      color: 'white',
      background: '#3c4d77'}} 
      onClick={handleAddFileClick}>Add File</button>
    
      )} 
         
          {isAddingFile && ( 
            <FileInputComponent
              inputName="driving_licence"
              onRemove={handleRemoveInput} 
              handleFileChange={handleFileChange} // Pass the file change handler
            />
          )}


                            {uploadingFile === 'driving_licence' && (
                <LinearProgressWithLabel value={uploadProgress.driving_licence} />
                            )} 
                            
                          </div>
                         
                          
                        
                        </div>
              ) }

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-5 px-0" style={{backgroundColor: '#1a2c57'}}>
            <div class="status-progress">
            
      
       {steps.map((step, index) => (
        <Timeline>
         <TimelineItem key={index}>
           <TimelineSeparator>
          
          <TimelineDot style={{ backgroundColor: step.isCompleted ? 'rgb(29 215 46)' : 'white' }} />
           
            {index !== steps.length - 1 && <TimelineConnector />}
           
           </TimelineSeparator>
           <TimelineContent>
           <h4 style={{ color: step.isCompleted ? 'rgb(29 215 46)' : 'white' }}>{step.title}</h4>
             {step.description && <p>{step.description}</p>}
           </TimelineContent>
         </TimelineItem>
         </Timeline>
       ))}
    
     
   
            </div>
          </div>
        </div>
      </div>
      
    </div>
    <Footer/>

    </div>


  
  );
}





// For multiple selection:
