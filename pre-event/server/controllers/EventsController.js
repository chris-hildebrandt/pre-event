import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventsService } from "../services/EventsService.js"
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";


export class EventsController extends BaseController {
  constructor() {
    // TODO check for postman compatibility
    super('api/events')
    this.router
      .get('', this.getAllEvents)
      .get('/:eventId', this.getEventById)
      .get('/:eventId/tickets', this.getTicketsByEventId)
      .get('/:eventId/comments', this.getEventComments)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .put('/:eventId', this.editEvent)
      .delete('/:eventId', this.cancelEvent)
  }
  async getAllEvents(req, res, next) {
    try {
      const events = await eventsService.getAllEvents()
      return res.send(events)
    } catch (error) {
      next(error)
    }
  }

  async getEventById(req, res, next) {
    try {
      const event = await eventsService.getEventById(req.params.eventId)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async getTicketsByEventId(req, res, next) {
    try {
      const tickets = await ticketsService.getTicketsByEventId(req.params.eventId)
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }
  async getEventComments(req, res, next) {
    try {
      const comments = await commentsService.getEventComments({eventId: req.params.eventId})
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async createEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const event = await eventsService.createEvent(req.body)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async editEvent(req, res, next) {
    try { 
      let event = await eventsService.editEvent(req.params.eventId, req.userInfo.id, req.body)
    return res.send(event)
  } catch (error) {
    next(error)
  }
  }
  async cancelEvent(req, res, next) {
    try {
      const response = await eventsService.cancelEvent(req.params.eventId, req.userInfo.id)
      return res.send(response)
    } catch (error) {
      next(error)
    }
  }

  // async deleteEvent(req, res, next) {
  //   try {
  //     const response = await eventsService.deleteEvent(req.body.eventId, req.userInfo.id)
  //     return res.send(response)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

}
