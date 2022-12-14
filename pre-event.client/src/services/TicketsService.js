import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TicketsService{

  async createTicket(newTicket){
    const res = await api.post('api/tickets', newTicket)
    AppState.tickets.push(res.data)
  }

  async removeTicket(ticket){
    await api.delete('api/tickets/'+ticket.id)
    AppState.tickets = AppState.tickets.filter(t=>t.id != ticket.id)
  }

  async getTickets(){
    const res = await api.get('account/tickets')
    logger.log(res.data)
    AppState.tickets = res.data
  }
}
export const ticketsService = new TicketsService()