import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';

export default class Header extends React.Component{

  setFilter = () => {
    const filter = this.filter.value
    const showDone = this.showDone.checked
    this.props.actions.setTodosFilter(showDone, filter)
  }

  render(){
    const { actions, state } = this.props
    return(
      <MuiThemeProvider>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>TO-DO LIST</h1>
          <FlatButton
            secondary={true}
            disabled={state.past.length === 0}
            onClick={() => actions.undoAction()}
            label="Undo"/>
          <FlatButton
            secondary={true}
            disabled={state.future.length === 0}
            onClick={() => actions.redoAction()}
            label="Redo"/>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <input
              ref={(input) => { this.showDone = input }}
              defaultChecked={true}
              type="checkbox"
              style={{ marginRight: '10px' }}
              onChange={this.setFilter}/>
            <p style={{ marginRight: '10px' }}>Show done</p>
            <input
              onChange={this.setFilter}
              type="search"
              placeholder="search"
              ref={(input) => { this.filter = input }} />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
