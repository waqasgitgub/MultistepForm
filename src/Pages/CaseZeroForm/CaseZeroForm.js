import React from 'react'
import NavLogin from '../../Components/Navbar/NavLogin'
import Footer from '../../Components/Footer/Footer';
import MultiStepFormCaseZero from '../../Components/MultiStepFormCaseZero';

const CaseZeroForm = () => {
  return (
    <div>
        <NavLogin/>
      <MultiStepFormCaseZero/>
      <Footer/>
   
      
    </div>
  )
}

export default CaseZeroForm
