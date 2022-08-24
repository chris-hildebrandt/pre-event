import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { EventSchema } from '../models/Event'

class DbContext {
  Events = mongoose.model('Event', EventSchema);
  Account = mongoose.model('Account', AccountSchema);
}

export const dbContext = new DbContext()
