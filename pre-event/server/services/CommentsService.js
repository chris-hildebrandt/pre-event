import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentsService {
  getEventComments(eventId) {
    throw new Error("Method not implemented.")
  }

  async findById(id) {
    const value = await dbContext.Comments.findById(id)
    if (!value) {
      throw new BadRequest('Invalid Id')
    }
    return value
  }
}

export const commentsService = new CommentsService()