import { useState } from "react"
import Login from "./Login"
import Register from "./Register"

const AuthModal = () => {
  const [window, setWindow] = useState("login")
  if (window == "login") return <Login setWindow={setWindow} />
  else return <Register setWindow={setWindow} />
}

export default AuthModal
