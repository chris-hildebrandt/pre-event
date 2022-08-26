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
    logger.log(eventId)
    const res = await api.get('api/events/'+eventId)
    AppState.activeEvent = res.data
    logger.log(AppState.activeEvent)
    return res.data.id
  }

  async getEventsByAccountId(accountId){
    await this.getEvents()
    AppState.events = AppState.events.filter(e => e.creatorId == accountId)
  }

  async getTickets(eventId){
    const res = await api.get(`api/events/${eventId}/tickets`)
    logger.log('getting tickets', res.data)
    AppState.tickets = res.data
    logger.log(res.data)
  }

  async getComments(eventId){
    const res = await api.get(`api/events/${eventId}/comments`)
    logger.log('getting comments', res.data)
    AppState.comments = res.data
    logger.log(res.data)
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