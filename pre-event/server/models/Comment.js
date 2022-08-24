import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const CommentSchema = new Schema({
  body: {type: String, required: true, minlength: 3, maxlength: 250},
  eventId: {type: ObjectId, ref: 'Event', required: true},
  creatorId: { type: ObjectId, ref: 'Account', required: true },
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

CommentSchema.virtual('creator', {
  localField: 'eventId',
  foreignField: '_id',
  ref: 'Event',
  justOne: true
})