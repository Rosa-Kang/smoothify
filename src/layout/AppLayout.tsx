import { Box, styled } from "@mui/material";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const Layout = styled("div")({
  display: "flex",
  height: "100vh",
  padding: "8px",
  position: 'relative'
});

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
    [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(1),
  },
}));



const AppLayout = () => {
  return (
    <Layout>
      <Sidebar  />

      <ContentBox>
        <Navbar />
        <Outlet />
      </ContentBox>
    </Layout>
  )
}

export default AppLayout