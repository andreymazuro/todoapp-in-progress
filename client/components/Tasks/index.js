import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Task from './Task'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actionCreators from '../../models/actions/todos'

class TasksView extends React.Component{

  componentDidMount(){
    const { todos, actions, match } = this.props
    const selectedCategory = todos.todos.filter(item => item.id == this.props.match.params.id)[0]
    actions.selectCategory(selectedCategory)
  }

  render(){
    const { todos, actions } = this.props
    const showInput = todos.currentTodos.length !== 0
    const selectedCategory = todos.todos.filter(item => item.selected === true)[0]
    return(
      <MuiThemeProvider>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          {showInput?
            <div style={{ marginTop: '20px', alignSelf: 'flex-end' }}>
              <input />
              <button>Add</button>
            </div>
              :
            null
          }
          <div style={{ marginTop: '20px' }}>
            {todos.currentTodos.map((task,index) =>
              <Task
                task={task}
                key={index}
                num={index}
                actions={actions}
                selectedCategory={selectedCategory}/>
            )}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
const Tasks = connect(
  store => ({
    todos: store.todos
  }),
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
  })
)(TasksView);

export default Tasks
