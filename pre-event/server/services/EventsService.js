import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class EventsService {

  async increaseCapacity(eventId) {
    const event = await this.getEventById(eventId)
    // @ts-ignore
    event.capacity += 1
    await event.save()
  }

  async reduceCapacity(eventId) {
    const event = await dbContext.Events.findById(eventId)
    // @ts-ignore
    event.capacity -= 1
    // @ts-ignore
    await event.save()
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
    return event
  }

  // TODO I would like to have a filter for canceled and full events sort by date: .sort({ startDate: -1 })
  async getAllEvents() {
    const events = await dbContext.Events.find().populate('creator', 'name picture')
    return events
  }

  async cancelEvent(eventId, userId) {
    const event = await this.getEventById(eventId)
    // @ts-ignore
    if (event.creatorId.toString() != userId) {
      throw new Forbidden('you are not authorized to cancel this event')
    }
    event.isCanceled = !event.isCanceled
    await event.save()
    // @ts-ignore
    return `${event.title} event has been canceled`
  }

  async editEvent(eventId, userId, data) {
    let event = await this.getEventById(eventId)
    // @ts-ignore
    if (event.creatorId.toString() != userId) {
      throw new Forbidden('you are not authorized to edit this event')
    }
    if (event.isCanceled) {
      throw new BadRequest('this event has been canceled')
    }
    event.name = data.name || event.name
    event.description = data.description || event.description
    event.coverImg = data.coverImg || event.coverImg
    event.location = data.location || event.location
    event.capacity = data.capacity || event.capacity
    event.startDate = data.startDate || event.startDate
    event.type = data.type || event.type

    await event.save()
    return event
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