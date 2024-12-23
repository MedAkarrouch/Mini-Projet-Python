import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { deleteDataset as deleteDatasetApi } from "../../../services/apiDatasets"
import { onError } from "../../../utils/helpers"

export function useDeleteDataset() {
  const queryClient = useQueryClient()

  const { mutate: deleteDataset, isPending: isDeleting } = useMutation({
    mutationFn: deleteDatasetApi,
    onSuccess: () => {
      toast.success("Dataset successfully deleted")
      queryClient.invalidateQueries({
        queryKey: ["datasets"]
      })
    },
    onError: onError
  })

  return { isDeleting, deleteDataset }
}
