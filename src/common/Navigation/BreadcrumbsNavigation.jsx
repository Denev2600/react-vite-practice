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
      position="static"
      sx={{
        top: 48,
        backgroundColor: "#A9E2F3",
        boxShow: "none",
        borderBottom: "1px solid #e0e0e0",
        marginBottom: "7px",
        justifyContent: "left",
      }}
    >
      <Container maxWidth={false}>
        <Breadcrumbs size="sm" separator=">">
          {crumbs}
        </Breadcrumbs>
      </Container>
    </AppBar>
  );
}
