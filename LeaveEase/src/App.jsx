import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import LoginPage from './Pages/Login';
import { AuthProvider } from './AuthContext';
import LandingPage from './Pages/LandingPage';
import AboutPage from './Pages/About';
import ContactUs from './Pages/ContactUs';
import FeaturesPage from './Pages/Features';
import AdminDashboard from './Pages/AdminDashboard';
import HolidayList from './Pages/HolidayList';
import ManagersPage from './Pages/ManagerPage';
// import LeaveManagementDashboard from './Pages/Dashboard';

function App() {
  

  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path='/' element={<LandingPage/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path='/contact' element={<ContactUs/>}/>
        <Route path='/features' element={<FeaturesPage/>}/>
        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
        <Route path='/holidays' element={<HolidayList/>}/>
        <Route path='/managers' element={<ManagersPage/>}/>
        {/* <Route path='/dashboard' element={<LeaveManagementDashboard/>}/> */}
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App
