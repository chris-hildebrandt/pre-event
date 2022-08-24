import { dbContext } from "../db/DbContext.js"



class EventsService{
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