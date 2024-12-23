import UpdateUsername from "../features/account/UpdateUsername"
import UpdatePassword from "../features/account/UpdatePassword"

const Account = () => {
  return (
    <div className="px-6 py-12 bg-gray-50 h-full space-y-10 mb-24">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="mb-4 font-semibold text-2xl ">Update Username</h1>
        <div className="bg-white px-4 py-3 border border-gray-100 rounded-md overflow-hidden ">
          <UpdateUsername />
        </div>
      </div>
      {/*  */}
      <div className="max-w-screen-xl mx-auto">
        <h1 className="mb-4 font-semibold text-2xl">Update Password</h1>
        <div className="bg-white px-4 py-3 border border-gray-100 rounded-md overflow-hidden  ">
          <UpdatePassword />
        </div>
      </div>
    </div>
  )
}

export default Account
