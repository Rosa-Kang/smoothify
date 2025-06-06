import { Box } from '@mui/material'
import LoginButton from '../../common/components/LoginButton'
import { useGetCurrentUserProfile } from '../../hooks/useGetCurrentUserProfile'

const Navbar = () => {
  const { data: user } = useGetCurrentUserProfile();

  return (
    <Box display='flex' justifyContent='flex-end' alignItems='center' height='64px'>
      {user? 
        <img src={user.images[0]?.url}/>
      : <LoginButton /> }
    </Box>
  )
}

export default Navbar