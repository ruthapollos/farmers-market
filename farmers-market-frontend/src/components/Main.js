import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Home from './Home';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FarmMarketInfo from './FarmMarketInfo';
import HomeIcon from '@material-ui/icons/Home';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AppBar from '@material-ui/core/AppBar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#94A756'
    },
    secondary: {
        main: '#FDFEFE'
      }
    }
  },
)

export default function Main() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <AppBar position="static" color="primary">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="icon label tabs example" >
          <Tab icon={<HomeIcon />} label="Home"></Tab>
          <Tab icon={<MenuBookIcon />} label="Directory" />
        </Tabs>
      </AppBar>
      <Typography
        component="div"
        hidden={value !== 0}>
          {value === 0 && <Box p={3}><Home/></Box>}
      </Typography>
      <Typography
        component="div"
        hidden={value !== 1}>
          {value === 1 && <Box p={3}><FarmMarketInfo/></Box>}
      </Typography>
    </MuiThemeProvider>
  );
}