import mongoose, { Schema } from 'mongoose';

const eventSchema = new Schema({
    title: String,
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    description: String,
    location: String,
    participants: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
    EventStatus: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed']
    }
});

export default mongoose.model('Event', eventSchema);