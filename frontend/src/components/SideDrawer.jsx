import * as React from 'react';
import {
  Box,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';

import { useNavigate } from 'react-router-dom';

export default function SideDrawer() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { text: '홈 (가족 일정)', icon: <HomeIcon />, path: '/' },
    { text: '아빠', icon: <PersonIcon />, path: '/father' },
    { text: '엄마', icon: <PersonIcon />, path: '/mother' },
    { text: '채아', icon: <PersonIcon />, path: '/chaea' },
    { text: '수아', icon: <PersonIcon />, path: '/sua' },
  ];

  const toggleDrawer = (isOpen) => () => {
    setOpen(isOpen);
  };

  return (
    <>
      {/* 햄버거 버튼 */}
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1300 }}
      >
        <MenuIcon />
      </IconButton>

      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box sx={{ width: 260 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(item.path);
                    setOpen(false);
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </SwipeableDrawer>
    </>
  );
}
