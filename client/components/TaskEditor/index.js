import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actionCreators from '../../models/actions/todos'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import Categories from './Categories'
import TextField from 'material-ui/TextField';

class TaskEditorView extends React.Component{
  constructor(props){
    super(props);
    this.state={
      todoId: props.todos.todos.filter(category => category.selected)[0].id,
      title: props.todos.currentTask.title,
      text: props.todos.currentTask.text,
      done: props.todos.currentTask.done
    }
  }

  moveToCategory = (id) => {
    this.setState({ todoId: id })
  }

  saveChanges = () => {
    const { todos, actions } = this.props
    actions.editToDo(this.state)
  }

  render(){
    const { actions, todos } = this.props
    const mainCategories = todos.todos.filter(item => item.depth === 1)
    return(
      <MuiThemeProvider>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <h1>{todos.currentTask.title}</h1>
          <div style={{ alignSelf: 'flex-end'}}>
            <FlatButton
              label="Save changes"
              onClick={this.saveChanges}
              primary={true}
            />
            <FlatButton
              label="Cancel"
              onClick={() => actions.back()}
              secondary={true}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ flex: 2 }}>
              {mainCategories.map(item =>
                <Categories
                  item={item}
                  key={item.id}
                  actions={actions}
                  categories={todos.todos}
                  moveToCategory={this.moveToCategory}
                  currentId={this.state.todoId}/>
              )}
            </div>
            <div style={{ flex: 5, flexDirection: 'column', marginLeft: 20, marginRight: 20 }}>
              <TextField
                defaultValue={todos.currentTask.title}
                floatingLabelText="New task title"
                onChange={e => this.setState({ title: e.target.value })}
              />
              <input type='checkbox'
                defaultChecked={todos.currentTask.done}
                onChange={(e) => this.setState({ done: e.target.checked })}
              />
              <textarea
                style={{ flex: 1, width: '100%', height: '100%' }}
                defaultValue={todos.currentTask.text}
                onChange={e => this.setState({ text: e.target.value })}/>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

const TaskEditor = connect(
  store => ({
    todos: store.todos.present
  }),
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
  })
)(TaskEditorView);

export default TaskEditor
