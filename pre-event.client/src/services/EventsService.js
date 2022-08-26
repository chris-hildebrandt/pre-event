import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js"

class EventsService{
  async getEvents(){
    AppState.events = []
    const res = await api.get('api/events')
    AppState.events = res.data.map(e => new Event(e))
  }

  async getEventById(eventId) {
    const res = await api.get('api/events/'+eventId)
    logger.log('get event by id', res.data)
    AppState.activeEvent = res.data
  }

  async getEventsByAccountId(accountId){
    await this.getEvents()
    AppState.events = AppState.events.filter(e => e.creatorId == accountId)
  }

  async createEvent(eventData){
    const res = await api.post('api/events', eventData)
    return new Event(res.data)
  }

  async cancelEvent(eventId){
    const response = await api.delete('api/events/'+eventId)
    return response
  }
}
export const eventsService = new EventsService()