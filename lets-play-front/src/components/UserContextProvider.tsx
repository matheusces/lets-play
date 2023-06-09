import UserContext from '../contexts/UserContext';
import { useState } from 'react';

interface UserContextProviderProps {
  children: React.ReactNode;
}

function UserContextProvider({ children }: UserContextProviderProps) {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [userId, setUserId] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [userImg, setUserImg] = useState('');

  return (
    <UserContext.Provider value={{ isUserLogged, setIsUserLogged, userId, setUserId, userNickname, setUserNickname, userImg, setUserImg }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider