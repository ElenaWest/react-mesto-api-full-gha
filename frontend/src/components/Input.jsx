function Input({ name, type, placeholder, minLength, maxLength, value, onChange, isInputValid, error, isSend }) {

    return(
      <>
        <input
        name={name}
        type={type}
        placeholder={placeholder}
        minLength={minLength ? minLength : ''}
        maxLength={maxLength ? maxLength : ''}
        required
        className={name === 'password' || name === 'email' ? `auth__input ${isInputValid === undefined || isInputValid ? '' : 'auth__input_invalid'}` : `popup__input ${isInputValid === undefined || isInputValid ? '' : 'popup__input_invalid'}`}
        value={value ? value : ''}
        onChange={onChange}
        disabled={isSend}
         />
        <span className={name === 'password' || name === 'email' ? 'auth__span auth__span_type_error' : 'span span_type_error'}>{error}</span>
      </>
)}

export default Input;