import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js"

class EventsService{
  async getEvents(){
    AppState.events = []
    const res = await api.get('api/events')
    AppState.events = res.data.map(e => new Event(e))
    AppState.events = AppState.events.filter(e => e.isCanceled == false)
  }

  async createEvent(eventData){
    const res = await api.post('api/events', eventData)
    return res.data
  }
}
export const eventsService = new EventsService()