import { NavLink } from "react-router-dom";
import "./NavLinks.css";

export default function NavLinks() {
  return (
    <>
      <ul className="nav-links">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/blogs">Blog</NavLink>
        </li>
        <li>
          <NavLink to="/mypage">Mypage</NavLink>
        </li>
      </ul>
    </>
  );
}
