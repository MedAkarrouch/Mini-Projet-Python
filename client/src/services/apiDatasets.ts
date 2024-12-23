import API from "../api"
import { AddExternalDataset, AddLocalDataset } from "../types"

export const getDatasets = async () => {
  const res = await API.get("/datasets")
  console.log("Res = ", res.data)
  if (res.status != 200) throw new Error(res.data.detail)
  else return res.data.datasets
}

export const getDataset = async (datasetId: string | undefined) => {
  const res = await API.get(`/datasets/dataset/${datasetId}`)
  console.log("Res = ", res.data)
  if (res.status != 200) throw new Error(res.data.detail)
  else return res.data
}
//   (external_library = data.external_library),
//   (external_library_dataset_name =
//     data.external_library_dataset_name)
export const addDataset = async (data: FormData) => {
  const res = await API.post("/datasets", data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
  console.log("Res = ", res.data)
  if (res.status != 201) throw new Error(res.data.detail)
  return res.data
}

export const deleteDataset = async (datasetId: number) => {
  const res = await API.delete(`/datasets/dataset/${datasetId}`)
  console.log("Res = ", res.data)
  if (res.status != 204) throw new Error(res.data.detail)
}
