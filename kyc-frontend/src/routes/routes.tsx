import { createBrowserRouter } from "react-router-dom";
import CustomerRegistration from "../pages/Customer/CustomerRegistration";
import CustomerLogin from "../pages/Customer/CustomerLogin";
import Home from "../components/Home";

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
    path: "/customer-registration",
    element: <CustomerRegistration />,
  },
  {
    path: "/customer-login",
    element: <CustomerLogin />,
  },
  {
    path: "/dashboard",
    // element: <Dashboard />,
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
