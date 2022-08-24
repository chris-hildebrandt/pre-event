import { dbContext } from "../db/DbContext.js"



class EventsService{
  async createEvent(eventData) {
    const event = await dbContext.Events.create(eventData)
    await event.populate('creator', 'name picture')
    console.log('new event', event);
    return event
  }

  getAllEvents() {
    throw new Error("Method not implemented.")
  }
  async 
}
export const eventsService = new EventsService()