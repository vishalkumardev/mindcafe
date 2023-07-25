import React, {useState, useEffect} from 'react';
const UserAuthContext = React.createContext();
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserAuthContextProvider = ({children}) => {
  const [User, setUser] = useState('');
  const [UserType, setUserType] = useState('');

  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    AsyncStorage.getItem('Userid').then(value => {
      setUser(value);
    });
    AsyncStorage.getItem('type').then(value => {
      setUserType(value);
    });
  }

  return (
    <UserAuthContext.Provider value={{UserType, User, getUser}}>
      {children}
    </UserAuthContext.Provider>
  );
};

export {UserAuthContext, UserAuthContextProvider};
