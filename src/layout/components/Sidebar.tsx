import { Box, styled, Typography } from "@mui/material";
import { NavLink } from "react-router";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import Logo from '../../assets/logo.png';
import BookmarkIcon from "@mui/icons-material/Bookmark";
import LibraryHead from "./LibraryHead";
import Library from "./Library";

const DesktopSidebar = styled("div")(({theme})=>({
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


const NavContainer = styled('div')(({theme})=> ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: "100%",
  height: 'auto',
  padding: "16px 8px",
  marginBottom: "8px",
  marginRight: "8px",
  display: 'flex',
  flexDirection: 'column'
}))

const MobileNavContainer = styled('div')(({theme})=> ({
  position: 'fixed', 
  left: 0,
  bottom: 0,
  width: '100%',
  zIndex: theme.zIndex.appBar, // or 1200
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderTop: `1px solid ${theme.palette.divider}`,
  paddingBottom: 'env(safe-area-inset-bottom)',
}))

const NavList = styled("ul")(({theme})=> ({
  listStyle: "none",
  padding:0,
  margin:0,
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down("sm")] : {
   flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly'
  }
}));


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
  },
  [theme.breakpoints.down("sm")] : {
    flexDirection: 'column',
  },
}))

const ContentBox = styled(Box)(({theme}) => ({
    borderRadius: "8px",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    width: "100%",
    height: '100%',
    padding: "16px 8px",
    marginBottom: "8px",
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
    marginRight: theme.spacing(1),
  },
}));

const MobileSidebar = styled('div')(({theme})=> ({
    zIndex: 1,
    [theme.breakpoints.up("sm")] : {
        display: "none"
    }
}))

const Sidebar = () => (
    <>
        <DesktopSidebar className="desktop-sidebar">
            <LogoContainer>
                <NavLink to="/">
                    <img src={Logo} alt="Logo" style={{ width: '100%', height: 'auto' }} />
                </NavLink>
            </LogoContainer>
            <NavContainer>
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
            </NavContainer>

            <ContentBox height="100vh">
                <LibraryHead />
                <Library />
            </ContentBox>
        </DesktopSidebar>

        <MobileSidebar className="mobile-sidebar">
            <MobileNavContainer>
                <NavList>
                    <StyledNavLink to="/">
                        <HomeIcon />
                        <Typography variant="h2" fontWeight={700}>Home</Typography>
                    </StyledNavLink>
                    <StyledNavLink to="/search">
                        <SearchIcon />
                        <Typography variant="h2" fontWeight={700}>Search</Typography>
                    </StyledNavLink>
                    <BookmarkIcon/>
                </NavList>
            </MobileNavContainer>
        </MobileSidebar>
    </>
)

export default Sidebar