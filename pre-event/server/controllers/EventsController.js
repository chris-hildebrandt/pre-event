import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventsService } from "../services/EventsService.js"


export class EventsController extends BaseController {
  constructor() {
    // TODO check for postman compatibility
    super('api/events')
    this.router
      .get('', this.getAllEvents)
      // .get('/:id', this.getEventsById)
      // .get('/:id/tickets', this.getTicketsByEventId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      // .delete('/id', this.cancelEvent)
  }

  async getAllEvents(req, res, next) {
    try {
      const events = await eventsService.getAllEvents()
      console.log('getallevents', events)
      return res.send(events)
    } catch (error) {
      next(error)
    }
  }

  // async getEventsById(req, res, next) {
  //   try {
  //     await
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  // async getTicketsByEventId(req, res, next) {
  //   try {
  //     await
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  async createEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const event = await eventsService.createEvent(req.body)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  // async cancelEvent(req, res, next) {
  //   try {
  //     await
  //   } catch (error) {
  //     next(error)
  //   }
  // }

}
