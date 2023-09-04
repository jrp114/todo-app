import './styles/App.css';
// import { ProvideTodoContext } from './todo-context';
import Todos from './components/todos/todos';
import { ModalProvider } from './modal-context';

function App() {
  return (
    <ModalProvider>
      <Todos />
    </ModalProvider>
  );
}

export default App;
