import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home'
import TodoList from './TodoList'
import '../public/style.css'
import axios from 'axios'

const App = React.createClass({
  getInitialState () {
    return {
      todos: [],
      searchTerm: ''
    }
  },

  componentDidMount () {
    axios.get('http://localhost:3000/api/todos/')
        .then((res) => {
          this.setState({todos: res.data});
        })
        .catch((error) => console.error('axios error', error));
  },
  handleSearchTermChange (event) {
    console.log(`search term value --> ${event.target.value}`);
    this.setState({
      searchTerm: event.target.value
    })
  },

  addTodo (task) {
    axios.post('http://localhost:3000/api/todos/', {"task" : task})   //[{"_id":"58d346b2f70e8d47a740112e","task":"get milk","__v":0}]
        .then((res) => {
          this.state.todos.push(res.data);
          this.setState({todos: this.state.todos});
        });
  },

  removeTodo (id) {
    const remainder = this.state.todos.filter((todo) => {
      if(todo._id !== id) return todo;
    });

    axios.delete('http://localhost:3000/api/todos/' +id)
        .then((res) => {
          this.setState({todos: remainder});
        });
  },

  render () {
    return (
        <div className="container">
        <h1 className="text-center">To Do List</h1>
        <Home addTodo={this.addTodo} handleSearchTermChange={this.handleSearchTermChange}
              searchTerm={this.state.searchTerm}/>
          <table className="table table-xs">
            <thead className="thead-default">
            <tr>
              <th>To-do</th>
              <th>Delete</th>
            </tr>
            </thead>
            <tbody>
          {this.state.todos
              .filter((todo)=> {
                return `${todo.task}`.indexOf(this.state.searchTerm) > -1;
              })
              .map((todo) => {
            return (
             <TodoList key={todo._id} todo={todo.task} todoId={todo._id} remove={this.removeTodo}/>
            )
          })}
            </tbody>
          </table>
        </div>
    )
  }
});

ReactDOM.render( <App />,
  document.getElementById('app')
);