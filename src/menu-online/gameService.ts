import axios, { AxiosError } from "axios"
import { http } from "../common/http"
import { updateSessionGames } from "../store/gamesStore"
import { updateSessionGame } from "../store/gameStore"

axios.defaults.headers.common["Content-Type"] = "application/json"

export interface Game {
  id: number
  player1: string
  player2: string
  state: string
  pos: string
  team: boolean
}
export interface Games {
  games: Array<Game>
}

export async function CreateGame(params:{token: string | undefined}):Promise<Game>{
  try{
    const res = (
      await axios.post(http.backendUrl + "/games", params)
    ).data as Game
    localStorage.setItem("game", JSON.stringify(res))
    updateSessionGame(res)
    return res
  } catch (err) {
    const axiosError = err as AxiosError
    throw err
  }
}

export async function Game(id:number):Promise<Game>{
  const res = (
      await axios.get(http.backendUrl + "/games/checkplayer/"+id)
  ).data as Game
  localStorage.setItem("game", JSON.stringify(res))
  updateSessionGame(res)
  return res
}

export async function Update(id:number,params:{game:{pos:string},position:number}):Promise<Game>{
  const res = (
      await axios.put(http.backendUrl + "/games/"+id,params)
  ).data as Game
  localStorage.setItem("game", JSON.stringify(res))
  updateSessionGame(res)
  return res
}

export async function ListIncomplete(){
  try{
    const res = (
        await axios.get(http.backendUrl + "/games/incomplete")
      ).data as Games
    localStorage.setItem("games", JSON.stringify(res))
    updateSessionGames(res)
    return res
  } catch (err) {
    const axiosError = err as AxiosError
    throw err
  }
}

export async function AssignPlayer(id:number,params:{token: string | undefined}):Promise<Game>{
  try{
    const res = (
      await axios.post(http.backendUrl + "/games/assignplayer/"+ id,params)
    ).data as Game
    localStorage.setItem("game", JSON.stringify(res))
    updateSessionGame(res)
    return res
  } catch (err) {
    const axiosError = err as AxiosError
    throw err
  }
}
