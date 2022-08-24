import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class EventsService{
  deleteEvent(eventId) {
    throw new Error("Method not implemented.")
  }
  async increaseCapacity(eventId) {
    const event = await this.getEventById(eventId)
    const capacity = event.capacity -= 1
    await event.save()
    return capacity
  }
  reduceCapacity(eventId) {
    throw new Error("Method not implemented.")
  }
  async getEventById(eventId) {
    const event = await dbContext.Events.findById(eventId).populate('creator', 'name picture')
    if(!event){
      throw new BadRequest('No Matching Event Found')
    }
    return event
  }
  async createEvent(eventData) {
    // get event check capacity, create ticket edit , 
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

  async cancelEvent(eventId, userId){
    const event = this.getEventById(eventId)
    if(event.creatorId.toString() != userId){
      throw new Forbidden('you are not authorized to edit this event')
    }
      event.isCanceled = !(await event).isCanceled
      await event.save()
      return `${event.title} event has been canceled`
  }

}
export const eventsService = new EventsService()