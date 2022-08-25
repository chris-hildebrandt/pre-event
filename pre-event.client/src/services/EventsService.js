import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class EventsService{
  async getEvents(){
    const res = await api.get('api/events')
    logger.log('heres the events', res.data)
  }
}
export const eventsService = new EventsService()