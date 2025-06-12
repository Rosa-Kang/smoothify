import { Avatar, Box, IconButton, Menu, MenuItem, styled, Typography, useMediaQuery } from '@mui/material'
import LoginButton from '../../common/components/LoginButton'
import { useGetCurrentUserProfile } from '../../hooks/useGetCurrentUserProfile'
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("access_token"));
  const { data: user } = useGetCurrentUserProfile();
  const queryClient = useQueryClient();

  const logout = () =>{
    localStorage.removeItem('access_token');
    queryClient.removeQueries({
        queryKey: ['current-user-profile']
    });
    setIsLoggedIn(false);
    navigate('/');
    console.log(localStorage.getItem("access_token"), user)
  }

  const handleMenuOpen = (e) => {
      setAnchorEl(e.currentTarget);
  }

  const handleMenuClose = () => {
      setAnchorEl(null);
      logout();
  }
  
  const ProfileContainer = styled('div')({
    display: 'flex',
    alignItems: "end",
    position: 'relative'
  })

  const ProfileMenu = styled(Menu)({
  "& .MuiPaper-root": {
    color: "white",
    width: "160px",
    transformOrigin: "none !important",
    top: "5rem !important",
    left: "unset !important",
    right: "16px !important"
  },
  });

  const ProfileMenuItem = styled(MenuItem)({
  "&:hover": {
    backgroundColor: "#444",
  },
  });

  return (
    <Box display='flex' justifyContent='flex-end' alignItems='center' height='64px'>
      {user && isLoggedIn ? (
        <ProfileContainer className='profile-container'>
          <Typography variant='body2' color='primary' marginRight='0.25rem'>Hi👋, {user.display_name?.split(' ')[0]}</Typography>
            <IconButton onClick={handleMenuOpen} size="small">
              {user.images?.[0]?.url ? (
                <img 
                  src={user.images[0].url} 
                  alt="User profile"
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
                  ) : (
                <Avatar />
              )}
            </IconButton>
              <ProfileMenu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                keepMounted
              >
                <ProfileMenuItem onClick={handleMenuClose}>Log out</ProfileMenuItem>
              </ProfileMenu>
        </ProfileContainer>
  ) : (
    <LoginButton />
  )}
  </Box>
)}

export default Navbar