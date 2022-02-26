import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import {
  Box,
  CssBaseline,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { useTheme } from "@mui/material/styles";
import { CSSObject, styled, Theme } from "@mui/material/styles";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import { useAuth } from "../../../hooks/useAuth";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth!,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
interface Props {
  type: string | undefined;
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideBarUser(props: Props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useAuth();

  function logout() {
    dispatch(logoutUser());
    localStorage.setItem("cart", "[]");
    auth.signout();
    navigate("/login");
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: "flex!important" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="default"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              style={{ marginRight: 36, ...(open && { display: "none" }) }}
              className="buttonSpan"
              size="large"
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton
              className="buttonSpan"
              onClick={handleDrawerClose}
              size="large"
            >
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
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

            {props.type === "admin" ? (
              <Link to="/admin" style={{ textDecoration: "none" }}>
                <ListItem key="Admin Page">
                  <ListItemIcon>
                    <AdminPanelSettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Admin Page" />
                </ListItem>
              </Link>
            ) : props.type === "employee" ? (
              <Link to="/employee" style={{ textDecoration: "none" }}>
                <ListItem key="Admin Page">
                  <ListItemIcon>
                    <AdminPanelSettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Admin Page" />
                </ListItem>
              </Link>
            ) : (
              <div></div>
            )}

            <Link to="/perfil" style={{ textDecoration: "none" }}>
              <ListItem key="Mi Perfil">
                <ListItemIcon>
                  <ManageAccountsIcon />
                </ListItemIcon>
                <ListItemText primary="Mi Perfil" />
              </ListItem>
            </Link>
            <ListItem key="LogOut">
              <ListItemIcon>
                <IconButton
                  className="buttonSpan"
                  onClick={logout}
                  size="large"
                >
                  <LogoutIcon />
                </IconButton>
              </ListItemIcon>
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </>
  );
}
