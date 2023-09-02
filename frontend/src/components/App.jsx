import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";
import { useCallback, useEffect, useState } from "react";
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import api from '../utils/api.js';
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";
import ProtectedRouteContent from "./ProtectedRouteContent.jsx"
import InfoTooltip from "./InfoTooltip.jsx";
import { registration, authorization, getUserData } from "../utils/auth.js"
import Register from "./Register.jsx";
import Login from "./Login.jsx";

function App() {
  const navigate = useNavigate()
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isImagePopup, setIsImagePopup] = useState(false)
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)
  const [isResultPopupOpen, setIsResultPopupOpen] = useState(false)
  const [selectedCard, setselectedCard] = useState({})
  const [isSend, setIsSend] = useState(false)
  const [currentUser, setCurrentUser] =  useState({})
  const [userEmail, setUserEmail] = useState('')
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteCardId, setdeleteCardId] = useState('')
  const [loggedIn, setLoggedIn] = useState(false) 
  const [isSuccessful, setIsSuccessful] = useState(false)

  const setStatesForClosePopups  = useCallback (() => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopup(false);
    setIsDeletePopupOpen(false)
    setIsResultPopupOpen(false)
  }, [])  

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        setStatesForClosePopups();
      }
    };
      if (
      isAddPlacePopupOpen ||
      isImagePopup ||
      isDeletePopupOpen ||
      isEditAvatarPopupOpen ||
      isEditProfilePopupOpen ||
      isResultPopupOpen
    ) {
      document.addEventListener("keydown", handleEscClose);
    }

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [
    isAddPlacePopupOpen,
    isImagePopup,
    isDeletePopupOpen,
    isEditAvatarPopupOpen,
    isEditProfilePopupOpen,
    isResultPopupOpen,
    setStatesForClosePopups,
  ]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    if (jwt) {
      getUserData(jwt)
        .then(res => {        
          setUserEmail(res.email)
          setLoggedIn(true)
          navigate('/')
        })
        .catch((error) => console.error(`Ошибка авторизации при повторном входе ${error}`))
    } else {
      setLoggedIn(false)
    }
  }, [navigate])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setselectedCard(card);
    setIsImagePopup(true);
  }

  function handleDeletePopupClick(cardId) {
    setdeleteCardId(cardId);
    setIsDeletePopupOpen(true);
  }

  useEffect(() => {
    if (loggedIn) {
    setIsLoading(true)
    Promise.all([api.getInfo(localStorage.jwt), api.getCards(localStorage.jwt)])
      .then(([dataUser, dataCard]) => {
        setCurrentUser(dataUser)
        setCards(dataCard)
        setIsLoading(false)
      })
      .catch((error) => console.error(`Ошибка при загрузке начальных данных страницы ${error}`))
    }
}, [loggedIn])

  function handleCardDelete(e) {
    e.preventDefault()
    setIsSend(true)
    api.deleteCard(deleteCardId, localStorage.jwt)
      .then(() => {
        setCards(cards.filter(card => {
          return card._id !== deleteCardId
        }))
        setStatesForClosePopups()
      })
      .catch((error) => console.error(`Ошибка при удалении карточки ${error}`))
      .finally(() => setIsSend(false))
  }

  function handleUpdateUser(dataUser, reset) {
    setIsSend(true)
    api.setUserInfo(dataUser, localStorage.jwt)
      .then(res => {
        setCurrentUser(res)
        setStatesForClosePopups()
        reset()
      })
      .catch((error) => console.error(`Ошибка при редактировании данных профиля ${error}`))
      .finally(() => setIsSend(false))
  }

  function handleUpdateAvatar(dataUser, reset) {
    setIsSend(true)
    api.setNewAvatar(dataUser, localStorage.jwt)
      .then(res => {
        setCurrentUser(res)
        setStatesForClosePopups()
        reset()
      })
      .catch((error) => console.error(`Ошибка при редактировании изображения ${error}`))
      .finally(() => setIsSend(false))
  }

  function handleAddPlaceSubmit(dataCard, reset) {
    setIsSend(true)
    api.addCard(dataCard, localStorage.jwt)
      .then((res) => {
        setCards([res, ...cards])
        setStatesForClosePopups()
        reset()
      })
      .catch((error) => console.error(`Ошибка при добавлении новой карточки ${error}`))
      .finally(() => setIsSend(false))
  }

  const handleLike = useCallback((card) => {
    const isLike = card.likes.some(element => currentUser._id === element)
    if (isLike) {
      api.deleteLike(card._id, localStorage.jwt)
        .then(res => {
          setCards(cards => cards.map((item) => item._id === card._id ? res : item))
        })
        .catch((error) => console.error(`Ошибка при снятии лайка ${error}`)) 
    } else {
      api.addLike(card._id, localStorage.jwt)
        .then(res => {
          setCards(cards => cards.map((item) => item._id === card._id ? res : item))
        })
        .catch((error) => console.error(`Ошибка при добавлении лайка ${error}`))
    }
  }, [currentUser._id])

  function handleLogin(password, email) {
    setIsSend(true)
    authorization(password, email)
      .then(res => {
        localStorage.setItem('jwt', res.token)
        setLoggedIn(true)
        window.scrollTo(0, 0)
        navigate('/')
      })
      .catch(error => {
        setIsResultPopupOpen(true)
        setIsSuccessful(false)
        console.error(`Ошибка при авторизации ${error}`)
      })
      .finally(() => setIsSend(false))
  }
  
  function handleRegister(password, email) {
    setIsSend(true)
    registration(password, email)
      .then(() => {
        setIsResultPopupOpen(true)
        setIsSuccessful(true)
        window.scrollTo(0, 0)
        navigate('/sign-in')
      })
      .catch(error => {
        setIsResultPopupOpen(true)
        setIsSuccessful(false)
        console.error(`Ошибка при регистрации ${error}`)
      })
      .finally(() => setIsSend(false))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__contener">
        <Header
          userEmail = {userEmail}
         />
        <Routes>
          <Route path='/' element={<ProtectedRoute
            element = {ProtectedRouteContent}
            onAddPlace = {handleAddPlaceClick}
            onEditProfile = {handleEditProfileClick}
            onEditAvatar = {handleEditAvatarClick}
            onCardClick = {handleCardClick}
            onDelete = {handleDeletePopupClick}
            onCardLike={handleLike}
            cards = {cards}
            isLoading = {isLoading}
            loggedIn = {loggedIn}
           />
            } />
          <Route path='/sign-up' element={
            <>
              <Register name='signup' handleRegister={handleRegister} />
            </>
            } />
          <Route path='sign-in' element={
            <>
              <Login name='signin' handleLogin={handleLogin} />           
            </>
            } />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>

        <Footer />

          <EditProfilePopup
            onUpdateUser = {handleUpdateUser}
            isOpen = {isEditProfilePopupOpen}
            onClose = {setStatesForClosePopups}
            isSend = {isSend}
           />
          <AddPlacePopup
            onAddPlace = {handleAddPlaceSubmit}
            isOpen = {isAddPlacePopupOpen}
            onClose = {setStatesForClosePopups}
            isSend = {isSend}
           />
          <EditAvatarPopup
            onUpdateAvatar = {handleUpdateAvatar}
            isOpen = {isEditAvatarPopupOpen}
            onClose = {setStatesForClosePopups}
            isSend = {isSend}         
           />
          <PopupWithForm
            name='deletecard'
            title='Вы уверены?'
            buttonText='Да'
            isOpen = {isDeletePopupOpen}
            onClose = {setStatesForClosePopups}
            onYesButton = {handleCardDelete}
            isSend = {isSend}
          />
          <ImagePopup
            onClose = {setStatesForClosePopups}
            card = {selectedCard}
            isOpen = {isImagePopup}
          />

          <InfoTooltip
            name='result'
            isSuccessful={isSuccessful}
            isOpen={isResultPopupOpen}
            onClose={setStatesForClosePopups}
           />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;