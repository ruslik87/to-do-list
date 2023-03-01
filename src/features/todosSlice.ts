import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Todo } from '../types/todo';

interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    setSatus: (state, action: PayloadAction<number>) => {
      state.todos.map(todo => {
        if (todo.id === action.payload) {
          todo.status = !todo.status;
        }

        return todo;
      });
    },
  },
});

export const { addTodo, setSatus } = todosSlice.actions;
export default todosSlice.reducer;
