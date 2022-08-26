import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TicketsService{

  async createTicket(newTicket){
    const res = await api.post('api/tickets', newTicket)
    logger.log('new Ticket', res.data)
    AppState.tickets.push(res.data)
  }

  async removeTicket(ticket){
    logger.log('ticketId', ticket.id)
    const res = await api.delete('api/tickets/'+ticket.id)
    AppState.tickets = AppState.tickets.filter(t=>t.id != ticket.id)
    // routerpush from ticket on accountdetails to event page
  }
}
export const ticketsService = new TicketsService()