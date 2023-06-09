import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Link } from 'react-router-dom';

export default function DropDownAvatarMenu({ username, userIcon, id, handleSignOut}) {

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Avatar alt={username} src={`data:image/png;base64,${userIcon}`} {...bindTrigger(popupState)} style={{ width: 40, height: 40}} sx={{cursor: 'pointer'}}/>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}><Link to={`/profile/${id}`} style={{ textDecoration: 'none', color: 'black'}}>Edit User Info</Link></MenuItem>
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}