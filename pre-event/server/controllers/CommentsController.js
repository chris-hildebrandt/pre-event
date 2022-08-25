import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import BaseController from "../utils/BaseController.js";

export class CommentsController extends BaseController{
  constructor(){
    super('api/comments')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createComment)
    .put('/:commentId', this.editComment)
    .delete('/:commentId', this.deleteComment)
  }

  async createComment(req, res, next){
    try {
      req.body.creatorId = req.userInfo.id
      const comment = await commentsService.createComment(req.body)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async editComment(req, res, next){
    try {
      const comment = await commentsService.editComment(req.body, req.body.id, req.userInfo.id)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async deleteComment(req, res, next){
    try {
      const response = await commentsService.deleteComment(req.params.commentId, req.userInfo.id)
      return res.send(response)
    } catch (error) {
      next(error)
    }
  }
}