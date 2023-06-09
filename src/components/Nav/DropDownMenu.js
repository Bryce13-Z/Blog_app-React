import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Link } from 'react-router-dom';

export default function DropDownMenu({ title, menuIterms, routes}) {

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)} style={{ textDecoration: 'none', color: 'white', backgroundColor: 'black'}}>
            {title}
          </Button>
          <Menu {...bindMenu(popupState)}>
            {menuIterms.map((element, index) => (
              <MenuItem key={index} onClick={popupState.close}><Link to={routes[index]} style={{ textDecoration: 'none', color: 'black'}}>{element}</Link></MenuItem>
            ))}
            {/* <MenuItem onClick={popupState.close}>Profile</MenuItem>
            <MenuItem onClick={popupState.close}>My account</MenuItem>
            <MenuItem onClick={popupState.close}>Logout</MenuItem> */}
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}