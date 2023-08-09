import { AppBar, Breadcrumbs, Container } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function BreadcrumbsNavigation() {
  const location = useLocation();
  let currentLink = "";

  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink += `/${crumb}`;

      return (
        <Link to={currentLink} className="link-text-bread" key={crumb}>
          {crumb}
        </Link>
      );
    });

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 48,
        backgroundColor: "white",
        boxShow: "none",
        borderBottom: "1px solid #e0e0e0",
        margin: "10px",
      }}
    >
      <Container size="sm">
        <Breadcrumbs size="sm" separator=">">
          {crumbs}
        </Breadcrumbs>
      </Container>
    </AppBar>
  );
}
