import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { ticketsService } from "../services/TicketsService.js"
import { eventsService } from "../services/EventsService.js"

export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
      .delete('/:ticketId', this.deleteTicket)
  }

  async createTicket(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.accountId = req.userInfo.id
      const ticket = await ticketsService.createTicket(req.body)
      const eventId = res.body.eventId
      const capacity = await eventsService.reduceCapacity(eventId)
      return res.send(ticket, capacity)
    } catch (error) {
      next(error)
    }
  }

  async deleteTicket(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const ticket = await ticketsService.deleteTicket(req.body)
      const eventId = res.body.eventId
      const capacity = await eventsService.increaseCapacity(eventId)
      return res.send(ticket, capacity)
    } catch (error) {
      next(error)
    }
  }
}
