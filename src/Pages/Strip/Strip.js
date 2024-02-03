// import React, { useEffect, useState } from 'react'
// import "./Strip.css";


// const Strip = () => {

// const [apiData, setApiData] = useState(null);
// const token = localStorage.getItem("token");

// const fetchData = async () => {
//   try {
//     const apiUrl = 'https://agree.setczone.com/user/sessions';

//     // Make an API call using fetch or Axios
//     const response = await fetch(apiUrl, {
//       method: 'POST', // or 'GET' depending on your API
//       headers: {
//         Authorization: `Bearer ${token}`, // Fix the syntax here
//         'Content-Type': 'application/json',
//       },
//     });

//     // Check if the API request was successful (HTTP status code 200)
//     if (response.ok) {
//       // Parse the JSON response
//       const data = await response.json();
//       console.log('API response:', data);

//       // Check if the data contains a redirect URL
//       const url = data.url;
//       if (url) {
//         // Redirect to the received URL
//         window.location.href = url;
//       } else {
//         console.error('API response did not contain a redirect URL');
//         // Handle the absence of a redirect URL as needed
//       }
        
//       // Store API data in state if needed for rendering
//       setApiData(data);
//     } else {
//       console.error('API request failed with status:', response.status);
//       // Handle the unsuccessful API response as needed
//     }
//   } catch (error) {
//     console.error('Error calling API:', error.message);
//     // Handle the error appropriately, e.g., show an error message
//   }
// };

// // Use the fetch function inside useEffect
// useEffect(() => {
//   fetchData();
// }, []);



//   return (
//     <div>
   
//     </div>
//   )
// }

// export default Strip



import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
export default function Strip() {
  // const history = useNavigate();
  const history = useHistory();

  // State to store data received from the API
  const [apiData, setApiData] = useState(null);
  const [userData, setUserData] = useState(null);

  // const token = localStorage.getItem("token");


 

const fetchDataWithoutEvent = async () => {
  const token = localStorage.getItem("token");

  try {
    const apiUrl = 'https://agree.setczone.com/api/user/sessions';

    // Make an API call using fetch or Axios
    const response = await fetch(apiUrl, {
      method: 'POST', // or 'GET' depending on your API
      headers: {
        Authorization: `Bearer ${token}`, // Fix the syntax here
        'Content-Type': 'application/json',
      },
    });

    // Check if the API request was successful (HTTP status code 200)
    if (response.ok) {
      // Parse the JSON response
      const data = await response.json();
      console.log('API response:', data);

      // Check if the data contains a redirect URL
      const url = data.url;
      if (url) {
        // Redirect to the received URL
        window.location.href = url;
      } else {
        console.error('API response did not contain a redirect URL');
        // Handle the absence of a redirect URL as needed
      }
        
      // Store API data in state if needed for rendering
      setApiData(data);
    } else {
      console.error('API request failed with status:', response.status);
      // Handle the unsuccessful API response as needed
    }
  } catch (error) {
    console.error('Error calling API:', error.message);
    // Handle the error appropriately, e.g., show an error message
  }
};


const fetchUserDataa = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const response = await fetch("https://agree.setczone.com/api/user/getUser", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response)
      if (response.ok) {
        const userData = await response.json(); // Use await to wait for the JSON parsing
        setUserData(userData);
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.error("Network error", error);
    }
  }
};


const fetchData = async (eventValue) => {

  const token = localStorage.getItem("token");
  console.log('Event Value in  fetch  data:', eventValue);
  if(eventValue == 'signing_complete' || userData?.strip_inprocess == "true"){
  console.log("signing conditions  true")

    try {
      const apiUrl = 'https://agree.setczone.com/api/user/sessions';
      // Make an API call using fetch or Axios
      const response = await fetch(apiUrl, {
        method: 'POST', // or 'GET' depending on your API
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
      });
      // Check if the API request was successful (HTTP status code 200)
      if (response.ok) {
        // Parse the JSON response
        const data = await response.json();
        console.log('API response:', data);
        // Check if the data contains a redirect URL
        const url = data.url;
        if (url) {
          // Redirect to the received URL
          window.location.href = url;
        } else {
          console.error('API response did not contain a redirect URL');
          // Handle the absence of a redirect URL as needed
        }
        // Store API data in state if needed for rendering
        setApiData(data);
      } else {
        console.error('API request failed with status:', response.status);
        // Handle the unsuccessful API response as needed
      }
    } catch (error) {
      console.error('Error calling API:', error.message);
      // Handle the error appropriately, e.g., show an error message
    }
  }
  else if(eventValue == 'decline'){
  
    // history.push('/support');
    const newPagePath = '/status?event=decline';
    window.location.href = newPagePath;
  }
 else  if(eventValue == 'cancel'){


  const newPagePath1 = '/status?event=cancel';
    window.location.href = newPagePath1;
 }


};
// Use the fetch function inside useEffect
// useEffect(() => {
//   // fetchData();

// }, []);
const location = useLocation();

useEffect(() => {
  fetchUserDataa();
}, []); // Fetch user data on component mount

useEffect(() => {
  if (userData?.strip_inprocess === "true") {
    fetchDataWithoutEvent();
  } else {
    const queryParams = new URLSearchParams(location.search);
    const eventValue = queryParams.get('event');
    fetchData(eventValue);
  }
}, [location.search, userData]); 

  return (
    <div style={{marginTop: 90}}>
    
    </div>
  );
}
