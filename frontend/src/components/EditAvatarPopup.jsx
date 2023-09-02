import { useRef } from "react"
import useFormValidation from "../utils/hooks/useFormValidation"
import PopupWithForm from "./PopupWithForm"

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isSend }) {
    const input = useRef()
    const { values, errors, isValid, isInputValid, handleChange, reset } = useFormValidation()

    function resetForClose() {
        onClose()
        reset()
    }

    function handleSubmit(e) {
        e.preventDefault()
        onUpdateAvatar({avatar: input.current.value}, reset)
    }

    return(
        <PopupWithForm
          name='avatar'
          title='Обновить аватар'
          isOpen = {isOpen}
          isSend = {isSend}
          onClose = {resetForClose}
          onYesButton={handleSubmit}
          isValid = {isValid}
        >
          <input
            ref={input}
            className={`popup__input popup__input_avatar ${isInputValid.avatar === undefined || isInputValid.avatar ? '' : 'popup__input_invalid'}`}
            id="avatar"
            name="avatar"
            type="url"
            placeholder="Ссылка на фото"
            required
            value={values.avatar ? values.avatar : ''}
            disabled={isSend}
            onChange={handleChange}
         />
          <span id="avatar-error" className="span span_type_error">{errors.avatar}</span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;