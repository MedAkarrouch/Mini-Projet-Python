import {
  ReactElement,
  ReactNode,
  cloneElement,
  useContext,
  useState
} from "react"
import { createPortal } from "react-dom"
import { HiXMark } from "react-icons/hi2"
import { useClickOutside } from "../hooks/useClickOutside"
import { ModalContext } from "./ModalContext" // Import the context

function Modal({ children }: { children: ReactNode }) {
  const [openName, setOpenName] = useState("")

  const close = () => setOpenName("")
  const open = setOpenName

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  )
}

function Open({
  children,
  opens: opensWindowName
}: {
  children: ReactElement
  opens: string
}) {
  const { open } = useContext(ModalContext)

  return cloneElement(children, { onClick: () => open(opensWindowName) })
}

function Window({
  children,
  name,
  size = "60vw"
}: {
  children: ReactElement
  name: string
  size?: string
}) {
  const { openName, close } = useContext(ModalContext)
  const ref = useClickOutside(close)

  if (name !== openName) return null

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-screen bg-opacity-50 bg-black backdrop-blur-sm z-50">
      <div
        ref={ref}
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-8  max-h-[95vh] overflow-y-auto transition-all`}
        style={{ width: size }}
      >
        <button
          onClick={close}
          className="absolute top-4 right-6 p-2 bg-transparent border-none rounded-full hover:bg-gray-100"
        >
          <HiXMark className="w-6 h-6 text-gray-500" />
        </button>

        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body
  )
}

Modal.Open = Open
Modal.Window = Window

export default Modal

// import {
//   Dispatch,
//   ReactElement,
//   ReactNode,
//   SetStateAction,
//   cloneElement,
//   createContext,
//   useContext,
//   useState
// } from "react"
// import { createPortal } from "react-dom"
// import { HiXMark } from "react-icons/hi2"
// import { useClickOutside } from "../hooks/useClickOutside"

// // Define Modal props and context
// type ModalProps = {
//   open: Dispatch<SetStateAction<string>>
//   close: () => void
//   openName: string
// }

// export const ModalContext = createContext<ModalProps>({
//   close: () => {},
//   openName: "",
//   open: () => {}
// })

// function Modal({ children }: { children: ReactNode }) {
//   const [openName, setOpenName] = useState("")

//   const close = () => setOpenName("")
//   const open = setOpenName

//   return (
//     <ModalContext.Provider value={{ openName, close, open }}>
//       {children}
//     </ModalContext.Provider>
//   )
// }

// function Open({
//   children,
//   opens: opensWindowName
// }: {
//   children: ReactElement
//   opens: string
// }) {
//   const { open } = useContext(ModalContext)

//   return cloneElement(children, { onClick: () => open(opensWindowName) })
// }

// function Window({ children, name }: { children: ReactElement; name: string }) {
//   const { openName, close } = useContext(ModalContext)
//   const ref = useClickOutside(close)

//   if (name !== openName) return null

//   return createPortal(
//     <div className="fixed top-0 left-0 w-full h-screen bg-opacity-50 bg-black backdrop-blur-sm z-50">
//       <div
//         ref={ref}
//         className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-8 w-[60vw] max-h-[95vh] overflow-y-auto transition-all"
//         // className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-8 w-[80vw] max-h-[95vh] overflow-y-auto transition-all"
//       >
//         <button
//           onClick={close}
//           className="absolute top-4 right-6 p-2 bg-transparent border-none rounded-full hover:bg-gray-100"
//         >
//           <HiXMark className="w-6 h-6 text-gray-500" />
//         </button>

//         <div>{cloneElement(children, { onCloseModal: close })}</div>
//       </div>
//     </div>,
//     document.body
//   )
// }

// Modal.Open = Open
// Modal.Window = Window

// export default Modal
