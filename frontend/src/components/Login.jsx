import useFormValidation from "../utils/hooks/useFormValidation";
import PageForLogin from "./PageForLogin";
import Input from "./Input";

function Login({ name, handleLogin }) {
    const {values, errors, isValid, isInputValid, handleChange } = useFormValidation()

    function onLogin(e) {
        e.preventDefault()
        handleLogin(values.password, values.email)
    }

    return(
        <PageForLogin name={name} onSubmit={onLogin} isValid={isValid}>
            <Input
              name="email"
              type="email"
              placeholder={"Email"}
              value={values.email}
              onChange={handleChange}
              isInputValid={isInputValid.email}
              error={errors.email}
             />
            <Input
              name="password"
              type="password"
              placeholder={"Пароль"}
              minLength={4}
              value={values.password}
              onChange={handleChange}
              isInputValid={isInputValid.password}
              error={errors.password}
             />
        </PageForLogin>
    )
}

export default Login;