import { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface AuthContextProps {
  children: React.ReactNode;
}

const AuthContext = createContext<any>(undefined);

export default function AuthProvider({ children }: AuthContextProps) {
  const [session, setSession] = useState(() => {
    return JSON.parse(localStorage.getItem('todo-app-session') as string);
  });

  useEffect(() => {
    const updateSession = () => {
      const updatedSession = JSON.parse(
        localStorage.getItem('todo-app-session') as string,
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
