import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './auth-context';
import Filter from './components/filter/filter';
import { Login } from './components/login';
import { Register } from './components/register';
import Todos from './components/todos/todos';
import { ModalProvider } from './modal-context';
import './styles/App.css';
import TodosProvider from './todos-context';

function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <Routes>
            <Route
              path="/"
              element={
                <AuthProvider>
                  <TodosProvider>
                    <Todos />
                  </TodosProvider>
                </AuthProvider>
              }
            />
            <Route
              path="/filter/:value?"
              element={
                <AuthProvider>
                  <TodosProvider>
                    <Filter />
                  </TodosProvider>
                </AuthProvider>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </ModalProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
