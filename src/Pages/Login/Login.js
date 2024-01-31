import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import LoadingScreen from '../../Components/LoadingScreen'
import CommonSnackbar from '../../Components/CommonSnackbar/CommonSnackbar'

const Login = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };


  const [formData, setFormData] = useState({

    email: '',
     });

     const handleInputChange = (event) => {
      const { name, value} = event.target;
      const inputValue =  value;
  
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: inputValue,
      }));
    };


  // const handleSendLink = async (event) => {
    
  //   event.preventDefault();
   
   
  //     try {
  //       setLoading(true); // Hide the loader when the request is completed (either success or failure)

  //       const response = await axios.post('http://localhost:5000/user/send-invitation', {
  //        email: formData.email
  //       });
    
  //       if (response.status === 200) {
  //         const { data } = response;
  //         // handleToken(data.user.token);
  //         // alert(data.user.token)
  //         // dispatch(createUser({ user: data.user }));
  //         // history.push("/verifyOtp");
  //         setSnackbarMessage('OTP sent successfully. Check your email.');
  //         setSnackbarSeverity('success');
  //         setSnackbarOpen(true);
  //         history.push({
  //           pathname: "/verifyOtp",
  //            search: `?userEmail=${formData?.email}`
  //         });
         
  //         // alert("Check your eamil, verification code successfully send")
  //       } else {
  //         console.error('Error in API call');
  //       setSnackbarMessage('Something went wrong. Please check your email & try again.');
  //       setSnackbarSeverity('error');
  //       setSnackbarOpen(true);
  //       }
  //     } catch (error) {
  //       console.error('Network error', error);
  //       setSnackbarMessage('Something went wrong. Please check your email & try again.');
  //       setSnackbarSeverity('error');
  //       setSnackbarOpen(true);
  //     } finally {

  //       setLoading(false); // Hide the loader when the request is completed (either success or failure)
  //     }
   
  // };
  const handleSendLink = async (event) => {
    event.preventDefault();
  
    try {
      setLoading(true);
  
      const response = await axios.post('http://localhost:5000/user/send-invitation', {
        email: formData.email
      });
  
      if (response.status === 200) {
        const { data } = response;
        setLoading(false);
        setSnackbarOpen(true);
        setSnackbarSeverity('success');
        setSnackbarMessage('OTP sent successfully. Check your email.');
       
    
        // Move the history.push after setting the snackbar state
        setTimeout(()=>{
          history.push({
            pathname: "/verifyOtp",
            search: `?userEmail=${formData?.email}`
          });
        },3000);
        

      } else {
        console.error('Error in API call');
        setSnackbarMessage('Something went wrong. Please check your email & try again.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Network error', error);
      setSnackbarMessage('Something went wrong. Please check your email & try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
        <Navbar/>
        {loading && <LoadingScreen />}


          <section class="login-form">
      <div class="d-flex justify-content-center container my-5 py-3">
        <div class="base-container-small">
          <div class="text-center mb-5">
            <h1>Login</h1>
            <h3 class="plain">Enter your email and we’ll send you a link</h3>
          </div>
          <div class="d-flex flex-column align-items-center">
            <div class="base-container-small">
              <form >
                <input
                  type="hidden"
                  name="csrfmiddlewaretoken"
                  value="ASdGk4wSUlaBRxh0UX64RBZFGkuWcHvNgv7ySAQUw9RG33qP0SLLTapgvk4dxHOz"
                />
                <div id="div_id_email" class="mb-3">
                  <label for="id_email" class="form-label requiredField">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g. example@example.com"
                    class="emailinput form-control"
                    required=""
                    id="id_email"
                    onChange={handleInputChange}
                    value={formData.email}
                  />
                </div>
                <div class="text-end mt-4">
                  <button
                  onClick={handleSendLink}
                    type="submit"
                    class="btn btn-primary"
                    id="submit-button"
                  >
                    Send Otp
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <CommonSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={handleSnackbarClose}
        autoHideDuration={6000} // You can customize this value
      />
    <Footer/>
    </div>
  )
}

export default Login
