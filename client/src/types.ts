export type User = {
  id: number
  username: string
  full_name: string
}

export type LoginData = {
  username: string
  password: string
}

export type RegisterData = {
  username: string
  full_name: string
  password: string
}
export type AddExternalDataset = {
  name: string
  target_name: string
  external: boolean
  external_library?: string
  external_library_dataset_name?: string
}
export type AddLocalDataset = FormData
