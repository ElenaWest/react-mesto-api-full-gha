import Form from './Form';
import { Link } from 'react-router-dom';

function PageForLogin({ name, children, isValid, onSubmit }) {
  return (
    <div className="auth__contener page__sizing">
      <h2 className="auth__title">{name === 'signup' ? 'Регистрация' : 'Вход'}</h2>
      <Form
        name={name}
        buttonText={name === 'signup' ? 'Регистрация' : 'Войти'}
        children={children}
        isValid={isValid}
        onSubmit={onSubmit}
       />
       {name === 'signup' && <figcaption className="auth__figcaption">Уже зарегистрированы? <Link to={'/sign-in'} className="auth__figcaption auth__figcaption_link">Войти</Link></figcaption>}
    </div>  
  )
}

export default PageForLogin;