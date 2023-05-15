import './App.css';
import {Route, Routes} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import AuthLayout from "./pages/AuthPage/AuthLayout"
import Login from "./pages/AuthPage/LoginPage/Login"
import Register from "./pages/AuthPage/RegisterPage/Register"
import HomeLayout from "./pages/HomePage/LaborantLayout"
import Laborant from "./pages/HomePage/LaborantPage/Laborant"
import Admin from "./pages/HomePage/AdminPage/Admin"
import UnexpectedError from "./pages/ErrorPage/UnexpectedError"
import ErrorPage from "./pages/ErrorPage/ErrorPage"
import RequireAuth from './hooks/RequireAuth';
import ReportDetail from './pages/HomePage/LaborantPage/ReportDetail';
import ReportAdd from './pages/HomePage/LaborantPage/ReportAdd';
import AdminLayout from './pages/HomePage/AdminLayout';
import Unconfirmed from './pages/HomePage/AdminPage/Unconfirmed';
import Profile from './pages/HomePage/AdminPage/Profile';

const ROLES = {
  'laborant': "LABORANT",
  'admin': "ADMIN"
}

function App() {
  return (   
    <div className="App">
      <div className='container mt-3'>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<AuthLayout/>}>
              <Route path="login" element={<Login/>}/>
              <Route path="register" element={<Register/>}/>
              <Route path="*" element={<UnexpectedError/>}/>
            {/* Protected Routes */}
              <Route element={<RequireAuth allowedRoles={[ROLES.laborant]}/>}>
                <Route path = '/laborant' element={<HomeLayout/>}>
                  <Route path = 'reportAdd' element={<ReportAdd/>}/>
                  <Route path = 'reports' element={<Laborant/>}/>
                  <Route path = 'detail' element={<ReportDetail/>}/>
                </Route>
              </Route>

              <Route element={<RequireAuth allowedRoles={[ROLES.admin]}/>}>
                <Route path ='/admin' element={<AdminLayout/>}>
                  <Route path ='list' element={<Admin/>}/>
                  <Route path='unconfirmed' element={<Unconfirmed/>}/>
                  <Route path='profile' element={<Profile/>}/>
                </Route>
              </Route>
            {/* catch all */}
            <Route path='error' element={<ErrorPage/>}/>
            </Route>
          </Routes>
      </div>
    </div>
  );
}

export default App;
