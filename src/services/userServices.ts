import User, {userInterface} from "../models/user.model";
// import sendEmail from "./utilities";
import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";


export default class userServices {

  static async createUser(data: userInterface) {

    const { firstName, lastName, email, phoneNumber, password} = data;
    const uid = uuid();
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    return new Promise((resolve, reject) => {
      User.create({
        uid,
        firstName,
        lastName,
        password,
        email,
        active: true,
        phoneNumber,
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

  static deactivateUser(uid: string) {


    return new Promise((resolve, reject) => {
      User.findOne({ uid })
        .then(async (user) => {
          if(user) var  active = user.active;
          else {
            resolve({ message: "user not found" });
          }
          await User.updateOne({ uid }, { $set: { active: false } });
          resolve({ message: "user activated / deactivated" });
        })
        .catch((err) => reject(err));
    });
  }

  static getUsers() {

    return new Promise((resolve, reject) => {
      User.find()
        .then((result) => resolve({ result }))
        .catch((err) => reject(err));
    });
  }

  static getUser(uid: string) {

    return new Promise((resolve, reject) => {
      User.findOne({ uid })
        .then((result) => resolve({ result }))
        .catch((err) => reject(err));
    });
  }

  static updateUser(data: userInterface) {
    
    const { uid, firstName, lastName, email, phoneNumber } = data;

    return new Promise((resolve, reject) => {
      User.findOne({ uid })
        .then(async () => {
          await User.updateOne({ uid }, { firstName, lastName, email, phoneNumber });
          resolve({ message: "user Updated" });
        })
        .catch((err) => reject(err));
    });
  }
}