import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const CommentSchema = new Schema({
  body: {type: String, required: true, minlength: 3, maxlength: 250},
  eventId: {type: ObjectId, required: true},
  creatorId: {type: ObjectId, required: true},
  isAttending: {type: Boolean, required: true,}
},{
  timestamps: true, toJSON: {virtuals: true}
})

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})