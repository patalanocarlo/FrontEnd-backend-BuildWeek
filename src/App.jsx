import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./components/Registration";
import Home from "./components/Home";
import Login from "./components/Login";
import MyNavbar from "./components/MyNavbar";
import NotFound from "./components/NotFound";
import MyFooter from "./components/MyFooter";
import AdminDashboard from "./components/AdminDashboard";
import FormCompanyRegistration from "./components/FormCompanyRegistration";

function App() {
  return (
    <div>
      <BrowserRouter>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route
            path="/companyregistration"
            element={<FormCompanyRegistration />}
          />
          <Route path="*" element={<NotFound />} />
          {/* <Route path="/dettagli/:" element={< />} /> */}
        </Routes>
        <MyFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;
