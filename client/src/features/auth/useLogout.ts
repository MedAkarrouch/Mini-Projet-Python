import { useMutation, useQueryClient } from "@tanstack/react-query"
import { logout as logoutApi } from "../../services/apiAuth"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { onError, removeToken } from "../../utils/helpers"

export const useLogout = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { isPending: isLoading, mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      removeToken()
      navigate("/")
      queryClient.removeQueries()
      toast.success("Logged out successfully")
    },
    onError: onError
  })
  return { isLoading, logout }
}
