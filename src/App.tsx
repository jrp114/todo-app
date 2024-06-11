import { lazy } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './auth-context';
import { ModalProvider } from './modal-context';
import './styles/App.css';

const LoginPage = lazy(() => import('./feature-login/login'));
const RegisterPage = lazy(() => import('./feature-register/register'));
const TasksPage = lazy(() => import('./feature-main/main'));

function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ModalProvider>
            <Routes>
              <Route path="/" key="root" element={<TasksPage />} />
              <Route path="/login" key="login" element={<LoginPage />} />
              <Route
                path="/register"
                key="register"
                element={<RegisterPage />}
              />
            </Routes>
          </ModalProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
