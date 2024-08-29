import "./App.css";
import React from 'react'
import Login from "./components/Login/Login";
// import { Provider } from "react-redux";
// import store from "./store";
import { AppBar, Container, CssBaseline, Paper, ThemeProvider, Toolbar, Typography } from "@mui/material";
// import Counter from "./Counter";
// import PostList from "./PostList";
import theme from './styles/theme';
import CompleteProfile from "./components/register/CompleteProfile";
import House from "./components/house/House";
import HouseUser from "./components/house/HouseUser";
import HouseWageType from "./components/house/HouseWageType";
import HouseWage from "./components/house/HouseWage";
import CalcHouseWage from "./components/house/CalcHouseWage";
import { HashRouter } from "react-router-dom";
import { UIProvider } from "./context/uiContext";
import {Router, Route, Link} from "react-router-dom";
import NotFound from "./components/errorpage/NotFound";
import Home from "./components/mainpage/Home";
import { Switch } from "react-router-dom/cjs/react-router-dom";
import ProfileManagement from "./components/profile/ProfileManagement";



function App() {
  return (
     <HashRouter>

      <ThemeProvider theme={theme}>
        <UIProvider>
          {/* <Counter/>
      <PostList /> */}
          <CssBaseline />
          {/* <AppBar
            position='absolute'
            // color='default'
            elevation={0}
            sx={{
              position: 'relative',
              borderBottom: (t) => `1px solid ${t.palette.divider}`,
              backgroundColor: "#10a2d8"
            }}

          >
            <Toolbar>
              <Typography variant='h6' color='inherit' noWrap>
                مدیریت
              </Typography>
            </Toolbar>
          </AppBar> */}
          <Container component="main" maxWidth="md" sx={{ mb: 4 }} style={{ zIndex: 1000, fontFamily: 'bnazanin' }}>
            {/* <Paper variant='outlined' sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} style={{ fontFamily: 'bnazanin' }}> */}
              <Login />
              <ProfileManagement/>
              <CompleteProfile />
              <House />
              <HouseUser />
              <HouseWageType />
              <HouseWage />
              <CalcHouseWage />
            {/* </Paper> */}
            <Switch>
              <Route exact path={["/", "/login"]} component={Login}/>
              <Route path="/profile" component={ProfileManagement}/>
              <Route path="*" component={NotFound}/>
            </Switch>
          </Container>
          {/* <div>
        <Login />
      </div> */}
        </UIProvider>
      </ThemeProvider>
    </HashRouter>
  )

}

export default App;
