import { Avatar, Box, styled, Typography } from '@mui/material'
import LoginButton from '../../common/components/LoginButton'
import { useGetCurrentUserProfile } from '../../hooks/useGetCurrentUserProfile'

const Navbar = () => {
  const { data: user } = useGetCurrentUserProfile();
  console.log(user);
  
  const ProfileContainer = styled('div')({
    display: 'flex',
    alignItems: "end",
  })

  return (
    <Box display='flex' justifyContent='flex-end' alignItems='center' height='64px'>
      {user ? (
        <ProfileContainer>
          <Typography variant='body2' color='primary' marginRight='0.25rem'>Hi👋, {user.display_name?.split(' ')[0]}</Typography>
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
        </ProfileContainer>
  ) : (
    <LoginButton />
  )}
  </Box>
)}

export default Navbar