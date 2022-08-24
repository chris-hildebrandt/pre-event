import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const EventSchema = new Schema(
  {
    id: { type: String, required: true},
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    name: { type: String, required: true, minlength: 3, maxlength: 100 },
    description: { type: String, required: true, minlength: 3, maxlength: 300 },
    coverImg: { type: String, required: true, maxlength: 150},
    location: { type: String, required: true, minlength: 3, maxlength: 100},
    capacity: { type: Number, required: true, min: 1, max: 1000 },
    startDate: { type: Date, required: true, validate: {
      validator: function (v) { return (v && v.getTime() > Date.now() + 24 * 60 * 60 * 1000)}}},
    isCanceled: { type: Boolean, required: true, default: false},
    type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'] }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

EventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
