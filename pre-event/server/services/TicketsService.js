import { dbContext } from "../db/DbContext.js"
import { AccountSchema } from "../models/Account.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TicketsService{
  getTicketsByEventId(eventId) {
    throw new Error("Method not implemented.")
  }
  async deleteTicket(ticketData) {
    
    const ticket = await dbContext.Tickets.findById(ticketData.id)
    if(!ticket){
      throw new BadRequest('Ticket does not exist!')
    }
    if(ticket.accountId.toString() != AccountSchema.userInfo.id){
      throw new Forbidden('You can not remove that')
    }
    await ticket.remove()
    return 'collab ended'
  }
  createTicket(body) {
    throw new Error("Method not implemented.");
  }

}
export const ticketsService = new TicketsService()