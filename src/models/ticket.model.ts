import { Schema, model } from 'mongoose';


export interface ticketInterface {

    uid: string,
    customerId: string,
    assignedUserId: string,
    status: string,
    descriptions: [string],
}


const ticketSchema = new Schema<ticketInterface>({
    uid: { type: String, required: true, unique: true, trim: true },
    customerId: { type: String, required: true, },
    assignedUserId: { type: String },
    status: { type: String,  default: "pending" },
    descriptions: {type: [String], default: []},
  },
  {
    timestamps: true,
});


const ticketModel = model<ticketInterface>('Ticket', ticketSchema);

export default ticketModel;