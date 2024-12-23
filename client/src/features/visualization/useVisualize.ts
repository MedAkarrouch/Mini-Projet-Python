import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { addDataset as addDatasetApi } from "../../../services/apiDatasets"
import { useNavigate } from "react-router-dom"

export function useAddDataset() {
  const queryClient = useQueryClient()
  const { mutate: addDataset, isPending: isAdding } = useMutation({
    mutationFn: addDatasetApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["datasets"]
      })
    },
    onError: (err) => toast.error(err.message)
  })

  return { isAdding, addDataset }
}
