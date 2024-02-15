import {
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
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";

import packageInfo from '../package.json'
import { useHistory } from "react-router-dom";



const App = () => {
  const reduxToken = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

if (process.env.REACT_APP_ENV === 'production') {
  console.log = () => {}
  console.error = () => {}
  console.debug = () => {}
}

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
  }, []); // Run this effect only on the initial mount


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
            middleName: userData?.middle_name,
            
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

    };

    useEffect(() => {
      const fetchData = async () => {
        const storedToken = localStorage.getItem("token");
  
        if (storedToken) {
          setToken(storedToken);
          await fetchUserData(storedToken);
        }
  
        setLoading(false);
      };
  
      fetchData();
    }, []);
  
    // const onCacheClear = async (refreshCacheAndReload) => {
    //   try {
    //     if (caches && window.caches) { // Check if caches is available
    //       const names = await window.caches.keys(); // Use window.caches
    //       await Promise.all(names.map(name => window.caches.delete(name))); // Use window.caches
    //     }
    //     refreshCacheAndReload();
    //   } catch (error) {
    //     console.error('Error during cache clearing or reloading:', error);
    //   }
    // };

const appVersion = '4.7.0';

console.log("current app version" , appVersion)
console.log("previous App version" , localStorage.getItem('appVersion'))
const history = useHistory()

function clearLocalStorageAndReload() {
    //  localStorage.removeItem("final_roundedValue");
    localStorage.removeItem("activeTab");
    localStorage.removeItem("isModalOpened");
    localStorage.removeItem("isModalOpenedTwo");
    localStorage.removeItem('appVersion');
    localStorage.removeItem('token')
    window.location.reload(true);
    setToken(null)
    // window.location.href = 'https://agree.setczone.com';
    window.location.href = 'https://agree.setczone.com';
    
}

const storedVersion = localStorage.getItem('appVersion');

if (storedVersion === null || storedVersion !== appVersion) {
  clearLocalStorageAndReload();
  localStorage.setItem('appVersion', appVersion);
  
 }

console.log("Redux Token" , reduxToken)
console.log("Token" , token)
  return (
      <Switch>
      <Route
        exact
        path="/"
        render={() => (token ? <Redirect to="/application" /> : <LandingPage />)}
      />
     
    
     <Route
        path="/support"
        render={() =>
          loading ? null : token ? (
            <Support />
          ) : reduxToken ? (
            <Support />
          ) : (
            <Redirect to="/" />
          )
        }
      />
      <Route
        path="/status"
        render={() =>
          loading ? null : token ? (
            <ApplicationStatus />
          ) : reduxToken ? (
            <ApplicationStatus />
          ) : (
            <Redirect to="/" />
          )
        }
      />

      {/* <Route path="/status"  component={ApplicationStatus} /> */}
      <Route path="/login" component={Login} />
      <Route path="/verifyOtp" component={VerifyOtp} />
      <Route path="/strip" component={Strip} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/application" component={ApplicationForm} />
      {/* Redirect to LandingPage for any other undefined route */}
      <Redirect to="/" />
    </Switch>
);
};

export default App;









