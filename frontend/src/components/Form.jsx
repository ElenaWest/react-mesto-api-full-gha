function Form({ name, buttonText, children, isValid, onSubmit, isSend }) {
  

    return(
        <form name={name} noValidate onSubmit={onSubmit} className="auth__form">
          {children}
          {{login:
             <button
               className={`auth__submit ${isSend ? 'auth__submit_loading' : ''} ${isValid ? '' : 'auth__submit_disabled'}`}
               type="submit"
               disabled={isSend || !isValid}>
               {isSend ? '' : buttonText || 'Сохранить'}
             </button>,
             popup:
             <button
               className={`popup__save-button ${isSend ? 'popup__save-button_loading' : ''} ${isValid ? '' : 'popup__save-button_disabled'}`}
               type="submit"
               disabled={isSend || !isValid}>
               {isSend ? '' : buttonText || 'Сохранить'}
             </button>}[`${name === 'signin' || name === 'signup' ? 'login' : 'popup'}`]}
        </form>
    )}            

export default Form