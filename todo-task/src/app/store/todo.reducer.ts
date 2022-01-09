export const GET_TODOS = 'GET_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'ADD_TODO_ERROR';

const initialState = {
  todo: [{
    id: Math.random().toFixed(2),
    task: 'Tax Submission',
    date: '2022-01-09T11:37:45.694Z',
    status: 'inactive'
  },
    {
      id: Math.random().toFixed(2),
      task: 'Return filling',
      date: '2022-01-04T11:37:45.694Z',
      status: 'inactive'
    }],
};

export function todos(state = initialState, action): any {
  switch (action?.type) {
    case GET_TODOS:
      return {
        ...state
      };
    case ADD_TODO:
      return {todo: [...state.todo, action.payload]};
    case UPDATE_TODO:
      return {todo: action.payload};
    case DELETE_TODO:
      let tasks;
      if (action.payload) {
        tasks = JSON.parse(JSON.stringify(state.todo.filter(task => task.id !== action.payload)));
      }
      return {todo: tasks};

    default:
      return state;
  }
}
