import { Box, styled, Typography } from "@mui/material";
import { NavLink, Outlet } from "react-router";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryHead from "./components/LibraryHead";
import Library from "./components/Library";
import Logo from '../assets/logo.png';
import Navbar from "./components/Navbar";

const Layout = styled("div")({
  display: "flex",
  height: "100vh",
  padding: "8px"
});


const Sidebar = styled("div")(({theme})=>({
  width: "331px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("sm")] : {
    display: "none"
  }
}));

const LogoContainer = styled("figure") ({
  margin: "4px 98px 4px 8px",
  transition: "ease-in .3s",
  "&:hover" : {
    opacity: "70%",
    cursor: "pointer"
  },
})


const ContentBox = styled(Box)(({theme}) => ({
    borderRadius: "8px",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    width: "100%",
    height: '100vh',
    padding: "16px 8px",
    marginBottom: "8px",
    marginRight: "8px"
}));

const NavList = styled("ul")({
  listStyle: "none",
  padding:0,
  margin:0
});

const StyledNavLink = styled(NavLink)(({theme}) => ({
  textDecoration:"none",
  display: "flex",
  alignItems:"center",
  gap:"20px",
  "&:not(:last-child)" : {
    paddingBottom: "8px",
  },
  color: theme.palette.text.secondary,
  transition: "ease-in .3s",
  "&:hover" : {
    color : theme.palette.text.primary
  },
  "&.active" : {
    color: theme.palette.text.primary
  }
}))

const AppLayout = () => {
  return (
    <Layout>
      <Sidebar>
        <LogoContainer>
          <NavLink to="/">
            <img src={Logo} alt="Logo" style={{ width: '100%', height: 'auto' }} />
          </NavLink>
        </LogoContainer>
        <ContentBox>
          <NavList>
              <StyledNavLink to="/">
                <HomeIcon />
                <Typography variant="h2" fontWeight={700}>Home</Typography>
              </StyledNavLink>
              <StyledNavLink to="/search">
                <SearchIcon />
                <Typography variant="h2" fontWeight={700}>Search</Typography>
              </StyledNavLink>
          </NavList>
        </ContentBox>

        <ContentBox height="100%">
            <LibraryHead />
            <Library  />
        </ContentBox>
      </Sidebar>

      <ContentBox>
        <Navbar />
        <Outlet />
      </ContentBox>
    </Layout>
  )
}

export default AppLayout