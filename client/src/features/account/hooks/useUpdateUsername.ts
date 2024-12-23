import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { updateUsername as updateUsernameApi } from "../../../services/apiAuth"
import { onError } from "../../../utils/helpers"

export const useUpdateUsername = () => {
  const queryClient = useQueryClient()
  const { isPending: isLoading, mutate: updateUsername } = useMutation({
    mutationFn: updateUsernameApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] })
      toast.success("Successfully updated username")
    },
    onError: onError
  })
  return { isLoading, updateUsername }
}
