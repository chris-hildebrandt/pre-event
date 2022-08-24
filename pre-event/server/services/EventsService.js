import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class EventsService{
  async getEventById(eventId) {
    const event = await dbContext.Events.findById(eventId).populate('creator', 'name picture')
    if(!event){
      throw new BadRequest('No Matching Event Found')
    }
    return event
  }
  async createEvent(eventData) {
    const event = await dbContext.Events.create(eventData)
    await event.populate('creator', 'name picture')
    console.log('new event', event);
    return event
  }

  // TODO I would like to have a filter for canceled and full events
  async getAllEvents() {
    const events = await dbContext.Events.find().sort({startDate: -1}).populate('creator', 'name picture')
    return events
  }

}
export const eventsService = new EventsService()