import { BrowserRouter, Routes, Route } from "react-router-dom";
import Career from "./pages/Candidate/Career";
import Navbar from "./components/Candidate/Navbar";
import Home from "./pages/Candidate/Home";
import About from "./pages/Candidate/About";
import Contact from "./pages/Candidate/Contact";
import Mission from "./pages/Candidate/Mission";
import type { JSX } from "react";
import Footer from "./components/Candidate/Footer";
import ViewJob from "./pages/Candidate/ViewJob";
import Login from "./pages/Candidate/Login";
import Signup from "./pages/Candidate/SignUp";
import JobApply from "./pages/Candidate/JobApply";
import MyApplications from "./pages/Candidate/MyApplications";
import EditProfile from "./pages/Candidate/EditPage";
import ApplicationDetails from "./pages/Candidate/ApplicationDetails";
import LoginPage from "./pages/Interviewer/LoginPage";
import InterviewListPage from "./pages/Interviewer/InterviewListPage";
import ApplicationDetailsPage from "./pages/Interviewer/ApplicationDetailsPage";

function App(): JSX.Element {
  return (
    <div>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/careers" element={<Career />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/viewjob/:id" element={<ViewJob/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/apply/:jobId" element={<JobApply/>}/>
        <Route path="/myApplications" element={<MyApplications/>}/>
        <Route path="/application/:id" element={<ApplicationDetails/>}/>
        <Route path="/edit-profile" element={<EditProfile/>}/>
        <Route path="/interviewer" element={<LoginPage/>}/>
        <Route path="/interviewer/interviewList" element={<InterviewListPage />} />
        <Route path="/interviewer/:interviewId" element={<ApplicationDetailsPage />} />
      </Routes>
    </BrowserRouter>
     <Footer/>
     </div>
  );
}

export default App;
