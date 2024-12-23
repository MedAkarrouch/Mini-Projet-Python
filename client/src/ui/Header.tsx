import { useUser } from "../features/auth/useUser"

const Header = () => {
  const { user, isLoading } = useUser()
  const words = user?.full_name?.split(" ")
  if (isLoading) return null
  return (
    <header className="bg-white col-start-2 col-end flex justify-between gap-10 items-center px-6 py-4 border-b border-gray-200 ">
      {/* <p>Welcome, {user?.full_name}</p> */}
      <div className="">
        <p className="font-semibold text-lg">Welcome,</p>
        <p className="font-bold text-base">{user?.full_name} !</p>
      </div>

      <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full shadow-md">
        <span className="font-semibold text-gray-600 text-lg ">
          {words[0].charAt(0).toUpperCase()}
          {words[1].charAt(0).toUpperCase()}
        </span>
      </div>
    </header>
  )
}

export default Header
