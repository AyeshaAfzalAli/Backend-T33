import mongoose, { Schema } from 'mongoose';
import { getBatch } from '../utils/helper';
import type { Status } from '../utils/types';

const personSchema = new Schema({
  name: String,
  dob: String,
  gender: String,
  contact: String,
  address: String,
  code: {
    type: String,
    required: true,
    enum: ['women', 'child']
  },
  statusHistory: [{
    status: {
      type: String,
      enum: Object.values({
        outreach: 'outreach',
        trafficked: 'trafficked',
        rescued: 'rescued',
        empowered: 'empowered',
        reintegrated: 'reintegrated'
      } as Record<Status, Status>)
    },
    date: { type: Date, default: Date.now },
    batch: {
      year: Number,
      quarter: Number
    }
  }],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  messages: [String],
}, { timestamps: true });

// Middleware to automatically set the batch when a new status is added
personSchema.pre('save', function (next) {
  const person = this;
  // If statusHistory was modified
  if (person.isModified('statusHistory')) {
    // Get the latest status entry
    const latestStatus = person.statusHistory[person.statusHistory.length - 1];
    if (latestStatus && !latestStatus.batch) {
      // Generate batch info for the new status
      latestStatus.batch = getBatch(latestStatus.date);
    }
  }
  next();
});

export default mongoose.model('Person', personSchema);