import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import HelpIcon from "@material-ui/icons/Help";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { createMuiTheme } from "@material-ui/core/styles/";

import logo from "./itdesign-logo.png";

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 25,
  },
  logoWrapper: {
    flexGrow: 1,
    alignItems: "center",
    display: "flex",
  },
}));

const itdesignTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#a71417",
    },
  },
});

export const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={itdesignTheme}>
      <CssBaseline />
      <AppBar position="static" color="transparent">
        <Toolbar>
          <div className={classes.logoWrapper}>
            <img src={logo} width={150} alt="itdesign Logo" />
          </div>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://gitlab.com/applicationChallenges/templates/javascript"
          >
            <IconButton>
              <HelpIcon />
            </IconButton>
          </a>
        </Toolbar>
      </AppBar>
      <Container
        data-testid="layout"
        maxWidth="sm"
        className={classes.container}
      >
        <Grid spacing={2} container>
          <Grid item xs={12}>
            <Typography variant="h3">React Calculator</Typography>
          </Grid>
          {children.map((child, index) => (
            <Grid item xs={12} key={index}>
              {child}
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};
