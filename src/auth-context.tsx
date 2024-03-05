import { createContext, useContext, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextProps {
  children: React.ReactNode;
}

const AuthContext = createContext<any>(undefined);

export default function AuthProvider({ children }: AuthContextProps) {
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener('storage', () => {
      if (!localStorage.getItem('task-app-session')) {
        navigate('/login');
      }
    });
  }, []);

  const session = useMemo(() => {
    return JSON.parse(localStorage.getItem('task-app-session') as string);
  }, [localStorage.getItem('task-app-session')]);

  const state = useMemo(() => {
    return {
      session,
    };
  }, [session]);
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);
