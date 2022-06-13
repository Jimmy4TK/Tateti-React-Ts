import axios, { AxiosError } from "axios"
import { http } from "../common/http"
import { updateSessionToken, cleanupSessionToken } from "../store/tokenStore"
import { cleanupSessionUser, updateSessionUser } from "../store/userStore"

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
axios.defaults.headers.common["Content-Type"] = "application/json"

export interface User {
  id: number
  email: string
  name: string
  state: string
}

export interface Token {
  token: string
}

export async function login(params: {
  email: string
  password: string
}): Promise<Token> {
  const res = (
    await axios.post(http.backendUrl + "/users/login", params)
  ).data as Token

  setCurrentToken(res.token)
  updateSessionToken(res.token)
  void reloadCurrentUser({token: res.token}).then()
  return res
}

// Valores almacenados en LOCAL STORE
function getCurrentToken(): string | undefined {
  const result = localStorage.getItem("token")
  return result ? result : undefined
}

function setCurrentToken(token: string) {
  localStorage.setItem("token", token)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  axios.defaults.headers.common.Authorization = "bearer " + token
}

function getCurrentUser(): User | undefined {
  return localStorage.getItem("user") as unknown as User
}

export async function logout(): Promise<void> {
  localStorage.removeItem("token")
  localStorage.removeItem("user")

  try {
    await axios.get(http.backendUrl + "/users/signout")
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    axios.defaults.headers.common.Authorization = ""
    return
  } catch (err) {
    return
  } finally {
    cleanupSessionToken()
    cleanupSessionUser()
  }
}

export async function reloadCurrentUser(params:{token: string}): Promise<User> {
  try {
    const res = (await axios.post(http.backendUrl + "/users/current", params
    )).data as User
    localStorage.setItem("user", JSON.stringify(res))
    updateSessionUser(res)
    return res
  } catch (err) {
    const axiosError = err as AxiosError
    if (axiosError.response && axiosError.response.status === 401) {
      void logout()
    }
    throw err
  }
}

export async function newUser(params: {
  name: string
  password: string
  password2: string
  email: string
  user: {name: string,
    password: string
    email: string}
}): Promise<Token> {
  try {
    const res = (await axios.post(http.backendUrl + "/users", params))
    .data as Token
  setCurrentToken(res.token)
  updateSessionToken(res.token)
  void reloadCurrentUser({token: res.token}).then()
  return res
  } catch (err) {
    const axiosError = err as AxiosError
    throw err
  }
}

export async function changePassword(params: {
  token: string | undefined
  currentPassword: string
  newPassword: string
  newPassword2: string
}): Promise<void> {
  try {
    await axios.post(http.backendUrl + "/users/changepassword", params)
    return
  } catch (err) {
    const axiosError = err as AxiosError

    if (axiosError.response && axiosError.response.status === 401) {
      void logout()
    }
    throw err
  }
}

if (getCurrentToken()) {
  const currentUser = getCurrentUser()
  const currentToken = getCurrentToken()
  if (currentUser !== undefined && currentToken !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    axios.defaults.headers.common.Authorization = "bearer " + currentToken
    updateSessionToken(currentToken)
    updateSessionUser(currentUser)
    void reloadCurrentUser({token: currentToken}).then()
  }
}
