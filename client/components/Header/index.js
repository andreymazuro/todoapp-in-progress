import React from 'react'

export default class Header extends React.Component{
  render(){
    return(
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>TO-DO LIST</h1>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <input type="checkbox" style={{ marginRight: '10px' }}/>
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
