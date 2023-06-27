import React, { useCallback, useMemo } from 'react';
import { userAPIClient } from 'api/user';

interface ContextType {
  isAuthenticated: boolean;
  login: string;
  password: string;
  onLoginChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAuthenticationSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const NOOP = (): void => undefined;

const DEFAULT_CONTEXT = {
  isAuthenticated: false,
  login: '',
  password: '',
  onLoginChange: NOOP,
  onPasswordChange: NOOP,
  onAuthenticationSubmit: NOOP
};

const AuthenticationContext = React.createContext<ContextType>(DEFAULT_CONTEXT);

export const useAuthenticationContext = () => React.useContext(AuthenticationContext);

function AuthenticationProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setAuthenticated] = React.useState(false);
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.currentTarget.value);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const onAuthenticationSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const response = await userAPIClient.authenticate({ login, password });
        setAuthenticated(true);
        // eslint-disable-next-line no-console
        console.log(response);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    [login, password]
  );

  const contextValue = useMemo(() => {
    return {
      isAuthenticated,
      login,
      password,
      onLoginChange,
      onPasswordChange,
      onAuthenticationSubmit
    };
  }, [isAuthenticated, login, onAuthenticationSubmit, password]);

  return (
    <AuthenticationContext.Provider value={contextValue}>{children}</AuthenticationContext.Provider>
  );
}

export default AuthenticationProvider;
