import API from "../api"
import { LoginData, User, RegisterData } from "../types"
import { removeToken, setToken } from "../utils/helpers"

export const updateUsername = async (data: {
  current_password: string
  new_username: string
}): Promise<void> => {
  const res = await API.post("/auth/update_username", data)
  console.log("Res = ", res.data)
  if (res.status != 200) throw new Error(res.data.detail)
}

export const updatePassword = async (data: {
  current_password: string
  new_password: string
}): Promise<void> => {
  const res = await API.post("/auth/update_password", data)
  console.log("Res = ", res.data)
  if (res.status != 200) throw new Error(res.data.detail)
}

export const login = async (data: LoginData): Promise<void> => {
  const res = await API.post("/auth/login", data)
  console.log("Res = ", res.data)
  if (res.status != 200) throw new Error(res.data.detail)
  else setToken(res.data.token)
}

export const register = async (data: RegisterData): Promise<void> => {
  const res = await API.post("/auth/register", data)
  console.log("Res = ", res.data)
  if (res.status != 201) throw new Error(res.data.detail)
  else setToken(res.data.token)
}

export const getMe = async (): Promise<User | null> => {
  try {
    const res = await API.get("/auth/me")
    // console.log("Res = ", res.data.user)
    if (res.status != 200) throw new Error(res.data.detail)
    return res.data.user
  } catch {
    return null
  }
}

export const logout = async () => removeToken()
