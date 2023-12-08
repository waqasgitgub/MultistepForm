// import React from 'react';
// import { Route, Switch, Redirect } from 'react-router-dom';

// import CaseZeroForm from '../Pages/CaseZeroForm/CaseZeroForm';
// import ApplicationForm from '../Pages/ApplicationForm/ApplicationForm';

// const isAuthenticated = () => {
//   // Implement your authentication logic here, e.g., check for a valid token
//   // Return true if the user is authenticated, false otherwise
//   // You might want to use a state management solution like Redux or useContext for managing authentication state
//   return true; // Replace with your authentication check
// };

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       isAuthenticated() ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to="/" />
//       )
//     }
//   />
// );

// const ApplicationFormWrapper = () => {
//   return (
//     <Switch>
//       <Route path="/application-form/case0" component={CaseZeroForm} />
//       <PrivateRoute path="/application-form/case1" component={ApplicationForm} />
//     </Switch>
//   );
// };

// export default ApplicationFormWrapper;