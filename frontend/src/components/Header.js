import {useState, useEffect} from 'react';
import { useLocation} from 'react-router-dom';
import logo from '../images/logo.svg';
import burger from '../images/burger.svg';
import closeBurger from '../images/burger-close.svg';

export default function Header({loggedIn, userData, handleSignOut, navigateToLogin, navigateToRegister}) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  
  function handleClick() {
    loggedIn 
      ? handleSignOut() 
      : location.pathname === '/sign-up' 
      ? navigateToLogin() 
      : navigateToRegister();
  }

  function handleBurgerClick() {
    isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true);
  }

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);

  return (
    <header className="header">
      
      <div className="header__wrap">
        <img src={logo} alt="логотип" className="header__logo" />

        <div
          className="header__burger"
          onClick={handleBurgerClick}
        >
          <img src={isMenuOpen ? closeBurger : burger}/>
        </div> 
      </div>

      <div 
        className="header__wrap"
        style={{display: isMenuOpen || width > 600 ? "flex" : "none"}}
      >        
        <p className='header__user'>
          {loggedIn && userData && userData.email}
        </p>

        <div 
          className="header__link" 
          to="/sign-in"
          onClick={handleClick}
          >
          {loggedIn 
            ? "Выйти"
            : location.pathname === '/sign-up'
            ? "Войти"
            : "Регистрация"
          }
        </div>
      </div> 
    </header>
  )
}
