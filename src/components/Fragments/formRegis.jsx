import { useNavigate } from "react-router-dom";
import Button from "../Elements/Button"
import InputForm from "../Elements/Input"
import { useState } from "react";
import axios from "axios";
import { message } from "antd";

const FormRegister = () => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    

    const handleRegister = async (e) => {
      console.log(name, email, password, confPassword)
      e.preventDefault();
      try {
          await axios.post('http://localhost:3000/auth/register', {
              full_name: e.target.name.value,
              email: e.target.email.value,
              password: e.target.password.value,
              confPassword: confPassword
          });
          message.success('Register Sucessfully');
          navigate("/login");
      } catch (error) {
          if (error) {
            console.log(error)
          }
      }
  }

    return (
      <form onSubmit={handleRegister}>
          <InputForm 
              label="Fullname" 
              type="text" 
              placeholder="Full Name" 
              name="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
            />
          <InputForm 
              label="Email" 
              type="email" 
              placeholder="Email" 
              name="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputForm 
              label="Password" 
              type="password" 
              placeholder="Password" 
              name="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputForm 
              label="Confirm Password" 
              type="password" 
              placeholder="Confirm Password" 
              name="ConfirmPassword" 
              value={confPassword} 
              onChange={(e) => setConfPassword(e.target.value)}
            />
          <Button classname="bg-blue-600 w-full" type="submit">Register</Button>
      </form>
    )
  }
  
  export default FormRegister