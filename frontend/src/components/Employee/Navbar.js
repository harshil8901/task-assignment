import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Drawer, IconButton, List, ListItem, ListItemText, useMediaQuery, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const Navbar = ({ employeeName, onLogout }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Assigned Tasks', onClick: () => navigate(`/employee/assigned-tasks`) },
    { text: 'Completed Tasks', onClick: () => navigate(`/employee/completed-tasks`) },
  ];

  const drawer = (
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
      <Box
        sx={{
          width: 250,
          backgroundColor: theme.palette.primary.main,
          height: '100%',
          color: 'white',
        }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.text} onClick={item.onClick}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile && (
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Hello, {employeeName}
        </Typography>
        {!isMobile ? (
          <>
            {menuItems.map((item) => (
              <Button color="inherit" key={item.text} onClick={item.onClick}>
                {item.text}
              </Button>
            ))}
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          drawer
        )}
      </Toolbar>
      {drawer}
    </AppBar>
  );
};

export default Navbar;