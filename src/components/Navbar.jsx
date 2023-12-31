import { NavLink } from "react-router-dom";
import profile from "./../assets/profle.svg";
import SWRIcon from "./../assets/swr.svg";

export default function Navbar() {
 

  const activeStyle = "bg-slate-200/50 py-2 px-4 rounded ";

  return (
    <div className="w-full bg-gray-50 h-14 px-6  flex items-center justify-between font-semibold text-slate-600">
      <div className="flex items-center gap-x-6">
        <img src={profile} className="w-8 " />
        <NavLink to="/" className={(link) => (link.isActive ? activeStyle : "")}>
          Home
        </NavLink>
        <NavLink
          to={`/posts/page-1`}
          className={(link) => (link.isActive ? activeStyle : "")}
        >
          Posts
        </NavLink>
        <NavLink to="/pictures" className={(link) => (link.isActive ? activeStyle : "")}>
          Pictures
        </NavLink>
      </div>

      <div className="flex items-center gap-x-2">
        <img src={SWRIcon} width="50px" />
        <span className="font-bold">SWR</span>
      </div>
    </div>
  );
}
