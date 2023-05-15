import React from 'react';
import "./Register.css"
import {useState } from "react";
import AuthService from '../../../services/auth.service';
import { useNavigate} from "react-router-dom";
import FormInput from '../../../components/FormInput';




const Register = () => {

  const navigate =useNavigate();

  const [values, setValues] = useState({
    name: "",
    surname: "",
    laborant_id: "",
    password: "",
    confirmPassword: "",
  });

  //const [successful, setSuccessful] = useState(false);
  //const [message, setErrMsg] = useState("");

  const inputs =[

    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "name",
      errorMessage:
        "name should be 3-16 characters and shouldn't include any special character!",
      label: "name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "surname",
      type: "text",
      placeholder: "surname",
      errorMessage: "It should be a valid laboran_id address!",
      label: "surname",
      required: true,
    },
    {
      id: 3,
      name: "laborant_id",
      type: "text",
      placeholder: "laborant_id",
      errorMessage: "It should be a valid laboran_id address!",
      label: "laborant_id",
      required: true,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ]

  const handleSubmit = (e) => {
    console.log("test 1")

    e.preventDefault();
    try{
      AuthService.register(values).then((response) => {
        if(response.data.status===false){
          console.log(response.data.message)
        }else{
          setValues("","","","","")
          navigate("/login")
        
        }
      console.log(response)
      })
    }catch(err){
      console.log("error ERROR")
      if (!err?.response) {
    } else {
    }
}
    }


  

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (<>
  
 {(
 <div className='App'>
  <form onSubmit={handleSubmit}>
    <h2>Register</h2>
    {inputs.map((input)=>(
      <FormInput key={input.id}
      {...input}value={values[input.name]}
      onChange={onChange}
      />
    ))}
      <button>sign up</button>
      <p>Already Have account? <a href="login">Login</a></p>
  </form>
</div>)}

  </>)
}

export default Register