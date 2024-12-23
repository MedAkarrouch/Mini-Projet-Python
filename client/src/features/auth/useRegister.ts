import { useMutation, useQueryClient } from "@tanstack/react-query"
import { register as registerApi } from "../../services/apiAuth"
import toast from "react-hot-toast"
import { onError } from "../../utils/helpers"
import { useNavigate } from "react-router-dom"

export const useRegister = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { isPending: isLoading, mutate: register } = useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] })
      toast.success("Successfully signed up")
      setTimeout(() => {
        navigate("/home")
      }, 1000)
    },
    onError: onError
  })
  return { isLoading, register }
}
