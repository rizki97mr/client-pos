
import FormRegister from "../components/Fragments/formRegis"
import AuthLayouts from "../components/Layouts/AuthLayouts"

const RegisterPage = (props) => {
    return (
      <AuthLayouts title="Register" type="register">
        <FormRegister />
      </AuthLayouts>
    )
  }
  
  export default RegisterPage