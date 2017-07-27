import React from 'react'
import FontIcon from 'material-ui/FontIcon';

export default class Task extends React.Component{

  checkboxToggle = () => {
    const { selectedCategory, task, actions, num } = this.props
    actions.changeTodoStatus(selectedCategory.id, num)
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
        <FontIcon className="material-icons">mode_edit</FontIcon>
      </div>
    )
  }
}
