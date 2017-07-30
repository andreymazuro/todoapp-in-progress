import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FontIcon from 'material-ui/FontIcon';

export default class Item extends React.Component{

  render(){
    const { item, style, hideButton, moveToCategory } = this.props
    return (
      <MuiThemeProvider>
        <div  onClick={() => moveToCategory(item.id)} style={{ ...style, borderWidth: '1px', borderStyle: 'solid', display: 'flex', flexDirection: 'row', height: '25px', alignItems: 'center', justifyContent: 'space-between' }}>
            <h4>{item.name}</h4>
            {!hideButton?
              <FontIcon className="material-icons">reply</FontIcon>
                :
              null
            }
        </div>
      </MuiThemeProvider>
    )
  }
}
