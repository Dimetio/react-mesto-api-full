import {useState} from 'react';
import {Link} from 'react-router-dom';

export default function Register({handleRegister}) {
  const [formParams, setFormParams] = useState({email: "", password: ""});

  const handleSubmit = (e) => {
    e.preventDefault();
    let {email, password} = formParams;
    handleRegister({email, password})
      .catch(err => {
        console.log(err.message)
      });
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormParams(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="sign">
      <form 
        className="sign__form"
        onSubmit={handleSubmit}
      >
        <h2 className="sign__title">Регистрация</h2>
        <input
          className="sign__input"
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formParams.email || ''}
          onChange={handleChange}
          autoComplete="off"
        />

        <input
          className="sign__input"
          type="password"
          name="password"
          placeholder="Пароль"
          minLength="4"
          maxLength="12"
          required
          value={formParams.password || ''}
          onChange={handleChange}
          autoComplete="off"
        />

        <button className="sign__submit">Зарегистрироваться</button>

        <p className="sign__text">Уже зарегистрированы?&nbsp;
          <Link 
            to="/sign-in" 
            className="sign__link"
          >
          Войти
          </Link>
        </p>
      </form>
    </div>
  )
}
