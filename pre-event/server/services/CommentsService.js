import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class CommentsService {
  
  async getEventComments(query = {}) {
    const comments = await dbContext.Comments.find(query).populate('creator', 'name picture')
    // TODO remove this if it throws error on blank page.
    if(!comments){
      throw new BadRequest('no comments for this event')
    }
    return comments
  }

  async createComment(body) {
    const comment = await dbContext.Comments.create(body)
    await comment.populate('creator', 'name picture')
    await comment.populate('event')
    return comment
  }
  

  async editComment(body, commentId, userId) {
    if(body.creatorId.toString() != userId){
      throw new Forbidden('you may not edit another user\'s comments')
    }
    let comment = await dbContext.Comments.findById(commentId)
    comment = body
    // @ts-ignore
    await comment.save()
    return comment
  }
  
  async deleteComment(commentId, userId) {
    const comment = await dbContext.Comments.findById(commentId)
    // @ts-ignore
    if(comment.creatorId.toString() != userId) {
      throw new Forbidden('you may not delete other user\'s posts')
    }
    // @ts-ignore
    comment.remove()
    return 'comment was removed'
  }
}

export const commentsService = new CommentsService()