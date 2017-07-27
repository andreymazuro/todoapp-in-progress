import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Task from './Task'

export default class Tasks extends React.Component{
  render(){
    const { tasks, actions } = this.props
    const showInput = tasks.currentTodos.length !== 0
    const selectedCategory = tasks.todos.filter(item => item.selected === true)[0]
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
            {tasks.currentTodos.map((task,index) =>
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
