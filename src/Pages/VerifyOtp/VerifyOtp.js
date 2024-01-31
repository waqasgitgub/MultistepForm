import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { setToken, setUserDetails } from "../../Redux/Slices/userSlice";
import { useDispatch } from "react-redux";
import LoadingScreen from "../../Components/LoadingScreen";
import { useLocation } from "react-router-dom";
import CommonSnackbar from "../../Components/CommonSnackbar/CommonSnackbar";

const VerifyOtp = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const emailUser = queryParams.get("userEmail");
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const inputValue = value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: inputValue,
    }));
  };

  const handleToken = (token) => {
    localStorage.setItem("token", token);
    // const existingToken = localStorage.getItem('token');
    // if (!existingToken) {
    //   localStorage.setItem('token', token);
    // }
    dispatch(setToken(token));
  };
  const handleSubmitLink = async (event) => {
    event.preventDefault();
  

    try {
      setLoading(true); // Hide the loader when the request is completed (either success or failure)

      const response = await axios.post("http://localhost:5000/user/verify", {
        otp: formData.email,
        email: emailUser
      });

      if (response.status === 200) {
        const { data } = response;
            // Set success message
            setSnackbarMessage('OTP verified successfully. Logged in.');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);

        console.log(data.user, 'here where we verify otp')
        dispatch(setUserDetails({ firstName: data.user?.first_name, 
          middleName: data.user?.verified_middleName,
          
          lastName: data.user?.last_name }));
        // localStorage.setItem('loginTrue', loginTrue);

        handleToken(data.user.token);

        setTimeout(()=>{
          history.push("/application");
        },3000);
       

        
       
        // dispatch(createUser({ user: data.user }));
      } else {
        // Set error message
        setSnackbarMessage('Error verifying OTP. Please try again.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Network error", error);
       // Set error message
       setSnackbarMessage('Error verifying OTP. Please try again.');
       setSnackbarSeverity('error');
       setSnackbarOpen(true);
      // dispatch(loginFailure());
    }  finally {
      setLoading(false); // Hide the loader when the request is completed (either success or failure)
    }
  };

  return (
    <div>
      <Navbar />

      {loading && <LoadingScreen />}


      <section class="login-form">
        <div class="d-flex justify-content-center container my-5 py-3">
          <div class="base-container-small">
            <div class="text-center mb-5">
              <h1>Verification</h1>
              <h3 class="plain">Enter your Otp</h3>
            </div>
            <div class="d-flex flex-column align-items-center">
              <div class="base-container-small">
                <form>
                  <input
                    type="hidden"
                    name="csrfmiddlewaretoken"
                    value="ASdGk4wSUlaBRxh0UX64RBZFGkuWcHvNgv7ySAQUw9RG33qP0SLLTapgvk4dxHOz"
                  />
                  <div id="div_id_email" class="mb-3">
                    <label for="id_email" class="form-label requiredField">
                      Otp
                    </label>
                    <input
                      type="text"
                      name="email"
                      placeholder="S-123456"
                      class="emailinput form-control"
                      required=""
                      id="id_email"
                      onChange={handleInputChange}
                      value={formData.email}
                    />
                  </div>
                  <div class="text-end mt-4">
                    <button
                      onClick={handleSubmitLink}
                      type="submit"
                      class="btn btn-primary"
                      id="submit-button"
                    >
                      Submit
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
      <Footer />
    </div>
  );
};

export default VerifyOtp;
