import React, {createContext, useState} from 'react';
import {Keys, readString} from '../utils/storage';

const AuthContext = createContext(null);
const {Provider} = AuthContext;

const AuthProvider = ({children}) => {
  const [jwts, setJwts] = useState();
  const [mfaMethods, setMfaMethods] = useState();
  const [biometricsEnable, setBiometricsEnable] = useState(true);

  const [authState, setAuthState] = useState({
    accessToken: null,
    refreshToken: null,
    authenticated: false,
    tokenCreateDate: null,
  });

  const logout = async () => {
    //set Token here blank
    setAuthState({
      accessToken: null,
      refreshToken: null,
      authenticated: false,
      tokenCreateDate: null,
    });
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  async function getTokenTime() {
    var tokenDate = await readString(Keys.CURRENT_TIME);
    if (tokenDate) {
      setAuthState(prevAuthState => {
        return {
          ...prevAuthState,
          tokenCreateDate: tokenDate,
        };
      });
    }
  }
  async function getJwtToken() {
    var jwtToken = await readString(Keys.JWT_TOKEN);
    if (jwtToken) {
      setAuthState(prevAuthState => {
        return {
          ...prevAuthState,
          accessToken: jwtToken,
        };
      });
    }
  }
  async function getBiometricEnable() {
    var biometricEnable = await readString(Keys.BIOMETRICS);
    if (biometricEnable) {
      setBiometricsEnable(biometricEnable);
    }
  }

  useState(() => {
    getTokenTime();
    getJwtToken();
    getBiometricEnable();
  }, []);

  return (
    <Provider
      value={{
        biometricsEnable,
        setBiometricsEnable,
        authState,
        getAccessToken,
        setAuthState,
        logout,
        setJwts,
        jwts,
        setMfaMethods,
        mfaMethods,
      }}>
      {children}
    </Provider>
  );
};

export {AuthContext, AuthProvider};

//How to use?
//const {authState, biometricsEnable, setAuthState} = useContext(AuthContext);
