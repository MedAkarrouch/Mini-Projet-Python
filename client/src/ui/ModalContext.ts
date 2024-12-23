import { createContext, Dispatch, SetStateAction } from "react"

type ModalProps = {
  open: Dispatch<SetStateAction<string>>
  close: () => void
  openName: string
}

// Create and export the context
export const ModalContext = createContext<ModalProps>({
  close: () => {},
  openName: "",
  open: () => {}
})
