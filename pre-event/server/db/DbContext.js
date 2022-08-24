import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { CommentSchema } from "../models/Comment.js";
import { EventSchema } from '../models/Event'
import { TicketSchema } from "../models/Ticket.js";

class DbContext {
  Events = mongoose.model('Event', EventSchema);
  Account = mongoose.model('Account', AccountSchema);
  Tickets = mongoose.model('Ticket', TicketSchema)
  Comments = mongoose.model('Comment', CommentSchema)
}

export const dbContext = new DbContext()
