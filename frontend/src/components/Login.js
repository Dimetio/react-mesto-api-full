import {useState} from 'react';

export default function Login({handleLogin}) {
  const [formParams, setFormParams] = useState({email: "", password: ""});

  function handleSubmit(e) {
    e.preventDefault();
    let {email, password} = formParams;
    handleLogin({email, password})
      .catch(err => {
        console.log(err.message)
      });
  }

  function handleChange(e) {
    const {name, value} = e.target;
    setFormParams(prev => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <div className="sign">
      <form 
        className="sign__form"
        onSubmit={handleSubmit}
      >
        <h2 className="sign__title">Вход</h2>

        <input
          className="sign__input"
          type="email"
          name="email"
          placeholder="Email"
          value={formParams.email || ''}
          required
          onChange={handleChange}
          autoComplete="off"
        />

        <input
          className="sign__input"
          type="password"
          name="password"
          placeholder="Пароль"
          required
          minLength="4"
          maxLength="12"
          value={formParams.password || ''}
          onChange={handleChange}
          autoComplete="off"
        />

        <button className="sign__submit">Войти</button>
      </form>
    </div>
  )
}
