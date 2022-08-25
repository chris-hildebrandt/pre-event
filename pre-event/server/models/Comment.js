import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const CommentSchema = new Schema({
  body: {type: String, required: true, minlength: 3, maxlength: 1000},
  eventId: {type: ObjectId, ref: 'Event', required: true},
  creatorId: { type: ObjectId, ref: 'Account', required: true },
  isAttending: {type: Boolean, required: false}
},{
  timestamps: true, toJSON: {virtuals: true}
})

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

CommentSchema.virtual('event', {
  localField: 'eventId',
  foreignField: '_id',
  ref: 'Event',
  justOne: true
})