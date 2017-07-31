import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Task from './Task'
import FlatButton from 'material-ui/FlatButton';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actionCreators from '../../models/actions/todos'

class TasksView extends React.Component{

  componentDidMount(){
    const { todos, actions, match } = this.props
    const selectedCategory = todos.todos.filter(item => item.id == this.props.match.params.id)[0]
    actions.selectCategory(selectedCategory)
  }

  addTodo = (selectedCategory) => {
    const newTodo = {
      title: this.todoName.value,
      text: '',
      done: false,
      todoId: selectedCategory.todos.length + 1,
    }
    this.props.actions.addTodo(newTodo, selectedCategory.id)
  }

  render(){
    const { todos, actions, match } = this.props
    const showInput = todos.todos.filter(category => category.selected === true).length !== 0
    const selectedCategory = todos.todos.filter(item => item.selected === true)[0]
    return(
      <MuiThemeProvider>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          {showInput?
            <div style={{ marginTop: '20px', alignSelf: 'flex-end' }}>
              <input
                placeholder="Enter todo title"
                style={{ width: '200px', height: '20px', marginRight: '20px' }}
                ref={(input) => { this.todoName = input }} />
              <button onClick={ () => this.addTodo(selectedCategory)}>Add</button>
            </div>
              :
            null
          }
          <div style={{ marginTop: '20px' }}>
            {todos.currentTodos.map((task,index) =>
              <Task
                task={task}
                key={index}
                actions={actions}
                selectedCategory={selectedCategory}
                location={match.url}/>
            )}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
const Tasks = connect(
  store => ({
    todos: store.todos.present
  }),
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
  })
)(TasksView);

export default Tasks
