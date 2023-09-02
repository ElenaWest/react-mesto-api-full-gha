import PopupWithForm from "./PopupWithForm"
import useFormValidation from "../utils/hooks/useFormValidation"
import Input from "./Input"

function AddPlacePopup({ isOpen, onClose, onAddPlace, isSend, }) {
    const { values, errors, isValid, isInputValid, handleChange, reset } = useFormValidation()

    function resetForClose() {
        onClose()
        reset()
    }

    function handleSubmit(e) {
        e.preventDefault()
        onAddPlace({ title: values.title, link: values.link }, reset)
    }

    return(
        <PopupWithForm
          name='picture'
          title='Новое место'
          buttonText='Создать'
          isOpen = {isOpen}
          onClose = {resetForClose}
          isValid = {isValid}
          onYesButton={handleSubmit}
          isSend = {isSend}
          >

            <Input
            name="title"
            type="text"
            placeholder="Название"
            value={values.title ? values.title : ''}
            onChange={handleChange}
            isInputValid={isInputValid.title}
            error={errors.title}
            minLength={2}
            maxLength={30}
            disabled={isSend}
            required
             />

            <Input
            name="link"
            type="url"
            placeholder="Ссылка на картинку"
            value={values.link ? values.link : ''}
            onChange={handleChange}
            isInputValid={isInputValid.link}
            error={errors.link}
            disabled={isSend}
            required
             />
          
        </PopupWithForm>
    )
}

export default AddPlacePopup;