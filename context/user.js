import { createContext, useState, useEffect, useContext } from 'react';
import {supabase} from '../utils/supabase';

const Context = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(supabase.auth);

  useEffect(() => {
    supabase.auth.onAuthStateChange(() => {
      setUser(supabase.auth);
    });
  }, []);

  const exposed = {
    user,
  }

  return (
    <Context.Provider value={exposed}>
      {children}
    </Context.Provider>
  );
}

export const useUser = () => useContext(Context);

export default UserProvider;