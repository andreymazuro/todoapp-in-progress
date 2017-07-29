import React from 'react'

export default class Header extends React.Component{

  setFilter = () => {
    this.props.actions.setTodosFilter()
  }

  render(){
    return(
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>TO-DO LIST</h1>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <input
            defaultChecked={true}
            type="checkbox"
            style={{ marginRight: '10px' }}
            onChange={this.setFilter}/>
          <p style={{ marginRight: '10px' }}>Show done</p>
          <input
            type="search"
            placeholder="search"
          />
        </div>
      </div>
    )
  }
}
