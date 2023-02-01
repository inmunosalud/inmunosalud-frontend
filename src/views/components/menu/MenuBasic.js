import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function MenuBasic({
  anchorEl,
  handleEdit,
  handleClose,
  handleDelete,
}) {
  
  return (
    <div>
      <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleEdit}>Editar</MenuItem>
          <MenuItem onClick={handleDelete}>Eliminar</MenuItem>
        </Menu>
    </div>
  );
}
