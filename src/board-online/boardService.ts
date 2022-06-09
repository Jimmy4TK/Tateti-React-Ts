import axios, { AxiosError } from "axios"
import { http } from "../common/http"
import { List } from './ListGames'

axios.defaults.headers.common["Content-Type"] = "application/json"

export interface Game {
  id: number
  pos: Array<string> 
  team: boolean
}
export interface Games {
  games: Array<Game>
}

export async function CreateGame(params:{token: string | undefined}):Promise<Game>{
  const res = (
    await axios.post(http.backendUrl + "/games", params)
  ).data as Game
  return res
}

export async function game(params:{value: number}){
  const res = (
      await axios.put(http.backendUrl + "/games/update", params)
    )
  return res
}

export async function getTeam(){
  const res = (
      await axios.get(http.backendUrl + "/games/get_team")
    )
  return res
}

export async function getStateGame(){
  const res = (
      await axios.get(http.backendUrl + "/games/get_state")
    )
  return res
}

export async function ListIncomplete():Promise<Games>{
  const res = (
      await axios.get(http.backendUrl + "/games/incomplete")
    ).data as Games
    List(res)
  return res
}

export async function AssignPlayer(){
  const res = (
    await axios.put(http.backendUrl + "/games/assign_player")
  )
  return res
}