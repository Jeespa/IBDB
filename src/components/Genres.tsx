import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './Navbar.css';

export default function Genres() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="sjangere"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Sjangere▼
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Akademisk</MenuItem>
        <MenuItem onClick={handleClose}>Apokalyptisk</MenuItem>
        <MenuItem onClick={handleClose}>Biografi</MenuItem>
        <MenuItem onClick={handleClose}>Eventyr</MenuItem>
        <MenuItem onClick={handleClose}>Fantasy</MenuItem>
        <MenuItem onClick={handleClose}>Filosofi</MenuItem>
        <MenuItem onClick={handleClose}>Historisk</MenuItem>
        <MenuItem onClick={handleClose}>Komedie</MenuItem>
        <MenuItem onClick={handleClose}>Krim</MenuItem>
        <MenuItem onClick={handleClose}>Reise</MenuItem>
        <MenuItem onClick={handleClose}>Religiøs</MenuItem>
        <MenuItem onClick={handleClose}>Roman</MenuItem>
        <MenuItem onClick={handleClose}>Romantikk</MenuItem>
        <MenuItem onClick={handleClose}>Science fiction</MenuItem>
        <MenuItem onClick={handleClose}>Skrekk</MenuItem>
        <MenuItem onClick={handleClose}>Spenning</MenuItem>
        <MenuItem onClick={handleClose}>Thriller</MenuItem>
        <MenuItem onClick={handleClose}>Tragedie</MenuItem>
      </Menu>
    </div>
  );
}