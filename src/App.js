import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import ApplicationForm from "./Pages/ApplicationForm/ApplicationForm";
import ApplicationStatus from "./Pages/ApplicationStatus/ApplicationStatus";
import Support from "./Pages/Support/Support";
import Login from "./Pages/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import VerifyOtp from "./Pages/VerifyOtp/VerifyOtp";
import { useEffect, useState } from "react";
import Strip from "./Pages/Strip/Strip";
import { setUserDetails } from "./Redux/Slices/userSlice";
// import CacheBuster from 'react-cache-buster';
// const version = 3;


const App = () => {
  // const { token } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      // If token exists in local storage, set it in component state
      setToken(storedToken);
      fetchUserData(storedToken);
    } else {
      // If token doesn't exist, remove it from component state
      setToken(null);
    }
  }, [token]); // Run this effect only on the initial mount


  const fetchUserData = async (token) => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await fetch("https://agree.setczone.com/api/user/getUser", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {


          const userData = await response.json();
          dispatch(setUserDetails({ firstName: userData?.first_name, 
            middleName: userData?.verified_middleName,
            
            lastName: userData?.last_name }));

        } else {
          console.error("Error fetching user data:", response.status, response.statusText);
        }
      } else {
        console.error("Token not found");
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
       // Hide the loader when the request is completed (either success or failure)
    }

    }




  return (
  //   <CacheBuster
  //   currentVersion={version}
  //   isEnabled={true} //If false, the library is disabled.
  //   isVerboseMode={false} //If true, the library writes verbose logs to console.
  //   // loadingComponent={<div>loading ..</div>} //If not pass, nothing appears at the time of new version check.
  //   metaFileDirectory={'.'} //If public assets are hosted somewhere other than root on your server.
  // >
    <Router>
      <Switch>
        {/* Route to ApplicationForm component if token exists */}
        <Route
          exact
          path="/"
          render={() => (token ? <Redirect to="/status" /> : <LandingPage />)}
        />
        {/* Private route - Render ApplicationForm if token exists */}
        {/* <Route
          path="/status"
          render={() => (token ? <ApplicationStatus /> : <Redirect to="/" />)}
        /> */}
        {/* Public routes */}
        <Route path="/login" component={Login} />
        <Route path="/verifyOtp" component={VerifyOtp} />
        <Route path="/application" component={ApplicationForm} />
        <Route path="/status" exact component={ApplicationStatus} />
        <Route path="/support" component={Support} />
        <Route path="/strip" component={Strip} />

        {/* Redirect to LandingPage for any other undefined route */}
        <Redirect to="/" />
      </Switch>
    </Router>
    // </CacheBuster>
  );
};

export default App;



