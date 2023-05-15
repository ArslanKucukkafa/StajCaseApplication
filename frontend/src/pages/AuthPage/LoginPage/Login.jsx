import FormInput from '../../../components/FormInput'
import AuthService from '../../../services/auth.service';
import {useState} from 'react';
import { useNavigate,useLocation} from "react-router-dom";
import "./Login.css";
import {useEffect} from 'react'

const Login =() => {

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state?.from?.pathname)


  const [user, setUser] = useState({
    laborant_id: "",
    password: ""
  });


  const inputs =[
    {
      id: 1,
      name: "laborant_id",
      type: "text",
      placeholder: "laborant_id",
      errorMessage:
        "laborant_id should be 3-16 characters and shouldn't include any special character!",
      label: "laborant_id",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    }
  ]


  const handleSubmit = (e) => {
    localStorage.clear()
    e.preventDefault();
    let response=null
    let from="";
    AuthService.login(user).then((res)=>{
    response=res;
      console.log(response)
      if(response.data.status===true){
          if(response.data.rol==='ADMIN'){
            from = "/admin/list";} 

          else if(response.data.rol==='LABORANT'){
            from = "/laborant/reports";}
          }
          localStorage.setItem("accesToken",JSON.stringify(res.data.token))
          localStorage.setItem("role",JSON.stringify(res.data.rol));

          console.log("from: "+from)
          navigate(from,{replace:true});
      })
  }

  useEffect(() => {
    let ignore = false;
    
    if (!ignore)  localStorage.clear()
    return () => { ignore = true; }
    },[]);


  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={user[input.name]}
            onChange={onChange}
          />
        ))}
        <button>Submit</button>
        <p>Don't have an account?  <a href="register">Register here</a></p>
      </form>
    </div>
  )
}

export default Login