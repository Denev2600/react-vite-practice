import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button variant="text" color="inherit">
            Login
          </Button>
          <Link to="/">
            <Button variant="text" color="inherit">
              home
            </Button>
          </Link>
          <Link to="/blogs">
            <Button variant="contained" color="inherit">
              blog
            </Button>
          </Link>
          <Link to="/mypage">
            <Button variant="outlined" color="inherit">
              mypage
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
