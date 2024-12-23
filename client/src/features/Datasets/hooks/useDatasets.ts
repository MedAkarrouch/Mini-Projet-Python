import { useQuery } from "@tanstack/react-query"
import { getDatasets } from "../../../services/apiDatasets"

export function useDatasets() {
  const {
    isLoading,
    data: datasets,
    error
  } = useQuery({
    queryKey: ["datasets"],
    queryFn: getDatasets
  })
  return { isLoading, datasets, error }
}
