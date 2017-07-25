import React from 'react';
import Header from './Header'
import ProgressBar from './ProgressBar'

export default class ToDoApp extends React.Component {
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <Header />
        <ProgressBar />
        <h1>Hello World</h1>
      </div>
    )
  }
}
