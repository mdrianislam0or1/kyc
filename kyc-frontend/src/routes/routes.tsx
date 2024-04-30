import { createBrowserRouter } from "react-router-dom";
import CustomerRegistration from "../pages/Customer/CustomerRegistration";
import CustomerLogin from "../pages/Customer/CustomerLogin";
import Home from "../components/Home";
import FinancialInstituteLogin from "../pages/FinancialInstitute/FinancialInstituteLogin";
import FinancialInstituteRegister from "../pages/FinancialInstitute/FinancialInstituteRegister";
import CentralBank from "../pages/CentralBank/CentralBankLogin";
import GetAllCustomer from "../pages/CentralBank/GetAllCustomer";
import GetAllFinancialInstitute from "../pages/FinancialInstitute/GetAllFinancialInstitute";
import CustomerProfile from "../pages/Customer/CustomerProfile";
import AddUserRequest from "../pages/FinancialInstitute/AddUserRequest";
import VerifyCustomer from "../pages/FinancialInstitute/VerifyCustomer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        // path: "/login",
        // element: <Login />,
      },
      {
        // path: "/register",
        // element: <Register />,
      },
    ],
  },
  {
    path: "/verify-otp",
    element: <VerifyCustomer />,
  },
  {
    path: "/add-users-request",
    element: <AddUserRequest />,
  },
  {
    path: "/customer-registration",
    element: <CustomerRegistration />,
  },
  {
    path: "/user/customer-profile",
    element: <CustomerProfile />,
  },
  {
    path: "/bank-login",
    element: <CentralBank />,
  },
  {
    path: "/institute-registration",
    element: <FinancialInstituteRegister />,
  },
  {
    path: "/customer-login",
    element: <CustomerLogin />,
  },
  {
    path: "/institute-login",
    element: <FinancialInstituteLogin />,
  },
  {
    path: "/all-institute",
    element: <GetAllFinancialInstitute />,
  },
  {
    path: "/superAdmin/dashboard",
    element: <GetAllCustomer />,
    children: [
      // {
      //     path: "/profile",
      //     element: <Profile />,
      // },
      // {
      //     path: "/settings",
      //     element: <Settings />,
      // },
    ],
  },
]);

export default router;
