import { ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED } from '../constants/ActionTypes'
import { List, Map } from 'immutable';

const initialState = List([
  Map({
    text: 'Use Redux',
    completed: false,
    id: 0
  })
]);

export default function todos(todos = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return todos.push(
        Map({
          id: todos.reduce((maxId, todo) => Math.max(todo.get('id'), maxId), -1) + 1,
          completed: false,
          text: action.text
        })
    )
    case DELETE_TODO:
      return todos.filter(todo =>
        todo.get('id') !== action.id
      )

    case EDIT_TODO:
      return todos.map(todo =>
        todo.get('id') === action.id ?
          todo.update('text', text => action.text) :
          todo
      )

    case COMPLETE_TODO:
      return todos.map(todo =>
        todo.get('id') === action.id ?
          todo.update('completed', completed => !completed) :
          todo
      )

    case COMPLETE_ALL:
      const areAllMarked = todos.every(todo => todo.get('completed'))
      return todos.map(todo => todo.update('completed', !areAllMarked)
                      )

    case CLEAR_COMPLETED:
      return todos.filter(todo => todo.get('completed') === false)

    default:
      return todos
  }
}
