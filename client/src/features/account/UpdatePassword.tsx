import { useState } from "react"
import { useUpdatePassword } from "./hooks/useUpdatePassword"
import toast from "react-hot-toast"

const UpdatePassword = () => {
  const { isLoading, updatePassword } = useUpdatePassword()
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const onReset = () => {
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  const onSave = () => {
    if (newPassword != confirmPassword) {
      toast.error("Password and Confirm Password do not match")
      return
    }
    updatePassword(
      {
        current_password: currentPassword,
        new_password: newPassword
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
          htmlFor="curr-password-2"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Current Pasword
        </label>
        <input
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          type="password"
          name="username"
          id="curr-password-2"
          required
          className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
      </div>
      <div className="grid grid-cols-[18rem_1fr_1fr] items-center border-b border-gray-100 pb-6">
        <label
          htmlFor="new-password"
          className="block text-sm/6 font-medium text-gray-900"
        >
          New Password
        </label>
        <input
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          type="password"
          name="username"
          id="new-password"
          // value={username}
          // onChange={(e) => setUsername(e.target.value)}
          required
          className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
      </div>
      <div className="grid grid-cols-[18rem_1fr_1fr] items-center border-b border-gray-100 pb-6">
        <label
          htmlFor="confirm-new-password"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Confirm New Password
        </label>
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          name="username"
          id="confirm-new-password"
          // value={username}
          // onChange={(e) => setUsername(e.target.value)}
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
          disabled={isLoading}
          onClick={onSave}
          className="bg-blue-600 text-white py-3 px-7 rounded-full hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-300"
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default UpdatePassword
