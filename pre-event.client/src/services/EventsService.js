import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"

class EventsService{
  async getEvents(){
    const res = await api.get('api/events')
    console.log(res);
  }
}
export const eventsService = new EventsService()