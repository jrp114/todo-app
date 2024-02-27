import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './auth-context';
import { Login } from './feature-login.tsx/login';
import { Todos } from './feature-main/main';
import { Register } from './feature-register/register';
import { ModalProvider } from './modal-context';
import './styles/App.css';

function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ModalProvider>
            <Routes>
              <Route path="/" element={<Todos />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </ModalProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
