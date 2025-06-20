import { Box, styled, Typography } from "@mui/material";
import { NavLink } from "react-router";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import Logo from '../../assets/logo.png';
import BookmarkIcon from "@mui/icons-material/Bookmark";
import LibraryHead from "./LibraryHead";
import Library from "./Library";
import { Height } from "@mui/icons-material";

const DesktopSidebar = styled("div")(({theme})=>({
  width: "331px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("sm")] : {
    display: "none"
  }
}));


const MobileSidebar = styled('div')(({theme})=> ({
    zIndex: 10,
    [theme.breakpoints.up("sm")] : {
        display: "none"
    }
}))


const MobileNavContainer = styled('div')(({theme})=> ({
  position: 'fixed', 
  left: 0,
  bottom: 0,
  width: '100%',
  backgroundColor: 'black',
  color: theme.palette.text.primary,
  borderTop: `1px solid ${theme.palette.divider}`,
  paddingBottom: 'env(safe-area-inset-bottom)',
  height: '56px',
  display: 'flex',
  alignItems:'center'
}))

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

const NavList = styled("ul")(({theme})=> ({
  listStyle: "none",
  padding:0,
  margin:0,
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down("sm")] : {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItem:'center',
    marginTop:'5px'
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
      gap: 0,
      flexDirection: 'column',
      "&:not(:last-child)" : {
      paddingBottom: 0,
      },
  },
}))

const MobileLibraryWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
})

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
                        <Typography variant="h2" fontSize={12}>Home</Typography>
                    </StyledNavLink>
                    <StyledNavLink to="/search">
                        <SearchIcon />
                        <Typography variant="h2" fontSize={12}>Search</Typography>
                    </StyledNavLink>
                    <MobileLibraryWrapper>
                      <BookmarkIcon/>
                      <Typography variant="h2" fontSize={12}>Your Library</Typography>
                    </MobileLibraryWrapper>
                </NavList>
            </MobileNavContainer>
        </MobileSidebar>
    </>
)

export default Sidebar