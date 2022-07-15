import {useState, useEffect} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletionConfirmationPopup from './DeletionConfirmationPopup';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api';
import * as auth from '../utils/auth';
import CurrentUserContext from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isCardDeletePopupOpen, setIsCardDeletePopupOpen] = useState(false);

  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [cards, setCards] = useState([]);
  const [cardToRemove, setCardToRemove] = useState({})
  const [currentUser, setCurrentUser] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegOk, setIsRegOk] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  function tokenCheck() {
    if(localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt');
      auth.getToken(jwt)
        .then(res => {
          if(res) {
            const userData = {
              id: res._id,
              email: res.email,
            };
            setLoggedIn(true);
            setUserData(userData);
          }
        })
        .catch(err => console.log(err));
    }
  }

  function signOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUserData(null);
    navigate('/sign-in');
  }

  function navigateToLogin() {
    navigate('/sign-in');
  }

  function navigateToRegister() {
    navigate('/sign-up');
  }

  function handleLogin({email, password}) {
    return auth.login(email, password)
      .then(data => {
        setLoggedIn(true);
        if(data['token']) {
          localStorage.setItem('jwt', data['token']);
          tokenCheck();
        }
      })
      .catch((err) => {
        setIsInfoPopupOpen(true);
        navigate("/");
      });
  }

  function handleRegister({email, password}) {
    return auth.register(email, password)
      .then(() => {
        setIsRegOk(true);
        navigate('/sign-in');
      })
      .catch((err) => {
        console.log(err.message)
        setIsRegOk(false);
      })
      .finally(() => {
        setIsInfoPopupOpen(true);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardTrashClick(card) {
    setCardToRemove(card);
    setIsCardDeletePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoPopupOpen(false);
    setIsCardDeletePopupOpen(false);
    setSelectedCard({ name: '', link: '' });
  }

  function handleUpdateUser(data) {
    return api.setUserInfo(data)
      .then(res => {
        setCurrentUser(res)
      })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar(data) {
    return api.setAvatar(data)
      .then(res => {
        setCurrentUser(res);
      })
      .catch(err => console.log(err));
  }

  function handleAddPlaceSubmit(card) {
    return api.createCard(card)
      .then(newCard => {
        setCards([newCard, ...cards]);
      })
      .catch(err => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete() {
    api.deleteCard(cardToRemove._id)
      .then(() => {
        setCards(cards.filter((el) => (el._id !== cardToRemove._id)))
      })
      .catch(err => console.log(err))
      .finally(() => closeAllPopups());
  }

  useEffect(() => {
    if(loggedIn) {
      navigate('/');
    }
  }, [loggedIn]);

  useEffect(() => {
    tokenCheck();

    if(loggedIn) {
      Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userInfo, cardList]) => {
        setCurrentUser(userInfo);
        setCards(cardList);
      })
      .catch(err => console.log(err));
    }
  }, [loggedIn]);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header 
          loggedIn={loggedIn}
          handleSignOut={signOut}
          userData={userData}
          navigateToLogin={navigateToLogin}
          navigateToRegister={navigateToRegister}
        />
        
        <Routes>
          <Route
            index
            element={
              <ProtectedRoute
                path='/'
                loggedIn={loggedIn}
              >
              <Main
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardTrashClick}
              />
            </ProtectedRoute>
            }
          />

          <Route 
            path="/sign-up" 
            element={<Register handleRegister={handleRegister}/>} 
          />

          <Route 
            path="/sign-in" 
            element={<Login handleLogin={handleLogin} 
            tokenCheck={tokenCheck}/>}
          />
        </Routes>

        <Footer />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <DeletionConfirmationPopup
          isOpen={isCardDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
        />

        <InfoTooltip
          isOpen={isInfoPopupOpen}
          onClose={closeAllPopups}
          isOk={isRegOk}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
