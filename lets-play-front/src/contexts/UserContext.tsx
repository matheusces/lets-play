import React from 'react';

interface UserContextProps {
  isUserLogged: boolean;
  setIsUserLogged: React.Dispatch<React.SetStateAction<boolean>>;
  userNickname: string;
  setUserNickname: React.Dispatch<React.SetStateAction<string>>;
  userImg: string;
  setUserImg: React.Dispatch<React.SetStateAction<string>>;
}

const UserContext =  React.createContext<UserContextProps>({
  isUserLogged: false,
  setIsUserLogged: () => {},
  userNickname: '',
  setUserNickname: () => {},
  userImg: '',
  setUserImg: () => {},
});

export default UserContext;