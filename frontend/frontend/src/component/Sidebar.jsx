import { NavLink } from "react-router-dom";

function Sidebar({ handleLogout }) {
  return (
    <aside className="sidebar">

      <ul>

        <li>
          <NavLink to="/dashboard">
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/goals">
            My Goals
          </NavLink>
        </li>

        <li>
          <NavLink to="/calendar">
            Calendar
          </NavLink>
        </li>

        <li>
          <NavLink to="/profile">
            Profile
          </NavLink>
        </li>


      </ul>

    </aside>
  );
}

export default Sidebar;