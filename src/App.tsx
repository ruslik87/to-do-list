import './App.scss';
import { Form } from './components/Form';
import { TodoList } from './components/TodoList';

const App = () => {
  return (
    <div className="todo-app">
      <Form />
      <TodoList />
    </div>
  );
};

export default App;
