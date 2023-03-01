import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addTodo } from '../../features/todosSlice';
import { InputName } from '../../types/inputs';
import { Todo } from '../../types/todo';
import { Error } from '../Error';

import './Form.scss';

export const Form = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isTitleEpmty, setIsTitleEpmty] = useState(false);
  const [isDescriptionEpmty, setIsDescriptionEpmty] = useState(false);
  const dispatch = useAppDispatch();
  const { todos } = useAppSelector(state => state.todos);

  const resetInputs = () => {
    setTitle('');
    setDescription('');
  };

  const resetErrors = () => {
    setIsTitleEpmty(false);
    setIsDescriptionEpmty(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !description) {
      !title && setIsTitleEpmty(true);
      !description && setIsDescriptionEpmty(true);

      return;
    }

    const todo: Todo = {
      id: todos.length + 1,
      title,
      description,
      status: false,
    };

    dispatch(addTodo(todo));
    resetInputs();
    resetErrors();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetErrors();
    const value = e.target.value.trimStart();
    const { name } = e.target;

    switch (name) {
      case InputName.Title:
        setTitle(value);
        break;

      case InputName.Description:
        setDescription(value);
        break;

      default:
        break;
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <fieldset className="form__field">
        <legend>Create ToDo</legend>
        <div>
          <input
            className={
              isTitleEpmty
                ? 'form__input form__input--error'
                : 'form__input'
            }
            type="text"
            name={InputName.Title}
            value={title}
            placeholder="Enter title"
            onChange={handleChange}
          />

          <Error isEpmty={isTitleEpmty} />
        </div>
        <div>
          <input
            className={
              isDescriptionEpmty
                ? 'form__input form__input--error'
                : 'form__input'
            }
            type="text"
            name={InputName.Description}
            value={description}
            placeholder="Enter description"
            onChange={handleChange}
          />

          <Error isEpmty={isDescriptionEpmty} />
        </div>

        <button type="submit" className="form__button">
          Create
        </button>
      </fieldset>
    </form>
  );
};
