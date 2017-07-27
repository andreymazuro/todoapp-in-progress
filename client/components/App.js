import React from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actionCreators from '../models/actions/todos'

import Header from './Header'
import ProgressBar from './ProgressBar'
import CategoryList from './Category'
import Tasks from './Tasks'

class ToDoAppView extends React.Component {

  componentDidMount(){
    this.props.actions.fetchTodos()
  }

  render() {
    const { todos, actions } = this.props
    return (
      <div>
        <Header />
        <ProgressBar />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flex: 2 }}>
            <CategoryList
              todos={todos}
              actions={actions}/>
          </div>
          <div style={{ display: 'flex', flex: 5, marginLeft: '10px' }}>
            <Tasks
              tasks={todos}
              actions={actions}/>
          </div>
        </div>
      </div>
    )
  }
}

const ToDoApp = connect(
  store => ({
    todos: store.todos
  }),
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
  })
)(ToDoAppView);

export default ToDoApp
