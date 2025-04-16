import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  IconButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import HotelIcon from "@mui/icons-material/Hotel";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, Outlet } from "react-router";
import { useAuth } from "../../infrastructure/auth/useAuth";
import { useState } from "react";

const drawerWidth = 240;

export function MainLayout() {
  const navigate = useNavigate();
  const { logout, isAuthenticated, loginWithRedirect, user } = useAuth();
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: "Inicio", icon: <HomeIcon />, path: "/" },
    { text: "Habitaciones", icon: <HotelIcon />, path: "/habitaciones" },
    { text: "Cuentas", icon: <AccountBalanceIcon />, path: "/cuentas" },
    isAuthenticated
      ? {
          text: "Cerrar sesión",
          icon: <LogoutIcon />,
          action: () =>
            logout({ logoutParams: { returnTo: window.location.origin } }),
        }
      : {
          text: "Iniciar sesión",
          icon: <LogoutIcon />,
          action: () => loginWithRedirect(),
        },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar superior */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            sx={{
              mr: 2,
              "&:focus": { outline: "none" }, // quita el borde de focus
              "&:active": { outline: "none" }, // quita en click
              "&:hover": { backgroundColor: "transparent" }, // opcional, para hover limpio
            }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            El Poblado
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer lateral */}
      <Drawer
        variant="permanent"
        sx={{
          width: open ? drawerWidth : 72,
          flexShrink: 0,
          whiteSpace: "nowrap",
          transition: (theme) =>
            theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          [`& .MuiDrawer-paper`]: {
            width: open ? drawerWidth : 72,
            overflowX: "hidden",
            boxSizing: "border-box",
            transition: (theme) =>
              theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
          },
        }}
      >
        <Toolbar sx={{ justifyContent: open ? "initial" : "center" }} />
        {isAuthenticated && user && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              py: 2,
              gap: 1,
            }}
          >
            <img
              src={user.picture}
              alt={user.name}
              style={{
                width: open ? 64 : 40, // 👈 tamaño cambia según estado
                height: open ? 64 : 40,
                borderRadius: "50%",
                transition: "all 0.3s",
              }}
            />
            {open && (
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ textAlign: "center" }}
              >
                {user.name}
              </Typography>
            )}
          </Box>
        )}
        <Box
          sx={{
            overflowX: "hidden", // 👈 evita scroll horizontal
            width: "100%", // 👈 asegura que no se expanda
            display: "flex",
            flexDirection: "column",
          }}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() =>
                    item.path ? navigate(item.path) : item.action?.()
                  }
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{ opacity: open ? 1 : 0, transition: "opacity 0.3s" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Contenido principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar /> {/* separador para no tapar con el AppBar */}
        <Outlet /> {/* Aquí va el contenido de cada ruta */}
      </Box>
    </Box>
  );
}
