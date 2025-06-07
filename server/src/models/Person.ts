import mongoose, { Document, Schema } from 'mongoose';

export type Status = 'non-trafficked' | 'trafficked' | 'rescued' | 'empowered' | 'reintegrated';

export interface IPerson extends Document {
  name: string;
  dob: string;
  gender: string;
  contact: string;
  address: string;
  currentStatus: Status;
  statusHistory: { status: Status, date: Date }[];
  createdBy: Schema.Types.ObjectId;
}

const personSchema = new Schema<IPerson>({
  name: String,
  dob: String,
  gender: String,
  contact: String,
  address: String,
  currentStatus: { type: String, enum: ['non-trafficked', 'trafficked', 'rescued', 'empowered', 'reintegrated'], default: 'non-trafficked' },
  statusHistory: [{ status: String, date: Date }],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model<IPerson>('Person', personSchema);