import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setSatus } from '../../features/todosSlice';
import { IsModalOpen } from '../../types/IsModalOpen';
import { Modal } from '../Modal';

import './TodoList.scss';

export const TodoList = () => {
  const [isModalOpen, setIsModalOpen] = useState<IsModalOpen>({});
  const { todos } = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  const handleChange = (id: number) => {
    dispatch(setSatus(id));
  };

  const handleOpenModal = (id: number) => {
    setIsModalOpen(prev => ({
      ...prev,
      [id]: true,
    }));
  };

  const handleCloseModal = (id: number) => {
    setIsModalOpen(prev => ({
      ...prev,
      [id]: false,
    }));
  };

  return (
    <table className="todo-table">
      <thead>
        <tr>
          <th className="todo-table__head">
            ID
          </th>
          <th className="todo-table__head">
            Title
          </th>
          <th className="todo-table__head">
            Description
          </th>
          <th className="todo-table__head">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => (
          <tr key={todo.id} onClick={() => handleOpenModal(todo.id)}>
            <td className="todo-table__cell">
              {todo.id}
            </td>
            <td className="todo-table__cell">
              {todo.title}
            </td>
            <td className="todo-table__cell">
              {todo.description}
            </td>
            <td className="todo-table__cell">
              <input
                type="checkbox"
                checked={todo.status}
                readOnly
              />
            </td>

            <Modal
              id={todo.id}
              isOpen={isModalOpen}
              onClose={handleCloseModal}
            >
              <h2 style={{ textAlign: 'center', fontSize: '2rem' }}>
                {todo.title}
              </h2>
              <h3>Description:</h3>
              <p>{todo.description}</p>
              <label>
                <span>Status: </span>
                <input
                  type="checkbox"
                  checked={todo.status}
                  onChange={() => handleChange(todo.id)}
                />
              </label>
            </Modal>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
