import Logo from "./Logo"
import { HiMiniPlus } from "react-icons/hi2"

import Modal from "./Modal"
import NewDataset from "../features/Datasets/NewDataset"
import AsideNav from "./AsideNav"

const Aside = () => {
  return (
    <Modal>
      <aside
        // key={Math.random()}
        id={"create-btn"}
        className="space-y-12 relative border-r border-gray-200 col-start-1 col-end-2 row-start-1 row-end-3 px-4 shadow-inner"
      >
        <Logo />
        <Modal.Open opens="upload-dataset">
          <button
            data-menutarget="true"
            className="flex items-center gap-x-4 px-6 py-2 bg-white rounded-full shadow-md border border-gray-200"
          >
            <span className="text-blue-600 text-4xl font-black">
              <HiMiniPlus />
            </span>
            <span className="text-gray-700 text-lg">Create</span>
          </button>
        </Modal.Open>
        <Modal.Window name="upload-dataset">
          <NewDataset />
        </Modal.Window>
        <AsideNav />
      </aside>
    </Modal>
  )
}

export default Aside
// import Logo from "./Logo"
// import {
//   HiCubeTransparent,
//   HiMiniPlus,
//   HiOutlineViewColumns
// } from "react-icons/hi2"

// import {
//   HiOutlineHome as HomeIcon,
//   HiOutlineUsers as UsersIcon,
//   HiMiniArrowLeftOnRectangle as LogoutIcon,
//   HiOutlineUserCircle as UserIcon
// } from "react-icons/hi2"

// import { NavLink } from "react-router-dom"

// import { Link, useNavigate } from "react-router-dom"
// import { useState } from "react"
// import Modal from "./Modal"
// import NewDataset from "../features/Datasets/NewDataset"

// const Aside = () => {
//   const [showMenu, setShowMenu] = useState(false)
//   return (
//     <Modal>
//       <aside
//         key={Math.random()}
//         id={"create-btn"}
//         className="relative border-r border-gray-200 col-start-1 col-end-2 row-start-1 row-end-3 px-4 shadow-inner"
//       >
//         <Logo />
//         <CreateBtn onClick={() => setShowMenu((prev) => !prev)} />
//         {showMenu && (
//           <ul className="absolute top-44 right-7  bg-white shadow-lg rounded-md z-50">
//             {/*  */}
//             <li>
//               <Modal.Open opens="upload-dataset">
//                 <button
//                   className="w-full text-left bg-none border-none py-5 px-10 text-base transition-all duration-200 flex items-center gap-4 hover:bg-gray-50"
//                   role="menuitem"
//                 >
//                   <span className="w-6 h-6 text-gray-400 transition-colors duration-300">
//                     <HiOutlineViewColumns className="w-full h-full block text-gray-600" />
//                   </span>
//                   <span>New Dataset</span>
//                 </button>
//               </Modal.Open>
//               <Modal.Window name="upload-dataset">
//                 <NewDataset />
//               </Modal.Window>
//             </li>
//             <li>
//               <button
//                 className="w-full text-left bg-none border-none py-5 px-10 text-base transition-all duration-200 flex items-center gap-4 hover:bg-gray-50"
//                 role="menuitem"
//               >
//                 <span className="w-6 h-6 text-gray-400 transition-colors duration-300">
//                   <HiCubeTransparent className="w-full h-full block text-gray-600" />
//                 </span>
//                 <span>New Model</span>
//               </button>
//             </li>
//           </ul>
//         )}
//         <Nav />
//       </aside>
//     </Modal>
//   )
// }
// const Nav = () => {
//   return (
//     <ul className="mt-12 space-y-6 text-gray-600 text-2xl font-medium">
//       <li>
//         <NavLink
//           to={"/home"}
//           className={({ isActive }) =>
//             `flex items-center gap-4 font-medium px-6 py-4 text-gray-500 hover:bg-gray-100 ${
//               isActive ? "bg-gray-50" : ""
//             }`
//           }
//         >
//           <HomeIcon className="w-6 h-6 text-gray-400" />
//           <span>Honme</span>
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to="/datasets"
//           className={({ isActive }) =>
//             `flex items-center gap-4 font-medium px-6 py-4 text-gray-500 hover:bg-gray-100 ${
//               isActive ? "bg-gray-50" : ""
//             }`
//           }
//         >
//           <UsersIcon className="w-6 h-6 text-gray-400" />
//           <span>Datasets</span>
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to={"/account"}
//           className={({ isActive }) =>
//             `flex items-center gap-4  font-medium px-6 py-4 text-gray-500 hover:bg-gray-100 ${
//               isActive ? "bg-gray-50" : ""
//             }`
//           }
//         >
//           <UserIcon className="w-6 h-6 text-gray-400" />

//           <span>Account</span>
//         </NavLink>
//       </li>
//       {/* <li>
//         <button className="flex items-center gap-x-6">
//           <span className="w-8 h-8">
//             <Logo className="flex items-center gap-4 font-medium px-6 py-4 text-gray-500 hover:bg-gray-100" />
//           </span>
//           <span>Sign out</span>
//         </button>
//       </li> */}
//     </ul>
//   )
// }
// // const CreateBtn = ({ children }: { children: React.ReactNode }) => {
// const CreateBtn = ({ onClick }: { onClick: () => void }) => {
//   //
//   return (
//     <button
//       onClick={onClick}
//       data-menutarget="true"
//       className="flex items-center gap-x-4 px-6 py-2 bg-white rounded-full shadow-md border border-gray-200"
//     >
//       <span className="text-blue-600 text-4xl font-black">
//         <HiMiniPlus />
//       </span>
//       <span className="text-gray-700 text-lg">Create</span>
//     </button>
//   )
// }

// export default Aside
