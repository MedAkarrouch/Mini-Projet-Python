import { Outlet } from "react-router-dom"
import Aside from "./Aside"
import Header from "./Header"
import { useEffect } from "react"
import { useUser } from "../features/auth/useUser"
import { useNavigate } from "react-router-dom"
import Spinner from "./Spinner"

const AppLayout = () => {
  const navigate = useNavigate()
  const { isLoading, isAuthenticated } = useUser()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) navigate("/")
  }, [isLoading, isAuthenticated, navigate])

  if (isLoading) return <Spinner />
  if (!isLoading && !isAuthenticated) return null
  return (
    <div className="min-h-screen max-h-screen grid grid-cols-[17rem_1fr] grid-rows-[max_content_1fr] overflow-hidden">
      <Header />
      <Aside />
      {/* <main className="col-start-2 col-end-3 row-start-2 row-end-3 grid grid-cols-[10rem_1fr] gap-y-4 grid-rows-[min-content_min-content_1fr] "> */}
      <main className="col-start-2 col-end-3 row-start-2 row-end-3 min-h-screen overflow-y-auto h-dvh">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
