import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  MouseEvent
} from "react"
import { createPortal } from "react-dom"
import { HiEllipsisVertical } from "react-icons/hi2"
import { useClickOutside } from "../hooks/useClickOutside"

// Define the shape of the context
interface MenusContextType {
  openId: string
  open: (id: string) => void
  close: () => void
}

// Create Context with undefined as default
const MenusContext = createContext<MenusContextType | undefined>(undefined)

// Define the props for the Menus component
interface MenusProps {
  children: ReactNode
}

// Define the Menus component with sub-components
const Menus: FC<MenusProps> & {
  Menu: FC<{ children: ReactNode }>
  Toggle: FC<ToggleProps>
  List: FC<ListProps>
  Button: FC<ButtonProps>
} = ({ children }) => {
  const [openId, setOpenId] = useState<string>("")

  const open = (id: string) => setOpenId(id)
  const close = () => setOpenId("")

  return (
    <MenusContext.Provider value={{ openId, open, close }}>
      {children}
    </MenusContext.Provider>
  )
}

// Define props for Toggle component
interface ToggleProps {
  id: string
}

// Toggle Component
Menus.Toggle = function Toggle({ id }: ToggleProps) {
  const context = useContext(MenusContext)
  if (!context) {
    throw new Error("Toggle must be used within a Menus provider")
  }
  const { openId, open, close } = context

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    openId === id ? close() : open(id)
  }

  return (
    <button
      onClick={handleClick}
      className="bg-none border-none p-1 rounded-sm translate-x-3 transition-all duration-200 hover:bg-gray-100"
      aria-haspopup="true"
      aria-expanded={openId === id}
      aria-controls={`menu-${id}`}
    >
      <HiEllipsisVertical className="w-10 h-10 text-gray-700" />
    </button>
  )
}

// Define props for Menu component
interface MenuProps {
  children: ReactNode
}

// Menu Component
Menus.Menu = function Menu({ children }: MenuProps) {
  return <div className="flex items-center justify-end">{children}</div>
}

// Define props for List component
interface ListProps {
  id: string
  children: ReactNode
}

// List Component
Menus.List = function List({ id, children }: ListProps) {
  const context = useContext(MenusContext)
  if (!context) {
    throw new Error("List must be used within a Menus provider")
  }
  const { openId, close } = context
  const ref = useClickOutside<HTMLUListElement>(close, false)

  if (openId !== id) return null

  const container = document.getElementById(id)
  if (!container) {
    console.warn(`Container with id "${id}" not found.`)
    return null
  }

  return createPortal(
    <ul
      ref={ref}
      id={`menu-${id}`}
      className="absolute right-7 bottom-24 bg-white shadow-md rounded-md z-50"
      role="menu"
      aria-labelledby={`toggle-${id}`}
    >
      {children}
    </ul>,
    container
  )
}

// Define props for Button component
interface ButtonProps {
  icon?: ReactNode
  children: ReactNode
  onClick?: () => void
}

// Button Component
Menus.Button = function Button({ icon, children, onClick }: ButtonProps) {
  const context = useContext(MenusContext)
  if (!context) {
    throw new Error("Button must be used within a Menus provider")
  }
  const { close } = context

  const handleClick = () => {
    onClick?.()
    close()
  }

  return (
    <li>
      <button
        onClick={handleClick}
        className="w-full text-left bg-none border-none py-5 px-10 text-base transition-all duration-200 flex items-center gap-4 hover:bg-gray-50"
        role="menuitem"
      >
        {icon && (
          <span className="w-6 h-6 text-gray-400 transition-colors duration-300">
            {icon}
          </span>
        )}
        <span>{children}</span>
      </button>
    </li>
  )
}

export default Menus
