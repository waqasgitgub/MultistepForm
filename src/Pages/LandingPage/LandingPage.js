// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = ({ isLoggedIn, isApplicationActive, username }) => {
//   return (
//     <nav>
//       <div>
//         <Link to="/">Home</Link>
//         {isLoggedIn && isApplicationActive && (
//           <>
//             <Link to="/application-status">Application Status</Link>
//             <Link to="/support">Support</Link>
//             <span>Profile_{username}</span> {/* Example of user profile */}
//           </>
//         )}
//         {!isLoggedIn && (
//           <>
//             <Link to="/login">Login</Link>
//             <Link to="/new-application">Start a new application</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from 'react';
import logo from '../../Components/GlobalImages/logo-set.png';
import standUp from '../../Components/GlobalImages/Standup.png';
import calendy from '../../Components/GlobalImages/calendly.svg';
import NavLogin from '../../Components/Navbar/NavLogin';
import { useHistory } from "react-router-dom";
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar';

const LandingPage = () => {
    const history = useHistory();
const handleClickNewApp = () => {
    history.push("/application-form");
};
const handleClickWhereLeft = () => {
alert("left")
};


  return (
    <>
    <Navbar/>
       <section class="index-content">
   <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-11">
          <div class="start-application">
            <div class="row">
              <div class="col-lg-6 col-md-6 col-sm-12 pe-0">
                <div class="img-applci h-100">
                  <img
                    src={logo}
                    class="img-fluid lo"
                    alt=""
                  />
                  <img src={standUp} class="img-fluid" alt="" />
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-12 ps-0">
                <div class="img-applic-content">
                  <h2>Claiming Your Self-Employed Tax Credit (SETC)</h2>
                  <h4 class="text-center" style={{color: "#29abe2"}}>
                    You may be eligible for up to $32,200
                  </h4>
                  <div
                    class="d-flex justify-content-center flex-column align-items-center"
                  >
                    <div class="btn-apli">
                      <a>
                        <button type="button" class="apli-button" onClick={handleClickNewApp}>
                          Start a new application
                          <span class="ms-1"
                            ><svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="27"
                              height="16"
                              viewBox="0 0 27 16"
                              fill="none"
                            >
                              <path
                                d="M26.7021 8.59499C27.0963 8.20812 27.1022 7.57499 26.7153 7.18083L20.411 0.757753C20.0242 0.3636 19.391 0.357691 18.9969 0.744553C18.6027 1.13142 18.5968 1.76455 18.9837 2.15871L24.5875 7.86811L18.8781 13.4719C18.4839 13.8588 18.478 14.4919 18.8649 14.8861C19.2517 15.2802 19.8849 15.2861 20.279 14.8993L26.7021 8.59499ZM0.853459 8.64662L25.9923 8.88127L26.011 6.88135L0.872126 6.64671L0.853459 8.64662Z"
                                fill="white"
                              />
                            </svg>
                          </span>
                        </button>
                      </a>
                    
                    </div>

{/* 
                    <div class="btn-apli">
                      <a>
                        <button type="button" class="apli-button" onClick={handleClickWhereLeft}>
                          Login
                        </button>
                      </a>
                    
                    </div> */}



                    <div class="btn-apli">
                      <a>
                        <button type="button" class="apli-button" onClick={handleClickWhereLeft}>
                          Pick up where I left off
                          <span class="ms-1"
                            ><svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="27"
                              height="16"
                              viewBox="0 0 27 16"
                              fill="none"
                            >
                              <path
                                d="M26.7021 8.59499C27.0963 8.20812 27.1022 7.57499 26.7153 7.18083L20.411 0.757753C20.0242 0.3636 19.391 0.357691 18.9969 0.744553C18.6027 1.13142 18.5968 1.76455 18.9837 2.15871L24.5875 7.86811L18.8781 13.4719C18.4839 13.8588 18.478 14.4919 18.8649 14.8861C19.2517 15.2802 19.8849 15.2861 20.279 14.8993L26.7021 8.59499ZM0.853459 8.64662L25.9923 8.88127L26.011 6.88135L0.872126 6.64671L0.853459 8.64662Z"
                                fill="white"
                              />
                            </svg>
                          </span>
                        </button>
                      </a>
                    
                    </div>

            
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   </section>
   <Footer/>
    </>
  )
}

export default LandingPage
