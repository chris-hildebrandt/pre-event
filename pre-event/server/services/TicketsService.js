import { dbContext } from "../db/DbContext.js"
import { AccountSchema } from "../models/Account.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"

class TicketsService{
  async getTicketsByEventId(eventId) {
    throw new Error("Method not implemented.")
  }
  async deleteTicket(ticketData) {
    
    const ticket = await dbContext.Tickets.findById(ticketData.id)
    if(!ticket){
      throw new BadRequest('Ticket does not exist!')
    }
    // @ts-ignore
    if(ticket.accountId.toString() != AccountSchema.userInfo.id){
      throw new Forbidden('You can not remove that')
    }
    await ticket.remove()
    return 'You are no longer attending this event'
  }
  async createTicket(data) {
    const event = await eventsService.getEventById(data.id)
    if (event.capacity <= 0){
      throw new BadRequest('this event is full')
    } 
    const ticket = await dbContext.Tickets.create(data)
    await ticket.populate('event')
    await ticket.populate('profile', 'name picture')
    return ticket
  }

}
export const ticketsService = new TicketsService()