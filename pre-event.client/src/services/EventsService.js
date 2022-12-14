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
    AppState.activeEvent = res.data
    return res.data.id
  }

  async getEventsByAccountId(accountId){
    await this.getEvents()
    AppState.events = AppState.events.filter(e => e.creatorId == accountId)
  }

  async getTickets(eventId){
    const res = await api.get(`api/events/${eventId}/tickets`)
    AppState.tickets = res.data
  }

  async getComments(eventId){
    const res = await api.get(`api/events/${eventId}/comments`)
    AppState.comments = res.data
  }

  async createComment(commentData){
    const res = await api.post('api/comments', commentData)
    AppState.comments.push(res.data)
  }

  async deleteComment(commentId){
    await api.delete('api/comments/'+commentId)
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