import React, { useEffect, useState, Suspense } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./index.scss";
// import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "layouts/Admin.js";
import ClientLayout from "layouts/Client.js";
import AuthLayout from "layouts/Auth.js";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import ErrorPage500 from "common/helpers/ErrorPage404/errorPage500";
import Loader from "common/CanvasLoader/Loader";
import { Spinner } from "reactstrap";
import PaymentDetails from "./views/PaymentDetails ";
import { Provider } from "react-redux";
import store from "./Redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Custom hook to track previous location
function usePrevious(value) {
  const [prev, setPrev] = useState(null);

  useEffect(() => {
    setPrev(value);
  }, [value]);

  return prev;
}

const Protected = ({ children, role }) => {
  const authToken = localStorage.getItem("authToken");
  // const [isLoading, setIsLoading] = useState(true);
  // const [isVerified, setIsVerified] = useState(false);

  // useEffect(() => {
  //   const verifyToken = async () => {
  //     if (!authToken) {
  //       setIsLoading(false);
  //       return;
  //     }

  //     try {
  //       const response = await fetch(
  //         "https://api1.paykuber.com/api/users/verifyToken",
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${authToken}`,
  //           },
  //         }
  //       );

  //       if (response.ok) {
  //         const decodedToken = jwtDecode(authToken);
  //         const userRole = decodedToken.role;

  //         if (userRole === role) {
  //           setIsVerified(true);
  //         } else {
  //           toast.error("You are not authorized to access this page");
  //         }
  //       } else {
  //         toast.error("Session expired, please login again.");
  //         localStorage.clear();
  //       }
  //     } catch (error) {
  //       console.error("Error verifying token:", error);
  //       toast.error("Error verifying session. Please login again.");
  //       localStorage.clear();
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   verifyToken();
  // }, [authToken, role]);

  // if (isLoading) {
  //   return (
  //     <div
  //       className="d-flex align-items-center justify-content-center"
  //       style={{ height: "90vh" }}
  //     >
  //       <Spinner />
  //     </div>
  //   );
  // }

  if (!authToken) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

const App = () => {
  const location = useLocation();
  const prevLocation = usePrevious(location.pathname);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      prevLocation?.startsWith("/auth") &&
      (location.pathname.startsWith("/admin") ||
        location.pathname.startsWith("/account") ||
        location.pathname.startsWith("/merchant") ||
        location.pathname.startsWith("/broker") ||
        location.pathname.startsWith("/agent"))
    ) {
      setLoading(true);
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3-second loader

    return () => clearTimeout(timer);
  }, [location.pathname, prevLocation]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Suspense
          fallback={
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: "100vh" }}
            >
              <Spinner />
            </div>
          }
        >
          <Routes>
            {/* Admin routes */}
            <Route
              path="/admin/*"
              element={
                <Protected role="admin">
                  <AdminLayout />
                </Protected>
              }
            />

            {/* Client routes */}
            <Route
              path="/merchant/*"
              element={
                <Protected role="merchant">
                  <ClientLayout />
                </Protected>
              }
            />

            {/* Other routes */}
            <Route path="/auth/not-authorized" element={<ErrorPage500 />} />
            <Route path="/auth/*" element={<AuthLayout />} />
            <Route
              path="/merchant/payment_details"
              element={<PaymentDetails />}
            />
            <Route path="*" element={<Navigate to="/auth/login" replace />} />
          </Routes>
        </Suspense>
      )}
      <ToastContainer />
    </>
  );
};

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
