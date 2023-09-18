import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(undefined);

export default function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    return JSON.parse(localStorage.getItem('todo-app-session'));
  });

  useEffect(() => {
    const updateSession = () => {
      const updatedSession = JSON.parse(
        localStorage.getItem('todo-app-session'),
      );
      setSession(updatedSession);
    };

    window.addEventListener('storage', updateSession);

    return () => {
      window.removeEventListener('storage', updateSession);
    };
  }, [session]);
  const state = useMemo(() => {
    return {
      session,
    };
  }, [session]);
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);
