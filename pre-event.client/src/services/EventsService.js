import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"

class EventsService{
  async getEvents(){
    const res = await api.get('api/events')
    AppState.events = res.data
    console.log(res.data);
  }
}
export const eventsService = new EventsService()