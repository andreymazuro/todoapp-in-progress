import React from 'react'
import CategoryItem from './Item'

export default class Categories extends React.Component{

  getChildById = (id) => {
    return this.props.categories.filter(item => item.id == id)[0]
  }

  render(){
    const { actions, categories, item, style, currentId, moveToCategory } = this.props
    var children = []
    if (item) {
      var children = item.childrenId
    }
    return(
      <div>
        {item?
          <CategoryItem
            item={item}
            actions={actions}
            hideButton={item.id === currentId}
            moveToCategory={moveToCategory}
            style={ style }/>
            :
          null
        }
        {children.map((child,index) =>
          <Categories
            key={index}
            actions={actions}
            categories={categories}
            currentId={currentId}
            moveToCategory={moveToCategory}
            item={this.getChildById(child)}
            style={{ marginLeft: `${item.depth*15}px`}} />
        )}
      </div>
    )
  }
}
