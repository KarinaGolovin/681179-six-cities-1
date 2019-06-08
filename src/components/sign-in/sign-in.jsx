import React from 'react';
import PropTypes from 'prop-types';

export const SignIn = (props) => {
  const {onLogin} = props;

  return <main className="page__main page__main--login">
    <div className="page__login-container container">
      <section className="login">
        <h1 className="login__title">Sign in</h1>
        <form className="login__form form" action="#" method="post" onSubmit={(evt) => {
          evt.preventDefault();
          const data = new FormData(evt.target);
          onLogin({
            email: data.get(`email`),
            password: data.get(`password`)
          });
        }}>
          <div className="login__input-wrapper form__input-wrapper">
            <label className="visually-hidden">E-mail</label>
            <input className="login__input form__input" type="email" name="email" placeholder="Email" defaultValue="" required={true} />
          </div>
          <div className="login__input-wrapper form__input-wrapper">
            <label className="visually-hidden">Password</label>
            <input className="login__input form__input" type="password" name="password" placeholder="Password" defaultValue="" required={true} />
          </div>
          <button className="login__submit form__submit button" type="submit">Sign in</button>
        </form>
      </section>
      <section className="locations locations--login locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>Amsterdam</span>
          </a>
        </div>
      </section>
    </div>
  </main>;
};

SignIn.propTypes = {
  onLogin: PropTypes.func.isRequired,
};


