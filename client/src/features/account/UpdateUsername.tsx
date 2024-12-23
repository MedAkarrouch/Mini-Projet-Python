import { useState } from "react"
import { useUser } from "../auth/useUser"
import { useUpdateUsername } from "./hooks/useUpdateUsername"

const UpdateUsername = () => {
  const { isLoading, updateUsername } = useUpdateUsername()
  const { user } = useUser()
  const [newUsername, setNewUsername] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")

  const onReset = () => {
    setNewUsername("")
    setCurrentPassword("")
  }

  const onSave = () => {
    updateUsername(
      {
        new_username: newUsername,
        current_password: currentPassword
      },
      {
        onSuccess: onReset
      }
    )
  }

  return (
    <div className="p-6 pb-4 flex flex-col gap-6">
      <div className="grid grid-cols-[18rem_1fr_1fr] items-center border-b border-gray-100 pb-6">
        <label
          htmlFor="username"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Current Username
        </label>
        <input
          disabled
          type="text"
          name="username"
          id="username"
          value={user?.username}
          // value={username}
          // onChange={(e) => setUsername(e.target.value)}
          required
          className="disabled:bg-gray-100 disabled:cursor-not-allowed block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
      </div>
      <div className="grid grid-cols-[18rem_1fr_1fr] items-center border-b border-gray-100 pb-6">
        <label
          htmlFor="new-username"
          className="block text-sm/6 font-medium text-gray-900"
        >
          New Username
        </label>
        <input
          type="text"
          name="new-username"
          id="new-username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          required
          className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
      </div>
      <div className="grid grid-cols-[18rem_1fr_1fr] items-center border-b border-gray-100 pb-6">
        <label
          htmlFor="password"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Current Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
      </div>
      <div className="flex justify-end space-x-4 text-sm">
        <button
          disabled={isLoading}
          onClick={onReset}
          className="text-gray-700 py-3 px-6 shadow-inner border border-gray-300 rounded-full hover:bg-gray-300 transition duration-300"
        >
          Reset
        </button>
        <button
          onClick={onSave}
          disabled={isLoading}
          className="bg-blue-600 text-white py-3 px-7 rounded-full hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-300"
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default UpdateUsername
