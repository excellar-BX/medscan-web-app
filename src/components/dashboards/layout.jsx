// src/components/Layout.jsx
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Avatar,
  styled,
  InputBase,
  Button,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import AllOutIcon from "@mui/icons-material/AllOut";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LogoutIcon from "@mui/icons-material/Logout";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close"; // Import Close icon
import logo from "../../assets/images/image 2.png";
import { Link } from "react-router-dom";
import { useGetUserQuery } from "../../Helper/Apis/UseFetch";
import { useAuth } from '../../Helper/AuthContext';

const drawerWidth = 270;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#E0DEDEB2",
  "&:hover": {
    backgroundColor: "#E0DEDEB2",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "350px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Layout = () => {
  const [activeItem, setActiveItem] = useState("Dashboard"); // Default active item
  const [small, setSmall] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility
  const [width, setWidth] = useState(window.innerWidth);
  const { userRole } = useAuth(); 
const role = userRole
  console.log("User role:", role);
  const { data } = useGetUserQuery();

  const handleMenuItemClick = (item) => {
    setActiveItem(item);
  };

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      {width > 750 && (
        <AppBar
          position="fixed"
          style={{
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            paddingTop: 24,
            paddingBottom: 24,
            backgroundColor: "#fff",
          }}
        >
          <Toolbar>
            <div className=" flex-1">
              <Search>
                <SearchIconWrapper>
                  <SearchIcon color="#E0DEDEB2" className="text-[#E0DEDEB2]" />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  color="#E0DEDEB2"
                  className=" text-[#E0DEDEB2]"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </div>

            <div className="flex gap-4">
              <IconButton color="#E0DEDEB2">
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton color="#E0DEDEB2">
                <Avatar
                  alt="Profile Picture"
                  src="/dashboard/static/images/avatar/1.jpg"
                />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      )}
      <Drawer
        className={
          sidebarOpen ? "flex absolute" : "hidden md:flex absolute md:relative"
        }
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#333333",
            paddingLeft: 2,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            paddingTop: "20px",
          }}
        >
          <img
            src={logo} alt="nav-logo" className="h-10"
            style={{ maxWidth: "100px", height: "100px" }}
          />
          <IconButton
            onClick={() => setSidebarOpen(false)} // Close sidebar
            sx={{ position: 'absolute', top: 16, right: 16 }}
          >
            <CloseIcon style={{ color: "#ffffff" }} />
          </IconButton>
        </Box>
        <List>
          <ListItem
            button
            key="Dashboard"
            onClick={() => handleMenuItemClick("Dashboard")}
            component={Link} // Use Link as the component for navigation
            to="/dashboard"
            sx={{
              color: activeItem === "Dashboard" ? "#0084FC" : "#ffffff",
            }}
          >
            <ListItemIcon>
              <DashboardIcon
                style={{
                  color: activeItem === "Dashboard" ? "#0084FC" : "#ffffff",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Dashboard" className="font-bold" />
          </ListItem>
          <ListItem
            button
            key="Profile"
            component={Link}
            to="/dashboard/profile"
            onClick={() => handleMenuItemClick("Profile")}
            sx={{
              color: activeItem === "Profile" ? "#0084FC" : "#ffffff",
            }}
          >
            <ListItemIcon>
              <PersonIcon
                style={{
                  color: activeItem === "Profile" ? "#0084FC" : "#ffffff",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Profile" className="font-bold" />
          </ListItem>
          <>
            <ListItem
              button
              key="All Product"
              component={Link}
              to="/dashboard/all-products"
              onClick={() => handleMenuItemClick("All Product")}
              sx={{
                color: activeItem === "All Product" ? "#0084FC" : "#ffffff",
              }}
            >
              <ListItemIcon>
                <AllOutIcon
                  style={{
                    color: activeItem === "All Product" ? "#0084FC" : "#ffffff",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="All Product" className="font-bold" />
            </ListItem>
            <div>
      {/* Conditionally render the Add New Product item */}
     
   {/* Conditional rendering for the "Add New Product" list item */}
   {role === "Manufacturer" && (
  <ListItem
    button
    key="Add New Product"
    component={Link}
    to="/dashboard/add-products"
    onClick={() => handleMenuItemClick("Add New Product")}
    sx={{
      color: activeItem === "Add New Product" ? "#0084FC" : "#ffffff",
    }}
  >
    <ListItemIcon>
      <AddCircleOutlineIcon
        style={{
          color: activeItem === "Add New Product" ? "#0084FC" : "#ffffff",
        }}
      />
    </ListItemIcon>
    <ListItemText primary="Add New Product" className="font-bold" />
  </ListItem>
)}

      
    </div>
            <ListItem
              button
              key="Track Product"
              component={Link}
              to="/dashboard/track-product"
              onClick={() => handleMenuItemClick("Track Product")}
              sx={{
                color: activeItem === "Track Product" ? "#0084FC" : "#ffffff",
              }}
            >
              <ListItemIcon>
                <TrackChangesIcon
                  style={{
                    color: activeItem === "Track Product" ? "#0084FC" : "#ffffff",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Track Product" className="font-bold" />
            </ListItem>
            <ListItem
              button
              key="Support"
              component={Link}
              to="/dashboard/support"
              onClick={() => handleMenuItemClick("Support")}
              sx={{
                color: activeItem === "Support" ? "#0084FC" : "#ffffff",
              }}
            >
              <ListItemIcon>
                <SupportAgentIcon
                  style={{
                    color: activeItem === "Support" ? "#0084FC" : "#ffffff",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Support" className="font-bold" />
            </ListItem>
          </>
          <ListItem
            button
            key="Export Data"
            component={Link}
            to="/dashboard/export-data"
            onClick={() => handleMenuItemClick("Export Data")}
            sx={{
              color: activeItem === "Export Data" ? "#0084FC" : "#ffffff",
            }}
          >
            <ListItemIcon>
              <ExitToAppIcon
                style={{
                  color: activeItem === "Export Data" ? "#0084FC" : "#ffffff",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Export Data" className="font-bold" />
          </ListItem>
          <ListItem
            button
            key="Quick Action"
            component={Link}
            to="/dashboard/quick-action"
            onClick={() => handleMenuItemClick("Quick Action")}
            sx={{
              color: activeItem === "Quick Action" ? "#0084FC" : "#ffffff",
            }}
          >
            <ListItemIcon>
              <GroupIcon
                style={{
                  color: activeItem === "Quick Action" ? "#0084FC" : "#ffffff",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Quick Action" className="font-bold" />
          </ListItem>
          <ListItem
            button
            key="Logout"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      {width <= 750 && (
        <>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setSidebarOpen(true)}
            sx={{ position: 'absolute', top: 16, left: 16 }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
                backgroundColor: "#333333",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px",
                paddingTop: "20px",
              }}
            >
              <img
                src={logo}
                alt="nav-logo"
                className="h-10"
                style={{ maxWidth: "100px", height: "100px" }}
              />
              <IconButton
                onClick={() => setSidebarOpen(false)} // Close sidebar
                sx={{ position: 'absolute', top: 16, right: 16 }}
              >
                <CloseIcon style={{ color: "#ffffff" }} />
              </IconButton>
            </Box>
            <List>
              <ListItem
                button
                key="Dashboard"
                onClick={() => handleMenuItemClick("Dashboard")}
                component={Link}
                to="/dashboard"
                sx={{
                  color: activeItem === "Dashboard" ? "#0084FC" : "#ffffff",
                }}
              >
                <ListItemIcon>
                  <DashboardIcon
                    style={{
                      color: activeItem === "Dashboard" ? "#0084FC" : "#ffffff",
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary="Dashboard" className="font-bold" />
              </ListItem>
              <ListItem
                button
                key="Profile"
                component={Link}
                to="/dashboard/profile"
                onClick={() => handleMenuItemClick("Profile")}
                sx={{
                  color: activeItem === "Profile" ? "#0084FC" : "#ffffff",
                }}
              >
                <ListItemIcon>
                  <PersonIcon
                    style={{
                      color: activeItem === "Profile" ? "#0084FC" : "#ffffff",
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary="Profile" className="font-bold" />
              </ListItem>
              <>
                <ListItem
                  button
                  key="All Product"
                  component={Link}
                  to="/dashboard/all-products"
                  onClick={() => handleMenuItemClick("All Product")}
                  sx={{
                    color: activeItem === "All Product" ? "#0084FC" : "#ffffff",
                  }}
                >
                  <ListItemIcon>
                    <AllOutIcon
                      style={{
                        color: activeItem === "All Product" ? "#0084FC" : "#ffffff",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="All Product" className="font-bold" />
                </ListItem>
                <ListItem
                  button
                  key="Add New Product"
                  component={Link}
                  to="/dashboard/add-products"
                  onClick={() => handleMenuItemClick("Add New Product")}
                  sx={{
                    color: activeItem === "Add New Product" ? "#0084FC" : "#ffffff",
                  }}
                >
                  <ListItemIcon>
                    <AddCircleOutlineIcon
                      style={{
                        color: activeItem === "Add New Product" ? "#0084FC" : "#ffffff",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Add New Product" className="font-bold" />
                </ListItem>
                <ListItem
                  button
                  key="Track Product"
                  component={Link}
                  to="/dashboard/track-product"
                  onClick={() => handleMenuItemClick("Track Product")}
                  sx={{
                    color: activeItem === "Track Product" ? "#0084FC" : "#ffffff",
                  }}
                >
                  <ListItemIcon>
                    <TrackChangesIcon
                      style={{
                        color: activeItem === "Track Product" ? "#0084FC" : "#ffffff",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Track Product" className="font-bold" />
                </ListItem>
                <ListItem
                  button
                  key="Support"
                  component={Link}
                  to="/dashboard/support"
                  onClick={() => handleMenuItemClick("Support")}
                  sx={{
                    color: activeItem === "Support" ? "#0084FC" : "#ffffff",
                  }}
                >
                  <ListItemIcon>
                    <SupportAgentIcon
                      style={{
                        color: activeItem === "Support" ? "#0084FC" : "#ffffff",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Support" className="font-bold" />
                </ListItem>
                <ListItem
                  button
                  key="Export Data"
                  component={Link}
                  to="/dashboard/export-data"
                  onClick={() => handleMenuItemClick("Export Data")}
                  sx={{
                    color: activeItem === "Export Data" ? "#0084FC" : "#ffffff",
                  }}
                >
                  <ListItemIcon>
                    <ExitToAppIcon
                      style={{
                        color: activeItem === "Export Data" ? "#0084FC" : "#ffffff",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Export Data" className="font-bold" />
                </ListItem>
                <ListItem
                  button
                  key="Quick Action"
                  component={Link}
                  to="/dashboard/quick-action"
                  onClick={() => handleMenuItemClick("Quick Action")}
                  sx={{
                    color: activeItem === "Quick Action" ? "#0084FC" : "#ffffff",
                  }}
                >
                  <ListItemIcon>
                    <GroupIcon
                      style={{
                        color: activeItem === "Quick Action" ? "#0084FC" : "#ffffff",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Quick Action" className="font-bold" />
                </ListItem>
              </>
              <ListItem
                button
                key="Logout"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
              >
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Drawer>
        </>
      )}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </div>
  );
};

export default Layout;






