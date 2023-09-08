import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Filter from './components/filter/filter';
import Todos from './components/todos/todos';
import { ModalProvider } from './modal-context';
import './styles/App.css';
import TodosProvider from './todos-context';

function App() {
  return (
    <BrowserRouter>
      <ModalProvider>
        <TodosProvider>
          <Routes>
            <Route path="/" element={<Todos />} />
            <Route path="/filter/:value?" element={<Filter />} />
          </Routes>
        </TodosProvider>
      </ModalProvider>
    </BrowserRouter>
  );
}

export default App;
