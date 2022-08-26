import { dbContext } from "../db/DbContext.js"
import { AccountSchema } from "../models/Account.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"

class TicketsService{
  async getTicketsByEventId(eventId) {
    const tickets = await dbContext.Tickets.find({eventId}).populate('profile', 'name picture')
    return tickets
  }

  async getTicketsByAccountId(accountId) {
    const tickets = await dbContext.Tickets.find({accountId}).populate('event')
    return tickets
  }

  async deleteTicket(ticketId, userId) {
    
    const ticket = await dbContext.Tickets.findById(ticketId)
    if(!ticket){
      throw new BadRequest('Ticket does not exist!')
    }
    // @ts-ignore
    if(ticket.accountId.toString() != userId){
      throw new Forbidden('You can not remove that')
    }
    // @ts-ignore
    const eventId = ticket.eventId.toString()
    await eventsService.increaseCapacity(eventId)
    await ticket.remove()
    return 'You are no longer attending this event'
  }
  async createTicket(data) {
    const event = await eventsService.getEventById(data.eventId)
    // @ts-ignore
    if (event.capacity <= 0){
      throw new BadRequest('this event is full')
    } 
    const ticket = await dbContext.Tickets.create(data)
    await ticket.populate('event', 'name coverImg startDate')
    await ticket.populate('profile', 'name picture')
    // @ts-ignore
    const eventId = ticket.eventId.toString()
    await eventsService.reduceCapacity(eventId)
    return ticket
  }

}
export const ticketsService = new TicketsService()