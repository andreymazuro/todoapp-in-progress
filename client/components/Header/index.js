import React from 'react'

export default class Header extends React.Component{

  setFilter = () => {
    const filter = this.filter.value
    const showDone = this.showDone.checked
    this.props.actions.setTodosFilter(showDone, filter)
  }

  render(){
    return(
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>TO-DO LIST</h1>
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
    )
  }
}
