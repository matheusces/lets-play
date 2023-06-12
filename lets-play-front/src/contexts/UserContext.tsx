import React from 'react';

interface UserContextProps {
  isUserLogged: boolean;
  setIsUserLogged: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  userNickname: string;
  setUserNickname: React.Dispatch<React.SetStateAction<string>>;
  userImg: string;
  setUserImg: React.Dispatch<React.SetStateAction<string>>;
}

const UserContext =  React.createContext<UserContextProps>({
  isUserLogged: false,
  setIsUserLogged: () => {},
  userId: '',
  setUserId: () => {},
  userNickname: '',
  setUserNickname: () => {},
  userImg: '',
  setUserImg: () => {},
});

export default UserContext;