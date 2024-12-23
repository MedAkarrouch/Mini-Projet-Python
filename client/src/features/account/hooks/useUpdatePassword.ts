import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { updatePassword as updatePasswordApi } from "../../../services/apiAuth"
import { onError } from "../../../utils/helpers"

export const useUpdatePassword = () => {
  const queryClient = useQueryClient()
  const { isPending: isLoading, mutate: updatePassword } = useMutation({
    mutationFn: updatePasswordApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] })
      toast.success("Successfully updated password")
    },
    onError: onError
  })
  return { isLoading, updatePassword }
}
