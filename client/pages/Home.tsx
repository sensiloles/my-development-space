import React from 'react';
import Input from '../components/Input';
import { useAuthenticationContext } from '../providers/authentication';
import './home-page.scss';

const Home = () => {
  const {
    isAuthenticated,
    login,
    onLoginChange,
    password,
    onPasswordChange,
    onAuthenticationSubmit
  } = useAuthenticationContext();

  if (isAuthenticated) {
    return <div className="title">Home page</div>;
  }

  return (
    <form id="authentication-form" onSubmit={onAuthenticationSubmit}>
      <label htmlFor="login">
        Login:
        <Input id="login" type="text" value={login} onChange={onLoginChange} />
      </label>
      <label htmlFor="pasword">
        Password:
        <Input id="pasword" type="text" value={password} onChange={onPasswordChange} />
      </label>
      <button form="authentication-form" type="submit" aria-label="Submit">
        Submit
      </button>
    </form>
  );
};

export default Home;
