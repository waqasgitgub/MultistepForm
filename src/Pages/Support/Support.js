import React, { useEffect, useState } from "react";
import Mobile from "../../Components/GlobalImages/Mobile_inbox-pana.png";
import mail from "../../Components/GlobalImages/Mail_sent-amico.png";
import actionImg from "../../Components/GlobalImages/actions_img.png";
import timeMang from "../../Components/GlobalImages/Time_management-rafiki 1.png";
import checklist from "../../Components/GlobalImages/Checklist-pana.png";
import "./Supportt.css";
import Navbar from "../../Components/Navbar/Navbar";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";


const Support = () => {
  const history = useHistory();
  const [loading ,setLoading] = useState(false);
  const [userData , setUserData] = useState({});
  const [consentConfirmationLoader, setConfirmationLoader] = useState(false);



  const fetchUserDataa = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        setLoading(true); // Hide the loader when the request is completed (either success or failure)

        const response = await fetch("https://agree.setczone.com/api/user/getUser", {
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

  useEffect(async()=>{
    await fetchUserDataa()
  },[])



  const handleConsentConfirmation = async () => {
    const token = localStorage.getItem("token");
    let step = 0;
  
    try {
      setConfirmationLoader(true);
      const response = await axios.put(
        `https://agree.setczone.com/api/user/${step}/updateuser`,
        { isOldUser: false },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json",
          },
          onUploadProgress: (progressEvent) => {
          },
        }
      );
  
      if (response) {
        setConfirmationLoader(false);
      }
  
      console.log('Old user updated', response?.data);
      if (response?.data?.isOldUser === false) {
      }
  
      await fetchUserDataa(); // Fix: Correct function name
    } catch (err) {
      console.log(err);
    } finally {
      setConfirmationLoader(false);
    }
  };

  return (
    <div  >
      {userData?.isOldUser ? (
        <>
          <>
          <Navbar/>

      <div style={{ marginTop: "140px" }} className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                Important Update!
              </h5>
              <p className="card-text">
              We were down for maintenance, updated our system, and will now need you to verify your information. Thank you!
              </p>
              <button className="btn btn-primary mt-2" type="button" onClick={handleConsentConfirmation}>
                Confirm
                {consentConfirmationLoader && (
                  <span
                  className="spinner-border spinner-border-sm ml-3"
                  role="status"
                  aria-hidden="true"
                ></span>
                )}
                  </button>
            </div>
          </div>
        </div>
      </div>
    </div></>
        </>
      ) : (
        <>
        <div>
        <Navbar/>
      <section class="suppot">
        <div class="customer_support">
          <h1 class="text-white">Customer Support</h1>
          <h3 class="text-white">Choose a support option</h3>
        </div>
      </section>

      <section class="actions_sections bg-light">
        <div class="actions">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg-5">
                {/* <div>
                  <h3>Actions</h3>
                </div> */}
                <div class="actions_div">
                  <a
                   onClick={() => history.push("/status")}
                   style={{ textDecoration: "none", cursor: 'pointer' }}
                  >
                    Check the status of your application
                  </a>
                </div>
                <div class="actions_div">
                  <a
                    href="mailto:support@setczone.com"
                    style={{ textDecoration: "none" }}
                  >
                    I received a notice from the IRS
                  </a>
                </div>
                <div class="actions_div">
                  <a
                      onClick={() => history.push("/status")}
                      style={{ textDecoration: "none", cursor: 'pointer' }}
                  >
                    Upload  documents
                  </a>
                </div>
                <div class="actions_div">
                  <a 
                    //  href="/status"
                     onClick={() => history.push("/status")}
                    style={{ textDecoration: "none", cursor: 'pointer' }}
                  >
                    Pick up where I left off
                  </a>
                </div>
              </div>
              <div class="col-lg-7 text-center">
                <img src={actionImg} class="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="contact">
          <div class="container">
            <div class="row">
              {/* <div class="col-lg-6 mt-3">
                <div class="contactsDiv shadow">
                  <div class="row align-items-center">
                    <div class="col-lg-7 col-md-7 col-sm-7">
                      <h3>Contact us</h3>
                      <div class="d-flex align-items-center gap-2 contactss mt-3">
                        <i class="fa-solid fa-phone"></i>
                        <a href="tel:(855) 701 3678" style={{ color: "black" }}>
                          <span>(855) 701-3678</span>
                        </a>
                      </div>
                    </div>
                    <div class="col-lg-5 col-md-5 col-sm-5 text-center">
                      <img src={Mobile} class="contact-img" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 mt-3">
                <div class="contactsDiv shadow">
                  <div class="row align-items-center">
                    <div class="col-lg-7 col-md-7 col-sm-7">
                      <h3>Email</h3>
                      <div class="d-flex align-items-center gap-2 contactss mt-3">
                        <i class="fa-solid fa-envelope"></i>
                        <a
                          href="mailto:support@setczone.com "
                          style={{ color: "black" }}
                        >
                          <span>support@setczone.com</span>
                        </a>
                      </div>
                    </div>
                    <div class="col-lg-5 col-md-5 col-sm-5 text-center">
                      <img src={mail} class="contact-img" alt="" />
                    </div>
                  </div>
                </div>
              </div> */}
              <div class="col-lg-6 mt-3">
                <div class="contactsDiv shadow">
                  <div class="row align-items-center">
                    <div class="col-lg-7 col-md-7 col-sm-7">
                      <h3>Appointment</h3>
                      <div class="d-flex gap-2 contactss mt-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="35"
                          height="36"
                          viewBox="0 0 35 36"
                          fill="none"
                        >
                          <g clip-path="url(#clip0_12_520)">
                            <mask
                              id="mask0_12_520"
                              style={{ maskType: "luminance" }}
                              maskUnits="userSpaceOnUse"
                              x="0"
                              y="1"
                              width="34"
                              height="100"
                            >
                              <path
                                d="M17.5 13.228C20.319 13.228 22.6042 10.9428 22.6042 8.12388C22.6042 5.30493 20.319 3.01971 17.5 3.01971C14.6811 3.01971 12.3959 5.30493 12.3959 8.12388C12.3959 10.9428 14.6811 13.228 17.5 13.228Z"
                                fill="white"
                                stroke="white"
                                stroke-width="4"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M2.9167 29.9989C2.9167 23.5552 8.79305 18.3322 16.0417 18.3322"
                                stroke="white"
                                stroke-width="4"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M24.7917 31.4572C28.4161 31.4572 31.3542 28.5191 31.3542 24.8947C31.3542 21.2703 28.4161 18.3322 24.7917 18.3322C21.1673 18.3322 18.2292 21.2703 18.2292 24.8947C18.2292 28.5191 21.1673 31.4572 24.7917 31.4572Z"
                                fill="white"
                                stroke="white"
                                stroke-width="4"
                              />
                              <path
                                d="M24.0625 22.7072V25.6239H26.9792"
                                stroke="black"
                                stroke-width="4"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </mask>
                            <g mask="url(#mask0_12_520)">
                              <path
                                d="M3.05176e-05 0.103027H35V35.103H3.05176e-05V0.103027Z"
                                fill="#29ABE2"
                              />
                            </g>
                          </g>
                          <defs>
                            <clipPath id="clip0_12_520">
                              <rect
                                width="35"
                                height="35"
                                fill="white"
                                transform="translate(3.05176e-05 0.103027)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <a
                          href="mailto:support@setczone.com"
                          style={{ color: "black" }}
                        >
                          <span> Book an appointment with an SETC Expert</span>
                        </a>
                      </div>
                    </div>
                    <div class="col-lg-5 col-md-5 col-sm-5 text-center">
                      <img src={timeMang} class="contact-img" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 mt-3">
                <div class="contactsDiv shadow">
                  <div class="row align-items-center">
                    <div class="col-lg-7 col-md-7 col-sm-7">
                      <h3>Application Status</h3>
                      <div class="d-flex gap-2 contactss mt-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="27"
                          viewBox="0 0 28 27"
                          fill="none"
                        >
                          <path
                            d="M20.4167 26.353L16.4062 21.978L18.0979 20.2864L20.4167 22.6051L25.6521 17.3697L27.3438 19.4259M14.2917 26.353H2.91667C2.14312 26.353 1.40125 26.0457 0.854272 25.4988C0.307291 24.9518 0 24.2099 0 23.4364V3.01969C0 1.40094 1.29792 0.103027 2.91667 0.103027H23.3333C24.1069 0.103027 24.8487 0.410318 25.3957 0.957299C25.9427 1.50428 26.25 2.24615 26.25 3.01969V14.3947C24.9667 13.6509 23.4646 13.228 21.875 13.228L20.4167 13.3447V11.7697H5.83333V14.6864H17.0479C15.8413 15.4818 14.8512 16.5645 14.1664 17.8372C13.4817 19.1099 13.1239 20.5328 13.125 21.978C13.125 23.5676 13.5479 25.0697 14.2917 26.353ZM13.125 17.603H5.83333V20.5197H13.125M20.4167 5.93636H5.83333V8.85303H20.4167"
                            fill="#29ABE2"
                          />
                        </svg>
                        <span>
                          Check the current application status of {" "}
                          <a
                            href="/status"
                            style={{ color: "#29abe2", fontWeight: "500" }}
                          >
                            Setczone
                          </a>
                        </span>
                      </div>
                    </div>
                    <div class="col-lg-5 col-md-5 col-sm-5 text-center">
                      <img src={checklist} class="contact-img" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="text-center mt-3 mb-5 py-3">
        <h1 class="h11">Other</h1>
        <a
          href="mailto:support@setczone.com"
          style={{ textDecoration: "none" }}
        >
          <h3 class="h33">I need help with something else</h3>
        </a>
      </div>
    </div>
        </>
      )}


    </div>
  );
};

export default Support;




