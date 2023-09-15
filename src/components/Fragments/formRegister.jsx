import Button from "../Elements/Button"
import InputForm from "../Elements/Input"

const FormRegister = () => {
    return (
      <form>
          <InputForm 
              label="Fullname" 
              type="text" 
              placeholder="Full Name" 
              name="fullname" 
            />
          <InputForm 
              label="Email" 
              type="email" 
              placeholder="Email" 
              name="email" 
            />
            <InputForm 
              label="Password" 
              type="password" 
              placeholder="Password" 
              name="password" 
            />
            <InputForm 
              label="Confirm Password" 
              type="password" 
              placeholder="Confirm Password" 
              name="ConfirmPassword" 
            />
          <Button classname="bg-blue-600 w-full">Login</Button>
      </form>
    )
  }
  
  export default FormRegister