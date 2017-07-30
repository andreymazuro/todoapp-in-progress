import React from 'react'
import FontIcon from 'material-ui/FontIcon';

export default class Task extends React.Component{

  checkboxToggle = () => {
    const { selectedCategory, task, actions } = this.props
    actions.changeTodoStatus(selectedCategory.id, task.todoId)
  }

  editTodo = () => {
    const { selectedCategory, task, actions, location } = this.props
    this.props.actions.selectTask(task, location)
  }

  render(){
    const { task } = this.props
    return(
      <div style={{ borderWidth: '1px', borderStyle: 'solid', display: 'flex', flexDirection: 'row', height: '50px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <input type='checkbox'
            checked={task.done}
            onChange={this.checkboxToggle}
          />
          <p style={{ marginLeft: '20px' }}>{task.title}</p>
        </div>
        <FontIcon onClick={this.editTodo} className="material-icons">mode_edit</FontIcon>
      </div>
    )
  }
}
