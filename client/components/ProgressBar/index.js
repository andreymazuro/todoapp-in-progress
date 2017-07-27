import React from 'react'
import { Line } from 'rc-progress';

export default class ProgressBar extends React.Component{

  getPercent = () => {
    const categories = this.props.todos.todos
    var todoStatuses = categories.map(category =>{
      return category.todos.map(todo =>{
        if (todo.done) {
          return true
        }
        return false
      })
    })
    const completedCategoriesNumber = todoStatuses.filter(item => item.every(x => x === true )).length
    return completedCategoriesNumber/categories.length * 100
  }

  render(){
    const percent = this.getPercent()
    return(
        <Line percent={percent} strokeColor="green" />
    )
  }
}
