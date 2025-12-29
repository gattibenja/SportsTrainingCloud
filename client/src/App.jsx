import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home.jsx';
import Navbar from './components/nav/Nav.jsx';
import UserManagement from './pages/usersManagement/Users.management.jsx';
import Userlogin from './pages/user/user.login.jsx';
import Usersignup from './pages/user/User.signup.jsx';
import AthleteProfile from './pages/athleteProfile/AthleteProfile.jsx';
import About from './pages/about/About.jsx';
import './App.css';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import RegisterTrainings from './pages/registerTrainings/RegisterTrainings.jsx';
function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user/login" element={<Userlogin />} />
                <Route path="/user/signup" element={<Usersignup />} />
                <Route path="/admin/users" element={<UserManagement />} />
                <Route path="/athlete/profile" element={<AthleteProfile />} />
                <Route path="/about" element={<About />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/athlete/trainings" element={<RegisterTrainings />} />
                
                
            </Routes>
        </>
    )
}

export default App
