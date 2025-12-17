import { createBrowserRouter } from "react-router";
import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import MyReview from "../pages/MyReview";
// public pages
import Home from "../pages/Home";
import Meals from "../pages/Meals";
import MealDetails from "../pages/MealDetails";
import Reviews from "../pages/Reviews";
import Favorites from "../pages/Favorites";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";

// dashboard pages role switcher
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Orders from "../pages/Orders";
import CreateMeal from "../pages/CreateMeal";
import MyMeals from "../pages/MyMeals";
import OrderRequests from "../pages/OrderRequests";
import ManageUsers from "../pages/ManageUsers";
import ManageRequests from "../pages/ManageRequests";
import Statistics from "../pages/Statistics";
import OrderPage from "../pages/OrderPage";
import PaymentSuccess from "../pages/PaymentSuccess";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "meals", element: <Meals /> },
      {
        path: "meals/:id",
        element: (
          <ProtectedRoute>
            <MealDetails />
          </ProtectedRoute>
        ),
      },
      { path: "reviews", element: <Reviews /> },
      { path: "favorites", element: <Favorites /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "payment-success", element: <PaymentSuccess /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "profile", element: <Profile /> },

      // user routes (protected only by login)
      { path: "orders", element: <Orders /> },
      { path: "favorites", element: <Favorites /> },
      // { path: "reviews", element: <Reviews /> },
      { path: "my-review", element: <MyReview /> },
      { path: "order/:id", element: <OrderPage /> },
      // chef-only routes
      {
        path: "create-meal",
        element: (
          <RoleRoute role="chef">
            <CreateMeal />
          </RoleRoute>
        ),
      },
      {
        path: "my-meals",
        element: (
          <RoleRoute role="chef">
            <MyMeals />
          </RoleRoute>
        ),
      },
      {
        path: "order-requests",
        element: (
          <RoleRoute role="chef">
            <OrderRequests />
          </RoleRoute>
        ),
      },

      // admin-only routes
      {
        path: "manage-users",
        element: (
          <RoleRoute role="admin">
            <ManageUsers />
          </RoleRoute>
        ),
      },
      {
        path: "manage-requests",
        element: (
          <RoleRoute role="admin">
            <ManageRequests />
          </RoleRoute>
        ),
      },
      {
        path: "statistics",
        element: (
          <RoleRoute role="admin">
            <Statistics />
          </RoleRoute>
        ),
      },
    ],
  },
  // Catch-all route for 404
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
