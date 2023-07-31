import { Link } from "react-router-dom";
import "./HeaderStyle.scss";

export const Header = () => {
  return (
    <div className="headerContainer">
      <ul>
        <li>
          <Link to="/">Registration Form</Link>
        </li>
        <li>
          <Link to="/usersList">Participants</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
