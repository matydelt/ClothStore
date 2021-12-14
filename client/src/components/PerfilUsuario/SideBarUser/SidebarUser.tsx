import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { logoutUser } from '../../../redux/actions/userActions';
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth!,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
interface Props {
  photo: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  dni: string | undefined;
  calle: string | undefined;
  numero: string | undefined;
  ciudad: string | undefined;
  country: string | undefined;
  cp: string | undefined;

}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function SideBarUser(props: Props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useAuth();

  function logout() {
    dispatch(logoutUser());
    const cart = localStorage.getItem("cart")
    localStorage.setItem('cart', '[]');
    auth.signout();
    navigate('/login')
  }


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (<>

    <Box sx={{ display: "flex!important" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="default"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List >
          <Link to="/" style={{ textDecoration: "none" }}>
            <ListItem key="Inicio">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Inicio" />
            </ListItem>
          </Link>

          <Link to="/perfil/productos" style={{ textDecoration: "none" }}>
            <ListItem key="Mis productos">
              <ListItemIcon>
                <BusinessCenterIcon />
              </ListItemIcon>
              <ListItemText primary="Mis Productos" />
            </ListItem>
          </Link>

          <Link to="/perfil/ventas" style={{ textDecoration: "none" }}>
            <ListItem key="Mis ventas">
              <ListItemIcon>
                <CurrencyExchangeIcon />
              </ListItemIcon>
              <ListItemText primary="Mis ventas" />
            </ListItem>
          </Link>

          <Link to="/perfil/compras" style={{ textDecoration: "none" }}>
            <ListItem key="Mis compras">
              <ListItemIcon>
                <ShoppingCartCheckoutIcon />
              </ListItemIcon>
              <ListItemText primary="Mis Compras" />
            </ListItem>
          </Link>



          <Link to="/admin" style={{ textDecoration: "none" }}>
            <ListItem key="Admin Page">
              <ListItemIcon>
                <AdminPanelSettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Admin Page" />
            </ListItem>
          </Link>

          <Link to="/perfil" style={{ textDecoration: "none" }}>
            <ListItem key="Mi Perfil">
              <ListItemIcon>
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemText primary="Mi Perfil" />
            </ListItem>
          </Link>
          <ListItem key="LogOut">

            <IconButton onClick={logout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
            </IconButton>
          </ListItem>
        </List>

      </Drawer>

    </Box>
  </>);
}