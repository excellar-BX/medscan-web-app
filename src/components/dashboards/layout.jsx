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
// import { Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useGetUserQuery } from "../../Helper/Apis/UseFetch";

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
    // width: "auto",
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
  const [width, setWidth] = useState(window.innerWidth);

  const { data } = useGetUserQuery();

  const handleMenuItemClick = (item) => {
    setActiveItem(item);
  };

  useEffect(() => {
    setWidth(window.innerWidth);
  }, [width, activeItem, small]);

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
          small ? " flex absolute" : " hidden md:flex absolute md:relative"
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
            src="https://s3-alpha-sig.figma.com/img/696c/5298/0fe1bb5f5101ecb5966f1be43f16825d?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Itny~-4iBRn-LlVeWYN5BYgSRjlShW6oTYnecMQpCIGuuRNoUHp27oKR2eyKOyeTbAOw015EJ6OOXomwOqKT3drPu4TIAWCLpDxbywPFDo3XMIex-m21r8GPr4EIVU2heLZimR6M4SJ57oL1clCAyLCToCylQb9az4l3zqI8D7R8csluQYbzFYU6~PHE7VpHUVCCnk0U2JvQmQ9YX32rrtr39JtKVziOlzbDmaatNwANuKlpMYc64AQ-XWR0OElS3482uwDo~wJBcIAd6eY2co-yFfWGaFdW7zLG6YhPXckTsoBO-DqTUeIhr85T~pCrHalgQuquw~-y3epdtYJPPQ__"
            alt="Logo"
            style={{ maxWidth: "100px", height: "100px" }}
          />
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
                      color:
                        activeItem === "All Product" ? "#0084FC" : "#ffffff",
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
                  color:
                    activeItem === "Add New Product" ? "#0084FC" : "#ffffff",
                }}
              >
                <ListItemIcon>
                  <AddCircleOutlineIcon
                    style={{
                      color:
                        activeItem === "Add New Product"
                          ? "#0084FC"
                          : "#ffffff",
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
                      color:
                        activeItem === "Track Product" ? "#0084FC" : "#ffffff",
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary="Track Product" className="font-bold" />
              </ListItem>
              <ListItem
                button
                key="Message"
                component={Link}
                to="/dashboard/message"
                onClick={() => handleMenuItemClick("Message")}
                sx={{
                  color: activeItem === "Message" ? "#0084FC" : "#ffffff",
                }}
              >
                <ListItemIcon>
                  <QuestionAnswerIcon
                    style={{
                      color: activeItem === "Message" ? "#0084FC" : "#ffffff",
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary="Message" className="font-bold" />
              </ListItem>

              <ListItem
                button
                key="Team Members"
                component={Link}
                to="/dashboard/team-members"
                onClick={() => handleMenuItemClick("Team Members")}
                sx={{
                  color: activeItem === "Team Members" ? "#0084FC" : "#ffffff",
                }}
              >
                <ListItemIcon>
                  <GroupIcon
                    style={{
                      color:
                        activeItem === "Team Members" ? "#0084FC" : "#ffffff",
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary="Team Members" className="font-bold" />
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
        </List>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "16px",
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            className=" text-white font-bold"
          >
            Quick Actions
          </Typography>
        </Box>
        <List>
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
            key="Logout"
            component={Link}
            to="/dashboard/logout"
            onClick={() => {
              localStorage.removeItem("token"); // Remove the JWT token
              localStorage.removeItem("userId"); // Remove the user ID (if stored)
              window.location.href = "/"; // Redirect to the login page or any other page
            }}
            sx={{
              color: activeItem === "Logout" ? "#0084FC" : "#ffffff",
            }}
          >
            <ListItemIcon>
              <LogoutIcon
                style={{
                  color: activeItem === "Logout" ? "#0084FC" : "#ffffff",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Logout" className="font-bold" />
          </ListItem>
        </List>
      </Drawer>
      <main className=" bg-[#f4f4f4] min-h-screen px-5 flex-grow">
        <MenuIcon
          className=" text-orange-900 absolute top-0 left-0 mx-5 my-5 text-2xl z-50"
          onClick={() => setSmall(true)}
        />
        <div className="h-[150px]"></div>
        {/* <button onClick={() => setSmall(false)}> */}
        <Outlet />
        {/* </button> */}
      </main>
    </div>
  );
};

export default Layout;
