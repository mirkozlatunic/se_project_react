import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
// import ModalWithForm from '../ModalWithForm/ModalWithForm'
import ItemModal from "../ItemModal/ItemModal";
import React, { useState, useEffect } from "react";
import {
  getForcastWeather,
  parseWeatherData,
  parseLocationData,
} from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Switch, Route, useHistory } from "react-router-dom";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import api from "../../utils/api";
import auth from "../../utils/auth";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  // const [newClothingItem, setNewClothingItem] = useState({})
  const [weatherLocation, setWeatherLocation] = useState("");
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleCreateModal = () => {
    setActiveModal("create");
  };
  const handleCloseModal = () => {
    setActiveModal("");
  };
  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleSignupModal = () => {
    setActiveModal("signup");
  };

  const handleEditProfileModal = () => {
    setActiveModal("editProfile");
  };

  const handleLoginModal = () => {
    setActiveModal("login");
  };

  const handleSignUp = (user) => {
    auth
      .createUser(user)
      .then((newUser) => {
        console.log(newUser);
        setLoggedIn(true);
        setCurrentUser(newUser.data);
        handleCloseModal();
        localStorage.setItem("jwt", newUser.token);
        console.log(currentUser);
      })
      .catch(console.error);
  };

  const handleLogIn = (email, password) => {
    auth
      .login(email, password)
      .then((res) => {
        const token = res.token;
        localStorage.setItem("jwt", res.token);
        return auth.getContent(token).then((data) => {
          const user = data.user;
          setLoggedIn(true);
          setCurrentUser(user);
          handleCloseModal();
          history.push("/profile");
        });
      })
      .catch(console.error);
  };

  // const handleUserChanges = (editUser) => {
  //   auth
  //     .editProfile(editUser)
  //     .then((newUser) => {
  //       console.log(newUser);
  //       setCurrentUser(newUser);
  //       handleCloseModal();
  //     })
  //     .catch(console.error);
  // };

  const handleUserChanges = (data) => {
    setIsLoading(true);
    auth
      .editProfile(data)
      .then((res) => setCurrentUser(res.data))
      .then(() => handleCloseModal())
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  const handleLogOut = () => {
    setCurrentUser("");
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/");
  };

  const handleLikeClick = ({ id, isLiked, user }) => {
    const token = localStorage.getItem("jwt");
    isLiked
      ? api

          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((c) => (c._id === id ? updatedCard.data : c))
            );
          })
          .catch(console.error)
      : api

          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((c) => (c._id === id ? updatedCard.data : c))
            );
          })
          .catch(console.error);
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const handleAddItemSubmit = (item) => {
    api
      .postNewClothingItem(item)
      .then((newItem) => {
        setClothingItems([newItem.data, ...clothingItems]);
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleDeleteItemSubmit = (card, token) => {
    api
      .deleteClothingItems(card._id, token)
      .then(() => {
        setClothingItems((cards) => cards.filter((c) => c._id !== card._id));
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleEditProfile = (data) => {
    setIsLoading(true);
    api
      .editUserProfile(data)
      .then((res) => setCurrentUser(res))
      .then(() => handleCloseModal())
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getForcastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        const location = parseLocationData(data);
        setTemp(temperature);
        setWeatherLocation(location);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    api
      .getClothingItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return; // stop the effect not to add the listener if there is no active modal
    const handleEscClose = (e) => {
      // define the function inside useEffect not to lose the reference on rerendering
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      // don't forget to add a clean up function for removing the listener
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser(res);
            setLoggedIn(true);
          }
        })
        .catch(console.error);
    } else {
      localStorage.removeItem("jwt");
      setLoggedIn(false);
      console.log("Token not Found");
    }
  }, [loggedIn, history]);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider
        value={currentUser}
        setLoggedIn={setLoggedIn}
      >
        <Header
          onCreateModal={handleCreateModal}
          temp={temp}
          user={currentUser}
          onSignUpModal={handleSignupModal}
          onLogInModal={handleLoginModal}
          loggedIn={loggedIn}
          weatherLocation={weatherLocation}
        />
        <Switch>
          <Route exact path="/">
            <Main
              weatherTemp={temp}
              onSelectCard={handleSelectedCard}
              clothingItems={clothingItems}
              loggedIn={loggedIn}
              onCardLike={handleLikeClick}
            />
          </Route>
          <ProtectedRoute path="/profile" loggedIn={loggedIn}>
            <Profile
              onCreateModal={handleCreateModal}
              onSelectCard={handleSelectedCard}
              clothingItems={clothingItems}
              handleEditProfileModal={handleEditProfileModal}
              handleLogOut={handleLogOut}
              onCardLike={handleLikeClick}
              loggedIn={loggedIn}
            />
          </ProtectedRoute>
        </Switch>
        <Footer />
        {activeModal === "create" && (
          <AddItemModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "create"}
            handleAddItemSubmit={handleAddItemSubmit}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal
            selectedCard={selectedCard}
            onClose={handleCloseModal}
            handleDeleteItemSubmit={handleDeleteItemSubmit}
          />
        )}
        {activeModal === "signup" && (
          <RegisterModal
            handleCloseModal={handleCloseModal}
            onSignUp={handleSignUp}
            isOpen={activeModal === "signup"}
            handleDeleteItemSubmit={handleDeleteItemSubmit}
            onLogInModal={handleLoginModal}
            setActiveModal={setActiveModal}
          />
        )}
        {activeModal === "login" && (
          <LoginModal
            handleCloseModal={handleCloseModal}
            onLogin={handleLogIn}
            onSignUpModal={handleSignupModal}
            isOpen={activeModal === "login"}
          />
        )}
        {activeModal === "editProfile" && (
          <EditProfileModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "edit"}
            onSubmit={handleUserChanges}
            currentUser={currentUser}
            setActiveModal={setActiveModal}
            handleEditProfileModal={handleEditProfile}
            isLoading={isLoading}
          />
        )}
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
