import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Task from './Task'

export default class Tasks extends React.Component{
  render(){
    const { tasks } = this.props
    return(
      <MuiThemeProvider>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <div style={{ marginTop: '20px', alignSelf: 'flex-end' }}>
            <input />
            <button>Add</button>
          </div>
          <div style={{ marginTop: '20px' }}>
            {tasks.map((task,index) =>
              <Task task={task} key={index}/>
            )}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
