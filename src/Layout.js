import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul className="tabs">
          <li>
            <Link to="/googlevision">Hand Written Capture</Link>
          </li>
          <li>
            <Link to="/myscript">Digital Capture</Link>
          </li>
          {/* <li>
            <Link to="/opencv">Open CV</Link>
          </li> */}
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;