import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getDataset } from "../../../services/apiDatasets"

export function useDataset() {
  const { datasetId } = useParams()
  const {
    isLoading,
    data: dataset,
    error
  } = useQuery({
    queryKey: ["dataset", datasetId],
    queryFn: () => getDataset(datasetId)
  })
  return { isLoading, dataset, error }
}
