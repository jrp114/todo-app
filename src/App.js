import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Filter from './components/filter/filter';
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
          <TodosProvider>
            <Routes>
              <Route path="/" element={<Todos />} />
              <Route path="/filter/:value?" element={<Filter />} />
              <Route path="/login" element={<div>Login</div>} />
            </Routes>
          </TodosProvider>
        </ModalProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
