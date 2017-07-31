import React from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route } from 'react-router-dom'

import * as actionCreators from '../models/actions/todos'

import Header from './Header'
import ProgressBar from './ProgressBar'
import CategoryList from './Category'
import Tasks from './Tasks'
import TaskEditor from './TaskEditor'

class ToDoAppView extends React.Component {

  render() {
    const { todos, actions, state } = this.props
    return (
      <div>
        <Header
          state={state}
          actions={actions}/>
        <ProgressBar
          todos={todos}/>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flex: 2 }}>
            <CategoryList
              todos={todos}
              actions={actions}/>
          </div>
          <div style={{ display: 'flex', flex: 5, marginLeft: '10px' }}>
            <Route exact path={`/category/:id`} component={Tasks} />
          </div>
        </div>
      </div>
    )
  }
}

const ToDoApp = connect(
  store => ({
    todos: store.todos.present,
    state: store.todos
  }),
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
  })
)(ToDoAppView);

export default ToDoApp
