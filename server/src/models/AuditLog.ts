import mongoose, { Schema } from 'mongoose';

const auditLogSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true },
    targetId: { type: Schema.Types.ObjectId, ref: 'Person', required: true },
    timestamp: { type: Date, default: Date.now },
    details: { type: String },
});

export default mongoose.model('AuditLog', auditLogSchema);