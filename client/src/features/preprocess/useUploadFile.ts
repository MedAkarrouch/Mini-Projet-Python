import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { onError } from "../../utils/helpers"
import { uploadFile } from "../../services/apiPreprocess"

export const useUploadFile = () => {
  const queryClient = useQueryClient()
  const { isPending: isLoading, mutate: login } = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] })
      toast.success("Successfully logged in")
    },
    onError: onError
  })
  return { isLoading, login }
}
