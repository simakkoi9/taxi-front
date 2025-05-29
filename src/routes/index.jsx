import { createBrowserRouter } from "react-router";
import App from "../App";
import { ROUTE_CONSTANTS } from "../store";
import Drivers from "../components/Drivers";
import Login from "../components/Login";

export const ROUTES = createBrowserRouter([
  {
    path: "/",
    element: (
      //   <ProtectedRoute>
      <App />
      // </ProtectedRoute>
    ),
    children: [
      {
        path: ROUTE_CONSTANTS.drivers,
        element: <Drivers />,
      },
      {
        path: ROUTE_CONSTANTS.login,
        element: <Login />,
      },
    ],
  },
  // {
  //   path: ROUTE_CONSTANTS.passengers,
  //   element: <Passengers />,
  // },

  // {
  //   path: ROUTE_CONSTANTS.cars,
  //   element: <Cars />,
  // },
  // {
  //   path: ROUTE_CONSTANTS.rides,
  //   element: <Rides />,
  // },
  // {
  //   path: ROUTE_CONSTANTS.ratings,
  //   element: <Ratings />,
  // },
]);
