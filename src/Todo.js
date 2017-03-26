import React from 'react'
import TodoList from './TodoList'

const Todo = React.createClass({
  render () {
    const { todos, searchTerm, remove } = this.props;
    return (
        <table className="table table-xs">
          <thead className="thead-default">
          <tr>
            <th>To-do</th>
            <th>Delete</th>
          </tr>
          </thead>
          <tbody>
          {todos
              .filter((todo)=> {
                return `${todo.task}`.indexOf(searchTerm) > -1;
              })
              .map((todo) => {
                return (
                    <TodoList key={todo._id} todo={todo.task} todoId={todo._id} remove={remove}/>
                )
              })}
          </tbody>
        </table>
    )
  }
});

export default Todo;