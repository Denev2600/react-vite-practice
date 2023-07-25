import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <Link to="/">
        <button>home</button>
      </Link>
      <Link to="/blogs">
        <button>blog</button>
      </Link>
      <Link to="/mypage">
        <button>mypage</button>
      </Link>
    </>
  );
}
