import React from 'react'
import InputForm from '../Elements/Input'
import Button from '../Elements/Button'
import { login } from '../../services/auth.service';

const FormLogin = () => {
    const handleLogin = (event) => {
        event.preventDefault();
        // localStorage.setItem("email", event.target.email.value);
        // localStorage.setItem("password", event.target.password.value);
        
        // console.log(event.target.email.value);
        // console.log(event.target.password.value);
        const data = {
            email: event.target.email.value,
            password: event.target.password.value
        };
        
        login(data, (status, res) => {
          if(status){
            localStorage.setItem('token', res) // ambil token dari res
            window.location.href = "/"
          } else {
            setLoginFailed(res.response.data)
          }
        })
      }

    

  return (
    <form onSubmit={handleLogin}>
        <InputForm 
            label="email" 
            type="emial" 
            placeholder="email" 
            name="email" 
          />
          <InputForm 
            label="Password" 
            type="password" 
            placeholder="Password" 
            name="password" 
          />
        <Button classname="bg-blue-600 w-full" type="submit">Login</Button>
        {/* {loginFailed && <p className="text-red-500 text-center mt-5">{loginFailed}</p>} */}
    </form>
  )
}

export default FormLogin