import React from 'react'
import CategoriesList from './CategoriesList'

export default class CategoryList extends React.Component{

  addCategory = () => {
    const { actions, todos } = this.props
    const newCategory = {
      id: todos.currentId + 1,
      depth: 1,
      name: this.categoryName.value,
      visible: true,
      todos: [],
      childrenId: [],
    }
    actions.addCategory(newCategory)
  }

  render(){
    const categories = this.props.todos.todos
    const mainCategories = categories.filter(item => item.depth === 1)
    return(
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ marginTop: '20px' }}>
          <input
            ref={(input) => { this.categoryName = input }} />
          <button onClick={this.addCategory }>Add</button>
        </div>
        <div style={{ marginTop: '20px' }}>
          {mainCategories.map((item, index) =>
            <CategoriesList
              item={item}
              key={index}
              categories={categories}
              actions={this.props.actions}/>
          )}
        </div>
      </div>
    )
  }
}
