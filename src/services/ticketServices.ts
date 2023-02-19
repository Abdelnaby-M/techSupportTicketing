import ticketModel, {ticketInterface} from "../models/ticket.model";
import { v4 as uuid } from "uuid";


export default class ticketService{

    static async create(data: ticketInterface) {

        const {customerId} = data;
        const uid = uuid();

        return new Promise((resolve, reject) => {
            ticketModel.create({
                uid,
                customerId,
            })
            .then(() => {
              const message = 'Ticket created Succefully';
              resolve({ message });
        })
        .catch((err) => reject(err));
        });
    }

    static getMany() {
      
      return new Promise((resolve, reject) => {
        ticketModel.find()
        .then((result) => resolve({ result }))
        .catch((err) => reject(err));
      });
    }
    
    static getOne(uid: string, assignedUserId: string ) {
      
      const filter = {uid, assignedUserId};
      return new Promise((resolve, reject) => {
        ticketModel.findOne(filter)
        .then((result) => resolve({ result }))
        .catch((err) => reject(err));
      });
    }

    static getMytickets(uid: string) {

      return new Promise((resolve, reject) => {
        ticketModel.find({assignedUserId: uid})
        .then((result) => resolve({ result }))
        .catch((err) => reject(err));
      });
      // return(uid)
    }

    static async update(data: ticketInterface) {

        const {uid, status} = data;
        const filter = {uid: uid}
        const update = {status: status}

        return new Promise((resolve, reject) => {
            ticketModel.findOneAndUpdate(filter, update)
            .then(() => {
              const message = `Order updated Succefully to ${status}`;
              resolve({ message });
        })
        .catch((err) => reject(err));
        });
    }

    static async assign(data: ticketInterface) {

      const {uid, assignedUserId} = data;
      const filter = {uid}
      const update = {assignedUserId, status: 'assigned'}

      let doc = await ticketModel.findOneAndUpdate(filter, update, {new: true})

      return doc;
    }

    static async accept(data: ticketInterface) {

      const {uid, assignedUserId} = data;
      const filter = {uid, assignedUserId};
      const update = {status: 'Accepted'};

      let doc = await ticketModel.findOneAndUpdate(filter, update, {new: true})

      return doc;
    }

    static async resolve(data: ticketInterface) {

      const {uid, assignedUserId} = data;
      const filter = {uid, assignedUserId};
      const update = {status: 'Resolved'};

      return new Promise((resolve, reject) => {
          ticketModel.findOneAndUpdate(filter, update)
          .then(() => {
            const message = `Ticket ${uid} marked as resolved Succefully`;
            resolve({ message });
      })
      .catch((err) => reject(err));
      });
    }
}