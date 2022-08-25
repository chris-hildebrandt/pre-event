import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class EventsService {

  async increaseCapacity(eventId) {
    const event = await this.getEventById(eventId)
    // @ts-ignore
    const capacity = event.capacity += 1
    await event.save()
    return capacity
  }

  async reduceCapacity(eventId) {
    const event = await dbContext.Events.findById(eventId)
    // @ts-ignore
    event.capacity -= 1
  }

  async getEventById(eventId) {
    const event = await dbContext.Events.findById(eventId).populate('creator', 'name picture')
    if (!event) {
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
    const events = await dbContext.Events.find().sort({ startDate: -1 }).populate('creator', 'name picture')
    return events
  }

  async cancelEvent(eventId, eventData, userId) {
    const event = await this.getEventById(eventId)
    // @ts-ignore
    if (event.creatorId.toString() != userId) {
      throw new Forbidden('you are not authorized to edit this event')
    }
    // event = eventData
    event.isCanceled = !event.isCanceled
    await event.save()
    // @ts-ignore
    return `${event.title} event has been canceled`
  }

  async deleteEvent(eventId, userId) {
    const event = await this.getEventById(eventId)
    // @ts-ignore
    if (event.creatorId.toString() != userId) {
      throw new Forbidden('you are not authorized to delete this event')
    }
    event.remove()
    // @ts-ignore
    return `${event.title} has been deleted`
  }

}
export const eventsService = new EventsService()