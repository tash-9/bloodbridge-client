import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";
import PublicRequests from "./pages/PublicRequests";
import RequestDetails from "./pages/RequestDetails";
import Funding from "./pages/Funding";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Profile from "./pages/dashboard/Profile";
import MyRequests from "./pages/dashboard/MyRequests";
import RequestForm from "./pages/dashboard/RequestForm";
import AllUsers from "./pages/dashboard/AllUsers";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route path="/donation-requests" element={<PublicRequests />} />

        <Route
          path="/requests/:id"
          element={
            <ProtectedRoute>
              <RequestDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/funding"
          element={
            <ProtectedRoute>
              <Funding />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<Profile />} />
          <Route path="my-donation-requests" element={<MyRequests />} />
          <Route path="create-donation-request" element={<RequestForm />} />
          <Route path="edit-request/:id" element={<RequestForm edit />} />

          <Route
            path="all-users"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AllUsers />
              </ProtectedRoute>
            }
          />

          <Route
            path="all-blood-donation-request"
            element={
              <ProtectedRoute roles={["admin", "volunteer"]}>
                <MyRequests all />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}
