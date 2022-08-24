import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentsService {
  getEventComments(eventId) {
    throw new Error("Method not implemented.")
  }
  async find(query = {}) {
    const Comments = await dbContext.Comments.find(query)
    return Comments
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
