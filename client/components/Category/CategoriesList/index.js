import React from 'react'
import CategoryItem from './CategoryItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class CategoriesList extends React.Component{
  constructor(){
    super();
    this.state={
      openModal: false,
      categoryId: undefined
    }
  }

  selectCategory = (item) => {
    this.props.actions.selectCategory(item)
  }

  deleteCategory = () => {
    this.props.actions.deleteCategory(this.state.categoryId)
    this.setState({ openModal: false })
  }

  getChildById = (id) => {
    return this.props.categories.filter(item => item.id == id)[0]
  }

  expand = (item,e,action) => {
    e.stopPropagation()
    this.props.actions.hideCategory(item, action)
  }

  handleCloseModal = () => {
    this.setState({ openModal: false })
  }

  handleOpenModal = (id) => (e) => {
    e.stopPropagation()
    this.setState({
      openModal: true,
      categoryId: id
    })
  }

  render(){
    const { item, index, style, actions, categories } = this.props
    const modalActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleCloseModal}
      />,
      <FlatButton
        label="Delete"
        secondary={true}
        keyboardFocused={true}
        onClick={this.deleteCategory}
      />,
    ];

    var children = []
    if (item) {
      var children = item.childrenId
    }
    return(
      <MuiThemeProvider>
        <div>
          <Dialog
            actions={modalActions}
            title="Are you sure"
            modal={false}
            open={this.state.openModal}
            onRequestClose={this.handleCloseModal}
          >
            Are you sure?
          </Dialog>
          {(item && item.visible)?
            <CategoryItem
              item={item}
              actions={actions}
              style={ style }
              selectCategory={ this.selectCategory }
              deleteCategory={ this.handleOpenModal }
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
      </MuiThemeProvider>
    )
  }
}
