import {
  HiOutlineHome as HomeIcon,
  HiMiniArrowLeftOnRectangle as LogoutIcon,
  HiOutlineUserCircle as UserIcon,
  HiOutlineBookOpen as DocumentationIcon,
  HiOutlineViewColumns as DatasetsIcon
} from "react-icons/hi2"

import { NavLink } from "react-router-dom"
import { useLogout } from "../features/auth/useLogout"

const AsideNav = () => {
  const { logout } = useLogout()
  return (
    <ul className="space-y-6 text-gray-600  font-medium">
      {/* <li>
        <NavLink
          to={"/home"}
          className={({ isActive }) =>
            `flex items-center gap-4 font-medium px-6 py-4 text-gray-500 hover:bg-gray-100 ${
              isActive ? "bg-gray-50" : ""
            }`
          }
        >
          <HomeIcon className="w-6 h-6 text-gray-400" />
          <span>Honme</span>
        </NavLink>
      </li> */}
      <li>
        <NavLink
          to="/datasets"
          className={({ isActive }) =>
            `flex items-center gap-4 font-medium px-6 py-4 text-gray-500 hover:bg-gray-100 ${
              isActive ? "bg-gray-50" : ""
            }`
          }
        >
          <DatasetsIcon className="w-6 h-6 text-gray-400" />
          <span>Datasets</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/documentation"}
          className={({ isActive }) =>
            `flex items-center gap-4  font-medium px-6 py-4 text-gray-500 hover:bg-gray-100 ${
              isActive ? "bg-gray-50" : ""
            }`
          }
        >
          <DocumentationIcon className="w-6 h-6 text-gray-400" />

          <span>Documentation</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/account"}
          className={({ isActive }) =>
            `flex items-center gap-4  font-medium px-6 py-4 text-gray-500 hover:bg-gray-100 ${
              isActive ? "bg-gray-50" : ""
            }`
          }
        >
          <UserIcon className="w-6 h-6 text-gray-400" />

          <span>Account</span>
        </NavLink>
      </li>
      <li onClick={() => logout()} className="cursor-pointer">
        <div className="flex items-center gap-4  font-medium px-6 py-4 text-gray-500 hover:bg-gray-100">
          <LogoutIcon className="w-6 h-6 text-gray-400" />
          <span>Sign out</span>
        </div>
      </li>
      {/* <li>
        <button className="flex items-center gap-x-6">
          <span className="w-8 h-8">
            <Logo className="flex items-center gap-4 font-medium px-6 py-4 text-gray-500 hover:bg-gray-100" />
          </span>
          <span>Sign out</span>
        </button>
      </li> */}
    </ul>
  )
}

export default AsideNav
