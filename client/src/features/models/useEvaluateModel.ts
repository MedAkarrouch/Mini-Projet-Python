import { useMutation } from "@tanstack/react-query"
import { toast } from "react-hot-toast"

import { evaluateModel as evaluateModelApi } from "../../services/apiModelling"

export function useEvaluateModel() {
  const { mutate: evaluateModel, isPending: isEvaluating } = useMutation({
    mutationFn: evaluateModelApi,
    onSuccess: () => {
      toast.success("Model was successfully evaluated")
    },
    onError: () => toast.error("Something went wrong")
  })

  return { isEvaluating, evaluateModel }
}
