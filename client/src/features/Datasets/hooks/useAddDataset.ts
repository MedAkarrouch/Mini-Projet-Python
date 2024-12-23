import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { addDataset as addDatasetApi } from "../../../services/apiDatasets"
import { useNavigate } from "react-router-dom"
import { onError } from "../../../utils/helpers"

export function useAddDataset() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { mutate: addDataset, isPending: isAdding } = useMutation({
    mutationFn: addDatasetApi,
    onSuccess: ({ dataset_id }) => {
      toast.success("Dataset successfully created")
      queryClient.invalidateQueries({
        queryKey: ["datasets"]
      })
      navigate(`/datasets/${dataset_id}`)
    },
    onError: onError
  })

  return { isAdding, addDataset }
}
