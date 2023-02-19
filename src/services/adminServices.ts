import adminModel, { adminInterface} from "../models/admin/admin.model";
import {IAdminProps} from "../models/admin/IAdmin";
import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";

export default class adminServices {

  static async create(data: IAdminProps) {

    const { firstName, lastName, email, phoneNumber, password, role} = data;
    const uid = uuid();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return new Promise((resolve, reject) => {
      adminModel.create({
        uid,
        firstName,
        lastName,
        password: hashedPassword,
        email,
        active: true,
        phoneNumber,
        role,
      })
        .then(() => {
          const message = `
          <h1>Hello ${firstName}</h1>
         <h2>Your Password : <strong>${password}</strong></h2> `;

          // sendEmail({
          //   to: email,
          //   sub: "Account Registration Confirmation",
          //   text: message,
          // });

          resolve({ uid });
        })
        .catch((err) => reject(err));
    });
  }

  static getMany() {

    return new Promise((resolve, reject) => {
      adminModel.find()
        .then((result) => resolve({ result }))
        .catch((err) => reject(err));
    });
  }

  static getOne(uid: string) {

    return new Promise((resolve, reject) => {
      adminModel.findOne({ uid })
        .then((result) => resolve({ result }))
        .catch((err) => reject(err));
    });
  }

  static update(data: adminInterface) {
    
    const { uid, firstName, lastName, email, phoneNumber } = data;

    return new Promise((resolve, reject) => {
      adminModel.findOne({ uid })
        .then(async () => {
          await adminModel.updateOne({ uid }, { firstName, lastName, email, phoneNumber });
          resolve({ message: "Baker Updated" });
        })
        .catch((err) => reject(err));
    });
  }

  // static async approveOrder(bakerId: string, orderId: string, collectionTime: Date){

  //   var order = await ticketModel.findOne({uid: orderId});
  //   const product = await productModel.findOne({uid: order?.productId});

  //   if(product?.bakerId != bakerId){
  //     return({message: 'Invalid request'})
  //   }

  //   var Baker = await baker.findOne({uid: bakerId})
  //   if(!Baker){
  //     return({message: 'Invalid request'}) 
  //   }

  //   const requiredTime = collectionTime.getTime() - product.bakkingTime.getTime();

  //   if( requiredTime >= Baker.startTime.getTime()
  //     &&  requiredTime <= Baker.endTime.getTime()){


  //   }
  //   else return({message: 'Invalid collection Time'})

  //   return 0; 
  // }
}