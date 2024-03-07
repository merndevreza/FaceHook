import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import home from "../../assets/icons/home.svg";
import notification from "../../assets/icons/notification.svg";
import logout from "../../assets/icons/logout.svg";
import avatar from "../../assets/images/avatars/avatar_1.png";
const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };
  return (
    <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
      <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
        <Link to="./index.html">
          <img
            className="max-w-[100px] rounded-full lg:max-w-[130px]"
            src={logo}
          />
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="./index.html" className="btn-primary">
            <img src={home} alt="Home" />
            Home
          </Link>
          <button className="icon-btn">
            <img src={notification} alt="Notification" />
          </button>
          <button onClick={handleLogout} className="icon-btn">
            <img src={logout} alt="Logout" />
          </button>

          <button className="flex-center !ml-8 gap-3">
            <span className="text-lg font-medium lg:text-xl">Sumit</span>
            <img
              className="max-h-[32px] max-w-[32px] lg:max-h-[44px] lg:max-w-[44px]"
              src={avatar}
              alt=""
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
