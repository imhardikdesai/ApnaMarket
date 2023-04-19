import { useContext, useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
// mocks_
import account from '../../../_mock/account';
import { NavLink } from 'react-router-dom';
import { auth } from '../../../firebase/firebase-config';
import { AuthContext } from '../../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { updateAdminRole } from '../../../redux/actions/authActions';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
    path: '/dashboard'
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
    path: '/dashboard/profile'
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
    path: '/dashboard/setting'
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const { setCurrentUser } = useContext(AuthContext)
  const dispatch = useDispatch()
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const handleLogout = () => {
    handleClose()
    auth.signOut()
      .then(() => {
        toast.success('Successfully logged out !!!');
        dispatch(updateAdminRole(false))
      })
      .catch((error) => {
        console.error(error);
      });
    setCurrentUser(null)
  }
  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account().photoURL} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {account().displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {account().email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <NavLink key={option.label} to={option.path}>
              <MenuItem onClick={handleClose}>
                {option.label}
              </MenuItem>
            </NavLink>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />
        <NavLink to='/login'>
          <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
            Logout
          </MenuItem>
        </NavLink>
      </Popover>
    </>
  );
}
