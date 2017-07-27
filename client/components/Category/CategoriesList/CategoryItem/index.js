import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export default class CategoryItem extends React.Component{
  constructor(){
    super();
    this.state={
      openRenameModal: false,
      openAddModal: false,
      name: '',
      newCategoryName: '',
      reverseIcon: false,
    }
  }

  editCategoryName = () => {
    this.setState({openRenameModal: false})
    this.props.actions.editCategoryName(this.props.item.id, this.state.name)
  }

  addNestedCategory = () => {
    this.props.actions.addNestedCategory(this.props.item.id, this.state.newCategoryName)
    this.setState({openAddModal: false});
  }

  handleOpenRenameModal = (e) => {
    e.stopPropagation()
    this.setState({openRenameModal: true});
   };

   handleCloseRenameModal = () => {
     this.setState({openRenameModal: false});
   };

   handleOpenAddModal = (e) => {
     e.stopPropagation()
     this.setState({openAddModal: true});
    };

    handleCloseAddModal = () => {
      this.setState({openAddModal: false});
    };

    expandCategories = (item,e) => {
      const { reverseIcon } = this.state
      if (reverseIcon) {
        this.props.expand(item,e,'show')
      } else {
        this.props.expand(item,e,'hide')
      }
      this.setState({ reverseIcon: !this.state.reverseIcon })
    }


  render(){
    const { item, style, selectCategory, editCategoryName, deleteCategory, expand } = this.props
    const { reverseIcon } = this.state
    const renameActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleCloseRenameModal}
      />,
      <FlatButton
        label="Rename"
        primary={true}
        keyboardFocused={true}
        onClick={this.editCategoryName}
      />,
    ];

    const addActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleCloseAddModal}
      />,
      <FlatButton
        label="Add"
        primary={true}
        keyboardFocused={true}
        onClick={this.addNestedCategory}
      />,
    ];
    return (
      <MuiThemeProvider>
        <div onClick={ () => selectCategory(item) } style={{ ...style, borderWidth: '1px', borderStyle: 'solid', display: 'flex', flexDirection: 'row', height: '25px', alignItems: 'center', justifyContent: 'space-between' }}>
          <Dialog
            actions={renameActions}
            title="Rename category"
            modal={false}
            open={this.state.openRenameModal}
            onRequestClose={this.handleCloseRenameModal}
          >
            <TextField
              defaultValue={item.name}
              floatingLabelText="New category name"
              onChange={e => this.setState({ name: e.target.value })}
            />
          </Dialog>
          <Dialog
            actions={addActions}
            title="Add new category"
            modal={false}
            open={this.state.openAddModal}
            onRequestClose={this.handleCloseRenameModal}
          >
            <TextField
              floatingLabelText="New category name"
              onChange={e => this.setState({ newCategoryName: e.target.value })}
            />
          </Dialog>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            {item.childrenId.length === 0 ?
              <p style={{ marginLeft: '15px'}}></p>
                :
              <FontIcon
                className="material-icons"
                onClick={ (e) => this.expandCategories(item,e) }>
                  {reverseIcon? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
              </FontIcon>
            }
            <h4 style={{ color: item.selected? 'red' : 'black' }}>{item.name}</h4>
            <FontIcon
              className="material-icons"
              onClick={this.handleOpenRenameModal}>
                mode_edit
            </FontIcon>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <FontIcon
              className="material-icons"
              onClick={deleteCategory(item.id)}>
                delete_forever
            </FontIcon>
            <FontIcon
              className="material-icons"
              onClick={this.handleOpenAddModal}>
                add
            </FontIcon>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
