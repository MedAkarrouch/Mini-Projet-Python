import { useMutation, useQueryClient } from "@tanstack/react-query"
import { login as loginApi } from "../../services/apiAuth"
import toast from "react-hot-toast"
import { onError } from "../../utils/helpers"
import { useNavigate } from "react-router-dom"

export const useLogin = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { isPending: isLoading, mutate: login } = useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] })
      toast.success("Successfully logged in")
      setTimeout(() => {
        navigate("/home")
      }, 1000)
    },
    onError: onError
  })
  return { isLoading, login }
}
