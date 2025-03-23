
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";
// import Home from "./pages/Home";
// import ImageUploader from "./admin/ImageUploader";
// import ThemeChange from "./admin/Settings";
// import TestimonialForm from "./admin/TestimonalForm";

// import About from "./pages/About";
// import Services from "./pages/Services";
// import Contact from "./pages/Contact";
// import ServiceUploader from "./admin/ServiceUploader";
// import { LoaderProvider } from "./Context/LoaderContext";
// import { AuthProvider } from "./Context/AuthContext";
// import ProtectedRoute from "./Components/ProtectedRoute";
// import Login from "./pages/Login";
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";
// import NotFound from "./Components/NotFound/NotFound";
// import PageButtons from "./admin/PageButtons";
// import MiniDrawer from "./admin/MiniDrawer";

// function App() {
//   return (
//     <LoaderProvider> 
//       <AuthProvider>
//         <Router>
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/" element={<Home />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/services" element={<Services />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//             <Route path="/reset-password/:token" element={<ResetPassword />} />
//             <Route path="/admin/pages" element={<PageButtons/>} />
//             <Route path="*" element={<NotFound />} />
//             {/* Protected Admin Routes */}
//             <MiniDrawer/>
//             <Route element={<ProtectedRoute />}>
//               <Route path="/admin/bannerupload" element={<ImageUploader />} />
//               <Route path="/admin/settings" element={<ThemeChange />} />
//               <Route path="/admin/testimonials" element={<TestimonialForm />} />
//               <Route path="/admin/serviceuploader" element={<ServiceUploader />} />
//             </Route>
//           </Routes>
//         </Router>
//       </AuthProvider>
//     </LoaderProvider>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ImageUploader from "./admin/ImageUploader";
import ThemeChange from "./admin/Settings";
import TestimonialForm from "./admin/TestimonalForm";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import ServiceUploader from "./admin/ServiceUploader";
import { LoaderProvider } from "./Context/LoaderContext";
import { AuthProvider } from "./Context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./Components/NotFound/NotFound";
import PageButtons from "./admin/PageButtons";
import MiniDrawer from "./admin/MiniDrawer";
import Profile from "./admin/Profile";
import LeadsPage from "./admin/LeadsPage";
import ContactPage from "./Components/Contact/ContactPage";
import CustomersPage from "./admin/CustomersPage";
import ContactsPage from "./admin/ContactsPage";
import StatsCards from "./admin/StatsCards";

function App() {
  return (
    <LoaderProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/admin/pages" element={<PageButtons />} />
            <Route path="*" element={<NotFound />} />

            {/* Protected Admin Routes with MiniDrawer */}
            <Route element={<ProtectedRoute />}>
              <Route element={<MiniDrawer />}>
                <Route path="/admin/bannerupload" element={<ImageUploader />} />
                <Route path="/admin/settings" element={<ThemeChange />} />
                <Route path="/admin/testimonials" element={<TestimonialForm />} />
                <Route path="/admin/serviceuploader" element={<ServiceUploader />} />
                <Route path="/admin/profile" element={<Profile />} />
                <Route path="/admin/leads" element={<LeadsPage />} />
                <Route path="/admin/contacts" element={<ContactsPage />} />
                <Route path="/admin/customers" element={<CustomersPage />} />
                <Route path="/admin/dashboard" element={<StatsCards />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </LoaderProvider>
  );
}

export default App;
