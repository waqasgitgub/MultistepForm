import React, { useState } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './GlobalStyles/globalStyles.css';

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

const MultiStepForm = () => {

 



  const [activeStep, setActiveStep] = useState(0);


  const [formData, setFormData] = useState({

    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    bussinessName: '',
    tradeName: '',
    streetAddressOne: '',

  });

 

  
  const formDataPreparing = async (step) => {

    try {
      const response = await fetch('http://localhost:5000/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
        }),
      });
      if (response.ok) {
        // alert(selectToken)
        const data = await response.json();
        handleToken(data.user.token);
        // setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        // Handle error
        console.error('Error in API call');
      }
    } catch (error) {
      // Handle network error
      console.error('Network error', error);
    }
  };
  
  const formDataUpdate = async (step) => {
    try {
      let token = localStorage.getItem('token');

      if (!token) {
        // Handle missing token - Redirect or handle the situation accordingly
        console.error('Token is missing');
        // For example, redirect to the step where the token should be available
        setActiveStep(0); // Redirect to step 0 for token creation
        return;
      }
  
      const response = await fetch(`http://localhost:5000/user/${step}/updateuser`, {
        method: 'PUT', // Change the method to PUT
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
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
          self_employed_from: formData.selfEmployedFrom,
        }),
      });
  
      if (response.ok) {
        alert(`success ${step}`);
        const data = await response.json();
        // setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        // Handle error
        console.error('Error in API call');
      }
    } catch (error) {
      // Handle network error
      console.error('Network error', error);
    }
  };
 


  const handleNext = async () => {   
     const token = localStorage.getItem('token');
  
  if (activeStep === 0) {
    if (token) {
      await formDataUpdate(activeStep);
    } else {
      await formDataPreparing(activeStep);
    }
  }

   
    
    if (activeStep === 1) {
  
      formDataUpdate(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handlePrevious = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const handleInputChange = (event) => {
    const { name, value, type} = event.target;
    const inputValue = type === 'checkbox' ? event.target.checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: inputValue,
    }));
  };

  const getProgressPercentage = () => {
    return ((activeStep + 1) / steps.length) * 100; // Calculate progress percentage
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
      
        try {
          const response = await fetch('http://localhost:5000/user/getUser', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const userData = await response.json();
            const currentStep = userData.step; // Here is the current step where user should redirect if token is available 
          
            setFormData({
              firstName: userData.first_name || '', 
              lastName: userData.last_name || '',
            });

          } else {
            console.error('Error fetching user data');
          }
        } catch (error) {
          console.error('Network error', error);
        }
      }
    };

    fetchUserData();
  }, []); 


  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
           <LinearProgress
        variant="determinate"
        sx={{
          height: '8px', 
          borderRadius: '4px', 
          backgroundColor: '#f0f0f0', 
          '& .MuiLinearProgress-bar': {
            backgroundColor: 'rgb(13, 189, 243);', 
          },
        }}
        value={getProgressPercentage()}
      />
     <input
                type="text"
                value={formData.firstName}
                name="firstName"
                maxLength="1024"
                placeholder="First Name"
                required=""
                id="id_first_name"
                onChange={handleInputChange}
              />
               <input
                    value={formData.email}
                  type="email"
                  name="email"
                 maxLength="254"
                   placeholder="e.g. example@example.com"
               required=""
                 id="id_email"
                onChange={handleInputChange}
                />
                
       <input type="text" 
                    value={formData.bussinessName}
                    id="Business-Legal-Name"
                     placeholder="" 
                     name="bussinessName"
                     onChange={handleInputChange}
                    required />
             
                  <button onClick={handleNext} type="button" class="btn btn-primary next-step">
                  {activeStep === steps.length - 1 ? 'Submit' : 'Lets Gets Started'}
                  </button>
               
            
        </>
        );
        case 1:
          return (
            <>
             <LinearProgress
        variant="determinate"
        sx={{
          height: '8px', 
          borderRadius: '4px', 
          backgroundColor: '#f0f0f0', 
          '& .MuiLinearProgress-bar': {
            backgroundColor: 'rgb(13, 189, 243);', 
          },
        }}
        value={getProgressPercentage()}
      />
  <input type="text" 
                    value={formData.lastName}
                    name="lastName" placeholder="Last Name" maxlength="1024" 
                    required="" id="id_last_name" onChange={handleInputChange}/>
   <input type="tel" 
                    value={formData.phone}
                    name="phone" maxlength="128" placeholder="(555) 555-5555" 
                       required="" id="id_phone_number" onChange={handleInputChange}/>
           
                          
                          <div class="d-flex justify-content-end mt-3">
                            <button  
                          
                            onClick={handlePrevious}
                            type="button" class="btn btn-primary prev-step">
                              Previous
                            </button>
                            <button onClick={handleNext} type="button" class="btn btn-primary next-step">
                            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                            </button>
                          </div>
                          </>
          );
      case 2:
        return (
        <>
         <LinearProgress
        variant="determinate"
        sx={{
          height: '8px', 
          borderRadius: '4px', 
          backgroundColor: '#f0f0f0', 
          '& .MuiLinearProgress-bar': {
            backgroundColor: 'rgb(13, 189, 243);', 
          },
        }}
        value={getProgressPercentage()}
      />
          <input type="text"  
                    value={formData.tradeName}
                    id="Trade-Name" 
                    placeholder="" name="tradeName" 
                    required="" 
                    onChange={handleInputChange}
                    />
  <input type="text" 
                  value={formData.streetAddressOne}
               
                  id="Street-Address" placeholder="Street Address" name="streetAddressOne" required=""  onChange={handleInputChange}/>
        
        <div class="d-flex justify-content-end mt-3">
                            <button  
                          
                            onClick={handlePrevious}
                            type="button" class="btn btn-primary prev-step">
                              Previous
                            </button>
                            <button onClick={handleNext} type="button" class="btn btn-primary next-step">
                            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                            </button>
                          </div>
        </>
        );
     
      default:
        return 'Unknow Step';
    }
  };




  return (
    <Box sx={{ width: '100%', marginTop: 10 }}>
      {getStepContent()}
    </Box>
  );
};

export default MultiStepForm;



// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField';
// import LinearProgress from '@mui/material/LinearProgress';
// import Button from '@mui/material/Button';
// import frameFluid from './GlobalImages/Frame1.png';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import './GlobalStyles/globalStyles.css';

// const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad', 'Step 4', 'Step 5', 'Step 6', 'Step 7', 'Step 8', 'Step 9', 'Step 10', 'Step 11'];

// const MultiStepForm = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [activeErrorQualifyOne, setActiveErrorQualifyOne] = useState(false);


  
//   const [formData, setFormData] = useState({

//     firstName: '',
//     lastName: '',
//     adGroupDetails: '',
//     phone: '',
//     email: '',
//     bussinessName: '',
//     tradeName: '',
//     streetAddressOne: '',
//     streetAddressTwo: '',
//     city: '',
//     province: '',
//     zipCode: '',
//     knowAbout: '',
//     isChecked: false,

//     selfEmployedFrom: '',
//     isCheckedStepThree: false

//     // Add other form fields here
//   });


//   const [errors, setErrors] = useState({});

//   const handleToken = (token) => {
//       localStorage.setItem('token', token);
//     const existingToken = localStorage.getItem('token');
//     if (!existingToken) {
//       localStorage.setItem('token', token);
//     }
//   };
  
//   const formDataPreparing = async (step) => {

//     try {
//       const response = await fetch('http://localhost:5000/user/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           step: step,
//           first_name: formData.firstName,
//           last_name: formData.lastName,
//           phone: formData.phone,
//           email: formData.email,
//           business_name: formData.bussinessName,
//           trade_name: formData.tradeName,
//           address_line_1: formData.streetAddressOne,
//           city: formData.city, // Add more fields as needed
//           state: formData.province,
//           address_line_2: formData.streetAddressTwo,
//           zip: formData.zipCode,
//         }),
//       });
//       if (response.ok) {
//         alert("success")
//         const data = await response.json();
//         handleToken(data.user.token);
//         // setActiveStep((prevActiveStep) => prevActiveStep + 1);
//       } else {
//         // Handle error
//         console.error('Error in API call');
//       }
//     } catch (error) {
//       // Handle network error
//       console.error('Network error', error);
//     }
//   };
  
//   const formDataUpdate = async (step) => {
//     try {
//       let token = localStorage.getItem('token');

//       if (!token) {
//         // Handle missing token - Redirect or handle the situation accordingly
//         console.error('Token is missing');
//         // For example, redirect to the step where the token should be available
//         setActiveStep(0); // Redirect to step 0 for token creation
//         return;
//       }
  
//       const response = await fetch(`http://localhost:5000/user/${step}/updateuser`, {
//         method: 'PUT', // Change the method to PUT
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`, 
//         },
//         body: JSON.stringify({
//           first_name: formData.firstName,
//           last_name: formData.lastName,
//           phone: formData.phone,
//           email: formData.email,
//           business_name: formData.bussinessName,
//           trade_name: formData.tradeName,
//           address_line_1: formData.streetAddressOne,
//           city: formData.city,
//           state: formData.province,
//           address_line_2: formData.streetAddressTwo,
//           zip: formData.zipCode,
//           self_employed_from: formData.selfEmployedFrom,
//         }),
//       });
  
//       if (response.ok) {
//         alert(`success ${step}`);
//         const data = await response.json();
//         // setActiveStep((prevActiveStep) => prevActiveStep + 1);
//       } else {
//         // Handle error
//         console.error('Error in API call');
//       }
//     } catch (error) {
//       // Handle network error
//       console.error('Network error', error);
//     }
//   };
  

//   const handleNext = () => {
//     console.log(activeStep, 'here is my active step')
//     const isValid = validateInputs();
//     if (!isValid) {
//       return;
//     }
//     if (activeStep === 0) {
//       formDataPreparing(activeStep);
//     }

   
    
//     if (activeStep === 2) {
      
//       formDataUpdate(activeStep);
//     }
   
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     window.scrollTo(0, 0);
//   };

//   const handlePrevious = () => {
//     if(activeStep === 2){
//       formDataPreparing();
//     }
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     window.scrollTo(0, 0);
//   };


//   const handleInputChange = (event) => {
//     const { name, value, type} = event.target;
//     const inputValue = type === 'checkbox' ? event.target.checked : value;

//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: inputValue,
//     }));
//   };


//   const validateInputs = () => {

//     let hasErrors = false;
//     const errorsObj = {};
  
//     if (activeStep === 0) {
//       if (formData.firstName.trim() === '') {
//         errorsObj.firstName = 'First name cannot be empty';
//         hasErrors = true;
//       }
  
//       if (formData.lastName.trim() === '') {
//         errorsObj.lastName = 'Last name cannot be empty';
//         hasErrors = true;
//       }
  
//       if (formData.phone.trim() === '') {
//         errorsObj.phone = 'Phone number cannot be empty';
//         hasErrors = true;
//       }
  
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (formData.email.trim() === '' || !emailRegex.test(formData.email)) {
//         errorsObj.email = 'Invalid email format';
//         hasErrors = true;
//       }

//       if (formData.bussinessName.trim() === '') {
//         errorsObj.bussinessName = 'Bussiness name cannot be empty';
//         hasErrors = true;
//       }

//       if (formData.tradeName.trim() === '') {
//         errorsObj.tradeName = 'Trade name cannot be empty';
//         hasErrors = true;
//       }

//       if (formData.streetAddressOne.trim() === '') {
//         errorsObj.streetAddressOne = 'Street address cannot be empty';
//         hasErrors = true;
//       }

//       if (formData.city.trim() === '') {
//         errorsObj.city = 'City name cannot be empty';
//         hasErrors = true;
//       }

//       if (formData.province.trim() === '') {
//         errorsObj.province = 'Province name cannot be empty';
//         hasErrors = true;
//       }

//       if (formData.zipCode.trim() === '') {
//         errorsObj.zipCode = 'Zip code cannot be null';
//         hasErrors = true;
//       }

//       if (formData.knowAbout.trim() === '') {
//         errorsObj.knowAbout = 'Required field';
//         hasErrors = true;
//       }

//       if (!formData.isChecked) {
//         errorsObj.isChecked = 'Please check the box'; 
//         hasErrors = true;
//       }

//     }
   
//     if (activeStep === 2) {
      
//       if (!formData.selfEmployedFrom) {
//         errorsObj.selfEmployedFrom = 'Please select an option';
//         hasErrors = true;
//       }
    

//       if (formData.selfEmployedFrom === 'No' && formData.isCheckedStepThree && formData.selfEmployedFrom !== 'Yes') {
//         setActiveErrorQualifyOne(true);
//         hasErrors = true;
//       }
//       if (formData.selfEmployedFrom === 'Yes' && formData.isCheckedStepThree ) {
//         setActiveErrorQualifyOne(false);
       
//       }
     

     

//       if (!formData.isCheckedStepThree) {
//         errorsObj.isCheckedStepThree = 'Please check the box';
//         hasErrors = true;
//       }
//     }
  
//     // Add more validations for other steps if needed
  
//     setErrors(errorsObj);
//     return !hasErrors;
//   };




//   const getProgressPercentage = () => {
//     return ((activeStep + 1) / steps.length) * 100; // Calculate progress percentage
//   };

//   const getStepContent = () => {
//     switch (activeStep) {
//       case 0:
//         return (
//           <>
//           {/* <TextField
//             label="Campaign Settings"
//             value={firstName}
//             onChange={handleInputChange}
//             name="firstName"
//             fullWidth
//             error={!!errors.firstName}
//             helperText={errors.firstName}
//           /> */}
//           <div class="row justify-content-center pb-3">
//           <div class="col-lg-8">
//             <div class="step step-1 bg-white shadow  pb-5" style={{borderRadius: '20px'}}>
//               <h3 class="text-center mb-3 py-3 text-white" style={{backgroundColor: 'rgb(13, 189, 243)' ,borderRadius: '10px'}}>Getting Started</h3>
//               <div class="px-3">
//                 {/* <div class="progress mb-4" style={{height: "15px"}}>
//                   <div class="progress-bar" role="progressbar" style={{width: "0%"}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
//                 </div> */}
//                   <LinearProgress
//         variant="determinate"
//         sx={{
//           height: '8px', 
//           borderRadius: '4px', 
//           backgroundColor: '#f0f0f0', 
//           '& .MuiLinearProgress-bar': {
//             backgroundColor: 'rgb(13, 189, 243);', 
//           },
//         }}
//         value={getProgressPercentage()}
//       />
//                 <input type="hidden" name="record_id" id="record_id" value=""/>
            
//                 <div class="row mt-4">
//                   <label for="id_first_name" class="form-label requiredField">
//                     Self-Employed Owner's Name
//                   </label>
//                   <div class="col-sm-6 mb-3">
                    
//               <input
//                 type="text"
//                 value={formData.firstName}
//                 name="firstName"
//                 maxLength="1024"
//                 placeholder="First Name"
//                 class={`textinput form-control ${errors.firstName ? 'border-danger' : ''}`}
//                 required=""
//                 id="id_first_name"
//                 onChange={handleInputChange}
//               />

//               {errors.firstName && (
//                 <div className="text-danger" style={{ fontSize: '12px' }}>{errors.firstName}</div>
//               )}
//             </div>
//                   <div id="last_name" class="col-sm-6 mb-3">

//                     <input type="text" 
//                     value={formData.lastName}
//                     name="lastName" placeholder="Last Name" maxlength="1024" 
//                      class={`textinput form-control ${errors.lastName ? 'border-danger' : ''}`}
//                     required="" id="id_last_name" onChange={handleInputChange}/>

//                {errors.lastName && (
//                 <div className="text-danger" style={{ fontSize: '12px' }}>{errors.lastName}</div>
//               )}
//                   </div>
//                   <div id="div_id_phone_number" class="col-sm-6 mb-3">
//                     <label for="id_phone_number" class="form-label requiredField">
//                       Owners Phone Number
//                     </label>
//                     <input type="tel" 
//                     value={formData.phone}
//                     name="phone" maxlength="128" placeholder="(555) 555-5555" 
//                       class={`textinput form-control ${errors.phone ? 'border-danger' : ''}`}
//                        required="" id="id_phone_number" onChange={handleInputChange}/>

//             {errors.phone && (
//                 <div className="text-danger" style={{ fontSize: '12px' }}>{errors.phone}</div>
//               )}
//                   </div>
//                   <div id="div_id_email" class="col-sm-6 mb-3">
//                     <label for="id_email" class="form-label requiredField">
//                       Email
//                     </label>
//                     <input
//                     value={formData.email}
//                   type="email"
//                   name="email"
//                  maxLength="254"
//                    placeholder="e.g. example@example.com"
//                 class={` form-control ${errors.email ? 'border-danger' : ''}`}
//                required=""
//                  id="id_email"
//                 onChange={handleInputChange}
//                 />
// {errors.email && (
//   <div className="text-danger" style={{ fontSize: '14px' }}>
//     {errors.email}
//   </div>
// )}
//                   </div>
//                 </div>

//                 <div class="mb-2">
//                   <div class="col-sm-6">
//                     <label for="Business-Legal-Name" class="form-label">Business Legal Name</label>

//                     <input type="text" 
//                     value={formData.bussinessName}
//                      class={` form-control ${errors.bussinessName ? 'border-danger' : ''}`}
//                     id="Business-Legal-Name"
//                      placeholder="" 
//                      name="bussinessName"
//                      onChange={handleInputChange}
//                     required />
// {errors.bussinessName && (
//   <div className="text-danger" style={{ fontSize: '14px' }}>
//     {errors.bussinessName}
//   </div>
// )}
//                     <div class="invalid-feedback phoneError"></div>
//                   </div>
//                 </div>
//                 <div class="mb-2">
//                   <div class="col-sm-6">
//                     <label for="Trade-Name" class="form-label">Trade Name, if any(indicate none, if none)</label>

//                     <input type="text"  
//                     value={formData.tradeName}
//                     class={` form-control ${errors.tradeName ? 'border-danger' : ''}`}
//                     id="Trade-Name" 
//                     placeholder="" name="tradeName" 
//                     required="" 
//                     onChange={handleInputChange}
//                     />
//                     {errors.tradeName && (
//   <div className="text-danger" style={{ fontSize: '14px' }}>
//     {errors.tradeName}
//   </div>
// )}

//                     <div class="invalid-feedback emailError"></div>
//                   </div>
//                 </div>
//                 <div class="mb-2">
//                   <label for="Self-employed" class="form-label">
//                     Self-employed business address. This may likely be
//                     your home address unless you use a separate business
//                     address</label>
//                   <input type="text" 
//                   value={formData.streetAddressOne}
//                 class={`form-control  ${errors.streetAddressOne ? 'border-danger' : ''}`}
               
//                   id="Street-Address" placeholder="Street Address" name="streetAddressOne" required=""  onChange={handleInputChange}/>
                  
                  
//                   {errors.streetAddressOne && (
//   <div className="text-danger" style={{ fontSize: '14px' }}>
//     {errors.streetAddressOne}
//   </div>
// )}
                  
//                   <input type="text" 
//                   value={formData.streetAddressTwo}
//                   onChange={handleInputChange}
//                   class="form-control mt-3" id="Street-Address-Line-2" placeholder="Street Address Line 2" name="streetAddressTwo"  />
//                   <div class="invalid-feedback company_nameError"></div>
//                 </div>
//                 <div class="row">
//                   <div id="div_id_first_name" class="col-sm-6 mt-3">
//                     <label for="City" class="form-label requiredField">
//                       City
//                     </label>
//                   <input type="text"
//                   value={formData.city}
//                   class={`textinput form-control  ${errors.city ? 'border-danger' : ''}`}
//                    onChange={handleInputChange}
//                     name="city"  required="" id="City" />
//              {errors.city && (
//               <div className="text-danger" style={{ fontSize: '14px' }}>
//                  {errors.city}
//                </div>
//              )}

//                   </div>
//                   <div id="div_id_last_name" class="col-sm-6 mt-3 mb-3">
//                     <label for="State_Province" class="form-label requiredField">
//                       State/Province
//                     </label>
//                     <input type="text"
//                     value={formData.province}
//                      name="province" 
//                      maxlength="1024"
//                      class={`textinput form-control 
//                       ${errors.province ? 'border-danger' : ''}`}
//                       required="" id="State_Province" onChange={handleInputChange} />
//                        {errors.province && (
//   <div className="text-danger" 
// style={{ fontSize: '14px' }}>
//     {errors.province}
//   </div>
// )}

//                   </div>
//                   <div id="div_id_last_name" class="col-sm-6 ">
//                     <label for="zipcode" class="form-label requiredField">
//                       Postal / Zip Code
//                     </label>
//                     <input type="Number"
//                     value={formData.zipCode} name="zipCode" maxlength="1024" 
//                     placeholder="00000" 
//                     class={`textinput form-control 
//  ${errors.zipCode ? 'border-danger' : ''}`}
//  required="" id="zipcode" onChange={handleInputChange} />
//   {errors.zipCode && (
//   <div className="text-danger" 
// style={{ fontSize: '14px' }}>
//     {errors.zipCode}
//   </div>
// )}
//                   </div>
//                   <div id="know_about_us" class="col-sm-6  ">
//                     <label for="know-about" class="form-label requiredField">
//                       How did you hear about us?
//                     </label>
//                     <input type="text" 
//                     value={formData.knowAbout}
//                     name="knowAbout" maxlength="1024" 
//                     class={`textinput form-control 
//                     ${errors.knowAbout ? 'border-danger' : ''}`}
//                     required="" id="know-about"  onChange={handleInputChange}/>
//                      {errors.knowAbout && (
//                 <div className="text-danger" 
//                  style={{ fontSize: '14px' }}>
//                   {errors.knowAbout}
//                  </div>
//                 )}
//                   </div>
//                 </div>
//                 <div class="impot mt-3">
//                   <p>
//                     The address you provide above will be used as the
//                     mailing address for your SETC refund check. If you
//                     meet the eligibility criteria, the IRS generally takes
//                     3 – 5 months to process your application. To ensure
//                     the check reaches you without any complications,
//                     kindly provide an address where you intend to reside
//                     for the next 6 months. This will help guarantee
//                     accurate and timely delivery to the correct address.
//                   </p>
//                 </div>
//                 <div class="d-flex" 
//                 style={{ alignItems: 'center '}}
//                 >
                
//                 <input 
//                 checked={formData.isChecked}
//                    class={`checkBoxStepOne form-check-input me-1 ${errors.isChecked ? 'border-danger' : ''}`}
//                   type="checkbox" 
//                   id="flexCheckDefault1" 
//                   name='isChecked'
//                   onChange={handleInputChange} 
//                   />
//                    {/* {errors.isChecked && (
//                 <div className="text-danger" 
//                  style={{ fontSize: '14px' }}>
//                   {errors.isChecked}
//                  </div>
//                 )} */}
                      

//                   <p>
//                     By checking the box, you agree to our <a href="" data-bs-toggle="modal" data-bs-target="#term_condition"> terms & conditions</a> and will allow SETC Zone and its
//                     partners to contact you via phone, text, and/or email.
//                   </p>
                  
               

//                 </div>
//                 <div class="d-flex justify-content-end">
//                   <button onClick={handleNext} type="button" class="btn btn-primary next-step">
//                   {activeStep === steps.length - 1 ? 'Submit' : 'Lets Get Started'}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         </>
//         );
//         case 1:
//           return (
//             // <TextField
//             //   label="Ad Group Details"
//             //   value={adGroupDetails}
//             //   onChange={handleInputChange}
//             //   name="adGroupDetails"
//             //   fullWidth
//             // />
//             <div class="step step-2">
           
//             <div class="container-fluid px-0">
//               <div class="row justify-content-center">
//                 <div class="col-lg-12">
//                   <div class="start-application">
//                     <div class="row roww">
//                       <div class="col-lg-6 col-md-6 col-sm-12 pe-0">
//                         <div class="img-applci h-100 ">
//                           <input type="hidden" name="record_id" id="record_id" value=""/>
//                           <h3 style={{paddingBottom: '120px', color: 'rgb(13, 189, 243)' }}>Are you eligible for up to
//                             $32,200?</h3>
//                           <h3>
//                             Almost everybody with Schedule C income
//                             qualiﬁes to some extent.
//                           </h3>
//                           <p class="mb-0">
//                             If you filed taxes in 2020 and 2021 and were
//                             affected by the pandemic.
//                           </p>
//                           <img src={frameFluid} class="img-fluid" alt="" />
//                         </div>
//                       </div>
//                       <div class="col-lg-6 col-md-6 col-sm-12 ps-0">
//                         <div class="img-applic-content">
//                         <LinearProgress
//         variant="determinate"
//         sx={{
//           height: '8px', 
//           borderRadius: '4px', 
//           backgroundColor: '#f0f0f0', 
//           '& .MuiLinearProgress-bar': {
//             backgroundColor: 'rgb(13, 189, 243);', 
//           },
//         }}
//         value={getProgressPercentage()}
//       />
//                           <h4>
//                             In response to the coronavirus (COVID-19)
//                             crisis, an eligible self-employed individual
//                             was allowed to claim an income tax credit for
//                             any tax year for:
//                           </h4>
//                           <div class="data-p py-2 mb-2">
//                             <p>
//                               A qualified sick leave equivalent amount,
//                               under Section 7002 of the Families First
//                               Coronavirus Response Act
//                               <a href="./1_lead.pdf" type="pdf" target="_blank">
//                                 (P.L. 116-127)</a>; and/or
//                             </p>
//                           </div>
//                           <div class="data-p py-2 mb-2">
//                             <p>
//                               100 percent of a qualified family leave
//                               equivalent amount, under Section 7004 of<a href="./2_lead.pdf" type="pdf" target="_blank">
//                                 P.L. 116-127</a>
//                               .COVID-19: Credits for Sick and Family Leave
//                               for April 1st, 2020-March 31st, 2021
//                             </p>
//                             <p>
//                               The American Rescue Plan Act Extended the
//                               dates from April 1st, 2020 to September
//                               30th, 2021
//                             </p>
//                           </div>
                        
//                           <div class="data-p py-2 mb-2">
                          
//                           </div>
//                           <div class="data-p py-2 mb-2">
//                             <p>
//                               100 percent of a qualified family leave
//                               equivalent amount, under Section 9643 of
//                               <a href="./4_lead.pdf" type="pdf" target="_blank">
//                                 P.L. 117-2.</a>
//                             </p>
//                           </div>
                          
//                           <div class="d-flex justify-content-end mt-3">
//                             <button  
                          
//                             onClick={handlePrevious}
//                             type="button" class="btn btn-primary prev-step">
//                               Previous
//                             </button>
//                             <button onClick={handleNext} type="button" class="btn btn-primary next-step">
//                             {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           );
//       case 2:
//         return (
//           // <TextField
//           //   label="Ad Group Details"
//           //   value={adGroupDetails}
//           //   onChange={handleInputChange}
//           //   name="adGroupDetails"
//           //   fullWidth
//           // />
        
//           <div class="step step-3">
        
//           <div class="container-fluid px-0">
//             <div class="row justify-content-center">
//               <div class="col-lg-12">
//                 <div class="start-application">
//                   <div class="row ROWW">
//                     <div class="col-lg-6 col-md-6 col-sm-12 pe-0">
//                       <div class="img-applci h-100 align-items-start">
//                         <input type="hidden" name="record_id" id="record_id" value=""/>
//                         <p class="mb-0">
//                           If you were self-employed in 2020 and/or 2021,
//                           you could be eligible for the SETC. This
//                           includes sole proprietors who run businesses
//                           with employees, 1099 subcontractors, and
//                           single-member LLCs. This unique tax credit is
//                           exclusively available to business owners who
//                           filed a “Schedule C” or a Partnership (1065)
//                           on their federal tax returns for 2020 and/or
//                           2021.
//                         </p>
//                         <h6 class="mt-3 warn">Important Note:</h6>
//                         <p>
//                           Sub S or True S Corps/C Corps are not eligible
//                           for the SETC.
//                         </p>
//                         <h6 class="warn">Required Documents:</h6>
//                         <p>-Driver’s License</p>
//                         <p>
//                           -1040 with schedule C for 2019, 2020, and 2021
//                         </p>
//                       </div>
//                     </div>
//                     <div class="col-lg-6 col-md-6 col-sm-12 ps-0">
//                       <div class="img-applic-content">
                     
//                         <LinearProgress
//         variant="determinate"
//         sx={{
//           height: '8px', 
//           marginBottom: 4,
//           borderRadius: '4px', 
//           backgroundColor: '#f0f0f0', 
//           '& .MuiLinearProgress-bar': {
//             backgroundColor: 'rgb(13, 189, 243);', 
//           },
//         }}
//         value={getProgressPercentage()}
//       />                        
//                         <label for="self_employed_from" class="form-label fs-5">
//                           Were you self-employed from 4/1/2020-9/30/2021?</label>
//                         <div class="optio mb-2">
//                           <p>
                         
//                           <input
//                 className="form-check-input"
//                 class={`form-check-input ${errors.selfEmployedFrom ? 'border-danger' : ''}`}
//                 type="radio"
//                 name="selfEmployedFrom"  
//                 checked={formData.selfEmployedFrom === 'Yes'} 
//                 value="Yes"
//                 id="self_employed_from_yes"
//                 onChange={handleInputChange}
//               />Yes
//                           </p>
//                         </div>
//                         <div class="optio">
//                           <p>
//                           <input
//                 class={`form-check-input ${errors.selfEmployedFrom ? 'border-danger' : ''}`}
//                 type="radio"
//                 name="selfEmployedFrom"
//                 value="No"
//                 checked={formData.selfEmployedFrom === 'No'}
//                 id="self_employed_from_no"
//                 onChange={handleInputChange}
//               />No
//                           </p>
//                         </div>

//                         <div class="data-p py-2 mb-2">
//                           <p>
//                          <input 
//                 checked={formData.isCheckedStepThree}
//                    class={` form-check-input me-1 ${errors.isCheckedStepThree ? 'border-danger' : ''}`}
//                   type="checkbox" 
//                   id="flexCheckDefault1" 
//                   name='isCheckedStepThree'
//                   onChange={handleInputChange} 
//                   />                   evaluate and answer the questions as they
//                             relate to my  self-employed business
//                             qualifications for the Self-Employed Tax
//                             Credit (SETC) Program.
//                           </p>
//                         </div>
                    

//                         {activeErrorQualifyOne && (
//                          <div>
//                           <h4 style={{ color: "#e62e2d" }}>
//        Unfortunately, you are not eligible  for this tax created, you must have been self-employed during 2020 and/or 2021.
//                             </h4>
//         </div>
// )}


//                         <div class="d-flex justify-content-end mt-3">
//                         <button  
                          
//                           onClick={handlePrevious}
//                           type="button" class="btn btn-primary prev-step">
//                             Previous
//                           </button>
//                           <button onClick={handleNext} type="button" class="btn btn-primary next-step">
//                           {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         );
//         case 3: 
//         return (
//           <div class="step step-4">
//                 <input type="hidden" name="record_id" id="record_id" value=""/>
//                 <div class="container-fluid px-0">
//                   <div class="row justify-content-center">
//                     <div class="col-lg-12">
//                       <div class="start-application">
//                         <div class="row roww">
//                           <div class="col-lg-6 col-md-6 col-sm-12 pe-0">
//                             <div class="img-applci h-100 align-items-start">
//                               <p class="mb-0">
//                                 <b style={{color: "#e62e2d"}}>Note:</b>
//                                 Self-employed income is a limiting factor. If
//                                 your self-employed income is low for 2019,
//                                 2020 and 2021, it will severly effect the
//                                 outcome. If your self-employed income is
//                                 negative for 2019, 2020 and 2021, you would
//                                 not qualify for this program.
//                               </p>
//                             </div>
//                           </div>
//                           <div class="col-lg-6 col-md-6 col-sm-12 ps-0">
//                             <div class="img-applic-content">
//                             <LinearProgress
//         variant="determinate"
//         sx={{
//           height: '8px', 
//           marginBottom: 4,
//           borderRadius: '4px', 
//           backgroundColor: '#f0f0f0', 
//           '& .MuiLinearProgress-bar': {
//             backgroundColor: 'rgb(13, 189, 243);', 
//           },
//         }}
//         value={getProgressPercentage()}
//       />  
//                               <label for="net_income_2019" class="form-label fs-5">
//                                 Total NET Income For 2019?</label>
//                               <div class="optio mb-2">
//                                 <input type="text" class="for" name="" placeholder="2019 Income" id="net_income_2019" />
//                               </div>
//                               <label for="net_income_2020" class="form-label fs-5">
//                                 Total NET Income For 2020?</label>
//                               <div class="optio mb-2">
//                                 <input type="text" class="for" name="" placeholder="2019 or 2020 Income" id="net_income_2020" />
//                               </div>
//                               <label for="net_income_2021" class="form-label fs-5">
//                                 Total NET Income For 2021?</label>
//                               <div class="optio mb-2">
//                                 <input type="text" name="" class="for" placeholder="2021 Income" id="net_income_2021" />
//                               </div>

//                               <div class="d-flex justify-content-end mt-3">
//                         <button  
                          
//                           onClick={handlePrevious}
//                           type="button" class="btn btn-primary prev-step">
//                             Previous
//                           </button>
//                           <button onClick={handleNext} type="button" class="btn btn-primary next-step">
//                           {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
//                           </button>
//                         </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//         );
//         case 4 :
//           return (
//             <div class="step step-5">
            
//             <input type="hidden" name="record_id" id="record_id" value=""/>
//             <div class="container-fluid px-0">
//               <div class="row justify-content-center">
//                 <div class="col-lg-12">
//                   <div class="start-application">
//                     <div class="row roww">
//                       <div class="col-lg-6 col-md-6 col-sm-12 pe-0">
//                         <div class="img-applci h-100 align-items-start ">
//                           <div class="rt" style={{marginTop: "-90px"}}>
//                             <h6 class="mt-3 warn">COVID Impacts:</h6>
//                             <p class="mb-0">
//                               Whether you battled COVID, experienced
//                               COVID-like symptoms, needed to quarantine,
//                               underwent testing or cared for a family member
//                               affected by the virus, the SETC could be your
//                               ﬁnancial relief. If the closure of your
//                               child's school or daycare due to COVID
//                               restrictions forced you to stay home and
//                               impacted your work, we're here to help.
//                             </p>
//                             <h6 class="mt-3 warn">Qualifying Days:</h6>
                           
//                             <ul>
//                               <li>
//                                 You took time off in 2020 or 2021 due to
//                                 COVID-19 or to care for someone with
//                                 COVID-19 during the same period.
//                               </li>
//                               <li>
//                                 You took time off to care for a child under
//                                 18 years old due to school or daycare
//                                 closures.
//                               </li>
//                               <li>
//                                 You took time off in 2020 or 2021 due to COVID-19 to care for a loved one such as spouse, parents, etc.
//                               </li>
//                             </ul>
//                           </div>
//                         </div>
//                       </div>
//                       <div class="col-lg-6 col-md-6 col-sm-12 ps-0">
//                         <div class="img-applic-content">
//                         <LinearProgress
//         variant="determinate"
//         sx={{
//           height: '8px', 
//           marginBottom: 4,
//           borderRadius: '4px', 
//           backgroundColor: '#f0f0f0', 
//           '& .MuiLinearProgress-bar': {
//             backgroundColor: 'rgb(13, 189, 243);', 
//           },
//         }}
//         value={getProgressPercentage()}
//       />  
//                           <label for="business_negatively_impacted" class="form-label fs-5">
//                             Were you or your business negatively impacted
//                             by Covid?
//                           </label>
//                           <div class="optio mb-2">
//                             <p>
//                               <input class="form-check-input" type="radio" name="flexRadioDefault" value="Yes" id="business_negatively_impacted"  />Yes
//                             </p>
//                           </div>
//                           <div class="optio">
//                             <p>
//                               <input class="form-check-input" type="radio" name="flexRadioDefault" id="business_negatively_impacted" value="No" />No
//                             </p>
//                           </div>

//                           <div id="qualifyForm1">
//                             <h4 style={{color: "#e62e2d"}}>Unfortunately you are not eligible for this tax created, you
//                               must have experienced negative impact during 2020 and/or 2021.</h4>
//                           </div>

//                           <h5 class="mt-2 mb-4">
//                             Almost every American was negatively impacted
//                             by COVID-19 between the dates of 4/1/20 and
//                             3/31/21. & 4/1/2021-9/30/2021
//                           </h5>
//                           <div class="data-p py-2 mb-2">
//                             <p>
//                               As per IRS guidelines, you are NOT required
//                               to provide proof of a positive COVID-19 test
//                               or your COVID-19 status when submitting your
//                               filing. Instead, you are confirming IN GOOD
//                               FAITH that you experienced COVID-19, its
//                               symptoms, related illness, or quarantine,
//                               resulting in the inability to work and earn
//                               income. While no specific evidence is needed
//                               for filing, it's advisable to retain certain
//                               records for your records. These might
//                               include a positive COVID-19 test result, a
//                               healthcare provider's note about your
//                               positive test or symptoms, or documentation
//                               indicating quarantine. Also, remember that
//                               maintaining records of non-working days due
//                               to COVID-19 exposure or symptoms could be
//                               beneficial, such as data from your business
//                               software or bank statements reflecting the
//                               absence of sales deposits during that
//                               period.
//                             </p>
//                           </div>

//                           <div class="d-flex justify-content-end mt-3">
//                         <button  
                          
//                           onClick={handlePrevious}
//                           type="button" class="btn btn-primary prev-step">
//                             Previous
//                           </button>
//                           <button onClick={handleNext} type="button" class="btn btn-primary next-step">
//                           {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
//                           </button>
//                         </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           );
//           case 5: 
//           return (
//             <div class="step step-6">
              
//                 <input type="hidden" name="record_id" id="record_id" value=""/>
//                 <div class="container-fluid px-0">
//                   <div class="row justify-content-center">
//                     <div class="col-lg-12">
//                       <div class="start-application">
//                         <div class="row roww">
//                           <div class="col-lg-6 col-md-6 col-sm-12 pe-0">
//                             <div class="img-applci h-100 align-items-start">
//                               <h6 class="mt-3 warn">Claimable Days</h6>
//                               <p class="mb-0">
//                                 The IRS considers specific timeframes for claiming the Self-Employed Tax Credit:
//                               <ul>
//                                 <li> Whether you battled COVID, experienced COVID-like symptoms, needed to quarantine,
//                                   underwent testing and took time off between April 1, 2020, and March 31, 2021, or
//                                   between April 1, 2021, and September 30, 2021, you can claim up to 10 days in each
//                                   period.</li>
//                               </ul>
//                               </p>
//                               <p><b style={{color: "#e62e2d"}}>Note:</b> Qualifying days are a limiting factor. If your
//                                 qualifying days are low for 2020 and 2021, it will severely affect the outcome. If you
//                                 have no qualifying days for 2020 or 2021, you would not qualify for this program.</p>
//                             </div>
//                           </div>
//                           <div class="col-lg-6 col-md-6 col-sm-12 ps-0">
//                             <div class="img-applic-content">
//                             <LinearProgress
//         variant="determinate"
//         sx={{
//           height: '8px', 
//           marginBottom: 4,
//           borderRadius: '4px', 
//           backgroundColor: '#f0f0f0', 
//           '& .MuiLinearProgress-bar': {
//             backgroundColor: 'rgb(13, 189, 243);', 
//           },
//         }}
//         value={getProgressPercentage()}
//       />     
//                               <label for="Self-employed" class="form-label fs-5">
//                                 How many days were you personally sick with Covid, experienced Covid like symptoms, needed to quarantine, underwent testing, and took time off in 2020?
//                               </label>
//                               <div class="row">
//                                 <div class="col-lg-6">
//                                   <div class="optio mb-2">
//                                     <label for="personal_startdate2020" class="form-label fs-6">Start</label>
//                                     <input type="date" min="2020-04-01" max="2020-12-31" class="date-picker" id="personal_startdate2020" name="personal_startdate2020"/>
//                                   </div>
//                                 </div>
//                                 <div class="col-lg-6">
//                                   <div class="optio mb-2">
//                                     <label for="personal_enddate2020" class="form-label fs-6">End</label>
//                                     <input type="date" min="2020-04-01" max="2020-12-31" class="date-picker" id="personal_enddate2020" name="personal_enddate2020"/>
//                                   </div>
//                                 </div>
//                                 <div class="col-lg-6">
//                                   <div class="optio mb-2">
//                                     <label for="1days" class="form-label fs-6">Number of days:</label>
//                                     <input type="number" class="date-picker" id="1days" name="1days"/>
//                                   </div>
//                                 </div>
//                               </div>
//                               <label for="Self-employed" class="form-label fs-5">
//                                 How many days were you personally sick with Covid, experienced Covid like symptoms, needed to quarantine, underwent testing, and took time off in 2021?
//                               </label>
//                               <div class="row">
//                                 <div class="col-lg-6">
//                                   <div class="optio mb-2">
//                                     <label for="personal_startdate2021" class="form-label fs-6">Start</label>
//                                     <input type="date" min="2021-01-01" max="2021-09-30" class="date-picker" id="personal_startdate2021" name="personal_startdate2021"/>
//                                   </div>
//                                 </div>
//                                 <div class="col-lg-6">
//                                   <div class="optio mb-2">
//                                     <label for="personal_enddate2021" class="form-label fs-6">End</label>
//                                     <input type="date" min="2021-01-01" max="2021-09-30" class="date-picker" id="personal_enddate2021" name="personal_enddate2021"/>
//                                   </div>
//                                 </div>
//                                 <div class="col-lg-6">
//                                   <div class="optio mb-2">
//                                     <label for="2days" class="form-label fs-6">Number of days:</label>
//                                     <input type="number" class="date-picker" id="2days" name="2days"/>
//                                   </div>
//                                 </div>
//                               </div>
//                               <div class="d-flex justify-content-end mt-3">
//                               <button  
                          
//                           onClick={handlePrevious}
//                           type="button" class="btn btn-primary prev-step">
//                             Previous
//                           </button>
//                           <button onClick={handleNext} type="button" class="btn btn-primary next-step">
//                           {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
//                           </button>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//           );
//           case 6:
//             return (
//               <div class="step step-7">
           
//               <input type="hidden" name="record_id" id="record_id" value=""/>
//               <div class="container-fluid px-0">
//                 <div class="row justify-content-center">
//                   <div class="col-lg-12">
//                     <div class="start-application">
//                       <div class="row roww">
//                         <div class="col-lg-6 col-md-6 col-sm-12 pe-0">
//                           <div class="img-applci h-100 align-items-start">
//                             <h6 class="mt-3 warn">Qualifying Days:</h6>
//                             <p class="mb-0">
//                               Whether you battled COVID, experienced COVID-like symptoms, needed to quarantine,
//                               underwent testing, or cared for a family member affected by the virus, the SETC could be
//                               your financial relief. If the closure of your child's school or daycare due to COVID
//                               restrictions forced you to stay home and impacted your work, we're here to help.
//                               Qualifying days would include,
//                             </p>
//                             <ul>
//                               <li>You took time off in 2020 or 2021 due to COVID-19 or to care for someone
//                                 with
//                                 COVID-19 during the same period.</li>
//                               <li>You took time off to care for a child under 18 years old due to school or daycare
//                                 closures.</li>
//                             </ul>
//                             <p><b style={{color: "#e62e2d"}}>Note:</b> Qualifying days are a limiting factor. If your
//                               qualifying days are low for 2020 and 2021, it will severely affect the outcome. If you
//                               have no qualifying days for 2020 or 2021, you would not qualify for this program.</p>
//                           </div>
//                         </div>
//                         <div class="col-lg-6 col-md-6 col-sm-12 ps-0">
//                           <div class="img-applic-content">
//                           <LinearProgress
//         variant="determinate"
//         sx={{
//           height: '8px', 
//           marginBottom: 4,
//           borderRadius: '4px', 
//           backgroundColor: '#f0f0f0', 
//           '& .MuiLinearProgress-bar': {
//             backgroundColor: 'rgb(13, 189, 243);', 
//           },
//         }}
//         value={getProgressPercentage()}
//       />     
//                             <label for="Self-employed" class="form-label fs-5">
//                               How many days did you care for someone else who was affected by Covid, experienced Covid like symptoms, needed to quarantine, underwent testing, and took time off in 2020?

//                             </label>
//                             <div class="row">
//                               <div class="col-lg-6">
//                                 <div class="optio mb-2">
//                                   <label for="cared_startdate2020" class="form-label fs-6">Start</label>
//                                   <input type="date" min="2020-04-01" max="2020-12-31" class="date-picker" id="cared_startdate2020" name="cared_startdate2020"/>
//                                 </div>
//                               </div>
//                               <div class="col-lg-6">
//                                 <div class="optio mb-2">
//                                   <label for="cared_enddate2020" class="form-label fs-6">End</label>
//                                   <input type="date" min="2020-04-01" max="2020-12-31" class="date-picker" id="cared_enddate2020" name="cared_enddate2020"/>
//                                 </div>
//                               </div>
//                               <div class="col-lg-6">
//                                 <div class="optio mb-2">
//                                   <label for="3days" class="form-label fs-6">Number of days:</label>
//                                   <input type="number" class="date-picker" id="3days" name="3days"/>
//                                 </div>
//                               </div>
//                             </div>
//                             <label for="Self-employed" class="form-label fs-5">
//                               How many days did you care for someone else who was affected by Covid, experienced Covid like symptoms, needed to quarantine, underwent testing, and took time off in 2021?
//                             </label>
//                             <div class="row">
//                               <div class="col-lg-6">
//                                 <div class="optio mb-2">
//                                   <label for="cared_startdate2021" class="form-label fs-6">Start</label>
//                                   <input type="date" min="2021-01-01" max="2021-09-30" class="date-picker" id="cared_startdate2021" name="cared_startdate2021"/>
//                                 </div>
//                               </div>
//                               <div class="col-lg-6">
//                                 <div class="optio mb-2">
//                                   <label for="cared_enddate2021" class="form-label fs-6">End</label>
//                                   <input type="date" min="2021-01-01" max="2021-09-30" class="date-picker" id="cared_enddate2021" name="cared_enddate2021"/>
//                                 </div>
//                               </div>
//                               <div class="col-lg-6">
//                                 <div class="optio mb-2">
//                                   <label for="4days" class="form-label fs-6">Number of days:</label>
//                                   <input type="number" class="date-picker" id="4days" name="4days"/>
//                                 </div>
//                               </div>
//                             </div>

//                             <div class="d-flex justify-content-end mt-3">
//                             <button  
                          
//                           onClick={handlePrevious}
//                           type="button" class="btn btn-primary prev-step">
//                             Previous
//                           </button>
//                           <button onClick={handleNext} type="button" class="btn btn-primary next-step">
//                           {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
//                           </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             );
//             case 7:
//               return (
//                 <div class="step step-8">
              
//                 <input type="hidden" name="record_id" id="record_id" value=""/>
//                 <div class="container-fluid px-0">
//                   <div class="row justify-content-center">
//                     <div class="col-lg-12">
//                       <div class="start-application">
//                         <div class="row roww">
//                           <div class="col-lg-6 col-md-6 col-sm-12 pe-0">
//                             <div class="img-applci h-100 align-items-start">
//                               <h6 class="mt-3 warn">Qualifying Days:</h6>
//                               <p class="mb-0">
//                                 Whether you battled COVID, experienced COVID-like symptoms, needed to quarantine,
//                                 underwent testing, or cared for a minor affected by the virus, the SETC could be
//                                 your financial relief. Qualifying days would include,
//                               <ul>
//                                 <li>You took time off in 2020 or 2021 due to COVID-19 or to care for your child/children with
//                                   COVID-19 during the same period.</li>
//                                 <li>You took time off to care for a child under 18 years old due to school or daycare
//                                   closures.</li>
//                                 <li>If you cared for someone under eighteen years old between April 1, 2020, and March
//                                   31, 2021, you can claim up to 50 days. From April 1, 2021, to September 30, 2021, you
//                                   can claim up to 60 days.</li>
//                               </ul>
//                               </p>
//                               <p><b style={{color: "#e62e2d"}}>Note:</b> Qualifying days are a limiting factor. If your
//                                 qualifying days are low for 2020 and 2021, it will severely affect the outcome. If you
//                                 have no qualifying days for 2020 or 2021, you would not qualify for this program.</p>
//                             </div>
//                           </div>
//                           <div class="col-lg-6 col-md-6 col-sm-12 ps-0">
//                             <div class="img-applic-content">
//                             <LinearProgress
//         variant="determinate"
//         sx={{
//           height: '8px', 
//           marginBottom: 4,
//           borderRadius: '4px', 
//           backgroundColor: '#f0f0f0', 
//           '& .MuiLinearProgress-bar': {
//             backgroundColor: 'rgb(13, 189, 243);', 
//           },
//         }}
//         value={getProgressPercentage()}
//       />     
//                               <label for="Self-employed" class="form-label fs-5">
//                                 How many days were you affected by the closure of your child's school/daycare due to COVID restrictions, or how many days did you care for your minor child who was affected by COVID, which impacted your work in 2020?<span style={{color: "rgb(13, 189, 243)" , marginLeft:"10px"}}>(50 days max)</span>
//                               </label>
//                               <div class="row">
//                                 <div class="col-lg-6">
//                                   <div class="optio mb-2">
//                                     <label for="minor_startdate2020" class="form-label fs-6">Start</label>
//                                     <input type="date" min="2020-04-01" max="2020-12-31" class="date-picker" id="minor_startdate2020" name="minor_startdate2020"/>
//                                   </div>
//                                 </div>
//                                 <div class="col-lg-6">
//                                   <div class="optio mb-2">
//                                     <label for="minor_enddate2020" class="form-label fs-6">End</label>
//                                     <input type="date" min="2020-04-01" max="2020-12-31" class="date-picker" id="minor_enddate2020" name="minor_enddate2020"/>
//                                   </div>
//                                 </div>
//                                 <div class="col-lg-6">
//                                   <div class="optio mb-2">
//                                     <label for="5days" class="form-label fs-6">Number of days:</label>
//                                     <input type="number" placeholder="(50 days max)" class="date-picker" id="5days" name="5days"/>
//                                   </div>
//                                 </div>
//                               </div>
//                               <label for="Self-employed" class="form-label fs-5">
//                                 How many days were you affected by the closure of your child's school/daycare due to COVID restrictions, or how many days did you care for your minor child who was affected by COVID, which impacted your work in 2021?
//  <span style={{color: "rgb(13, 189, 243)" , marginLeft: "10px"}}>(60 days max)</span>
//                               </label>
//                               <div class="row">
//                                 <div class="col-lg-6">
//                                   <div class="optio mb-2">
//                                     <label for="minor_startdate2021" class="form-label fs-6">Start</label>
//                                     <input type="date" min="2021-01-01" max="2021-09-30" class="date-picker" id="minor_startdate2021" name="minor_startdate2021"/>
//                                   </div>
//                                 </div>
//                                 <div class="col-lg-6">
//                                   <div class="optio mb-2">
//                                     <label for="minor_enddate2021" class="form-label fs-6">End</label>
//                                     <input type="date" min="2021-01-01" max="2021-09-30" class="date-picker" id="minor_enddate2021" name="minor_enddate2021"/>
//                                   </div>
//                                 </div>
//                                 <div class="col-lg-6">
//                                   <div class="optio mb-2">
//                                     <label for="6days" class="form-label fs-6">Number of days:</label>
//                                     <input type="number" placeholder="(60 days max)" class="date-picker" id="6days" name="6days"/>
//                                   </div>
//                                 </div>
//                               </div>

//                               <div class="d-flex justify-content-end mt-3">
//                               <button  
                          
//                           onClick={handlePrevious}
//                           type="button" class="btn btn-primary prev-step">
//                             Previous
//                           </button>
//                           <button onClick={handleNext} type="button" class="btn btn-primary next-step">
//                           {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
//                           </button>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               );
//               case 8: 
//               return (
//                 <div class="step step-9">
              
//                 <input type="hidden" name="record_id" id="record_id" value="" />
//                 <div class="container-fluid px-0">
//                   <div class="row justify-content-center">
//                     <div class="col-lg-12">
//                       <div class="start-application">
//                         <div class="row roww">
//                           <div class="col-lg-6 col-md-6 col-sm-12 pe-0">
//                             <div class="img-applci h-100 align-items-start">
//                               <h6 class="mt-3 warn">Extremely Important:</h6>
//                               <p class="mb-0">
//                                "If you were both employed as a W-2 and self-employed in the years 2020 and/or 2021 and your
//                                employer paid you under the Families First Coronavirus
//                                Response Act for qualified sick and/or family leave wages, 
//                                these wages MUST be disclosed by your employer on the Form W-2, box 14 or an
//                                equivalent supporting statement." The employer is required to disclose
//                                 the amounts of qualified sick and/or family leave wages paid by category. These payments
//                                 MUST be disclosed on this survey by category and year, which will reduce the allowable
//                                 credit under the Self-Employed Tax Credit. Both the employer FFCRA and SETC program were
//                                 credited under the Families First Coronaviris Response Act, and therefore, you may not
//                                 double-dip under both programs.
//                               </p>
//                             </div>
//                           </div>
//                           <div class="col-lg-6 col-md-6 col-sm-12 ps-0">
//                             <div class="img-applic-content">
//                             <LinearProgress
//         variant="determinate"
//         sx={{
//           height: '8px', 
//           marginBottom: 4,
//           borderRadius: '4px', 
//           backgroundColor: '#f0f0f0', 
//           '& .MuiLinearProgress-bar': {
//             backgroundColor: 'rgb(13, 189, 243);', 
//           },
//         }}
//         value={getProgressPercentage()}
//       />     
//                               <label for="Self-employed-w2" class="form-label fs-5">
//                                 Were you self-employed and employed as a W2 during 4/1/2020-9/30/2021?
//                               </label>
//                               <div class="optio mb-2">
//                                 <p>
//                                   <input class="form-check-input" type="radio" name="employed_as_W2" value="Yes" id="flexRadioTargetYes" />Yes
//                                 </p>
//                               </div>
//                               <div class="optio">
//                                 <p>
//                                   <input class="form-check-input" type="radio" name="employed_as_W2" value="No" id="flexRadioTargetNo" />No
//                                 </p>
//                               </div>

//                               <div id="additional">
//                                 <label for="Self-employed" class="form-label bg-light py-3 px-1 fs-5">
//                                   If yes, did your employer pay Family Sick Leave during Covid, and what amount?
//                                 </label>
//                                 <div class="optio mb-2">
//                                   <p>
//                                     <input class="form-check-input" type="radio" name="Family_Sick_Leave" value="Yes" id="flexRadioAmount" />Yes
//                                   </p>
//                                 </div>
//                                 <div class="optio">
//                                   <p>
//                                     <input class="form-check-input" type="radio" name="Family_Sick_Leave" value="No" id="flexRadioAmountNo" />No
//                                   </p>
//                                 </div>


//                               </div>

//                               <div id="qualifyForm3">
//                                 <h4 style={{color: "#e62e2d"}}>You're ineligible for this. Please click "Yes".</h4>
//                               </div>

//                               <div id="amount" style={{marginTop: "5.5px"}}>
//                                 <div class="optio mb-2">
//                                   <input type="text" class="for mb-2" name="amount2020" placeholder="$2020" id="amount2020" />
//                                   <input type="text" class="for " name="amount2021" placeholder="$2021" id="amount2021" />

//                                 </div>
//                               </div>
//                               <div class="d-flex justify-content-end mt-3">
//                               <button  
                          
//                           onClick={handlePrevious}
//                           type="button" class="btn btn-primary prev-step">
//                             Previous
//                           </button>
//                           <button onClick={handleNext} type="button" class="btn btn-primary next-step">
//                           {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
//                           </button>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               );
//               case 9: 
//               return (
// <div class="step step-9">
    
//       <input type="hidden" name="record_id" id="record_id" value="" />
//       <div class="container">
//         <div class="row justify-content-center">
//           {/* <canvas id="confetti"></canvas> */}
//           <div class="col-lg-12">
//             <div class="start-application">
//               <div class="row">
//                 <div class="col-lg-6 col-md-6 col-sm-12 pe-0">
//                   <div class="img-applci sd h-100">
//                     <div class="col-lg-12">
//                       <div class="step-9-congrats">
//                         <div
//                           class="step_9_con border-0 d-flex justify-content-center"
//                         >
//                           <h3 class="text-success text-center fs-1 mb-3">
//                             Congratulations!
//                           </h3>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div class="col-lg-6 col-md-6 col-sm-12 ps-0">
//                   <div class="img-applic-content d-flex align-items-center">
//                     <div class="row justify-content-center align-items-center">
//                       <div class="col-lg-12">
//                         <div
//                           class="h-100 d-flex align-items-center flex-column"
//                         >
//                           <div class="h-90">
//                             <h3 class="text-success text-center fs-1 mb-3">
//                               Hurray!
//                             </h3>
//                             <h6 class="fs-4">
//                               You may be eligible for
//                               <span class="text-success">$0000</span>. We
//                               encourage you to complete the application
//                               and get paid. 🤩
//                             </h6>
//                           </div>
//                           <div class="d-flex justify-content-end mt-3">
//                           <button  
                          
//                           onClick={handlePrevious}
//                           type="button" class="btn btn-primary prev-step">
//                             Previous
//                           </button>
//                           <button onClick={handleNext} type="button" class="btn btn-primary next-step">
//                           {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
//                           </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//               );
//               case 10 : 
//               return (
//                 <div class="row justify-content-center step step-10">
//                 <div class="col-lg-8">
//                   <div class="step step-10 bg-white shadow px-3 py-5" style={{borderRadius: "20px"}}>
//                     {/* <div class="progress mb-4" style={{height: "15px"}}>
//                       <input type="hidden" name="record_id" id="record_id" value=""/>
//                       <div class="progress-bar" role="progressbar" style={{width: "0%"}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
//                     </div> */}
//                   <LinearProgress
//         variant="determinate"
//         sx={{
//           height: '8px', 
//           marginBottom: 4,
//           borderRadius: '4px', 
//           backgroundColor: '#f0f0f0', 
//           '& .MuiLinearProgress-bar': {
//             backgroundColor: 'rgb(13, 189, 243);', 
//           },
//         }}
//         value={getProgressPercentage()}
//       />     

//                     <h3>Documents</h3>

//                     <div class="mb-3">
//                       <label for="driving_licence" class="form-label">A PDF Copy of a Current ID or Driver's License</label>
//                       <input type="file" name="driving_licence" class="form-control" id="driving_licence" accept=".pdf" required />
//                     </div>
//                     <div class="mb-3">
//                       <label for="schedule_pdf" class="form-label">A PDF Copy of your 2019 Form 1040 (Tax Return), including ALL schedules, if the 2019 Self-Employed Income is higher than 2020. We would prefer one PDF file.
//                       </label>
//                       <input type="file" name="schedule_pdf" class="form-control" id="schedule_pdf" accept=".pdf" required />
//                     </div>
//                     <div class="mb-3">
//                       <label for="Tax_Return_2020" class="form-label"> A PDF Copy of your 2020 Form 1040 (Tax Return), including ALL schedules. </label>
//                       <input type="file" name="Tax_Return_2020" class="form-control" id="Tax_Return_2020" accept=".pdf" required />
//                     </div>
//                     <div class="mb-3">
//                       <label for="Tax_Return_2021" class="form-label">A PDF Copy of your 2021 Form 1040 (Tax Return), including ALL schedules. </label>
//                       <input type="file" name="Tax_Return_2021" class="form-control" id="Tax_Return_2021" accept=".pdf" required />
//                     </div>
//                     <div class="pdf-upload-extra" style={{display: "none"}}>
//                       <div class="mb-3">
//                         <label for="supplemental_attachment_2020" class="form-label">PDF Copy of All your 2020 Form W-2(s), including ANY Family First Coronavirus Response Act (FFCRA) supplemental attachment(s).*</label>
//                         <input type="file" name="supplemental_attachment_2020" class="form-control" id="supplemental_attachment_2020" accept=".pdf" required />
//                       </div>
//                       <div class="mb-3">
//                         <label for="2021_supplemental_attachment_2021" class="form-label">PDF Copy of All your 2021 Form W-2(s), including ANY Family First Coronavirus Response Act (FFCRA) supplemental attachment(s).</label>
//                         <input type="file" name="supplemental_attachment_2021" class="form-control" id="supplemental_attachment_2021" accept=".pdf" required />
//                       </div>
//                       <div class="mb-3">
//                         <label for="FormA1099" class="form-label">PDF Copy of All your 2020 Form 1099-R(s), if any</label>
//                         <input type="file" name="FormA1099" class="form-control" id="FormA1099" accept=".pdf" required />
//                       </div>
//                       <div class="mb-3">
//                         <label for="FormB1099" class="form-label">PDF Copy of All your 2021 Form 1099-R(s), if any</label>
//                         <input type="file" name="FormB1099" class="form-control" id="FormB1099" accept=".pdf" required />
//                       </div>
//                       <div class="mb-3">
//                         <label for="ks2020" class="form-label">PDF Copy of All your 2020 K-1s, if any</label>
//                         <input type="file" name="ks2020" class="form-control" id="ks2020" accept=".pdf" required />
//                       </div>
//                       <div class="mb-3">
//                         <label for="ks22020" class="form-label">PDF Copy of All your 2020 K-1s, if any</label>
//                         <input type="file" name="ks22020" class="form-control" id="ks22020" accept=".pdf" required />
//                       </div>
//                     </div>
//                     <div class="data-p py-2 mb-2">
//                       <p>
//                         <input class="form-check-input me-1" type="checkbox" value="" id="flexCheckD" />By checking this
//                         box you attest that the answers and information provided are true and accurate to the best of
//                         your knowledge, and understand that once submitted your responses cannot be changed. You agree
//                         to our <a href="" data-bs-toggle="modal" data-bs-target="#term_condition"> terms & conditions</a>, and also agree to keep documentation on file that substantiates
//                         claims made in this application.
//                       </p>
//                     </div>
//                     <div class="d-flex justify-content-center flex-wrap">
//                       <button type="button" class="btn btn-primary prev-step mb-2">
//                         Previous
//                       </button>
//                       <button type="button" data-bs-toggle="modal" id="confirmSubmitModalLaterBtn" data-bs-target="#confirmSubmitModalwithout" class="btn btn-primary px-5 py-2 me-2 mb-2 next-step" disabled>
//                         Submit Documents Later
//                       </button>
                     
//                       <button type="button" class="btn btn-primary px-5 py-2 mb-2 next-step" style={{backgroundColor: "#29abe2"}} id="confirmSubmitButtonLater" data-bs-toggle="modal" data-bs-target="#confirmSubmitModalLater" disabled>
//                         Submit Now
//                       </button>

//                       <div class="modal fade" id="confirmSubmitModalLater" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
//                         <div class="modal-dialog">
//                           <div class="modal-content confirm-modal">
//                             <div class="modal-header py-2" style={{borderBottom: "none"}}>
//                               <h5 class="modal-title" id="exampleModalLabel"></h5>
                            
//                               <a href="#"><i class="fa-solid fa-xmark fs-3" data-bs-dismiss="modal" aria-label="Close"></i></a>
//                             </div>

//                             <div class="modal-body d-flex justify-content-center flex-column align-items-center pt-0">
//                               <img src="./images/gif-submit.gif" style={{width: "120px"}} />
//                               <h5 class="text-center pb-4"><span class="text-success">Congratultion</span> Your application has been submitted! </h5>
//                               <h5 class="text-center">Our team will get back to you in 24-72 hours. Thank you.</h5>
                            
//                               <a href="#" class="btn btn-primary px-5 go-on-btn">Go on</a>
//                             </div>

//                           </div>
//                         </div>
//                       </div>
//                       <div class="modal fade" id="confirmSubmitModalwithout" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
//                         <div class="modal-dialog">
//                           <div class="modal-content confirm-modal2">
//                             <div class="modal-header py-2" style= {{borderBottom: "none"}}>
//                               <h5 class="modal-title" id="exampleModalLabel"></h5>
                              
//                               <a href=""><i class="fa-solid fa-xmark fs-3" data-bs-dismiss="modal" aria-label="Close"></i></a>
//                             </div>

//                             <div class="modal-body d-flex justify-content-center flex-column align-items-center pt-0">
//                               <img src="./images/gif-submit.gif" style={{width:"120px"}} />
//                               <h5 class="text-center pb-4"><span class="text-success">Great</span>, your application has been submittd.We will send you a
//                                 personalupload link for your documents.</h5>
//                               <a href="#" class="btn btn-primary px-5 go-on-btn2">Go on</a>
                            
//                             </div>

//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               );
//       default:
//         return 'File is here';
//     }
//   };

//   return (
//     <Box sx={{ width: '100%', marginTop: 10 }}>
    
    
//       {getStepContent()}
//       <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//         {/* <Button
//           color="inherit"
//           disabled={activeStep === 0} 
//           onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}
          
          
          
          
//           sx={{ mr: 1 }}
//         >
//           Back
//         </Button> */}
//         <Box sx={{ flex: '1 1 auto' }} />
//         {/* <Button onClick={handleNext}>
//           {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//         </Button> */}
//       </Box>
//     </Box>
//   );
// };

// export default MultiStepForm;