import React from 'react'
import CategoryItem from './CategoryItem';

export default class CategoriesList extends React.Component{

  selectCategory = (item) => {
    this.props.actions.selectCategory(item)
  }

  deleteCategory = (id) => (e) => {
    e.stopPropagation();
    this.props.actions.deleteCategory(id)
  }

  getChildById = (id) => {
    return this.props.categories.filter(item => item.id == id)[0]
  }

  expand = (item,e,action) => {
    e.stopPropagation()
    this.props.actions.hideCategory(item, action)
  }


  render(){
    const { item, index, style, actions, categories } = this.props
    var children = []
    if (item) {
      var children = item.childrenId
    }
    return(
      <div>
        {(item && item.visible)?
          <CategoryItem
            item={item}
            actions={actions}
            style={ style }
            selectCategory={ this.selectCategory }
            deleteCategory={ this.deleteCategory }
            editCategoryName={ this.editCategoryName }
            expand={ this.expand }/>
            :
          null
        }
        {children.map((child,index) =>
          <CategoriesList
            key={index}
            actions={actions}
            categories={categories}
            item={this.getChildById(child)}
            style={{ marginLeft: `${item.depth*15}px`}} />
        )}
      </div>
    )
  }
}
