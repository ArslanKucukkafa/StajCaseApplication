import axios from 'axios';

const API_URL = "http://localhost:8080";

const register = (values) => {
    console.log(values)
    return axios.post(API_URL + "/api/v1/laboratories/save",values,{headers:{'Content-Type': 'application/json' },});
  };

  const login = (values) => {
   return axios.post(API_URL + "/api/v1/laboratories/login",values,{headers: { 'Content-Type': 'application/json' },})};

  const logout = () => {
    localStorage.removeItem("accesToken");
    localStorage.removeItem("role");};

      const AuthService = {
        register,
        login,
        logout
      }

      export default AuthService;

